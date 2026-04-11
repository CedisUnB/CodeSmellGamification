import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaPaw, FaEnvelope, FaLock, FaUser, FaSearch, FaEyeSlash, FaEye } from 'react-icons/fa';
import { ApiService } from '../services/ApiService';
import DevDog from '../assets/sentado.svg';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [registerError, setRegisterError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token, sessionId, updateToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch('password');

    const onSubmit = async (data) => {
        setIsLoading(true);
        setRegisterError(null);

        try {
            const { register } = ApiService(token);
            const response = await register({
                name: data.name,
                email: data.email,
                password: data.password,
                sessionId: sessionId
            });

            updateToken(response.data.token);
            window.location.href = '/';
        } catch (error) {
            setRegisterError(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full">
            <div
                className="text-center mb-8 cursor-pointer group"
                onClick={() => navigate('/')}
            >
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
                        <img
                            src={DevDog}
                            alt="DevDog"
                            className="w-20 h-20 object-contain relative z-10 mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
                    <FaPaw className="text-orange-500" />
                    DevDog
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                    Comece sua jornada de código limpo
                </p>
            </div>

            {/* Card de registro */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-6">
                    Criar conta
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Campo Nome */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <FaUser className="inline mr-2 text-neutral-400" />
                            Nome
                        </label>
                        <input
                            {...register('name', {
                                required: 'Nome é obrigatório',
                                minLength: {
                                    value: 3,
                                    message: 'Nome deve ter pelo menos 3 caracteres'
                                }
                            })}
                            type="text"
                            placeholder="Seu nome"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

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

                    {/* Campo Senha */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <FaLock className="inline mr-2 text-neutral-400" />
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                {...register('password', {
                                    required: 'Senha é obrigatória',
                                    minLength: {
                                        value: 6,
                                        message: 'Senha deve ter pelo menos 6 caracteres'
                                    }
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-orange-500 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Campo Confirmar Senha */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <FaLock className="inline mr-2 text-neutral-400" />
                            Confirmar senha
                        </label>
                        <div className="relative">
                            <input
                                {...register('confirmPassword', {
                                    required: 'Confirme sua senha',
                                    validate: value => value === password || 'As senhas não coincidem'
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-orange-500 transition-colors"
                            >
                                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Mensagem de erro */}
                    {registerError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                            <p className="text-red-600 dark:text-red-400 text-sm text-center">
                                {registerError}
                            </p>
                        </div>
                    )}

                    {/* Botão de registro */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-linear-to-br from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Criando conta...
                            </>
                        ) : (
                            <>
                                <FaSearch />
                                Registrar
                            </>
                        )}
                    </button>
                </form>

                {/* Link para login */}
                <div className="mt-6 text-center">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Já tem uma conta?{' '}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
                        >
                            Faça login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}