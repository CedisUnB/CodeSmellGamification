import { useState } from 'react';
import petiscoIcon from '../assets/petisco.svg';

export default function FloatingPetisco({ onCollect, position }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = async () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setIsVisible(false);

        try {
            await onCollect();
        } catch (error) {
            console.error('Erro ao coletar petisco:', error);
            setIsVisible(true);
        } finally {
            setIsAnimating(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed cursor-pointer z-40 animate-bounce"
            style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
            }}
            onClick={handleClick}
        >
            <div className="relative group">
                <img
                    src={petiscoIcon}
                    alt="Petisco"
                    className="w-8 h-8 transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
        </div>
    );
}