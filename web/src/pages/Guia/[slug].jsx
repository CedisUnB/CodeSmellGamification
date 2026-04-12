import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaw } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { parseFrontmatter } from '../../utils/markdownParser';
import { usePetiscoGame } from '../../hooks/usePetiscoGame';
import FloatingPetisco from '../../components/FloatingPetisco';
import MarkdownComponents from '../../utils/markdownStyles';

const guideModules = import.meta.glob('/src/content/*.md', {
    query: '?raw',
    import: 'default',
    eager: false
});

const categoryConfig = {
    'bloaters': { label: 'Inchados', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    'object-orientation-abusers': { label: 'Abusos de Orientação a Objetos', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    'change-preventers': { label: 'Prevenidores de Mudança', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    'dispensables': { label: 'Descartáveis', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    'couplers': { label: 'Acopladores', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    'other-smells': { label: 'Outros Maus Cheiros', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' }
};


export default function GuiaDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { petiscos, collectPetisco, stopGame, startGame } = usePetiscoGame();

    useEffect(() => {
        async function loadGuide() {
            setLoading(true);
            setError(null);

            const filePath = `/src/content/${slug}.md`;
            const loadModule = guideModules[filePath];

            if (!loadModule) {
                setError('Guia não encontrado');
                setLoading(false);
                return;
            }

            try {
                const content = await loadModule();
                const { data, content: markdownContent } = parseFrontmatter(content);

                setGuide({
                    title: data.title || slug.replace(/-/g, ' '),
                    description: data.description || '',
                    category: data.category || 'other-smells',
                    content: markdownContent
                });

                startGame(); // Inicia o jogo de encontre o pestisco
            } catch (error) {
                console.error('Erro ao carregar guia:', error);
                setError('Erro ao carregar o conteúdo do guia');
            } finally {
                setLoading(false);
            }
        }

        loadGuide();

        return () => {
            stopGame(); // Para o jogo de encontre o pestisco
        };
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
                <p className="text-neutral-500 mt-4">Carregando guia...</p>
            </div>
        );
    }

    if (error || !guide) {
        return (
            <div className="text-center py-20">
                <FaPaw className="text-teal-500 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">{error || 'Guia não encontrado'}</h2>
                <p className="text-neutral-500 mb-4">O conteúdo que você procura não está disponível</p>
                <button
                    onClick={() => navigate('/guia')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                    <FaArrowLeft /> Voltar para guias
                </button>
            </div>
        );
    }

    const category = categoryConfig[guide.category] || {
        label: guide.category,
        color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 relative">
            {petiscos.map(petisco => (
                <FloatingPetisco
                    key={petisco.id}
                    position={petisco.position}
                    onCollect={() => collectPetisco(petisco.id)}
                />
            ))}

            <button
                onClick={() => navigate('/guia')}
                className="flex items-center gap-2 text-neutral-600 hover:text-teal-500 mb-6 transition-colors group"
            >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Voltar para guias
            </button>

            {/* Conteúdo principal */}
            <article className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 md:p-8">
                {/* Header com categoria */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`text-xs px-3 py-1 rounded-full ${category.color}`}>
                        {category.label}
                    </span>
                </div>

                {/* Título */}
                <h1 className="text-2xl md:text-3xl font-bold linear text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-600 mb-4">
                    {guide.title}
                </h1>

                {/* Descrição */}
                {guide.description && (
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                        {guide.description}
                    </p>
                )}

                {/* Conteúdo Markdown */}
                <div className="prose prose-teal dark:prose-invert max-w-none">
                    <ReactMarkdown components={MarkdownComponents}>
                        {guide.content}
                    </ReactMarkdown>
                </div>
            </article>

        </div>
    );
}