import ReactMarkdown from 'react-markdown';
import MarkdownComponents from '../utils/markdownStyles';
import { FaChartLine, FaTag } from 'react-icons/fa';

export default function TabAbout({ exercise, totalSmellsFound, totalLinesFound }) {
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

    return (
        <div className="overflow-auto h-full">
            {/* Descrição */}
            <div className="p-5 border-b border-neutral-100 dark:border-neutral-700">
                <div className="prose prose-sm max-w-none">
                    <ReactMarkdown components={MarkdownComponents}>
                        {exercise.description}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Cards de informações rápidas */}
            <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
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

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <FaTag size={14} className="text-neutral-400" />
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Classificados</span>
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
        </div>
    );
}