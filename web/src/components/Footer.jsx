import { useNavigate } from "react-router-dom";
import { FaPaw, FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import cedisLogo from "../assets/cedis.svg";
import faculdadeLogo from "../assets/unb.svg";

export default function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: FaEnvelope,
            href: "mailto:lrsj2003@gmail.com",
            label: "Email",
            color: "hover:text-red-500"
        },
        {
            icon: FaGithub,
            href: "https://github.com/l-ricardo",
            label: "GitHub",
            color: "hover:text-neutral-900 dark:hover:text-white"
        },
    ];

    return (
        <footer className="w-full bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
            <div className="container mx-auto px-4 py-8">
                {/* Logo e informações */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    {/* Logo DevDog */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer group mb-4 md:mb-0"
                        onClick={() => navigate("/")}
                    >
                        <FaPaw className="mr-4 text-orange-500 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300" size={28} />
                        <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            DevDog
                        </span>
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex space-x-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-neutral-500 dark:text-neutral-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                                aria-label={social.label}
                            >
                                <social.icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Apoio e créditos */}
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Apoiado por CEDIS e UnB */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                Apoiado por:
                            </p>
                            <div className="flex items-center space-x-4">
                                <a
                                    href="https://cedis.unb.br/pt/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={cedisLogo}
                                            alt="CEDIS Logo"
                                            className="h-10 w-auto object-contain transition-opacity group-hover:opacity-80"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.parentElement.querySelector('span').style.display = 'block';
                                            }}
                                        />
                                        <span className="text-neutral-600 dark:text-neutral-400 text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            CEDIS
                                        </span>
                                    </div>
                                </a>

                                <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-600"></div>

                                <a
                                    href="https://www.unb.br/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={faculdadeLogo}
                                            alt="UnB Logo"
                                            className="h-10 w-auto object-contain transition-opacity group-hover:opacity-80"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.parentElement.querySelector('span').style.display = 'block';
                                            }}
                                        />
                                        <span className="text-neutral-600 dark:text-neutral-400 text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                            UnB
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Feito por */}
                        <div className="text-center md:text-right">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Feito com ❤️ por <span className="font-semibold text-orange-500">Luciano Ricardo</span>
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                Desenvolvido como parte do Trabalho de Conclusão de Curso
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                Orientação: Prof. Dr. Sergio Antônio Andrade de Freitas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        © {currentYear} DevDog - Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}