import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange,
    color = "orange" // 'orange' ou 'teal'
}) {
    if (totalPages <= 1) return null;

    const getColorClasses = () => {
        return color === 'orange' 
            ? 'bg-orange-500 text-white' 
            : 'bg-teal-500 text-white';
    };

    const renderPageButton = (page) => (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                    ? getColorClasses()
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
            }`}
        >
            {page}
        </button>
    );

    const renderPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;
        
        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(renderPageButton(i));
            }
            return pages;
        }

        // Primeira página
        pages.push(renderPageButton(1));
        
        // Elipse ou páginas próximas
        if (currentPage > 3) {
            pages.push(<span key="left-ellipsis" className="px-1">...</span>);
        }
        
        // Páginas ao redor da atual
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(renderPageButton(i));
        }
        
        // Elipse
        if (currentPage < totalPages - 2) {
            pages.push(<span key="right-ellipsis" className="px-1">...</span>);
        }
        
        // Última página
        pages.push(renderPageButton(totalPages));
        
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 py-4 ">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
                <FaChevronLeft size={16} />
            </button>
            
            <div className="flex gap-1">
                {renderPageNumbers()}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
                <FaChevronRight size={16} />
            </button>
        </div>
    );
}