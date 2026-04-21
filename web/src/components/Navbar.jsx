import { useNavigate, useLocation } from "react-router-dom";
import { FaPaw, FaUserCircle, FaHome, FaSearch, FaGraduationCap, FaChevronDown, FaSignOutAlt, FaSign, FaSignInAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import PetiscoCounter from "./PetiscoCounter";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();
  const { user } = useUser();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Início', icon: FaHome },
    { path: '/guia', label: 'Guia', icon: FaGraduationCap },
    { path: '/farejador', label: 'Farejador', icon: FaSearch }
  ];

  const isActive = (path) => location.pathname === path;

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha o menu ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  const getInitial = () => {
    if (!user?.name) return '?';
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <FaPaw className="text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300" size={28} />
            <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              DevDog
            </span>
          </div>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`mx-4 my-2 p-0.5 font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${isActive(item.path)
                  ? 'text-orange-500 border-b-4 border-orange-500 dark:text-orange-400 dark:border-orange-400'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Petiscos e Usuário */}
          <div className="flex items-center space-x-3">
            {/* Petiscos */}
            <PetiscoCounter petiscos={user?.coins || 0} />

            {/* Tema */}
            <ThemeToggle />

            {/* Usuário */}
            {user && !user.isAnonymous ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {getInitial()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {user.name}
                  </span>
                  <FaChevronDown
                    className={`text-neutral-400 text-xs transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FaSignOutAlt size={14} /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Links de navegação - Mobile */}
        <div className="md:hidden flex justify-center space-x-2 py-2 border-t border-neutral-200 dark:border-neutral-700 mt-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`mx-4 my-2 p-0.5 font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${isActive(item.path)
                ? 'text-orange-500 border-b-4 border-orange-500 dark:text-orange-400 dark:border-orange-400'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}