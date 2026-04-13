import { FaChartBar } from 'react-icons/fa';

export default function TabStatistics() {
    return (
        <div className="h-full flex items-center justify-center p-5">
            <div className="text-center text-neutral-500 dark:text-neutral-400">
                <FaChartBar size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Em breve</p>
                <p className="text-xs mt-1">Estatísticas de desempenho serão exibidas aqui</p>
            </div>
        </div>
    );
}