const MarkdownComponents = {
    h1: ({ children }) => <h1 className="dark:text-neutral-50 text-2xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="dark:text-neutral-50 text-xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="dark:text-neutral-50 text-lg font-bold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">{children}</p>,
    pre: ({ children }) => <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto my-4">{children}</pre>,
    code: ({ inline, children }) => inline
        ? <code className="bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-sm">{children}</code>
        : <code>{children}</code>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="text-neutral-700 dark:text-neutral-300">{children}</li>,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-teal-500 pl-4 italic my-4 text-neutral-600 dark:text-neutral-400">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a href={href} className="text-teal-600 dark:text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    )
};

export default MarkdownComponents;