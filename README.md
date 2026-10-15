🎓 CareerPath AI
Plataforma web de orientación vocacional desarrollada con React + Vite.

CareerPath AI acompaña al usuario desde la creación de su perfil hasta la elección de una carrera y el seguimiento de una ruta académica. El sistema combina intereses, habilidades, respuestas del test vocacional, información de carreras de la UTN y ocupaciones consultadas mediante ESCO para generar recomendaciones personalizadas.
El proyecto corresponde al Trabajo Práctico Nº 7 de la Tecnicatura Universitaria en Programación de la Universidad Tecnológica Nacional (UTN).
👥 Equipo de desarrollo
Equipo: C9 TUP UTN
- Leandro Nuñez
- Valentina Perez del Rien
- Tatiana Herrera
- Morena Marina Noguera
🎯 Objetivo
El objetivo de CareerPath AI es facilitar el proceso de orientación vocacional mediante una experiencia clara, interactiva y progresiva.
El sistema permite:
- crear e iniciar una sesión local;
- completar intereses y habilidades;
- realizar un test vocacional;
- construir un perfil vocacional;
- consultar ocupaciones relacionadas mediante ESCO;
- relacionar ocupaciones con carreras de la UTN;
- visualizar recomendaciones;
- buscar y filtrar carreras;
- consultar información académica y planes de estudio;
- guardar carreras favoritas;
- seleccionar una carrera;
- registrar materias aprobadas o promocionadas;
- visualizar el progreso académico;
- conservar información en localStorage.
Flujo principal
Perfil
  ↓
Test Vocacional
  ↓
Perfil ESCO
  ↓
Consulta de ocupaciones
  ↓
Carreras recomendadas
  ↓
Resultados
  ↓
Mi Ruta
📌 Alcance actual
CareerPath AI es actualmente una aplicación frontend.
Incluye:
- React + Vite;
- React Router;
- Bootstrap y React Bootstrap;
- Bootstrap Icons;
- Axios;
- SweetAlert2;
- autenticación local;
- perfil vocacional;
- test vocacional;
- integración con ESCO;
- recomendaciones de carreras;
- filtros y búsqueda;
- favoritos;
- planes de estudio;
- Mi Ruta;
- progreso por usuario y carrera;
- persistencia mediante localStorage;
- diseño responsive;
- animaciones CSS;
- estrategia SEO on-page y social;
- página 404;
- configuración para Vercel.
La autenticación y la persistencia son locales y se utilizan con fines académicos. Una evolución futura puede incorporar backend, base de datos y autenticación remota.

🔌 API pública utilizada
ESCO API
CareerPath AI utiliza ESCO (European Skills, Competences, Qualifications and Occupations) para consultar ocupaciones relacionadas con el perfil vocacional del usuario.
La integración se encuentra principalmente en:
src/config/api.js
src/services/escoService.js
src/utils/careerMatcher.js
src/pages/Resultados.jsx
El flujo de consulta es:
Respuestas del test
      +
Perfil del usuario
      ↓
careerMatcher
      ↓
Términos de búsqueda
      ↓
ESCO API
      ↓
Ocupaciones relacionadas
      ↓
Ranking de carreras UTN
Las consultas se realizan mediante Axios.
El servicio:
- consulta ocupaciones por término;
- utiliza idioma configurable;
- utiliza versión configurable de ESCO;
- evita búsquedas vacías;
- limita resultados;
- reutiliza consultas mediante caché;
- elimina ocupaciones duplicadas;
- permite consultar varios términos del perfil;
- maneja respuestas parciales con Promise.allSettled;
- permite utilizar recomendaciones locales si ESCO no responde.
🧠 Test vocacional y perfil ESCO
La página principal del test es:
src/pages/Test.jsx
Las preguntas se encuentran separadas en:
src/data/testQuestions.js
Cada opción puede aportar información como:
- área;
- palabras clave;
- términos relacionados con ESCO;
- icono;
- preferencias vocacionales.
Las respuestas se almacenan en:
careerpath_test_answers
Al finalizar el test se genera un perfil vocacional y se almacena en:
careerpath_esco_profile
Este perfil se utiliza posteriormente para consultar ESCO y construir las recomendaciones.
📊 Resultados
La página:
src/pages/Resultados.jsx
combina:
Usuario activo
      +
Intereses y habilidades
      +
Respuestas del test
      +
