export default function SpeechBubble({
    children,
    className = "",
    tailSide = "bottom" // 'top', 'bottom', 'left', 'right'
}) {
    // Define as classes da cauda baseado no lado
    const getTailClasses = () => {
        switch(tailSide) {
            case 'top':
                return "absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-800 border-t-2 border-l-2 border-orange-300 dark:border-orange-700 rotate-45";
            case 'bottom':
                return "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-800 border-b-2 border-r-2 border-orange-300 dark:border-orange-700 rotate-45";
            case 'left':
                return "absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-neutral-800 border-l-2 border-b-2 border-orange-300 dark:border-orange-700 rotate-45";
            case 'right':
                return "absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-neutral-800 border-r-2 border-t-2 border-orange-300 dark:border-orange-700 rotate-45";
            default:
                return "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-800 border-b-2 border-r-2 border-orange-300 dark:border-orange-700 rotate-45";
        }
    };

    return (
        <div className={`flex ${className}`}>
            {/* Balão de fala */}
            <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 border-2 border-orange-300 dark:border-orange-700 max-w-2xl">
                {/* Cauda do balão */}
                <div className={getTailClasses()}></div>
                
                {/* Aspas superiores */}
                <div className="text-4xl text-orange-300 dark:text-orange-700 mb-2 leading-none">"</div>
                
                {/* Conteúdo */}
                <div className="text-neutral-700 dark:text-neutral-300">
                    {children}
                </div>
                
                {/* Aspas inferiores */}
                <div className="text-4xl text-orange-300 dark:text-orange-700 text-right mt-2 leading-none">"</div>
            </div>
        </div>
    );
}