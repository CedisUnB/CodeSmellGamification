export default function SpeechBubble({
    children,
    className = "",
    color = "orange", // 'orange' ou 'teal'
    tailSide = "bottom" // 'top', 'bottom', 'left', 'right'
}) {
    const colorClasses = {
        orange: {
            border: "border-orange-300 dark:border-orange-700",
            text: "text-orange-300 dark:text-orange-700",
        },
        teal: {
            border: "border-teal-300 dark:border-teal-700",
            text: "text-teal-300 dark:text-teal-700",
        }
    };

    const colors = colorClasses[color];

    // Define as classes da cauda baseado no lado
    const getTailClasses = () => {
        const baseClasses = `absolute w-4 h-4 bg-white dark:bg-neutral-800 rotate-45`;
        
        switch(tailSide) {
            case 'top':
                return `${baseClasses} -top-4 left-1/2 transform -translate-x-1/2 border-t-2 border-l-2 ${colors.border}`;
            case 'bottom':
                return `${baseClasses} -bottom-4 left-1/2 transform -translate-x-1/2 border-b-2 border-r-2 ${colors.border}`;
            case 'left':
                return `${baseClasses} -left-4 top-1/2 transform -translate-y-1/2 border-l-2 border-b-2 ${colors.border}`;
            case 'right':
                return `${baseClasses} -right-4 top-1/2 transform -translate-y-1/2 border-r-2 border-t-2 ${colors.border}`;
            default:
                return `${baseClasses} -bottom-4 left-1/2 transform -translate-x-1/2 border-b-2 border-r-2 ${colors.border}`;
        }
    };

    return (
        <div className={`flex ${className}`}>
            {/* Balão de fala */}
            <div className={`relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 border-2 ${colors.border} max-w-2xl`}>
                {/* Cauda do balão */}
                <div className={getTailClasses()}></div>
                
                {/* Aspas superiores */}
                <div className={`text-4xl ${colors.text} mb-2 leading-none`}>"</div>
                
                {/* Conteúdo */}
                <div className="text-neutral-700 dark:text-neutral-300">
                    {children}
                </div>
                
                {/* Aspas inferiores */}
                <div className={`text-4xl ${colors.text} text-right mt-2 leading-none`}>"</div>
            </div>
        </div>
    );
}