import { FaSearch } from 'react-icons/fa';

export default function SearchAndFilter({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Pesquisar...",
    selectedFilter,
    onFilterChange,
    filterOptions = [],
    filterLabels = {},
    filterColors = {}
}) {
    // Cores padrão para os filtros
    const defaultColors = {
        default: 'bg-orange-500 text-white shadow-md',
        inactive: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
    };

    const getFilterColor = (filterValue) => {
        if (selectedFilter !== filterValue) return defaultColors.inactive;
        return filterColors[filterValue] || defaultColors.default;
    };

    return (
        <div className="mb-6 sm:mb-8 space-y-4">
            {/* Barra de pesquisa */}
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 text-sm sm:text-base" />
                <input
                    type="text"
                    name="search"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Filtros */}
            {filterOptions.length > 0 && (
                <div className="flex gap-2 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => onFilterChange(option)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${getFilterColor(option)}`}
                        >
                            {filterLabels[option] || option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}