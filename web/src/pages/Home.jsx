import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaPaw, FaSearch, FaGraduationCap } from 'react-icons/fa';
import DevDogGuia from '../assets/guia.svg';
import DevDogFarejador from '../assets/farejador.svg';
import SpeechBubble from '../components/SpeechBubble';

export default function Home() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');

    const slides = [
        {
            id: 'farejador',
            title: 'Farejador',
            image: DevDogFarejador,
            icon: FaSearch,
            borderColor: 'orange',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-50 to-red-50',
            buttonColor: 'from-orange-500 to-red-500',
            buttonText: 'Farejar Código',
            description: (
                <>
                    <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-300 mb-3">
                        Ei, dev! Eu sou o DevDog, o melhor amigo do desenvolvedor!
                    </p>
                    <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
                        <p>Eu posso te ajudar de duas formas: como Farejador e como Guia!</p>
                        <p>No modo <span className="font-semibold text-orange-600">Guia</span>, eu te ensino as boas práticas pra você dominar o código limpo e evitar esses cheiros no futuro!</p>
                        <p>Já no modo <span className="font-semibold text-orange-600">Farejador</span>, eu uso meu faro de cão detetive pra encontrar os problemas escondidos no seu código.</p>
                        <p className="font-semibold text-orange-600 mt-3">Agora estou no modo Farejador!</p>
                        <p>Aqui, eu te ajudo a treinar seu faro de dev, mostrando exemplos de mau cheiros de código e te desafiando a encontrá-los.</p>
                        <p>Pronto pra testar seu faro e ver se você é bom de olfato?</p>
                        <p className="font-semibold mt-2">Clique em "Farejar Código" e vamos investigar juntos!</p>
                    </div>
                </>
            ),
            action: () => navigate('/farejador')
        },
        {
            id: 'guia',
            title: 'Guia',
            image: DevDogGuia,
            icon: FaGraduationCap,
            borderColor: 'teal',
            color: 'from-teal-500 to-indigo-500',
            bgColor: 'from-teal-50 to-indigo-50',
            buttonColor: 'from-teal-500 to-indigo-500',
            buttonText: 'Guia de Maus Cheiros',
            description: (
                <>
                    <p className="text-base sm:text-lg font-semibold text-teal-800 dark:text-teal-300 mb-3">
                        Ei, dev! Eu sou o DevDog, o melhor amigo do desenvolvedor!
                    </p>
                    <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
                        <p>Eu posso te ajudar de duas formas: como Farejador e como Guia!</p>
                        <p>No modo <span className="font-semibold text-teal-600">Guia</span>, eu te ensino as boas práticas pra você dominar o código limpo e evitar esses cheiros no futuro!</p>
                        <p>Já no modo <span className="font-semibold text-teal-600">Farejador</span>, eu uso meu faro de cão detetive pra encontrar os problemas escondidos no seu código.</p>
                        <p className="font-semibold text-teal-600 mt-3">Agora estou no modo Guia!</p>
                        <p>Aqui, eu viro seu companheiro de aprendizado e te explico o que são os maus cheiros de código, como resolvê-los e te passo dicas pra deixar tudo limpinho e eficiente.</p>
                        <p>Bora aprender comigo?</p>
                        <p className="font-semibold mt-2">Clique em "Guia de Maus Cheiros" e descubra o caminho do código limpo!</p>
                    </div>
                </>
            ),
            action: () => navigate('/guia')
        }
    ];

    // Controle do carrossel
    const nextSlide = useCallback(() => {
        setSlideDirection('right');
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setSlideDirection('left');
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Autoplay do carrossel
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 10000); // Muda a cada 10 segundos

        return () => clearInterval(interval);
    }, [autoplay, nextSlide]);

    const handleMouseEnter = () => setAutoplay(false);
    const handleMouseLeave = () => setAutoplay(true);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center justify-center space-x-2 mb-4">
                    <FaPaw className="text-orange-500 text-3xl sm:text-4xl animate-bounce" />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        DevDog
                    </h1>
                </div>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                    O melhor amigo do desenvolvedor!
                </p>
            </div>

            {/* Carrossel */}
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Setas de navegação */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 bg-white dark:bg-neutral-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-neutral-200 dark:border-neutral-700"
                    aria-label="Anterior"
                >
                    <FaArrowLeft className="text-orange-500 text-sm sm:text-base" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 bg-white dark:bg-neutral-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-neutral-200 dark:border-neutral-700"
                    aria-label="Próximo"
                >
                    <FaArrowRight className="text-orange-500 text-sm sm:text-base" />
                </button>

                {/* Container do carrossel */}
                <div className="overflow-hidden">
                    <div
                        className={`flex transition-transform duration-500 ease-in-out ${slideDirection === 'right' ? 'animate-slide-right' : 'animate-slide-left'
                            }`}
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                className="w-full shrink-0"
                            >
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 px-4 sm:px-8">
                                    {/* SpeechBubble com o conteúdo */}
                                    <div className="flex-1 max-w-2xl">
                                        <SpeechBubble tailSide="right" color={slide.borderColor}>
                                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-linear-to-r ${slide.color} text-white text-sm mb-4`}>
                                                <slide.icon className="text-sm text-white" />
                                                <span className="font-semibold">Modo {slide.title}</span>
                                            </div>
                                            {slide.description}

                                        </SpeechBubble>
                                    </div>

                                    {/* Imagem do DevDog */}
                                    <div className="shrink-0">
                                        <div className="relative">
                                            <div className={`absolute inset-0 bg-linear-to-r ${slide.color} rounded-full blur-2xl opacity-20 animate-pulse`}></div>
                                            <img
                                                src={slide.image}
                                                alt="DevDog"
                                                className="w-48 sm:w-56 md:w-64 lg:w-72 object-contain relative z-10 hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-black/10 rounded-full blur-md"></div>
                                        </div>
                                        <button
                                            onClick={slide.action}
                                            className={`mt-6 w-full bg-linear-to-r ${slide.buttonColor} text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2`}
                                        >
                                            <slide.icon className="text-white" />
                                            <span>{slide.buttonText}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicadores do carrossel */}
            <div className="flex justify-center space-x-3 mt-8 sm:mt-12">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSlideDirection(index > currentSlide ? 'right' : 'left');
                            setCurrentSlide(index);
                        }}
                        className={`transition-all duration-300 rounded-full ${currentSlide === index
                            ? 'w-8 h-2 bg-orange-500'
                            : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                            }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow group">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        <FaSearch className="mx-auto text-orange-500" />
                    </div>
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-100 mb-1 sm:mb-2">Modo Farejador</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">Se desafie a encontrar problemas no código</p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow group">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        <FaGraduationCap className="mx-auto text-teal-500" />
                    </div>
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-100 mb-1 sm:mb-2">Modo Guia</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">Aprenda sobre maus cheiros de código</p>
                </div>
            </div>
        </div>
    );
}