import { useState } from 'react';

export default function Tooltip({ children, text }) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const showTooltip = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
        setIsVisible(true);
    };

    const hideTooltip = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                className="inline-block"
            >
                {children}
            </div>

            {isVisible && (
                <div
                    className="fixed z-50 px-2 py-2 text-sm text-white bg-neutral-800 dark:bg-neutral-700 rounded shadow-lg whitespace-nowrap pointer-events-none"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    {text}
                    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-800 dark:border-t-neutral-700"></div>
                </div>
            )}
        </>
    );
}