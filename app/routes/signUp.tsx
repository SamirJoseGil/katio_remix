



export default function SignUp() {
    return (
        <div className="flex min-h-screen bg-gray-100 items-center justify-center">
            <div className="bg-white shadow-lg overflow-hidden rounded-3xl w-full max-w-xl">
                <div className="p-12">
                    {/* Título */}
                    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">Crear Cuenta!
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-center text-gray-600 mb-6 my-1">
                        Por favor coloca tu información.
                    </p>

                    {/* Formulario de Registro */}
                    <form className="space-y-6 p-2 text-center">

                        {/* Iniciar sesion de forma Externa */}
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

                        {/* Campos de Registro */}
                        <div className="space-y-3">

                        </div>

                        {/* Campo de Nombre */}
                        {/* Botón de Iniciar Sesión */}
                        <button className="btn btn-outline btn-success rounded-3xl w-4/5">Crear Cuenta</button>
                    </form>

                    {/* Botón de Inicio */}
                    <p className="mt-4 text-sm text-center">
                        ¿Ya tienes una cuenta? <a href="/logIn" className="text-blue-600 hover:underline">Inicia Sesión</a>
                    </p>
                </div>
            </div>
        </div>
    );
}