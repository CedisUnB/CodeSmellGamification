import { useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import petiscoIcon from '../assets/petisco.svg';
import DevDogCarinho from '../assets/carinho.svg';
import DevDogSentado from '../assets/sentado.svg';
import DevDogMorto from '../assets/morto.svg';

export default function ResultPopup({ result, onClose, tips }) {
    const { correctLines, correctSmells, score, bonus } = result;

    // Calcula estrelas baseado no score
    const getStars = () => {
        const starCount = Math.floor(score / 20); // 0-5 estrelas
        const fullStars = starCount;
        const hasHalfStar = score % 20 >= 10;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        return { fullStars, hasHalfStar, emptyStars };
    };

    // Define mensagem e bônus baseado no desempenho
    const getFeedback = () => {
        if (bonus == 5) {
            return {
                title: "Perfeito!",
                message: "Você arrasou! Tem um faro afiado para maus cheiros!",
                bonus: 5,
                image: DevDogCarinho,
                imageAlt: "DevDog recebendo carinho"
            };
        } else if (bonus == 4) {
            return {
                title: "Mandou Bem!",
                message: "Bom trabalho! Continue treinando seu faro!",
                bonus: 4,
                image: DevDogCarinho,
                imageAlt: "DevDog recebendo carinho"
            };
        } else if (bonus == 3) {
            return {
                title: "Quase lá!",
                message: "Você identificou alguns problemas. Continue praticando!",
                bonus: 3,
                image: DevDogSentado,
                imageAlt: "DevDog sentado"
            };

        } else if (bonus == 2) {
            return {
                title: "Vamos treinar mais!",
                message: "Você ainda pode melhorar. Tente novamente!",
                bonus: 2,
                image: DevDogMorto,
                imageAlt: "DevDog morto"
            };
        } else if (bonus == 1) {
            return {
                title: "Tá lascado!",
                message: "Vamos treinar mais! Tente novamente!",
                bonus: 2,
                image: DevDogMorto,
                imageAlt: "DevDog morto"
            };
        } else {
            return {
                title: "Eita!",
                message: "Não foi dessa vez. Que tal pedir uma dica e tentar novamente?",
                bonus: 0,
                image: DevDogMorto,
                imageAlt: "DevDog morto"
            };
        }
    };

    const { fullStars, hasHalfStar, emptyStars } = getStars();
    const feedback = getFeedback();

    // Fecha com ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="relative flex flex-col md:flex-row items-center md:items-center justify-center max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>

            {/* Lado esquerdo */}
            <div className="shrink-0 mb-4 md:mb-0 md:mr-4 z-10">
                <img
                    src={feedback.image}
                    alt={feedback.imageAlt}
                    className="w-96 h-96 object-contain"
                />
            </div>

            {/* Lado direito */}
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-md">
                {/* Rabinho do balão apontando para o DevDog */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-4 h-4 bg-white dark:bg-neutral-800 border-l-2 border-t-2 border-neutral-200 dark:border-neutral-700 rotate-45 hidden md:block"></div>

                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {feedback.title}
                    </h2>
                </div>

                {/* Estrelas */}
                <div className="flex justify-center gap-1 mb-4">
                    {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={`full-${i}`} className="text-yellow-400 text-2xl" />
                    ))}
                    {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-2xl" />}
                    {[...Array(emptyStars)].map((_, i) => (
                        <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-2xl" />
                    ))}
                </div>

                {/* Estatísticas */}
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600 dark:text-neutral-300 text-sm">
                            Linhas problemáticas identificadas:
                        </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                            {score === 100 ? `${correctLines}/${correctLines}` : `${correctLines}/${tips.linesCount || "??"}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-neutral-600 dark:text-neutral-300 text-sm">
                            Maus cheiros categorizados:
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            {score === 100 ? `${correctSmells}/${correctSmells}` : `${correctSmells}/${tips.smellsCount || "??"}`}
                        </span>
                    </div>
                </div>

                {/* Mensagem */}
                <p className="text-neutral-700 dark:text-neutral-300 text-center text-sm mb-4">
                    {feedback.message}
                </p>

                {/* Bônus */}
                <button
                    onClick={onClose}
                    className="w-full bg-linear-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>Resgatar +{feedback.bonus}</span>
                    <img
                        src={petiscoIcon}
                        alt="Petisco"
                        className="w-6 h-6 object-contain rotate-120 "
                    />
                </button>
            </div>
        </div>
    </div>
    );
}