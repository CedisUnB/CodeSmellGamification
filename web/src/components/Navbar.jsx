import { useNavigate, useLocation } from "react-router-dom";
import { FaPaw, FaUserCircle, FaHome, FaSearch, FaGraduationCap } from "react-icons/fa";
import { useState } from "react";
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

  const navItems = [
    { path: '/', label: 'Início', icon: FaHome },
    { path: '/guia', label: 'Guia', icon: FaGraduationCap },
    { path: '/farejador', label: 'Farejador', icon: FaSearch }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    window.location.href = '/';
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
            <FaPaw className="text-orange-500 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300" size={28} />
            <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              DevDog
            </span>
          </div>

          {/* Links de navegação */}
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
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Petiscos e Usuário */}
          <div className="flex items-center space-x-4">
            {/* Petiscos */}
            <PetiscoCounter petiscos={user?.coins || 0} />

            {/* Tema */}
            <ThemeToggle />

            {/* Usuário Logado */}
            {user && !user.isAnonymous ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                    <FaUserCircle size={20} />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu do Usuário */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700">
                      <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Sair
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="px-4 py-2 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                  <FaUserCircle size={20} />
                  <span className="ml-2 text-sm font-medium">
                    Entrar
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Links Mobile */}
        <div className="md:hidden flex justify-center space-x-4 py-2 border-t border-neutral-200 dark:border-neutral-700 mt-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`mx-4 my-2 p-0.5 font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${isActive(item.path)
                ? 'text-orange-500 border-b-4 border-orange-500 dark:text-orange-400 dark:border-orange-400'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}