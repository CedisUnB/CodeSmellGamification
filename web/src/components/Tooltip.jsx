import { useState } from 'react';

export default function Tooltip({ children, text, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const showTooltip = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCoords({
            x: rect.left + rect.width / 2,
            y: position === 'top' ? rect.top - 10 : rect.bottom + 10
        });
        setIsVisible(true);
    };

    const hideTooltip = () => setIsVisible(false);

    const isTop = position === 'top';

    return (
        <>
            <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                {children}
            </div>

            {isVisible && (
                <div
                    className="fixed z-50 px-4 py-2 text-md text-neutral-200 bg-neutral-800 dark:bg-neutral-700 rounded-xl shadow-lg whitespace-nowrap pointer-events-none"
                    style={{
                        left: `${coords.x}px`,
                        top: `${coords.y}px`,
                        transform: isTop ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
                    }}
                >
                    {text}
                    <div
                        className={`absolute left-1/2 w-0 h-0 ${
                            isTop
                                ? 'bottom-0 transform -translate-x-1/2 translate-y-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-neutral-800 dark:border-t-neutral-700'
                                : 'top-0 transform -translate-x-1/2 -translate-y-full border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-neutral-800 dark:border-b-neutral-700'
                        }`}
                    />
                </div>
            )}
        </>
    );
}