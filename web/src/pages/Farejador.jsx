import { useParams } from 'react-router-dom';
import DevDog from '../assets/sentado.svg';
import SpeechBubble from '../components/SpeechBubble';

export default function Farejador() {
    const { id } = useParams();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <SpeechBubble tailSide="bottom">
                    <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                        🐕 Farejando exercício {id}...
                    </p>
                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                        Em breve você poderá analisar este exercício!
                    </p>
                </SpeechBubble>
                <img
                    src={DevDog}
                    alt="DevDog"
                    className="w-32 sm:w-40 lg:w-48 object-contain mt-6"
                />
            </div>
        </div>
    );
}