Ocupaciones ESCO
      +
Datos de carreras
      ↓
Recomendaciones personalizadas
La lógica principal se apoya en:
src/data/careers.js
src/utils/careerMatcher.js
src/utils/learningRouteBuilder.js
src/services/escoService.js
La sección de Resultados permite:
- consultar carreras recomendadas;
- visualizar ocupaciones relacionadas obtenidas desde ESCO;
- buscar carreras;
- filtrar resultados;
- cambiar entre modos de visualización;
- guardar favoritos;
- abrir información detallada de cada carrera;
- consultar duración y modalidad;
- visualizar planes de estudio;
- acceder a fuentes académicas cuando están disponibles;
- generar información para Mi Ruta.
Las recomendaciones se almacenan mediante:
careerpath_recommended_careers
La información utilizada por la ruta también puede almacenarse mediante:
careerpath_learning_route
🛣️ Mi Ruta
La página principal es:
src/pages/Ruta.jsx
Utiliza:
src/components/RouteStep.jsx
src/components/RouteTopic.jsx
Mi Ruta permite elegir una de las carreras recomendadas y utilizar su plan de estudios como seguimiento académico.
El usuario puede:
- elegir una carrera recomendada;
- consultar el plan de estudios;
- abrir y cerrar cada bloque;
- marcar materias como aprobadas o promocionadas;
- visualizar materias completadas y pendientes;
- calcular automáticamente el porcentaje de progreso;
- cambiar de carrera;
- mantener un progreso independiente para cada carrera.
Estados controlados
Antes de mostrar la ruta se verifica:
¿Hay usuario activo?
        ↓
¿Hay test realizado?
        ↓
¿Hay resultados?
        ↓
¿Hay carrera seleccionada?
        ↓
Mostrar plan y progreso
Persistencia del progreso
El progreso se almacena en:
careerpath_route_progress
Se separa utilizando una combinación de:
usuario + carrera
De esta manera cada usuario mantiene su propio progreso para cada carrera.
💾 localStorage
Clave	Función
careerpath_users	Usuarios locales
careerpath_active_user_id	Usuario con sesión activa
careerpath_test_answers	Respuestas del test
careerpath_esco_profile	Perfil utilizado para búsquedas ESCO
careerpath_recommended_careers	Carreras recomendadas
careerpath_learning_route	Información de ruta generada
careerpath_route_progress	Progreso por usuario y carrera
careerpath_selected_route_career	Carrera seleccionada en Mi Ruta
careerpath-favoritos-utn	Carreras favoritas


🪝 Hooks utilizados
El proyecto utiliza principalmente:
useState
Se utiliza para manejar información que cambia dentro de la interfaz, por ejemplo:
- respuestas del test;
- pregunta actual;
- filtros;
- recomendaciones;
- favoritos;
- carrera seleccionada;
- materias completadas;
- mensajes y estados visuales.
useEffect
Se utiliza para sincronizar la aplicación con procesos externos o cambios del sistema, por ejemplo:
- guardar información en localStorage;
- consultar ESCO;
- actualizar metadatos SEO;
- controlar comportamientos relacionados con la interfaz.
Hooks personalizados
useLocalAuth
useSEO
useThemeMode
🧩 Componentes reutilizables
Componente	Función
Navbar	Navegación principal
Footer	Pie de página
Hero	Presentación del Inicio
FeatureCard	Tarjetas informativas
LoginForm	Registro e inicio de sesión
UserProfileSummary	Información del perfil
QuestionCard	Pregunta del test
OptionButton	Opciones del test
CareerCard	Tarjeta de carrera
RouteStep	Bloque del plan de estudios
RouteTopic	Materia individual
SectionTitle	Encabezados reutilizables
ScrollToTop	Control del scroll al cambiar de ruta


🏗️ Arquitectura general
main.jsx
   │
   └── BrowserRouter
          │
          ▼
        App.jsx
          │
          ├── Navbar
          ├── ScrollToTop
          ├── Routes
          │    ├── Home
          │    ├── Perfil
          │    ├── Test
          │    ├── Resultados
          │    ├── Ruta
          │    └── NotFound
          └── Footer
