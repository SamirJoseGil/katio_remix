# Documentación en español
---

Descripción General
Este frontend fue desarrollado usando Remix, un framework moderno para aplicaciones web con renderizado en el servidor y enrutamiento avanzado. Se utilizan las siguientes tecnologías:

Remix para el desarrollo del frontend.
Node.js como entorno de ejecución.
DaisyUI y Tailwind CSS para estilos y componentes UI.
Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener lo siguiente instalado:

Node.js
Recomendado: Versión 16.x o superior.
Descargar aquí

Yarn o npm
Maneja los paquetes y dependencias del proyecto.

IDE recomendado: Visual Studio Code
Instalar extensiones para soporte de Remix y Tailwind CSS.

Configuración y Ejecución
1. Clonar el repositorio del frontend
Si aún no lo has hecho, clona el repositorio:

`git clone https://github.com/SamirJoseGil/katio_remix.git`
`cd katio_remix`
2. Instalar dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

o si prefieres usar Yarn:

yarn install
3. Variables de entorno
Crea un archivo .env en la raíz del proyecto con las siguientes configuraciones:

API_BASE_URL=http://localhost:5173/api
4. Iniciar el servidor de desarrollo
Usa el siguiente comando para iniciar el servidor en modo desarrollo:

npm run dev
Esto abrirá el proyecto en http://localhost:5173.

Estructura del Proyecto
El proyecto sigue la estructura recomendada por Remix:

app/: Contiene el código principal de la aplicación.
routes/: Archivos de rutas y páginas.
components/: Componentes reutilizables.
styles/: Archivos CSS y configuraciones de Tailwind.
public/: Recursos estáticos.
remix.config.js: Configuración de Remix.
tailwind.config.js: Configuración de Tailwind CSS.
Comandos Útiles
Construir el proyecto para producción:

`npm run build`
Ejecutar pruebas:


Solución de Problemas
Errores de dependencia:
Asegúrate de ejecutar npm install después de clonar el proyecto.

Problemas de conexión con el backend:
Verifica que el backend esté en ejecución en http://localhost:5173.

# Documentation in english

Overview
The frontend of the "Katio" project was built using Remix, a modern framework for server-rendered applications with advanced routing. The following technologies are used:

Remix for frontend development.
Node.js as the runtime environment.
DaisyUI and Tailwind CSS for styling and UI components.
Prerequisites
Ensure the following tools are installed before running the project:

Node.js
Recommended version: 16.x or later.
Download here

Yarn or npm
For managing project packages and dependencies.

Recommended IDE: Visual Studio Code
Install extensions for Remix and Tailwind CSS support.

Setup and Execution
1. Clone the Frontend Repository
If you haven't already, clone the repository:

`git clone https://github.com/SamirJoseGil/katio_remix.git`  
`cd katio_remix`

2. Install Dependencies
Run the following command to install project dependencies:

npm install  
Or, if you prefer Yarn:

yarn install  
3. Environment Variables
Create a .env file in the project root with the following content:

API_BASE_URL=http://localhost:5125/api  
4. Start the Development Server
Use the following command to start the development server:

npm run dev  
This will open the project at http://localhost:3000.

Project Structure
The project follows Remix’s recommended structure:

app/: Contains the main application code.

routes/: Files for routes and pages.
components/: Reusable components.
styles/: CSS files and Tailwind configurations.
public/: Static assets.

remix.config.js: Remix configuration.

tailwind.config.js: Tailwind CSS configuration.

Useful Commands
Build the project for production:

npm run build  

Dependency Errors:
Ensure you have run npm install after cloning the project.

Backend Connection Issues:
Verify that the backend is running at http://localhost:5125.

