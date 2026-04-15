import { useState, useEffect } from 'react';
import { FaChartBar, FaTrophy, FaUsers, FaMedal, FaUser } from 'react-icons/fa';
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

    return (
        <div className="overflow-auto h-full p-5 space-y-5">
            {/* Ranking */}
            {stats.myStats.hasAttempts && stats.ranking && (
                <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Sua posição</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                    #{stats.ranking.position}
                                </span>
                                <span className="text-sm text-neutral-500">
                                    de {stats.ranking.total}
                                </span>
                            </div>
                        </div>
                        <FaMedal className="text-4xl text-orange-400 opacity-50" />
                    </div>
                </div>
            )}

            {/* Minhas estatísticas */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <FaUser size={14} /> Minhas estatísticas
                </h3>

                {!stats.myStats.hasAttempts ? (
                    <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                        <p className="text-sm">Você ainda não tentou este exercício</p>
                        <p className="text-xs mt-1">Complete uma tentativa para ver suas estatísticas</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-neutral-600 dark:text-neutral-400">Identificação de linhas</span>
                                <span className="font-medium text-teal-600 dark:text-teal-400">
                                    {stats.myStats.linesAccuracy}%
                                </span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div
                                    className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${stats.myStats.linesAccuracy}%` }}
                                />
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                                {stats.myStats.bestLines} linha(s) identificada(s)
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-neutral-600 dark:text-neutral-400">Classificação de smells</span>
                                <span className="font-medium text-teal-600 dark:text-teal-400">
                                    {stats.myStats.smellsAccuracy}%
                                </span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div
                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${stats.myStats.smellsAccuracy}%` }}
                                />
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                                {stats.myStats.bestSmells} tipo(s) de mau cheiro identificado(s)
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-xl p-3 text-center">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Tentativas</p>
                            <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                {stats.myStats.attemptsCount}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Estatísticas da comunidade */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <FaUsers size={14} /> Estatísticas da comunidade
                </h3>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-neutral-600 dark:text-neutral-400">Média de acertos (linhas)</span>
                            <span className="font-medium text-teal-600 dark:text-teal-400">
                                {stats.communityStats.avgLinesAccuracy}%
                            </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <div
                                className="bg-teal-500/70 h-2 rounded-full"
                                style={{ width: `${stats.communityStats.avgLinesAccuracy}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-neutral-600 dark:text-neutral-400">Média de acertos (smells)</span>
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                {stats.communityStats.avgSmellsAccuracy}%
                            </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <div
                                className="bg-indigo-500/70 h-2 rounded-full"
                                style={{ width: `${stats.communityStats.avgSmellsAccuracy}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                {stats.communityStats.totalParticipants}
                            </p>
                            <p className="text-xs text-neutral-500">participantes</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                {stats.communityStats.totalAttempts}
                            </p>
                            <p className="text-xs text-neutral-500">tentativas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparativo motivacional */}
            {stats.myStats.hasAttempts && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <FaTrophy className="text-orange-600 dark:text-orange-400" />
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                            {stats.myStats.linesAccuracy > stats.communityStats.avgLinesAccuracy ?
                                "Você está acima da média em identificação de linhas!" :
                                stats.myStats.linesAccuracy === stats.communityStats.avgLinesAccuracy ?
                                    "Você está na média da comunidade!" :
                                    "Continue praticando para melhorar sua pontuação!"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}