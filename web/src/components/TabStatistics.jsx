import { useState, useEffect } from 'react';
import { FaChartBar, FaTrophy, FaUsers, FaMedal, FaUser, FaStar, FaCrown, FaAward } from 'react-icons/fa';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../contexts/AuthContext';

export default function TabStatistics({ exerciseId }) {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const { getStatistics } = ApiService(token);
                const { data } = await getStatistics(exerciseId);
                setStats(data);
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [exerciseId, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="h-full flex items-center justify-center p-5">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                    <FaChartBar size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Nenhuma estatística disponível</p>
                </div>
            </div>
        );
    }

    const getRankIcon = (position) => {
        if (position === 1) return <FaCrown className="text-yellow-500 text-xl" />;
        if (position === 2) return <FaMedal className="text-gray-400 text-xl" />;
        if (position === 3) return <FaAward className="text-amber-600 text-xl" />;
        return null;
    };

    return (
        <div className="overflow-auto h-full p-5 space-y-5">
            {/* Minha posição */}
            {stats.myStats.hasAttempts && stats.myStats.rank && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Sua posição</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        #{stats.myStats.rank}
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        de {stats.communityStats.totalParticipants}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {getRankIcon(stats.myStats.rank)}
                    </div>
                </div>
            )}

            {/* Minhas estatísticas */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <FaUser size={14} className="text-teal-500" />
                    <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Minhas estatísticas</h3>
                </div>

                {!stats.myStats.hasAttempts ? (
                    <div className="text-center py-8 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-700/30 rounded-xl">
                        <p className="text-sm">Você ainda não tentou resolver este exercício</p>
                        <p className="text-xs mt-1">Faça uma tentativa para ver suas estatísticas</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-neutral-800 rounded-xl p-3 text-center border border-neutral-200 dark:border-neutral-700 shadow-sm">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Tentativas</p>
                            <p className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                                {stats.myStats.attemptsCount}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-neutral-800 rounded-xl p-3 text-center border border-neutral-200 dark:border-neutral-700 shadow-sm">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Melhor resultado</p>
                            <div className="flex items-center justify-center gap-1">
                                <p className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {stats.myStats.bestScore}
                                </p>
                                <span className="text-xs text-neutral-500">%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Estatísticas da comunidade */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <FaUsers size={14} className="text-teal-500" />
                    <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Estatísticas da comunidade</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl  border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <div className="flex items-center flex-col justify-between p-3">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">Total de participantes</span>
                            <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {stats.communityStats.totalParticipants}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-xl  border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <div className="flex items-center flex-col justify-between p-3">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">Resultado médio</span>
                            <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {stats.communityStats.avgScore}
                                </span>
                                <span className="text-xs text-neutral-500">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}