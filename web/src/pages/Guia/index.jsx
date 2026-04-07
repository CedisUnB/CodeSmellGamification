import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { parseFrontmatter } from '../../utils/markdownParser';
import SearchAndFilter from '../../components/SearchAndFilter';
import SpeechBubble from '../../components/SpeechBubble';
import DevDog from '../../assets/sentado.svg';

// TODO: Colocar artigos no banco e fazer get deles
const guideModules = import.meta.glob('/src/content/*.md', {
    query: '?raw',
    import: 'default',
    eager: false
});

export default function GuiaList() {
    const [guides, setGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('categoria') || 'todos'
    );

    useEffect(() => {
        async function loadGuides() {
            const loadedGuides = [];

            for (const [path, loadModule] of Object.entries(guideModules)) {
                try {
                    const content = await loadModule();
                    const { data } = parseFrontmatter(content);

                    const slug = path.split('/').pop().replace('.md', '');

                    loadedGuides.push({
                        slug,
                        title: data.title || slug.replace(/-/g, ' '),
                        description: data.description || '',
                        category: data.category || 'other-smells',
                        icon: data.icon || '📚',
                        ...data
                    });
                } catch (error) {
                    console.error('Erro ao carregar:', path, error);
                }
            }

            setGuides(loadedGuides);
        }

        loadGuides();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'todos') {
            setSearchParams({});
        } else {
            setSearchParams({ categoria: category });
        }
    };

    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'todos' || guide.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categoryOptions = [
        'todos',
        'bloaters',
        'object-orientation-abusers',
        'change-preventers',
        'dispensables',
        'couplers',
        'other-smells'
    ];

    const categoryLabels = {
        'todos': 'Todos',
        'bloaters': 'Inchados',
        'object-orientation-abusers': 'Abusos de Orientação a Objetos',
        'change-preventers': 'Prevenidores de Mudança',
        'dispensables': 'Descartáveis',
        'couplers': 'Acopladores',
        'other-smells': 'Outros Maus Cheiros'
    };

    const categoryColors = {
        'todos': 'bg-teal-600 text-white shadow-md',
        'bloaters': 'bg-green-600 text-white shadow-md',
        'object-orientation-abusers': 'bg-blue-500 text-white shadow-md',
        'change-preventers': 'bg-red-500 text-white shadow-md',
        'dispensables': 'bg-purple-500 text-white shadow-md',
        'couplers': 'bg-yellow-500 text-white shadow-md',
        'other-smells': 'bg-orange-500 text-white shadow-md'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {/* Titulo */}
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-4">
                    Guia de Maus Cheiros
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                    Aprenda a identificar e corrigir os principais code smells
                </p>
            </div>

            {/* Barra de pesquisa e Filtros */}
            <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Pesquisar mau cheiro por nome ou descrição..."
                selectedFilter={selectedCategory}
                onFilterChange={handleCategoryChange}
                filterOptions={categoryOptions}
                filterLabels={categoryLabels}
                filterColors={categoryColors}
            />

            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
                {/* Mensagem do DevDog */}
                <div className="lg:w-1/3 xl:w-1/4 flex flex-col items-center space-y-4 sm:space-y-6">
                    <SpeechBubble tailSide="bottom" color='teal'>
                        <p className="text-base sm:text-lg font-semibold text-teal-800 dark:text-teal-300 mb-2">
                            Vamos aprender sobre os maus cheiros de código?
                        </p>
                        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                            Escolha um tipo de mau cheiro e tenha uma boa leitura!
                            Fique de olho nos petiscos escondidos por aí... Minha fome só aumenta enquanto você estuda!
                        </p>
                    </SpeechBubble>
                    <img
                        src={DevDog}
                        alt="DevDog"
                        className="w-32 sm:w-40 lg:w-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Grid de guias */}
                <div className="lg:w-2/3 xl:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGuides.map(guide => (
                            <Link
                                key={guide.slug}
                                to={`/guia/${guide.slug}`}
                                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-neutral-200 dark:border-neutral-700 hover:border-teal-500"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-3xl group-hover:scale-110 transition-transform">
                                        {guide.icon}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[guide.category] || 'bg-gray-500 text-white shadow-md'}`}>
                                        {categoryLabels[guide.category] || guide.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                    {guide.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                                    {guide.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Sem resultados */}
                    {filteredGuides.length === 0 && guides.length > 0 && (
                        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                            <FaBook className="mx-auto text-3xl sm:text-4xl mb-2 opacity-50" />
                            <p className="text-sm sm:text-base">Nenhum guia encontrado</p>
                            <p className="text-xs sm:text-sm">Tente ajustar sua pesquisa ou filtros</p>
                        </div>
                    )}

                    {/* Loading enquanto carrega */}
                    {guides.length === 0 && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
                            <p className="text-sm text-neutral-500 mt-4">Carregando guias...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}