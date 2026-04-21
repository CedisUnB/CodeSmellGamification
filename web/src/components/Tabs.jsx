export default function Tabs({ activeTab, onTabChange, tabs }) {
    return (
        <div
            className="flex space-around border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                    </div>
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}