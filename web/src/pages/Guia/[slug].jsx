import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaw } from 'react-icons/fa';
import { parseFrontmatter } from '../../utils/markdownParser';
import { usePetiscoGame } from '../../hooks/usePetiscoGame';
import FloatingPetisco from '../../components/FloatingPetisco';
import NotFound from '../NotFound';
import { getAlternateColor } from '../../utils/colorizer';
import { translate } from '../../utils/enumTranslator';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const guideModules = import.meta.glob('/src/content/*.md', {
    query: '?raw',
    import: 'default',
    eager: false
});

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
                <p className="text-neutral-500 mt-4">Carregando...</p>
            </div>
        );
    }

    if (error || !guide) {
        return <NotFound />;
    }

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
            <article className="p-6 md:p-8">
                {/* Título e categoria */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-600">
                        {guide.title}
                    </h1>
                    <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${getAlternateColor(guide.category)}`}>
                        {translate(guide.category)}
                    </span>
                </div>

                {/* Descrição */}
                {guide.description && (
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                        {guide.description}
                    </p>
                )}

                {/* Conteúdo Markdown */}
                <div className="prose prose-teal dark:prose-invert max-w-none">
                    <MarkdownRenderer content={guide.content} />
                </div>
            </article>

        </div>
    );
}