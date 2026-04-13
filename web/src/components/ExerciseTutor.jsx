import { useState } from 'react';
import DevDogFarejando from '../assets/farejando.svg';
import DevDogFarejador from '../assets/farejador.svg';
import DevDogPidao from '../assets/pidao.svg';
import SpeechBubble from './SpeechBubble';
import { translate } from '../utils/enumTranslator';
import { FaPaperPlane } from 'react-icons/fa';

// Estados do DevDog
const DEVDOG_STATES = {
    FAREJANDO: 'farejando',
    FAREJADOR: 'farejador',
    PIDAO: 'pidao'
};

const SMELL_OPTIONS = [
    "MYSTERIOUS_NAME", "DUPLICATED_CODE", "LONG_METHOD", "LONG_PARAMETER_LIST", "GLOBAL_DATA", "MUTABLE_DATA", "DIVERGENT_CHANGE", "SHOTGUN_SURGERY", "FEATURE_ENVY", "DATA_CLUMPS", "PRIMITIVE_OBSESSION", "REPEATED_SWITCHES", "LAZY_ELEMENT", "SPECULATIVE_GENERALITY", "TEMPORARY_FIELD", "MESSAGE_CHAINS", "MIDDLE_MAN", "LARGE_CLASS", "COMMENTS"]

export default function ExerciseTutor({ currentState, onLineClassification, selectedLines }) {
    const [selectedSmell, setSelectedSmell] = useState('');

    const handleSubmit = () => {
        if (selectedSmell) {
            onLineClassification(selectedSmell);
            setSelectedSmell('');
        }
    };

    const getDevDogImage = () => {
        switch (currentState) {
            case DEVDOG_STATES.FAREJADOR:
                return DevDogFarejador;
            case DEVDOG_STATES.PIDAO:
                return DevDogPidao;
            default:
                return DevDogFarejando;
        }
    };

    if (currentState === DEVDOG_STATES.FAREJANDO) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-70">
                <SpeechBubble quotationMarks={false} tailSide="bottom">
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Vamos começar!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Analise o código ao lado e <span className="font-semibold">clique nas linhas</span> que você identificar
                            algum mau cheiro de código.
                        </p>
                    </div>
                </SpeechBubble>
                <img
                    src={getDevDogImage()}
                    alt="DevDog"
                    className="h-20 object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>
        );
    }

    if (currentState === DEVDOG_STATES.FAREJADOR) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-70">
                <SpeechBubble quotationMarks={false} tailSide="bottom">
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Opa! Vamos classificar esse mau cheiro.
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mb-4">{
                            selectedLines.length === 1 ?
                                `A linha ${selectedLines[0]} tem um mau cheiro de que tipo?` :
                                `As linhas ${selectedLines.join(', ')} tem maus cheiros de que tipo?`
                        }</p>

                        <div className="flex">
                            <select
                                value={selectedSmell}
                                onChange={(e) => setSelectedSmell(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                                style={{
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                }}
                            >
                                <option value="">Selecione...</option>
                                {SMELL_OPTIONS.map((smell) => (
                                    <option key={smell} value={smell}>
                                        {translate(smell)}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleSubmit}
                                disabled={!selectedSmell}
                                className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-r-lg font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                            >
                                <FaPaperPlane size={14} /></button>
                        </div>
                    </div>
                </SpeechBubble>
                <img
                    src={getDevDogImage()}
                    alt="DevDog"
                    className="h-30 object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>
        );
    }

    if (currentState === DEVDOG_STATES.PIDAO) {
        return (
            <div className="flex flex-row items-center justify-center gap-2 h-70">
                <img
                    src={getDevDogImage()}
                    alt="DevDog"
                    className="h-48 object-contain hover:scale-105 transition-transform duration-300"
                />
                <SpeechBubble quotationMarks={false} tailSide="left" >
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Esses petiscos parecem deliciosos!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Se quiser te dou uma dica em troca de um deles...<br />
                            Vá até a aba Dicas e clique no pote.
                        </p>
                    </div>
                </SpeechBubble>
            </div>
        );
    }
}