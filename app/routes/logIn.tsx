



export default function LogIn() {
    return (
        <div className="flex min-h-screen bg-gray-100 items-center justify-center">
            <div className="bg-slate-100 shadow-lg overflow-hidden flex max-w-6xl rounded-3xl">
                <div className="p-12 lg:w-1/2">
                    {/* Título */}
                    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">
                        Welcome Back!
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-center text-gray-600 mb-6 my-1">
                        Por favor coloca tu información.
                    </p>

                    {/* Formulario de Registro */}
                    <form className="space-y-6 p-2 text-center">

                        <div className="space-y-3">
                            <button type="button" className="btn btn-outline btn-success rounded-3xl w-4/5 flex items-center gap-2 mt-4 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" >
                                    <path
                                        fill="#4285F4" d="M24 9.5c3.1 0 5.6 1.1 7.5 2.9l5.6-5.6C33.1 3.5 28.8 1.5 24 1.5 14.9 1.5 7.4 7.9 4.9 16.1l6.9 5.4C13.2 15.1 18.1 9.5 24 9.5z" />
                                    <path
                                        fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3.1-2.4 5.7-4.9 7.4l7.6 5.9C43.4 38.1 46.5 31.7 46.5 24z" />
                                    <path
                                        fill="#FBBC05" d="M11.8 28.5c-1.1-3.1-1.1-6.5 0-9.6l-6.9-5.4C2.1 17.1 1.5 20.5 1.5 24s.6 6.9 1.9 10.5l6.9-5.4z" />
                                    <path fill="#EA4335" d="M24 46.5c4.8 0 9.1-1.6 12.5-4.4l-7.6-5.9c-2.1 1.4-4.7 2.2-7.5 2.2-5.9 0-10.8-4.6-12.4-10.7l-6.9 5.4C7.4 40.1 14.9 46.5 24 46.5z" />
                                </svg>
                                Iniciar sesión con Google
                            </button>
                        </div>

                        {/* Separador */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 w-4/5 mx-auto">
                                <hr className="flex-grow border-gray-300" />
                                <span className="text-gray-500">O</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                        </div>

                        {/* Campos de Inicio de Sesión */}
                        <div className="space-y-3">
                            {/* Campo de Email */}
                            <label className="input rounded-3xl flex items-center gap-2 w-4/5 mx-auto btn btn-outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow text-neutral-100" placeholder="Email" />
                            </label>

                            {/* Campo de Contraseña */}
                            <label className="input rounded-3xl flex items-center gap-2 w-4/5 mx-auto btn btn-outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Contraseña" />
                            </label>
                        </div>

                        {/* Recordar Contraseña */}
                        <div className="flex items-center justify-between w-4/5 mx-auto">
                            <label className="flex items-center text-sm mx-auto">
                                <input type="checkbox" className="checkbox checkbox-success" />
                                <span className="ml-1">Recordar por 30 días</span>
                            </label>
                            {/* Botón de Recordar */}
                            <a href="#" className="text-sm text-blue-600 hover:underline mx-auto">¿Olvidaste tu contraseña?</a>
                        </div>

                        {/* Botón de Iniciar Sesión */}
                        <button className="btn btn-outline btn-success rounded-3xl w-4/5">Iniciar Sesión</button>

                    </form>

                    {/* Botón de Registro */}
                    <p className="mt-4 text-sm text-center">
                        ¿No tienes una cuenta? <a href="/signUp" className="text-blue-600 hover:underline">Regístrate</a>
                    </p>
                </div>

                {/* Sección de Imagen */}
                <div className="hidden lg:flex lg:w-1/2 m-4">
                    <img src="/img/ImagenDeLogIn.jpg"
                        alt="LogIn"
                        className="object-cover w-5/5 h-full rounded-3xl shadow-lg" />
                </div>
            </div>
        </div>
    );
}
