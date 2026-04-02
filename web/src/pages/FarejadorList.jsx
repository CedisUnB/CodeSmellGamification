import { useContext, useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';
import { AuthContext } from '../contexts/AuthContext';
import { FaPaw } from 'react-icons/fa';
import DevDog from '../assets/sentado.svg';
import SpeechBubble from '../components/SpeechBubble';
import ExerciseRow from '../components/ExerciseRow';
import SearchAndFilter from '../components/SearchAndFilter';

export default function FarejadorList() {
    const { token } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('todos');

    useEffect(() => {
        const { findExercises } = ApiService(token);
        const fetchExercises = async () => {
            const { data } = await findExercises();
            setExercises(data);
        };

        fetchExercises();
    }, [token]);


    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.id.toString().includes(searchTerm);
        const matchesDifficulty = selectedDifficulty === 'todos' || exercise.difficulty === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const recommendedExercises = filteredExercises.filter(ex => ex.recommended);
    const regularExercises = filteredExercises.filter(ex => !ex.recommended);

    const difficultyOptions = ['todos', 'facil', 'medio', 'dificil'];

    const difficultyLabels = {
        todos: 'Todos',
        facil: 'Fácil',
        medio: 'Médio',
        dificil: 'Difícil'
    };

    const difficultyColors = {
        facil: 'bg-green-500 text-white shadow-md',
        medio: 'bg-yellow-500 text-white shadow-md',
        dificil: 'bg-red-500 text-white shadow-md'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Titulo */}
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-4">
                    Lista de Exercícios
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                    Escolha um exercício e vamos farejar os problemas juntos!
                </p>
            </div>

            {/* Barra de Pesquisa e Filtros */}
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Pesquisar exercício por nome ou número..."
                filterKey="difficulty"
                selectedFilter={selectedDifficulty}
                onFilterChange={setSelectedDifficulty}
                filterOptions={difficultyOptions}
                filterLabels={difficultyLabels}
                filterColors={difficultyColors}
            />

            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
                {/* Mensagem do DevDog */}
                <div className="lg:w-1/3 xl:w-1/4 flex flex-col items-center space-y-4 sm:space-y-6">
                    <SpeechBubble tailSide="bottom">
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Com certeza tem algo cheirando mal aqui!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Escolha um desses exercícios e vamos farejar os problemas.
                            Use seu faro de desenvolvedor para encontrar os maus cheiros no código!
                        </p>
                    </SpeechBubble>
                    <img
                        src={DevDog}
                        alt="DevDog"
                        className="w-32 sm:w-40 lg:w-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Tabela de Exercícios */}
                <div className="lg:w-2/3 xl:w-3/4 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-125 sm:min-w-0">
                            <thead className="bg-linear-to-r from-orange-500 to-red-500">
                                <tr>
                                    <th className="w-16 sm:w-20 px-3 sm:px-6 py-3 sm:py-4 text-center text-white font-semibold text-sm sm:text-base">
                                        Status
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-sm sm:text-base">
                                        Exercício
                                    </th>
                                    <th className="w-20 sm:w-24 px-3 sm:px-6 py-3 sm:py-4 text-center text-white font-semibold text-sm sm:text-base">
                                        Nível
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {/* Exercícios Recomendados */}
                                {recommendedExercises.map((exercise) => (
                                    <ExerciseRow
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                ))}
                                {/* Outros Exercícios */}
                                {regularExercises.map((exercise) => (
                                    <ExerciseRow
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                ))}
                                {/* Sem resultados */}
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
                </div>
            </div>
        </div>
    );
}