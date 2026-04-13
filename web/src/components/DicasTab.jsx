import { useState } from 'react';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { FaLightbulb, FaLock, FaCheck, FaSpinner, FaTimes, FaUnlock } from 'react-icons/fa';
import petiscosPoteVazio from '../assets/dicaVazio.svg';
import petiscosPoteUm from '../assets/dicaUm.svg';
import petiscosPoteDois from '../assets/dicaDois.svg';
import petiscosPoteTres from '../assets/dicaTres.svg';
import Tooltip from './Tooltip';

const TIP_STAGES = {
    LINES_COUNT: 1,
    SMELL_TYPES: 2,
    SPECIFIC_LINE: 3
};

export default function DicasTab({ exerciseId, tips, setTips }) {
    const { token } = useAuth();
    const { user, refreshUser } = useUser();
    const [loading, setLoading] = useState(false);

    const getCurrentTipStage = () => {
        if (tips.smellyLine !== null) return 3;
        if (tips.smellsCount !== null) return 2;
        if (tips.linesCount !== null) return 1;
        return 0;
    };

    const currentTipStage = getCurrentTipStage();

    const fetchTip = async (stage) => {
        if (loading || stage > 3) return;

        setLoading(true);
        try {
            const { getTip } = ApiService(token);
            const response = await getTip(exerciseId, stage);

            if (stage === TIP_STAGES.LINES_COUNT) {
                setTips(prev => ({ ...prev, linesCount: response.data.tip.linesCount }));
            } else if (stage === TIP_STAGES.SMELL_TYPES) {
                setTips(prev => ({ ...prev, smellsCount: response.data.tip.smellsCount }));
            } else if (stage === TIP_STAGES.SPECIFIC_LINE) {
                setTips(prev => ({ ...prev, smellyLine: response.data.tip.smellyLine }));
            }

            await refreshUser(); //TODO: Otimizar

        } catch (error) {
            console.error('Erro ao buscar dica:', error);
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    const getPoteImage = () => {
        if (currentTipStage === 0) return petiscosPoteVazio;
        if (currentTipStage === 1) return petiscosPoteUm;
        if (currentTipStage === 2) return petiscosPoteDois;
        return petiscosPoteTres;
    };

    const hasEnoughCoins = user?.coins >= 1;
    const isTipUnlocked = (stage) => currentTipStage >= stage;

    const availableTips = [
        { id: 1, title: 'Quantas linhas têm mau cheiro?', value: tips.linesCount, icon: '📊', visible: tips.linesCount !== null },
        { id: 2, title: 'Quais tipos de mau cheiro existem?', value: tips.smellsCount, icon: '🎯', visible: tips.smellsCount !== null },
        { id: 3, title: 'Uma linha específica', value: tips.smellyLine, icon: '📍', visible: tips.smellyLine !== null }
    ];

    const visibleTips = availableTips.filter(tip => tip.visible);
    return (
        <div className="overflow-auto h-full p-5 space-y-4">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div>
                        <h4 className="text-md font-semibold text-neutral-800 dark:text-neutral-200">
                            Dicas do DevDog
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {hasEnoughCoins ? `${user?.coins} petisco(s) disponível(is)` : 'Sem petiscos suficientes'}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Tooltip text="Use um petisco para obter uma dica">
                        <button
                            onClick={() => fetchTip(currentTipStage + 1)}
                            disabled={loading || currentTipStage >= 3 || !hasEnoughCoins}
                            className="group relative disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none animate-bounce"
                        >
                            <img
                                src={getPoteImage()}
                                alt="Petiscos"
                                className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-200"
                            />
                            {!hasEnoughCoins && currentTipStage < 3 && (
                                <div className="absolute -top-1 -right-1">
                                    <FaLock size={16} className="text-neutral-500" />
                                </div>
                            )}
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Progresso das dicas */}
            <div className="space-y-2">
                <div className="flex items-center gap-1">
                    {[1, 2, 3].map((stage) => (
                        <div
                            key={stage}
                            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${isTipUnlocked(stage)
                                ? 'bg-linear-to-r from-amber-400 to-orange-500'
                                : 'bg-neutral-200 dark:bg-neutral-700'
                                }`}
                        />
                    ))}
                </div>

                <div className="flex justify-between text-xs">
                    {[1, 2, 3].map((stage) => (
                        <div
                            key={stage}
                            className={`flex items-center gap-1 transition-colors ${isTipUnlocked(stage)
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-neutral-400 dark:text-neutral-600'
                                }`}
                        >
                            {isTipUnlocked(stage) ? (
                                <FaUnlock size={12} />
                            ) : (
                                <FaLock size={12} />
                            )}
                            <span className="text-md font-medium">
                                Dica {stage}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista de todas as dicas desbloqueadas */}
            {visibleTips.length > 0 && (
                <div className="space-y-2">
                    {visibleTips.map((tip) => (
                        <div
                            key={tip.id}
                            className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800"
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-lg">{tip.icon}</span>
                                <div className="flex-1">
                                    <h5 className="text-xs font-medium text-amber-700 dark:text-amber-300">
                                        Dica {tip.id}
                                    </h5>
                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                                        {tip.id === 1 && `Este exercício tem ${tip.value} linha(s) com mau cheiro`}
                                        {tip.id === 2 && `Este exercício tem ${tip.value} tipo(s) diferente(s) de mau cheiro`}
                                        {tip.id === 3 && `Uma das linhas com mau cheiro é a linha ${tip.value}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Estado vazio (sem dicas) */}
            {visibleTips.length === 0 && (
                <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-xl p-4 text-center border border-dashed border-neutral-200 dark:border-neutral-600">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <FaSpinner className="animate-spin text-amber-500" size={16} />
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                Buscando dica...
                            </span>
                        </div>
                    ) : (
                        <>
                            {currentTipStage >= 3 ? (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    🎉 Você já usou todas as dicas deste exercício!
                                </p>
                            ) : !hasEnoughCoins ? (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    🦴 Você não tem petiscos suficientes para subornar o DevDog
                                </p>
                            ) : (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    💡 Clique no pote para receber sua primeira dica
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}