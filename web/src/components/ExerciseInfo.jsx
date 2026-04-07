import { FaCheckCircle, FaClipboard } from 'react-icons/fa';
import { translate } from '../utils/enumTranslator';

export default function ExerciseInfo({ exercise, classifiedLines }) {
    // Agrupa submissões por smell
    const submissionsBySmell = classifiedLines.reduce((acc, sub) => {
        const smellLabel = sub.smell;
        if (!acc[smellLabel]) {
            acc[smellLabel] = [];
        }
        acc[smellLabel].push(sub.line);
        return acc;
    }, {});

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
            {/* Sobre o exercício */}
            <div className="bg-linear-to-r from-teal-500 to-indigo-500 px-4 py-3 flex justify-between items-center">
                <span className="text-white font-semibold flex gap-2 items-center"><FaClipboard size={20} />Sobre o Exercício</span>
            </div>

            {/* Descrição */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    {exercise.description}
                </p>
            </div>

            {/* Dificuldade */}
            <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400 text-sm">Dificuldade:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${exercise.difficulty === 'facil' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    exercise.difficulty === 'medio' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    {exercise.difficulty === 'facil' ? 'Fácil' :
                        exercise.difficulty === 'medio' ? 'Médio' : 'Difícil'}
                </span>
            </div>

            {/* Maus cheiros encontrados */}
            {Object.keys(submissionsBySmell).length > 0 && (
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                        Maus cheiros encontrados:
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(submissionsBySmell).map(([smell, lines]) => (
                            <div key={smell} className="flex items-start gap-2">
                                <FaCheckCircle className="text-yellow-500 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                        {translate(smell) || smell}
                                    </span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                                        Linhas: {lines.sort((a, b) => a - b).join(', ')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Dica (se disponível) */}
            {exercise.tip && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-t border-orange-200 dark:border-orange-800">
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                        Dica: {exercise.tip}
                    </p>
                </div>
            )}
        </div>
    );
}