import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaPaw, FaEnvelope, FaLock, FaSearch } from 'react-icons/fa';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import DevDog from '../assets/sentado.svg';

export default function Login() {
    const navigate = useNavigate();
    const { token, updateToken } = useAuth();
    const { refreshUser } = useUser(); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            const { login } = ApiService(token);
            const response = await login(data);

            updateToken(response.data.token);
            await refreshUser();
            navigate("/");
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Email ou senha incorretos.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full">
            {/* Logo e título */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <img
                            src={DevDog}
                            alt="DevDog"
                            className="w-20 h-20 object-contain relative z-10 mx-auto"
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
                    <FaPaw className="text-orange-500" />
                    DevDog
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                    Seu melhor amigo desenvolvedor
                </p>
            </div>

            {/* Card de login */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-6">
                    Bem-vindo de volta!
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Campo Email */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <FaEnvelope className="inline mr-2 text-neutral-400" />
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email é obrigatório',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email inválido'
                                }
                            })}
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* CampoSenha */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <FaLock className="inline mr-2 text-neutral-400" />
                            Senha
                        </label>
                        <input
                            {...register('password', { required: 'Senha é obrigatória' })}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Erro de login */}
                    {loginError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                            <p className="text-red-600 dark:text-red-400 text-sm text-center">
                                {loginError}
                            </p>
                        </div>
                    )}

                    {/* Botão de login */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Entrando...
                            </>
                        ) : (
                            <>
                                <FaSearch />
                                Entrar
                            </>
                        )}
                    </button>
                </form>

                {/* Link para registro */}
                <div className="mt-6 text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Não tem uma conta?{' '}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
                        >
                            Registre-se
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}