import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../contexts/ThemeContext';

export default function MarkdownRenderer({ content }) {
    const codeStyle = useTheme().isDark ? oneDark : oneLight;

    const components = {
        h1: ({ children }) => <h1 className="text-orange-400 text-2xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-orange-400 text-xl font-bold mt-6 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-orange-400 text-lg font-bold mt-4 mb-2">{children}</h3>,
        p: ({ children }) => <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">{children}</p>,

        code: ({ children, className, inline }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isBlock = className || String(children).includes('\n');

            if (!isBlock && !inline) {
                return (
                    <code className="bg-neutral-200 dark:bg-neutral-700 text-orange-400 px-1.5 py-0.5 rounded-2xl text-sm">
                        {children}
                    </code>
                );
            }

            return (
                <div className="my-4">
                    <div className="flex justify-end gap-2 px-3 py-2 bg-neutral-900 rounded-t-2xl border-x border-t border-neutral-700">
                        <span className="w-4 h-4 rounded-full bg-red-500"></span>
                        <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                        <span className="w-4 h-4 rounded-full bg-green-500"></span>
                        {language && (
                            <span className="text-xs text-neutral-400 ml-auto">
                                {language}
                            </span>
                        )}
                    </div>
                    <SyntaxHighlighter
                        className="bg-linear-120 dark:from-neutral-900 dark:to-neutral-800 from-neutral-200 to-neutral-100 0 p-4 rounded-b-xl overflow-x-auto shadow-2xl border border-neutral-200 dark:border-neutral-700"
                        language={language || 'javascript'}
                        style={codeStyle}
                        customStyle={{
                            margin: 0,
                            background: 'none'
                        }}
                        codeTagProps={{
                            style: {
                                background: 'transparent',
                            }
                        }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            );
        },
        pre: ({ children }) => <>{children}</>,
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
        ),
    };

    return (
        <ReactMarkdown components={components}>
            {content}
        </ReactMarkdown>
    );
};