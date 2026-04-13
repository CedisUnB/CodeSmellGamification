// pages/FarejadorList.jsx
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiService } from '../../services/ApiService';
import { AuthContext } from '../../contexts/AuthContext';
import { FaPaw } from 'react-icons/fa';
import DevDog from '../../assets/sentado.svg';
import SpeechBubble from '../../components/SpeechBubble';
import ExerciseRow from '../../components/ExerciseRow';
import SearchAndFilter from '../../components/SearchAndFilter';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 8;

export default function FarejadorList() {
    const { token } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedDifficulty, setSelectedDifficulty] = useState(
        searchParams.get('difficulty') || 'ALL'
    );

    useEffect(() => {
        const { getExercises } = ApiService(token);
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const { data } = await getExercises();
                setExercises(data);
            } catch (error) {
                console.error('Erro ao carregar exercícios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [token]);

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setCurrentPage(1);
        if (difficulty === 'ALL') {
            setSearchParams({});
        } else {
            setSearchParams({ difficulty: difficulty });
        }
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.id.toString().includes(searchTerm);
        const matchesDifficulty = selectedDifficulty === 'ALL' || exercise.difficulty === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedExercises = filteredExercises.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const recommendedExercises = paginatedExercises.filter(ex => ex.recommended);
    const regularExercises = paginatedExercises.filter(ex => !ex.recommended);

    const difficultyOptions = ['ALL', 'EASY', 'MEDIUM', 'HARD'];
    const difficultyLabels = { ALL: 'Todos', EASY: 'Fácil', MEDIUM: 'Médio', HARD: 'Difícil' };
    const difficultyColors = {
        EASY: 'bg-green-500 text-white shadow-md',
        MEDIUM: 'bg-yellow-500 text-white shadow-md',
        HARD: 'bg-red-500 text-white shadow-md'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-4">
                    Lista de Exercícios
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                    Escolha um exercício e vamos farejar os problemas juntos!
                </p>
            </div>

            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Pesquisar exercício por nome ou número..."
                selectedFilter={selectedDifficulty}
                onFilterChange={handleDifficultyChange}
                filterOptions={difficultyOptions}
                filterLabels={difficultyLabels}
                filterColors={difficultyColors}
            />

            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
                <div className="lg:w-1/3 xl:w-1/4 flex flex-col items-center space-y-4 sm:space-y-6">
                    <SpeechBubble tailSide="bottom">
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Com certeza tem algo cheirando mal aqui!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Escolha um desses exercícios e vamos farejar os problemas.<br />
                            Use seu faro de dev para encontrar os maus cheiros!
                        </p>
                    </SpeechBubble>
                    <img src={DevDog} alt="DevDog" className="w-48 sm:w-64 lg:w-72 object-contain hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="lg:w-2/3 xl:w-3/4 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                    {loading ? (
                        <div className="flex justify-center items-center py-20 flex-1">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                            <p className="ml-3 text-neutral-500">Carregando exercícios...</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full min-w-125 sm:min-w-0">
                                    <thead className="bg-linear-to-r from-orange-500 to-red-500">
                                        <tr>
                                            <th className="w-16 sm:w-20 px-3 sm:px-6 py-3 sm:py-4 text-center text-white font-semibold text-sm sm:text-base">Status</th>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-sm sm:text-base">Exercício</th>
                                            <th className="w-20 sm:w-24 px-3 sm:px-6 py-3 sm:py-4 text-center text-white font-semibold text-sm sm:text-base">Nível</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                        {recommendedExercises.map((exercise) => (
                                            <ExerciseRow key={exercise.id} exercise={exercise} />
                                        ))}
                                        {regularExercises.map((exercise) => (
                                            <ExerciseRow key={exercise.id} exercise={exercise} />
                                        ))}
                                        {filteredExercises.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-3 sm:px-6 py-8 sm:py-12 text-center text-neutral-500 dark:text-neutral-400">
                                                    <FaPaw className="mx-auto text-3xl sm:text-4xl mb-2 opacity-50" />
                                                    <p className="text-sm sm:text-base">Nenhum exercício encontrado</p>
                                                    <p className="text-xs sm:text-sm">Tente ajustar sua pesquisa ou filtros</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                color="orange"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}