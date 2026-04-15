import ReactMarkdown from 'react-markdown';
import MarkdownComponents from '../utils/markdownStyles';
import { FaChartLine, FaTag } from 'react-icons/fa';
import { getAlternateColor } from '../utils/colorizer';
import { translate } from '../utils/enumTranslator';

export default function TabAbout({ exercise, totalSmellsFound, totalLinesFound }) {

    const difficultyIcons = {
        EASY: '🌱',
        MEDIUM: '⚡',
        HARD: '🔥'
    };
    const getIcon = (difficulty) => difficultyIcons[difficulty] || '🔥';

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
                            <span className="text-xl">{getIcon(exercise.difficulty)}</span>
                            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${getAlternateColor(exercise.difficulty)}`}>
                                {translate(exercise.difficulty)}
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