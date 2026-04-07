import DevDogFarejando from '../assets/farejando.svg';
import DevDogSentado from '../assets/sentado.svg';
import DevDogPidao from '../assets/pidao.svg';
import SpeechBubble from './SpeechBubble';
import { translate } from '../utils/enumTranslator';

// Estados do DevDog
const DEVDOG_STATES = {
    FAREJANDO: 'farejando',
    SENTADO: 'sentado',
    PIDAO: 'pidao'
};

const SMELL_OPTIONS = [
    { id: "MYSTERIOUS_NAME", color: "bg-orange-500" },
    { id: "DUPLICATED_CODE", color: "bg-orange-500" },
    { id: "LONG_METHOD", color: "bg-orange-500" },
    { id: "LONG_PARAMETER_LIST", color: "bg-orange-500" },
    { id: "GLOBAL_DATA", color: "bg-orange-500" },
    { id: "MUTABLE_DATA", color: "bg-orange-500" },
    { id: "DIVERGENT_CHANGE", color: "bg-orange-500" },
    { id: "SHOTGUN_SURGERY", color: "bg-orange-500" },
    { id: "FEATURE_ENVY", color: "bg-orange-500" },
    { id: "DATA_CLUMPS", color: "bg-orange-500" },
    { id: "PRIMITIVE_OBSESSION", color: "bg-orange-500" },
    { id: "REPEATED_SWITCHES", color: "bg-orange-500" },
    { id: "LAZY_ELEMENT", color: "bg-orange-500" },
    { id: "SPECULATIVE_GENERALITY", color: "bg-orange-500" },
    { id: "TEMPORARY_FIELD", color: "bg-orange-500" },
    { id: "MESSAGE_CHAINS", color: "bg-orange-500" },
    { id: "MIDDLE_MAN", color: "bg-orange-500" },
    { id: "LARGE_CLASS", color: "bg-orange-500" },
    { id: "COMMENTS", color: "bg-orange-500" },
];

export default function ExerciseTutor({ currentState, onLineClassification, selectedLines }) {

    const getDevDogImage = () => {
        switch (currentState) {
            case DEVDOG_STATES.SENTADO:
                return DevDogSentado;
            case DEVDOG_STATES.PIDAO:
                return DevDogPidao;
            default:
                return DevDogFarejando;
        }
    };

    return (

        <div className="mt-6 flex flex-col items-center">
            <SpeechBubble
                quotationMarks={false}
                tailSide="bottom"
            >
                {currentState === DEVDOG_STATES.FAREJANDO && (
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Vamos começar!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Analise o código ao lado e <span className="font-semibold">clique nas linhas</span> que você identificar
                            algum mau cheiro de código.
                        </p>
                    </div>
                )}

                {currentState === DEVDOG_STATES.SENTADO && (
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Opa! Vamos classificar esse mau cheiro.
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mb-4">
                            As linhas <span className="font-bold">{selectedLines.join(', ')}</span> são maus cheiros de que tipo?
                        </p>

                        {/* Container com scroll */}
                        <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {SMELL_OPTIONS.map((smell) => (
                                <button
                                    key={smell.id}
                                    onClick={() => onLineClassification(smell.id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg text-white font-medium ${smell.color} hover:opacity-90 transition-opacity`}
                                >
                                    {translate(smell.id) || smell.id}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentState === DEVDOG_STATES.PIDAO && (
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            Não que eu seja interesseiro mas esses petiscos parecem deliciosos!
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Se quiser te dou uma dica em troca de um deles...
                        </p>
                    </div>
                )}


            </SpeechBubble>

            <img
                src={getDevDogImage()}
                alt="DevDog"
                className="w-32 object-contain mt-4 hover:scale-105 transition-transform duration-300"
            />
        </div>
    )
}