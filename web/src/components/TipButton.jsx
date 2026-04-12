import { useState } from 'react';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import petiscosPoteVazio from '../assets/dicaVazio.svg';
import petiscosPoteUm from '../assets/dicaUm.svg';
import petiscosPoteDois from '../assets/dicaDois.svg';
import petiscosPoteTres from '../assets/dicaTres.svg';

const TIP_STAGES = {
    LINES_COUNT: 1,
    SMELL_TYPES: 2,
    SPECIFIC_LINE: 3
};

export default function TipButton({ exerciseId, onSmellsTipReq, onLinesTipReq }) {
    const { token } = useAuth();
    const { user, refreshUser } = useUser();
    const [currentTipStage, setCurrentTipStage] = useState(0);
    const [tips, setTips] = useState({
        linesCount: null,
        smellsCount: null,
        smellyLine: null
    });
    const [loading, setLoading] = useState(false);

    const fetchTip = async (stage) => {
        if (loading) return;

        setLoading(true);
        try {
            const { getTip } = ApiService(token);
            const response = await getTip(exerciseId, stage);

            if (stage === TIP_STAGES.LINES_COUNT) {
                setTips(prev => ({ ...prev, linesCount: response.data.tip.linesCount }));
                onLinesTipReq(response.data.tip.linesCount);
            } else if (stage === TIP_STAGES.SMELL_TYPES) {
                setTips(prev => ({ ...prev, smellsCount: response.data.tip.smellsCount }));
                onSmellsTipReq(response.data.tip.smellsCount);
            } else if (stage === TIP_STAGES.SPECIFIC_LINE) {
                setTips(prev => ({ ...prev, smellyLine: response.data.tip.smellyLine }));
            }

            setCurrentTipStage(stage);
            await refreshUser();

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

    return (
        <div className="flex flex-col gap-3">
            {/* Indicadores de progresso estilo setas */}
            <div className="flex items-center">
                {/* Dica 1 */}
                <div className={`flex-1 relative ${currentTipStage >= 1 ? 'bg-orange-500' : 'bg-neutral-200 dark:bg-neutral-700'} h-10 flex items-center justify-center`}
                    style={{
                        clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                    }}
                >
                    <span className={`text-sm font-medium ${currentTipStage >= 1 ? 'text-white' : 'text-neutral-500'}`}>
                        Dica 1
                    </span>
                </div>

                {/* Dica 2 */}
                <div className={`flex-1 relative -ml-4 ${currentTipStage >= 2 ? 'bg-orange-500' : 'bg-neutral-200 dark:bg-neutral-700'} h-10 flex items-center justify-center`}
                    style={{
                        clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                    }}
                >
                    <span className={`text-sm font-medium ${currentTipStage >= 2 ? 'text-white' : 'text-neutral-500'}`}>
                        Dica 2
                    </span>
                </div>

                {/* Dica 3 */}
                <div className={`flex-1 relative -ml-4 ${currentTipStage >= 3 ? 'bg-orange-500' : 'bg-neutral-200 dark:bg-neutral-700'} h-10 flex items-center justify-center`}
                    style={{
                        clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                    }}
                >
                    <span className={`text-sm font-medium ${currentTipStage >= 3 ? 'text-white' : 'text-neutral-500'}`}>
                        Dica 3
                    </span>
                </div>

                {/* Botão do pote */}
                <button
                    onClick={() => fetchTip(currentTipStage + 1)}
                    disabled={loading || currentTipStage >= 3 || !hasEnoughCoins}
                    className="ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <img
                        src={getPoteImage()}
                        alt="Petisco"
                        className="w-10 h-10 object-contain hover:scale-110 transition-transform"
                    />
                </button>
            </div>

            {/* Mensagem da dica */}
            <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3 min-h-15">
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        {tips.linesCount && (
                            <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                Este exercício tem <span className="font-bold text-orange-600">{tips.linesCount}</span> linha(s) com mau cheiro
                            </p>
                        )}
                        {tips.smellsCount && (
                            <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                Este exercício tem <span className="font-bold text-orange-600">{tips.smellsCount}</span> tipo(s) diferente(s) de mau cheiro
                            </p>
                        )}
                        {tips.smellyLine && (
                            <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                Uma das linhas com mau cheiro é a <span className="font-bold text-orange-600">linha {tips.smellyLine}</span>
                            </p>
                        )}
                        {!tips.linesCount && !tips.smellsCount && !tips.smellyLine && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                                {currentTipStage >= 3
                                    ? "Todas as dicas foram usadas!"
                                    : !hasEnoughCoins
                                        ? `Você precisa de pelo menos um petisco para desbloquear uma dica (você tem ${user?.coins || 0})`
                                        : "Clique no pote de petiscos para desbloquear uma dica"}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}