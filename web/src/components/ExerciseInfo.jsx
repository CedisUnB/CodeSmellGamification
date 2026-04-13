import { FaCheckCircle, FaClipboard, FaChartLine, FaTag, FaLightbulb } from 'react-icons/fa';
import { translate } from '../utils/enumTranslator';
import TipButton from './TipButton';
import ReactMarkdown from 'react-markdown';
import MarkdownComponents from '../utils/markdownStyles';
import ExerciseTutor from './ExerciseTutor';

export default function ExerciseInfo({ exercise, classifiedLines, onSmellsTipReq, onLinesTipReq, currentState, onLineClassification, selectedLines }) {
    // Agrupa submissões por smell
    const submissionsBySmell = classifiedLines.reduce((acc, sub) => {
        const smellLabel = sub.smell;
        if (!acc[smellLabel]) {
            acc[smellLabel] = [];
        }
        acc[smellLabel].push(sub.line);
        return acc;
    }, {});

    const getDifficultyConfig = () => {
        if (exercise.difficulty === 'EASY') {
            return { label: 'Fácil', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: '🌱' };
        }
        if (exercise.difficulty === 'MEDIUM') {
            return { label: 'Médio', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: '⚡' };
        }
        return { label: 'Difícil', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', icon: '🔥' };
    };

    const difficulty = getDifficultyConfig();
    const totalSmellsFound = Object.keys(submissionsBySmell).length;
    const totalLinesFound = classifiedLines.length;

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">

            <div className="bg-linear-to-r from-teal-500 to-indigo-600 px-5 py-4">
                <div className="flex items-center gap-2">
                    <FaClipboard size={18} className="text-white" />
                    <h2 className="text-white font-semibold">Sobre</h2>
                </div>
            </div>

            {/* Descrição */}
            <div className="h-200 flex flex-col space-between">
                <div className="overflow-auto">
                    <div className="p-5 border-b border-neutral-100 dark:border-neutral-700">
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown components={MarkdownComponents}>
                                {exercise.description}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Cards de informações rápidas */}
                    <div className="p-5 border-b border-neutral-100 dark:border-neutral-700">
                        <div className="grid grid-cols-2 gap-3">
                            {/* Dificuldade */}
                            <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <FaChartLine size={14} className="text-neutral-400" />
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Dificuldade</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{difficulty.icon}</span>
                                    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${difficulty.color}`}>
                                        {difficulty.label}
                                    </span>
                                </div>
                            </div>

                            {/* Progresso */}
                            <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <FaTag size={14} className="text-neutral-400" />
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Maus Cheiros</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                                        {totalSmellsFound}
                                    </span>
                                    <span className="text-xs text-neutral-500">tipos</span>
                                    <span className="mx-1 text-neutral-300">•</span>
                                    <span className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                                        {totalLinesFound}
                                    </span>
                                    <span className="text-xs text-neutral-500">linhas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Maus cheiros encontrados */}
                    {Object.keys(submissionsBySmell).length > 0 && (
                        <div className="p-5 border-b border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-2 mb-3">
                                <FaCheckCircle size={14} className="text-emerald-500" />
                                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Maus cheiros identificados
                                </h3>
                                <span className="text-xs text-neutral-400 ml-auto">
                                    Linha(s)
                                </span>
                            </div>

                            <div className="space-y-2">
                                {Object.entries(submissionsBySmell).map(([smell, lines]) => (
                                    <div
                                        key={smell}
                                        className="group flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700/30 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                                {translate(smell) || smell}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                                                {lines.sort((a, b) => a - b).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Área de dicas */}
                    <div className="p-5 bg-linear-to-b from-transparent to-neutral-50 dark:to-neutral-700/20">
                        <div className="flex items-center gap-2 mb-3">
                            <FaLightbulb size={14} className="text-amber-500" />
                            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                Precisa de ajuda?
                            </h3>
                        </div>
                        <TipButton
                            exerciseId={exercise.id}
                            onSmellsTipReq={onSmellsTipReq}
                            onLinesTipReq={onLinesTipReq}
                        />
                    </div>

                </div>

                {/* DevDog com instruções */}
                <div className="p-5 border-t border-neutral-100 dark:border-neutral-700">
                    <ExerciseTutor
                        currentState={currentState}
                        onLineClassification={onLineClassification}
                        selectedLines={selectedLines}
                    />
                </div>
            </div>
        </div>
    );
}