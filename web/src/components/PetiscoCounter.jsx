import petiscoIcon from '../assets/petisco.svg';

export default function PetiscoCounter({ petiscos = 0 }) {
    return (
        <div className="relative flex items-center group">
            <div className="bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-full pl-6 pr-4 py-1.5 shadow-md group-hover:drop-shadow-lg transition-shadow group-hover:shadow-teal-500/50 duration-200">
                <div className="flex items-baseline gap-1">
                    <span className="text-neutral-600 dark:text-neutral-200 font-extrabold text-sm">
                        {petiscos}
                    </span>
                </div>
            </div>
            <div className="absolute -left-6 w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md border-2 border-white dark:border-neutral-800  transition-transform duration-200">
                <img
                    src={petiscoIcon}
                    alt="Petisco"
                    className="w-8 h-8 object-contain rotate-120 "
                />
            </div>
        </div>
    );
}