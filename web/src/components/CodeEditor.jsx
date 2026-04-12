import { useState } from 'react';
import { FaUndo, FaCode } from 'react-icons/fa';


export default function CodeEditor({
    code,
    onLinesSelect,
    selectedLines,
    classifiedLines,
    correctLines = [],
    incorrectLines = [],
}) {
    const [hoveredLine, setHoveredLine] = useState(null);

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

    const getLineClassName = (line) => {
        let className = 'px-4 py-1 font-mono text-sm transition-colors cursor-pointer text-neutral-800 dark:text-neutral-50';

        if (line.isSelected) {
            className += ' bg-orange-200 dark:bg-orange-900/50 border-l-4 border-orange-500';
        } else if (line.isClassified) {
            className += ' bg-yellow-100 dark:bg-yellow-900/30';
        } else if (line.isCorrect) {
            className += ' bg-green-100 dark:bg-green-900/30';
        } else if (line.isIncorrect) {
            className += ' bg-red-100 dark:bg-red-900/30';
        } else if (hoveredLine === line.number) {
            className += ' bg-neutral-100 dark:bg-neutral-700';
        } else {
            className += ' hover:bg-neutral-100 dark:hover:bg-neutral-700';
        }

        return className;
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">

            {/* Header do código */}
            <div className="bg-linear-to-r from-orange-500 to-red-500 px-4 py-3 flex justify-between items-center">
                <span className="text-white font-semibold flex gap-2 items-center"><FaCode size={20} />Código</span>

                {selectedLines.length > 0 && (
                    <button
                        onClick={handleClearSelection}
                        className="text-white hover:bg-white/20 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <FaUndo size={12} /> Limpar
                    </button>
                )}
            </div>

            {/* Área de código com numeração */}
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {lines.map((line) => (
                        <div
                            key={line.number}
                            className={getLineClassName(line)}
                            onClick={() => handleLineClick(line.number)}
                            onMouseEnter={() => setHoveredLine(line.number)}
                            onMouseLeave={() => setHoveredLine(null)}
                        >
                            <span className="inline-block w-12 text-right text-neutral-400 dark:text-neutral-500 select-none mr-4">
                                {line.number}
                            </span>
                            <span className="whitespace-pre-wrap wrap-break-word">
                                {line.content || ' '}
                            </span>
                        </div>
                    ))}
                </div>
            </div>





        </div>


    );
}