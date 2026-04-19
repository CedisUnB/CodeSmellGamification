import { FaCheckCircle } from 'react-icons/fa';
import { translate } from '../utils/enumTranslator';

export default function TabClassification({ submissionsBySmell, correctLines }) {
    const hasSubmitted = correctLines && correctLines.length > 0;
    const correctLinesSet = hasSubmitted ? new Set(correctLines.map(item => item.line)) : null;

    const getLineNumberColor = (line) => {
        if (!hasSubmitted) return 'text-neutral-500 dark:text-neutral-400';
        return correctLinesSet.has(line)
            ? 'text-green-700 dark:text-green-400'
            : 'text-red-700 dark:text-red-400';
    };

    if (Object.keys(submissionsBySmell).length === 0) {
        return (
            <div className="h-full flex items-center justify-center p-5">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                    <FaCheckCircle size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Nenhum mau cheiro classificado ainda</p>
                    <p className="text-xs mt-1">Selecione linhas no código e classifique os maus cheiros</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-auto h-full p-5">
            <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Maus cheiros classificados
                </h3>
                <span className="text-sm text-neutral-400 ml-auto">
                    Linha(s)
                </span>
            </div>

            <div className="space-y-2">
                {Object.entries(submissionsBySmell).map(([smell, lines]) => (
                    <div
                        key={smell}
                        className="group flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700/30 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                        <div className="flex flex-none items-center gap-2 mr-4">
                            {hasSubmitted && <div className="w-2 h-2 rounded-full bg-orange-400" />}
                            {!hasSubmitted && <div className="w-2 h-2 rounded-full bg-amber-300" />}
                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                {translate(smell)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap justify-end">
                            {lines.sort((a, b) => a - b).map((line, index) => (
                                <span
                                    key={line}
                                    className={`text-xs font-mono ${getLineNumberColor(line)}`}
                                >
                                    {line}{index < lines.length - 1 && ','}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}