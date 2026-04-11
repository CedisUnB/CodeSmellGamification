import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ApiService } from '../../services/ApiService';
import { AuthContext } from '../../contexts/AuthContext';
import CodeEditor from '../../components/CodeEditor';
import ExerciseInfo from '../../components/ExerciseInfo';
import { FaForward } from 'react-icons/fa';
import ExerciseTutor from '../../components/ExerciseTutor';
import ResultPopup from '../../components/ResultPopup';
import { useUser } from '../../contexts/UserContext';

const DEVDOG_STATES = {
    FAREJANDO: 'farejando',
    SENTADO: 'sentado',
    PIDAO: 'pidao'
};

export default function FarejadorDetail() {
    const { id } = useParams();
    const { refreshUser } = useUser();
    const { token } = useContext(AuthContext);
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentState, setCurrentState] = useState(DEVDOG_STATES.FAREJANDO);
    const [selectedLines, setSelectedLines] = useState([]);
    const [classifiedLines, setClassifiedLines] = useState([]);
    const [correctLines, setCorrectLines] = useState([]);
    const [incorrectLines, setIncorrectLines] = useState([]);
    const { makeAttempt } = ApiService(token);
    const [showResult, setShowResult] = useState(false);
    const [attemptResult, setAttemptResult] = useState(null);
    const [tipNumSmells, setTipNumSmells] = useState(null);
    const [tipNumLines, setTipNumLines] = useState(null);

    useEffect(() => {
        const { getExerciseById } = ApiService(token);
        const fetchExercise = async () => {
            setLoading(true);
            try {
                const { data } = await getExerciseById(id);
                setExercise(data);
            } catch (error) {
                console.error('Erro ao carregar exercício:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [token, id]);

    // Monitora o tempo para sugerir dica (30 segundos sem ação)
    useEffect(() => {
        if (!exercise) return;

        const timer = setTimeout(() => {
            if (selectedLines.length === 0 && currentState === DEVDOG_STATES.FAREJANDO) {
                setCurrentState(DEVDOG_STATES.PIDAO);
            }
        }, 15000);

        return () => clearTimeout(timer);
    }, [selectedLines, currentState, exercise]);

    // Atualiza estado do DevDog baseado nas ações do usuário
    useEffect(() => {
        if (selectedLines.length > 0) {
            setCurrentState(DEVDOG_STATES.SENTADO);
        } else if (selectedLines.length === 0) {
            setCurrentState(DEVDOG_STATES.FAREJANDO);
        }
    }, [selectedLines]);

    const handleLinesSelect = (lines) => {
        setSelectedLines(lines);
    };

    const handleLineClassification = (smell) => {
        const newClassifications = selectedLines.map(selectedLine => ({
            line: selectedLine,
            smell: smell,
        }));

        setClassifiedLines([...classifiedLines, ...newClassifications]);
        setSelectedLines([]);
        setCurrentState(DEVDOG_STATES.FAREJANDO);
    };

    const handleSubmit = async () => {
        if (classifiedLines.length === 0) return;
        setCorrectLines([]);
        setIncorrectLines([]);
        try {
            const response = await makeAttempt(id, { attempt: classifiedLines });

            const correctLinesFromBackend = response.data.matchedLines;

            const correct = classifiedLines.filter(item =>
                correctLinesFromBackend.includes(item.line)
            );
            const incorrect = classifiedLines.filter(item =>
                !correctLinesFromBackend.includes(item.line)
            );

            refreshUser();
            setCorrectLines(correct);
            setIncorrectLines(incorrect);
            setSelectedLines([]);
            setClassifiedLines([]);
            setAttemptResult({
                ...response.data
            });
            setShowResult(true);
        } catch (error) {
            console.error("Erro ao enviar tentativa:", error);
        }
    };

    const handleCloseResult = () => {
        setShowResult(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!exercise) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-2">Exercício não encontrado</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Título */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                    {exercise.id}. {exercise.title}
                </h1>
                <button
                    onClick={handleSubmit}
                    disabled={classifiedLines.length === 0}
                    className="px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <FaForward size={16} /> Enviar
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Coluna Esquerda - Informações e DevDog */}
                <div className="lg:w-2/5 xl:w-1/3">
                    <ExerciseInfo
                        exercise={exercise}
                        classifiedLines={classifiedLines}
                        onLinesTipReq={setTipNumLines}
                        onSmellsTipReq={setTipNumSmells}
                    />
                    {/* DevDog com instruções */}
                    <ExerciseTutor
                        currentState={currentState}
                        onLineClassification={handleLineClassification}
                        selectedLines={selectedLines}
                    />
                </div>

                {/* Coluna Direita - Código */}
                <div className="lg:w-3/5 xl:w-2/3">
                    <CodeEditor
                        code={exercise.code}
                        selectedLines={selectedLines}
                        onLinesSelect={handleLinesSelect}
                        classifiedLines={classifiedLines}
                        correctLines={correctLines}
                        incorrectLines={incorrectLines}
                    />
                </div>
            </div>
            {/* Modal de resultado */}
            {showResult && attemptResult && (
                <ResultPopup
                    result={attemptResult}
                    onClose={handleCloseResult}
                    numSmells={tipNumSmells} //TODO: mudar quando tiver as dicas
                    numLines={tipNumLines} //TODO: mudar quando tiver as dicas
                />
            )}
        </div>
    );
}