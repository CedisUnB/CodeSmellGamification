/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { FaClipboard, FaLightbulb, FaChartBar, FaList } from 'react-icons/fa';
import ExerciseTutor from './ExerciseTutor';
import Tabs from './Tabs';
import SobreTab from './SobreTab';
import ClassificacoesTab from './ClassificacoesTab';
import DicasTab from './DicasTab';
import EstatisticasTab from './EstatisticasTab';

const TABS = {
    SOBRE: 'sobre',
    CLASSIFICACOES: 'classificacoes',
    DICAS: 'dicas',
    ESTATISTICAS: 'estatisticas'
};

export default function ExerciseInfo({
    exercise,
    classifiedLines,
    currentState,
    onLineClassification,
    selectedLines,
    tips,
    setTips
}) {
    const [activeTab, setActiveTab] = useState(TABS.SOBRE);
    const tabsConfig = [
        { id: TABS.SOBRE, label: 'Sobre', icon: <FaClipboard size={14} /> },
        { id: TABS.CLASSIFICACOES, label: 'Classificações', icon: <FaList size={14} /> },
        { id: TABS.DICAS, label: 'Dicas', icon: <FaLightbulb size={14} /> },
        { id: TABS.ESTATISTICAS, label: 'Estatísticas', icon: <FaChartBar size={14} /> }
    ];

    // Quando classifiedLines mudar, vai para a aba de Classificações
    useEffect(() => {
        if (classifiedLines.length > 0) {
            setActiveTab(TABS.CLASSIFICACOES);
        }
    }, [classifiedLines]);

    // Agrupa submissões por smell
    const submissionsBySmell = classifiedLines.reduce((acc, sub) => {
        const smellLabel = sub.smell;
        if (!acc[smellLabel]) {
            acc[smellLabel] = [];
        }
        acc[smellLabel].push(sub.line);
        return acc;
    }, {});

    const totalSmellsFound = Object.keys(submissionsBySmell).length;
    const totalLinesFound = classifiedLines.length;


    return (
        <div className="bg-white dark:bg-neutral-800 rounded-l-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 flex flex-col h-220">
            {/* Header com abas */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 px-2">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabsConfig} />
            </div>

            {/* Conteúdo da aba */}
            <div className="flex-1 min-h-0">
                {activeTab === TABS.SOBRE && (
                    <SobreTab
                        exercise={exercise}
                        totalSmellsFound={totalSmellsFound}
                        totalLinesFound={totalLinesFound}
                    />
                )}
                {activeTab === TABS.CLASSIFICACOES && (
                    <ClassificacoesTab submissionsBySmell={submissionsBySmell} />
                )}
                {activeTab === TABS.DICAS && (
                    <DicasTab
                        exerciseId={exercise.id}
                        tips={tips}
                        setTips={setTips}
                    />
                )}
                {activeTab === TABS.ESTATISTICAS && (
                    <EstatisticasTab />
                )}
            </div>

            {/* DevDog com instruções */}
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-700">
                <ExerciseTutor
                    currentState={currentState}
                    onLineClassification={onLineClassification}
                    selectedLines={selectedLines}
                />
            </div>
        </div>
    );
}