Estructura principal
src/
├── assets/
├── components/
├── config/
│   └── api.js
├── data/
│   ├── careers.js
│   ├── homeFeatures.js
│   ├── menuItems.js
│   ├── routeTopics.js
│   ├── testQuestions.js
│   └── users.js
├── hooks/
│   ├── useLocalAuth.js
│   ├── useSEO.js
│   └── useThemeMode.js
├── pages/
│   ├── Home.jsx
│   ├── Perfil.jsx
│   ├── Test.jsx
│   ├── Resultados.jsx
│   ├── Ruta.jsx
│   └── NotFound.jsx
├── services/
│   └── escoService.js
├── utils/
│   ├── careerMatcher.js
│   └── learningRouteBuilder.js
├── App.jsx
├── App.css
└── main.jsx
🧭 Navegación
CareerPath AI funciona como una SPA mediante React Router.
Ruta	Página	Función
/	Home	Presentación de CareerPath AI
/perfil	Perfil	Registro, login y perfil vocacional
/test	Test	Test vocacional
/resultados	Resultados	Carreras y ocupaciones relacionadas
/ruta	Ruta	Plan de estudios y progreso
*	NotFound	Página 404


🔍 Estrategia SEO implementada
CareerPath AI incorpora una estrategia SEO orientada al contenido real del sistema y a sus rutas principales.
La implementación se distribuye entre:
index.html
src/hooks/useSEO.js
Metadatos generales
index.html define información global de la aplicación:
- charset;
- viewport;
- description;
- keywords;
- author;
- robots;
- título principal;
- Open Graph;
- imagen social.
El contenido está orientado a términos relacionados con:
orientación vocacional
test vocacional
carreras
UTN
Tucumán
perfil vocacional
CareerPath AI
SEO dinámico por ruta
El hook:
src/hooks/useSEO.js
permite actualizar dinámicamente la información SEO según la vista que está visitando el usuario.
Actualmente administra:
document.title
meta description
robots
canonical URL
og:title
og:description
og:type
og:url
twitter:title
twitter:description
twitter:card
Esto permite que páginas importantes del sistema puedan tener un título y una descripción relacionados con su contenido real.
Por ejemplo:
/test
Test Vocacional UTN | CareerPath AI

/resultados
Resultados y Carreras UTN | CareerPath AI

/ruta
Mi Ruta de Aprendizaje | CareerPath AI
URL canónica
Cada vista que utiliza useSEO puede definir una URL canónica.
Ejemplo conceptual:
https://dominio-del-proyecto.com/test
https://dominio-del-proyecto.com/resultados
https://dominio-del-proyecto.com/ruta
Esto ayuda a identificar la URL principal de cada contenido y evita referencias duplicadas.
Open Graph y redes sociales
El sistema utiliza metadatos Open Graph para mejorar la presentación de CareerPath AI cuando una URL es compartida.
Se gestionan datos como:
og:title
og:description
og:type
og:url
og:image
Twitter Cards
El hook también incorpora:
twitter:card
twitter:title
twitter:description
para mejorar la vista previa cuando el sitio se comparte en plataformas compatibles.
Indexación
El proyecto utiliza:
<meta name="robots" content="index, follow" />
para indicar que las páginas públicas pueden ser indexadas y que los enlaces pueden ser seguidos.
Contenido semántico
La interfaz utiliza elementos HTML como:
main
section
header
article
h1
h2
h3
p
junto con títulos y descripciones vinculados al contenido de cada página.
Esto mejora la organización semántica y también beneficia:
- accesibilidad;
- lectura del documento;
- comprensión del contenido por motores de búsqueda.
SEO y experiencia de usuario
La estrategia SEO se complementa con:
- diseño responsive;
- navegación SPA clara;
- títulos descriptivos;
- página 404 personalizada;
- contenido organizado;
- enlaces internos entre Perfil, Test, Resultados y Mi Ruta;
- textos relacionados con orientación vocacional y carreras.
El proyecto implementa SEO on-page y metadatos sociales acordes al alcance actual de una SPA académica. Funciones como sitemap automático, datos estructurados JSON-LD o renderizado del lado del servidor pueden incorporarse en una evolución futura.

