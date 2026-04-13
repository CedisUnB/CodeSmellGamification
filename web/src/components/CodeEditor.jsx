import { useState } from 'react';
import { FaCode, FaCopy, FaCheck, FaUndoAlt } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tooltip from './Tooltip';

export default function CodeEditor({
    code,
    onLinesSelect,
    selectedLines,
    classifiedLines,
    correctLines = [],
    incorrectLines = [],
}) {
    const [hoveredLine, setHoveredLine] = useState(null);
    const [copied, setCopied] = useState(false);

    const lines = code ? code.trimStart().split('\n').map((content, index) => ({
        number: index + 1,
        content,
        isSelected: selectedLines.includes(index + 1),
        isClassified: classifiedLines.some(s => s.line === index + 1),
        isCorrect: correctLines.some(s => s.line === index + 1),
        isIncorrect: incorrectLines.some(s => s.line === index + 1)
    })) : [];

    const handleLineClick = (lineNumber) => {
        if (selectedLines.includes(lineNumber)) {
            onLinesSelect(selectedLines.filter(l => l !== lineNumber));
        } else {
            onLinesSelect([...selectedLines, lineNumber].sort((a, b) => a - b));
        }
    };

    const handleClearSelection = () => {
        onLinesSelect([]);
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    const detectLanguage = (codeString) => {
        if (codeString.includes('function') || codeString.includes('=>') || codeString.includes('const ')) {
            return 'javascript';
        }
        if (codeString.includes('class ') && codeString.includes('def ')) {
            return 'python';
        }
        if (codeString.includes('public static void main')) {
            return 'java';
        }
        return 'javascript';
    };

    const getLineClassName = (line) => {
        let className = 'flex flex-row align-middle px-4 py-1 font-mono text-sm transition-colors cursor-pointer';

        if (line.isSelected) {
            className += ' bg-orange-500/30 border-l-4 border-orange-500';
        } else if (line.isClassified) {
            className += ' bg-yellow-500/30';
        } else if (line.isCorrect) {
            className += ' bg-green-500/30';
        } else if (line.isIncorrect) {
            className += ' bg-red-500/30 line-through opacity-70';
        } else if (hoveredLine === line.number) {
            className += ' bg-neutral-700 dark:bg-neutral-700';
        } else {
            className += ' hover:bg-neutral-100 dark:hover:bg-neutral-800';
        }
        return className;
    };

    const renderLineWithHighlight = (line) => {
        const language = detectLanguage(line.content);

        return (
            <SyntaxHighlighter
                language={language}
                style={dracula}
                customStyle={{
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                }}
            >
                {line.content || ' '}
            </SyntaxHighlighter>
        );
    };

    return (
        <div className="bg-neutral-800 dark:bg-neutral-800 rounded-r-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 h-220">

            {/* Header do código */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 bg-orange-500">
                <div className="flex items-center justify-between px-4">
                    <div className="px-4 py-3 text-sm font-medium transition-all text-bold text-neutral-100">
                        <div className="flex items-center gap-2">
                            <FaCode size={14} />
                            Código
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {/* Botão Limpar */}
                        {selectedLines.length > 0 && (
                            <Tooltip text="Limpar seleção">
                                <button
                                    onClick={handleClearSelection}
                                    className="text-neutral-300 hover:text-neutral-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FaUndoAlt size={16} />
                                </button>
                            </Tooltip>
                        )}
                        {/* Botão Copiar */}
                        <Tooltip text="Copiar código">
                            <button
                                onClick={handleCopyCode}
                                className="text-neutral-300 hover:text-neutral-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                            >
                                {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Área de código com numeração */}
            <div className="overflow-auto">
                <div className="max-h-208">
                    {lines.map((line) => (
                        <div
                            key={line.number}
                            className={getLineClassName(line)}
                            onClick={() => handleLineClick(line.number)}
                            onMouseEnter={() => setHoveredLine(line.number)}
                            onMouseLeave={() => setHoveredLine(null)}
                        >
                            <span className="self-center flex justify-center w-4 text-right text-neutral-400 dark:text-neutral-500 select-none mr-4">
                                {line.number}
                            </span>
                            <span >
                                {renderLineWithHighlight(line)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}