import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ApiService } from '../../services/ApiService';
import { AuthContext } from '../../contexts/AuthContext';
import ExerciseCode from '../../components/ExerciseCode';
import ExerciseInfo from '../../components/ExerciseInfo';
import { FaForward, FaRedo } from 'react-icons/fa';
import ResultPopup from '../../components/ResultPopup';
import { useUser } from '../../contexts/UserContext';
import NotFound from '../NotFound';

const DEVDOG_STATES = {
    FAREJANDO: 'farejando',
    FAREJADOR: 'farejador',
    PIDAO: 'pidao',
    ESTUDIOSO: 'estudioso',
};

export default function FarejadorDetail() {
    const { id } = useParams();
    const { updateUser } = useUser();
    const { token } = useContext(AuthContext);
    const { makeAttempt } = ApiService(token);
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dogState, setDogState] = useState(DEVDOG_STATES.FAREJANDO);
    const [selectedLines, setSelectedLines] = useState([]);
    const [classifiedLines, setClassifiedLines] = useState([]);
    const [correctLines, setCorrectLines] = useState([]);
    const [incorrectLines, setIncorrectLines] = useState([]);
    const [attemptResult, setAttemptResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [tips, setTips] = useState({
        linesCount: null,
        smellsCount: null,
        smellyLine: null
    });

    // Valida se o ID é um número válido
    const isValidId = /^\d+$/.test(id);
    const exerciseId = isValidId ? parseInt(id) : null;

    useEffect(() => {
        // Se o ID não for válido, não faz a requisição
        if (!isValidId) {
            setLoading(false);
            return;
        }

        const { getExerciseById } = ApiService(token);
        const fetchExercise = async () => {
            setLoading(true);
            try {
                const { data } = await getExerciseById(exerciseId);
                setExercise(data);
            } catch (error) {
                console.error('Erro ao carregar exercício:', error);
                if (error.response?.status === 404) {
                    setExercise(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [token, exerciseId, isValidId]);

    // Monitora o tempo para sugerir dica (30 segundos sem ação)
    useEffect(() => {
        if (!exercise) return;

        // Verifica se todas as dicas já foram pedidas
        const allTipsReceived = tips.linesCount !== null &&
            tips.smellsCount !== null &&
            tips.smellyLine !== null;

        const timer = setTimeout(() => {
            if (selectedLines.length === 0 &&
                dogState === DEVDOG_STATES.FAREJANDO &&
                !hasSubmitted &&
                !allTipsReceived) {
                setDogState(DEVDOG_STATES.PIDAO);
            }
        }, 20000);

        return () => clearTimeout(timer);
    }, [selectedLines, dogState, exercise, hasSubmitted, tips]);

    // Atualiza estado do DevDog baseado nas ações do usuário
    useEffect(() => {
        if (!hasSubmitted) {
            if (selectedLines.length > 0) {
                setDogState(DEVDOG_STATES.FAREJADOR);
            } else if (selectedLines.length === 0) {
                setDogState(DEVDOG_STATES.FAREJANDO);
            }
        }
    }, [selectedLines, hasSubmitted]);

    const handleLineClassification = (smell) => {
        // Remove classificações antigas das linhas selecionadas e adiciona as novas
        setClassifiedLines(prev => [
            ...prev.filter(item => !selectedLines.includes(item.line)),
            ...selectedLines.map(line => ({ line, smell }))
        ]);
        setSelectedLines([]);
        setDogState(DEVDOG_STATES.FAREJANDO);
    };

    const handleSubmit = async () => {
        if (classifiedLines.length === 0) return;

        try {
            const response = await makeAttempt(exerciseId, { attempt: classifiedLines });

            const correctLinesFromBackend = response.data.matchedLines;

            const correct = classifiedLines.filter(item =>
                correctLinesFromBackend.includes(item.line)
            );
            const incorrect = classifiedLines.filter(item =>
                !correctLinesFromBackend.includes(item.line)
            );

            updateUser(response.data.user);

            setCorrectLines(correct);
            setIncorrectLines(incorrect);
            setAttemptResult({
                ...response.data
            });
            setShowResult(true);
            setHasSubmitted(true);
            setDogState(DEVDOG_STATES.ESTUDIOSO);

        } catch (error) {
            console.error("Erro ao enviar tentativa:", error);
        }
    };

    const handleTryAgain = () => {
        setSelectedLines([]);
        setClassifiedLines([]);
        setCorrectLines([]);
        setIncorrectLines([]);
        setAttemptResult(null);
        setShowResult(false);
        setHasSubmitted(false);
        setDogState(DEVDOG_STATES.FAREJANDO);
    };

    const handleCloseResult = () => {
        setShowResult(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                <p className="text-neutral-500 mt-4">Carregando...</p>
            </div>
        );
    }

    if (!isValidId || !exercise) {
        return <NotFound />;
    }

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Título */}
            <div className="flex items-center justify-between px-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                    {exercise.id}. {exercise.title}
                </h1>
                {!hasSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={classifiedLines.length === 0}
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <FaForward size={16} /> Enviar
                    </button>
                ) : (
                    <button
                        onClick={handleTryAgain}
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <FaRedo size={16} /> Tentar Novamente
                    </button>
                )}
            </div>
            <div className="flex flex-col lg:flex-row">
                {/* Coluna Esquerda - Informações e DevDog */}
                <div className="lg:w-5/12 xl:w-1/3">
                    <ExerciseInfo
                        exercise={exercise}
                        classifiedLines={classifiedLines}
                        dogState={dogState}
                        onLineClassification={handleLineClassification}
                        selectedLines={selectedLines}
                        correctLines={correctLines}
                        tips={tips}
                        setTips={setTips}
                    />
                </div>
                {/* Coluna Direita - Código */}
                <div className="lg:w-7/12 xl:w-2/3">
                    <ExerciseCode
                        code={exercise.code}
                        selectedLines={selectedLines}
                        onLinesSelect={setSelectedLines}
                        classifiedLines={classifiedLines}
                        correctLines={correctLines}
                        incorrectLines={incorrectLines}
                        disabled={hasSubmitted}

                    />
                </div>
            </div>
            {/* Modal de resultado */}
            {showResult && attemptResult && (
                <ResultPopup
                    result={attemptResult}
                    onClose={handleCloseResult}
                    tips={tips}
                />
            )}
        </div>
    );
}