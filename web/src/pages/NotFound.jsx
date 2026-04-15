import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import DevDogTriste from '../assets/morto.svg';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-9xl font-bold text-neutral-300 dark:text-neutral-700 mb-4">
                    404
                </div>

                <img
                    src={DevDogTriste}
                    alt="DevDog triste"
                    className="w-48 h-48 mx-auto mb-6"
                />

                <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    Página não encontrada
                </h1>

                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
                    O DevDog farejou por toda parte, mas não conseguiu encontrar a página que você procura.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                    >
                        <FaArrowLeft size={16} />
                        Voltar
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                        <FaHome size={16} />
                        Voltar para o início
                    </button>
                </div>
            </div>
        </div>
    );
}