📱 Diseño responsive
La interfaz utiliza Bootstrap para adaptarse a distintos tamaños de pantalla.
Se utilizan:
- sistema de grillas;
- flexbox;
- breakpoints;
- cards;
- formularios;
- botones;
- badges;
- barras de progreso;
- espaciado responsive;
- Navbar adaptativo.
La aplicación contempla visualización en:
móvil
tablet
notebook
desktop
🎨 Diseño e interfaz
El proyecto utiliza:
- Bootstrap;
- React Bootstrap;
- Bootstrap Icons;
- CSS personalizado;
- animaciones suaves;
- tarjetas reutilizables;
- jerarquía visual;
- estados de carga;
- mensajes de error;
- alertas mediante SweetAlert2.
No utiliza Tailwind.
❌ Página 404
La ruta * renderiza:
src/pages/NotFound.jsx
cuando el usuario intenta acceder a una URL inexistente.
La página permite volver al Inicio sin romper la navegación de la SPA.
⚙️ Variables de entorno
Las variables relacionadas con ESCO se leen desde:
src/config/api.js
Para trabajar localmente se puede crear un archivo .env en la raíz:
VITE_ESCO_API_URL=https://ec.europa.eu/esco/api
VITE_ESCO_LANGUAGE=es
VITE_ESCO_VERSION=v1.2.0
Los archivos .env se encuentran ignorados mediante .gitignore.
🛠️ Tecnologías
Frontend
- React
- React DOM
- JavaScript
- JSX
- HTML5
- CSS3
Navegación
- React Router DOM
Diseño
- Bootstrap
- React Bootstrap
- Bootstrap Icons
Peticiones y experiencia de usuario
- Axios
- SweetAlert2
Desarrollo
- Vite
- npm
- ESLint
- Git
- GitHub
Deploy
- Vercel
📦 Dependencias principales
Las dependencias se encuentran en package.json.
axios
bootstrap
bootstrap-icons
react
react-bootstrap
react-dom
react-router-dom
sweetalert2
🚀 Instalación y ejecución
1. Clonar el repositorio
git clone https://github.com/mmore-cloud/Career-Path-IA-frontend.git
2. Entrar al proyecto
cd Career-Path-IA-frontend
3. Instalar dependencias
npm install
4. Crear .env
VITE_ESCO_API_URL=https://ec.europa.eu/esco/api
VITE_ESCO_LANGUAGE=es
VITE_ESCO_VERSION=v1.2.0
5. Ejecutar desarrollo
npm run dev
6. Revisar ESLint
npm run lint
7. Generar build
npm run build
✅ Funcionalidades implementadas
- ✅ SPA con React Router
- ✅ Registro e inicio de sesión local
- ✅ Perfil vocacional
- ✅ Test vocacional interactivo
- ✅ Persistencia de respuestas
- ✅ Perfil ESCO
- ✅ Integración con ESCO mediante Axios
- ✅ Consulta de ocupaciones según el perfil
- ✅ Recomendación de carreras UTN
- ✅ Fallback cuando la API no responde
- ✅ Búsqueda de carreras
- ✅ Filtros
- ✅ Favoritos
- ✅ Información académica
- ✅ Planes de estudio
- ✅ Mi Ruta
- ✅ Selección de carrera
- ✅ Seguimiento de materias
- ✅ Progreso por usuario y carrera
- ✅ Persistencia mediante localStorage
- ✅ Componentes reutilizables
- ✅ useState
- ✅ useEffect
- ✅ SweetAlert2
- ✅ Bootstrap
- ✅ Bootstrap Icons
- ✅ Diseño responsive
- ✅ Animaciones CSS
- ✅ SEO dinámico por ruta
- ✅ Canonical URLs
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Meta robots
- ✅ Página 404
- ✅ ESLint
- ✅ Build con Vite
- ✅ Configuración para Vercel
🔮 Posibles mejoras futuras
- backend propio;
- base de datos;
- autenticación remota;
- persistencia en servidor;
- panel de administración;
- historial de resultados;
- más fuentes académicas;
- sitemap dinámico;
- robots.txt específico;
- datos estructurados con JSON-LD;
- renderizado del lado del servidor o generación estática;
- pruebas automatizadas;
- optimización adicional del bundle.
📄 Estado del proyecto
CareerPath AI se encuentra en una etapa funcional del Trabajo Práctico Nº 7.
El flujo principal actualmente permite:
registrarse
   ↓
completar perfil
   ↓
realizar test
   ↓
generar perfil vocacional
   ↓
consultar ESCO
   ↓
recibir carreras recomendadas
   ↓
elegir una carrera
   ↓
seguir el plan de estudios
   ↓
guardar progreso
El sistema mantiene una arquitectura basada en componentes y separación entre interfaz, datos, servicios y utilidades.