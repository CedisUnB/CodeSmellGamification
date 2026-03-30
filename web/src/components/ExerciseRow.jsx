// src/components/ExerciseRow.jsx
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCircle, FaStar } from 'react-icons/fa';

export default function ExerciseRow({ exercise }) {
    const navigate = useNavigate();

    const handleExerciseClick = () => {
        navigate(`/farejador/${exercise.id}`);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'facil':
                return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
            case 'medio':
                return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
            case 'dificil':
                return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
            default:
                return 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/20';
        }
    };

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'facil':
                return 'Fácil';
            case 'medio':
                return 'Médio';
            case 'dificil':
                return 'Difícil';
            default:
                return difficulty;
        }
    };

    return (
        <tr
            className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer"
            onClick={handleExerciseClick}
        >
            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                <div className="flex justify-center">
                    {exercise.completed ? (
                        <FaCheckCircle className="text-green-500 text-base sm:text-xl" />
                    ) : (
                        <FaCircle className="text-neutral-300 dark:text-neutral-600 text-base sm:text-xl" />
                    )}
                </div>
            </td>
            <td className="px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
                            {exercise.id.toString().padStart(2, '0')}.
                        </span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100 text-sm sm:text-base wrap-break-word">
                            {exercise.title}
                        </span>
                    </div>
                    {exercise.recommended && (
                        <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 w-fit">
                            <FaStar className="mr-1 text-xs" />
                            Recomendado
                        </span>
                    )}
                </div>
            </td>
            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {getDifficultyLabel(exercise.difficulty)}
                </span>
            </td>
        </tr>
    );
}