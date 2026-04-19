import { useState, useEffect } from 'react';
import { FaCode, FaCopy, FaCheck, FaUndoAlt } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tooltip from './Tooltip';

export default function ExerciseCode({
    code,
    onLinesSelect,
    selectedLines,
    classifiedLines,
    correctLines = [],
    incorrectLines = [],
    disabled = false,
}) {
    const [hoveredLine, setHoveredLine] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartLine, setDragStartLine] = useState(null);
    const [dragMode, setDragMode] = useState(null); // 'add' ou 'remove'

    const lines = code ? code.trimStart().split('\n').map((content, index) => ({
        number: index + 1,
        content,
        isSelected: selectedLines.includes(index + 1),
        isClassified: classifiedLines.some(s => s.line === index + 1),
        isCorrect: correctLines.some(s => s.line === index + 1),
        isIncorrect: incorrectLines.some(s => s.line === index + 1)
    })) : [];

    // Atualiza seleção durante o drag
    const updateDragSelection = (endLine) => {
        if (dragStartLine === null || disabled) return;

        const start = Math.min(dragStartLine, endLine);
        const end = Math.max(dragStartLine, endLine);
        const linesInRange = [];
        for (let i = start; i <= end; i++) {
            linesInRange.push(i);
        }

        if (dragMode === 'add') {
            // Adiciona linhas do range
            const newSelection = [...new Set([...selectedLines, ...linesInRange])];
            onLinesSelect(newSelection.sort((a, b) => a - b));
        } else if (dragMode === 'remove') {
            // Remove linhas do range
            const newSelection = selectedLines.filter(line => !linesInRange.includes(line));
            onLinesSelect(newSelection);
        }
    };

    const handleLineClick = (lineNumber) => {
        if (disabled) return;

        // Se não está arrastando, executa o clique
        if (!isDragging) {
            if (selectedLines.includes(lineNumber)) {
                onLinesSelect(selectedLines.filter(l => l !== lineNumber));
            } else {
                onLinesSelect([...selectedLines, lineNumber].sort((a, b) => a - b));
            }
        }
    };

    const handleMouseDown = (lineNumber) => {
        if (disabled) return;

        setIsDragging(true);
        setDragStartLine(lineNumber);

        // Define o modo baseado no estado atual da linha
        const isSelected = selectedLines.includes(lineNumber);
        setDragMode(isSelected ? 'remove' : 'add');
    };

    const handleMouseEnter = (lineNumber) => {
        setHoveredLine(lineNumber);
        if (isDragging && !disabled) {
            updateDragSelection(lineNumber);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragStartLine(null);
        setDragMode(null);
    };

    const handleClearSelection = () => {
        if (disabled) return;
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

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, [selectedLines]);

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
        let className = 'flex flex-row align-middle px-4 py-1 font-mono text-sm transition-colors select-none';

        if (!disabled) {
            className += ' cursor-pointer';
        }

        if (line.isCorrect) {
            className += ' bg-green-500/30';
        } else if (line.isIncorrect) {
            className += ' bg-red-500/30 opacity-70';
        } else if (line.isSelected) {
            className += ' bg-orange-500/30 border-l-2 border-orange-500';
        } else if (line.isClassified) {
            className += ' bg-yellow-500/30';
        } else if (hoveredLine === line.number && !disabled) {
            className += ' bg-neutral-700 dark:bg-neutral-700';
        } else if (!disabled) {
            className += ' hover:bg-neutral-100 dark:hover:bg-neutral-800';
        }
        return className;
    };

    return (
        <div
            className="bg-neutral-800 dark:bg-neutral-800 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 h-200"
            onMouseLeave={handleMouseUp}
        >
            {/* Header do código */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 bg-linear-to-r from-orange-500 to-red-500">
                <div className="flex items-center justify-between px-4">
                    <div className="px-4 py-3 text-sm font-medium text-white">
                        <div className="flex items-center gap-2">
                            <FaCode size={14} />
                            Código
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {selectedLines.length > 0 && !disabled && (
                            <Tooltip text="Limpar seleção">
                                <button
                                    onClick={handleClearSelection}
                                    className="text-white/70 hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FaUndoAlt size={16} />
                                </button>
                            </Tooltip>
                        )}
                        <Tooltip text="Copiar código">
                            <button
                                onClick={handleCopyCode}
                                className="text-white/70 hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                            >
                                {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Área de código */}
            <div className="overflow-auto h-[calc(100%-52px)]">
                {lines.map((line) => (
                    <div
                        key={line.number}
                        className={getLineClassName(line)}
                        onClick={() => handleLineClick(line.number)}
                        onMouseDown={() => handleMouseDown(line.number)}
                        onMouseEnter={() => handleMouseEnter(line.number)}
                    >
                        <span className="self-center flex justify-center w-4 text-right text-neutral-400 dark:text-neutral-500 select-none mr-4">
                            {line.number}
                        </span>
                        <span className="flex-1">
                            <SyntaxHighlighter
                                language={detectLanguage(line.content)}
                                style={dracula}
                                customStyle={{
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {line.content || ' '}
                            </SyntaxHighlighter>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}