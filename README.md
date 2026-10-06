# 🎓 CareerPath AI

> Plataforma web de orientación vocacional desarrollada con React + Vite.

CareerPath AI es una aplicación web orientada a acompañar a estudiantes durante el proceso de explorar sus intereses, habilidades, posibles carreras y rutas de aprendizaje.

El proyecto corresponde al **Trabajo Práctico Nº 7** de la **Tecnicatura Universitaria en Programación de la Universidad Tecnológica Nacional (UTN)**.

Esta etapa continúa la evolución de CareerPath AI incorporando autenticación local, perfil vocacional, Test Vocacional, resultados personalizados, persistencia con `localStorage`, Bootstrap Icons, animaciones y una Ruta de Aprendizaje integrada con el resto del sistema.

---

# 👥 Equipo de desarrollo

**Equipo:** C9 TUP UTN

### Integrantes

- **Leandro Nuñez**
- **Valentina Perez del Rien**
- **Tatiana Herrera**
- **Morena Marina Noguera**

---

# 🎯 Objetivo del proyecto

El objetivo de CareerPath AI es ofrecer una experiencia clara, interactiva y organizada que ayude al estudiante a explorar alternativas académicas de acuerdo con sus intereses, habilidades y respuestas dentro del Test Vocacional.

El flujo principal de la aplicación es:

```text
Perfil
  ↓
Test Vocacional
  ↓
Resultados
  ↓
Mi Ruta
```

Cada etapa genera información que puede ser utilizada por la siguiente.

---

# 🔄 Flujo general del TP Nº 7

## 1. Perfil

El usuario puede registrarse o iniciar sesión localmente.

Dentro de su perfil puede cargar información como:

- nombre;
- email;
- intereses;
- habilidades.

La aplicación conserva esta información utilizando `localStorage`.

---

## 2. Test Vocacional

El Test Vocacional permite responder preguntas relacionadas con intereses, preferencias y posibles áreas profesionales.

Las respuestas deben almacenarse mediante la clave:

```text
careerpath_test_answers
```

Esto permite que la página de Resultados pueda utilizar las respuestas posteriormente.

---

## 3. Resultados

La página de Resultados utiliza:

```text
Perfil
+
Respuestas del Test
+
Información de carreras
```

para generar recomendaciones.

Las carreras recomendadas se almacenan mediante:

```text
careerpath_recommended_careers
```

También se prepara la ruta principal utilizando:

```text
careerpath_learning_route
```

---

## 4. Mi Ruta

Mi Ruta representa el último paso del recorrido.

La página lee la información generada anteriormente y muestra una ruta de aprendizaje relacionada con la recomendación principal del usuario.

Permite:

- visualizar la carrera recomendada;
- consultar etapas;
- abrir y cerrar etapas;
- visualizar temas;
- marcar temas como completados;
- calcular el progreso;
- conservar el progreso en `localStorage`;
- mostrar mensajes cuando faltan datos.

---

# 📌 Alcance actual

CareerPath AI se encuentra desarrollado actualmente como una aplicación **frontend**.

La aplicación incorpora:

- React + Vite;
- React Router;
- Bootstrap;
- React Bootstrap;
- Bootstrap Icons;
- registro local;
- inicio de sesión local;
- perfil vocacional;
- Test Vocacional;
- Resultados;
- recomendaciones de carreras;
- Ruta de Aprendizaje;
- persistencia con `localStorage`;
- diseño responsive;
- animaciones CSS;
- SEO básico;
- página 404;
- configuración para deploy con Vercel.

> La autenticación y persistencia utilizadas actualmente son locales y fueron desarrolladas con fines académicos. Una versión futura podrá utilizar backend, base de datos y autenticación real.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- React DOM
- JavaScript
- JSX
- HTML5
- CSS3

## Diseño

- Bootstrap
- React Bootstrap
- Bootstrap Icons

## Navegación

- React Router DOM

## Herramientas de desarrollo

- Vite
- npm
- ESLint
- Git
- GitHub

## Deploy

- Vercel

---

# 📦 Dependencias principales

Las dependencias se encuentran definidas dentro de:

```text
package.json
```

Entre las principales se encuentran:

```text
react
react-dom
react-router-dom
bootstrap
bootstrap-icons
react-bootstrap
```

---

# 🏗️ Arquitectura general

La aplicación utiliza una arquitectura basada en componentes.

```text
main.jsx
   │
   └── BrowserRouter
          │
          ▼
        App.jsx
          │
          ├── Navbar
          ├── ScrollToTop
          │
          ├── Routes
          │    ├── Home
          │    ├── Perfil
          │    ├── Test
          │    ├── Resultados
          │    ├── Ruta
          │    └── NotFound
          │
          └── Footer
```

El punto de entrada principal es:

```text
src/main.jsx
```

Desde allí se utiliza `BrowserRouter` para permitir que React Router controle la navegación de la aplicación.

---

# 📂 Estructura principal del proyecto

```text
Career-Path-IA-frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── CareerCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── OptionButton.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── RouteStep.jsx
│   │   ├── RouteTopic.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SectionTitle.jsx
│   │   └── UserProfileSummary.jsx
│   │
│   ├── data/
│   │   ├── careers.js
│   │   ├── homeFeatures.js
│   │   ├── menuItems.js
│   │   ├── routeTopics.js
│   │   ├── testQuestions.js
│   │   └── users.js
│   │
│   ├── hooks/
│   │   ├── useLocalAuth.js
│   │   └── useSEO.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── Perfil.jsx
│   │   ├── Resultados.jsx
│   │   ├── Ruta.jsx
│   │   └── Test.jsx
│   │
│   ├── utils/
│   │   ├── careerMatcher.js
│   │   └── learningRouteBuilder.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

# 🧭 Navegación con React Router

La aplicación funciona como una SPA.

Las rutas principales son:

| Ruta | Página | Función |
|---|---|---|
| `/` | Home | Página principal |
| `/perfil` | Perfil | Login, registro y perfil vocacional |
| `/test` | Test | Test Vocacional |
| `/resultados` | Resultados | Carreras recomendadas |
| `/ruta` | Ruta | Ruta de aprendizaje |
| `*` | NotFound | Página 404 |

La configuración general se encuentra dentro de:

```text
src/App.jsx
```

---

# 👤 Perfil y autenticación local

La autenticación local se administra mediante:

```text
src/hooks/useLocalAuth.js
```

Este hook permite controlar:

- usuarios locales;
- usuario activo;
- registro;
- inicio de sesión;
- cierre de sesión;
- actualización del perfil;
- restauración de datos.

Las claves principales utilizadas son:

```text
careerpath_users
careerpath_active_user_id
```

La sesión se mantiene mientras el usuario navega entre las distintas páginas.

---

# 📝 Test Vocacional

La página:

```text
src/pages/Test.jsx
```

implementa el Test Vocacional.

Los componentes principales utilizados son:

```text
QuestionCard.jsx
OptionButton.jsx
```

Las preguntas se encuentran separadas dentro de:

```text
src/data/testQuestions.js
```

Las respuestas del usuario se almacenan mediante:

```text
careerpath_test_answers
```

Esto permite que Resultados pueda procesarlas posteriormente.

---

# 📊 Resultados

La página:

```text
src/pages/Resultados.jsx
```

trabaja junto con:

```text
src/data/careers.js
src/utils/careerMatcher.js
src/utils/learningRouteBuilder.js
```

La lógica general es:

```text
Usuario activo
      +
Intereses y habilidades
      +
Respuestas del Test
      ↓
careerMatcher
      ↓
Carreras recomendadas
```

Las recomendaciones se almacenan mediante:

```text
careerpath_recommended_careers
```

La ruta generada se almacena mediante:

```text
careerpath_learning_route
```

---

# 🛣️ Mi Ruta

La página principal de esta sección es:

```text
src/pages/Ruta.jsx
```

Los componentes relacionados son:

```text
src/components/RouteStep.jsx
src/components/RouteTopic.jsx
src/data/routeTopics.js
```

Mi Ruta lee:

```text
careerpath_learning_route
```

y transforma la información almacenada al formato utilizado por los componentes visuales.

---

# 🚦 Estados de Mi Ruta

Antes de mostrar una ruta se comprueba qué información existe.

```text
¿Hay usuario activo?
        │
        ├── NO → Ir a Perfil
        │
        └── SÍ
             ↓
¿Hay Test realizado?
        │
        ├── NO → Ir al Test
        │
        └── SÍ
             ↓
¿Hay Resultados?
        │
        ├── NO → Ir a Resultados
        │
        └── SÍ
             ↓
¿Existe una ruta?
        │
        ├── NO → Volver a Resultados
        │
        └── SÍ
             ↓
       Mostrar Mi Ruta
```

Esto evita mostrar una ruta genérica cuando todavía falta información.

---

# 🔄 Adaptación dinámica de la ruta

`routeTopics.js` contiene lógica que permite transformar la estructura generada por Resultados al formato utilizado por Mi Ruta.

Conceptualmente:

```text
careerpath_learning_route
        ↓
adaptarRutaAprendizaje()
        ↓
etapas
        ↓
RouteStep
        ↓
RouteTopic
```

Esto permite mostrar rutas diferentes sin depender de una cantidad fija de etapas o temas.

---

# 🧩 RouteStep

El componente:

```text
src/components/RouteStep.jsx
```

representa una etapa de aprendizaje.

Recibe mediante props:

```text
etapa
temasCompletados
onToggleTema
abiertoInicial
```

Utiliza:

```javascript
useState
```

para controlar si una etapa se encuentra abierta o cerrada.

Los temas son generados utilizando:

```jsx
etapa.temas.map(...)
```

---

# ✅ RouteTopic

El componente:

```text
src/components/RouteTopic.jsx
```

representa cada tema individual.

Recibe:

```text
topic
completado
onToggle
```

El checkbox utiliza el estado recibido desde el componente padre.

Cuando cambia:

```text
RouteTopic
    ↓
RouteStep
    ↓
Ruta
```

la página actualiza el progreso general.

---

# 📈 Progreso dinámico

El porcentaje de progreso se calcula automáticamente.

```text
temas completados / total de temas × 100
```

La interfaz muestra:

- porcentaje general;
- cantidad de temas completados;
- cantidad de temas pendientes;
- barra de progreso;
- estado de cada tema;
- mensaje cuando se alcanza el 100%.

El cálculo funciona independientemente de la cantidad de etapas o materias que tenga una ruta.

---

# 💾 Persistencia de Mi Ruta

El progreso se almacena utilizando:

```text
careerpath_route_progress
```

Para separar los datos se utiliza una combinación entre:

```text
usuario + carrera
```

De esta forma cada usuario puede tener su propio progreso.

Esto evita que dos cuentas compartan accidentalmente los mismos temas completados.

---

# 🗃️ Claves principales de localStorage

| Clave | Función |
|---|---|
| `careerpath_users` | Usuarios registrados localmente |
| `careerpath_active_user_id` | Usuario con sesión iniciada |
| `careerpath_test_answers` | Respuestas del Test |
| `careerpath_recommended_careers` | Carreras recomendadas |
| `careerpath_learning_route` | Ruta de aprendizaje |
| `careerpath_route_progress` | Progreso de Mi Ruta |
| `utn_favorites` | Carreras favoritas |

---

# 🪝 Hooks utilizados

## useState

Se utiliza para manejar estados como:

```text
usuario activo
pregunta actual
respuestas
filtros
etapas abiertas
temas completados
```

## useEffect

Se utiliza para:

```text
recuperar información
sincronizar localStorage
guardar progreso
administrar SEO
```

## useMemo

Se utiliza para calcular datos derivados sin repetir cálculos innecesarios.

En Mi Ruta se utiliza, por ejemplo, para:

```text
etapas adaptadas
IDs válidos
cantidad total de temas
identificador del progreso
```

## useLocation

Se utiliza dentro de:

```text
ScrollToTop.jsx
```

para detectar cambios de ruta.

---

# 🧩 Componentes reutilizables

Entre los principales componentes se encuentran:

| Componente | Función |
|---|---|
| `Navbar` | Navegación principal |
| `Footer` | Pie de página |
| `Hero` | Presentación del Inicio |
| `FeatureCard` | Tarjetas reutilizables |
| `LoginForm` | Login y registro |
| `UserProfileSummary` | Información del usuario |
| `QuestionCard` | Pregunta del Test |
| `OptionButton` | Opción del Test |
| `CareerCard` | Tarjeta de carrera |
| `RouteStep` | Etapa de Mi Ruta |
| `RouteTopic` | Tema individual |
| `SectionTitle` | Encabezados |
| `ScrollToTop` | Control de scroll |

---

# 🔁 Uso de map()

El proyecto utiliza `map()` para generar elementos dinámicamente.

Ejemplos:

```text
menuItems.map(...)
homeFeatures.map(...)
question.options.map(...)
filteredCareers.map(...)
etapas.map(...)
etapa.temas.map(...)
```

Esto permite evitar JSX repetido y trabajar con componentes reutilizables.

---

# 🔎 Uso de filter()

`filter()` se utiliza para distintas operaciones como:

- filtrar carreras;
- buscar coincidencias;
- obtener temas completados;
- eliminar elementos seleccionados;
- validar progreso.

---

# 🎨 Bootstrap

Bootstrap se utiliza principalmente para:

- sistema de grillas;
- cards;
- formularios;
- botones;
- badges;
- barras de progreso;
- flexbox;
- espaciado;
- responsive;
- sombras;
- bordes.

Esto permite mantener un diseño consistente evitando una cantidad excesiva de CSS personalizado.

---

# ✨ Bootstrap Icons

El proyecto integra:

```text
bootstrap-icons
```

Se utiliza mediante clases como:

```html
<i className="bi bi-person"></i>
```

Algunos ejemplos utilizados dentro del proyecto son:

```text
bi-person-lock
bi-clipboard-check
bi-signpost-split
bi-mortarboard
bi-list-check
bi-trophy-fill
```

---

# 🎞️ Animaciones

La interfaz incorpora animaciones CSS suaves.

Estas animaciones se utilizan principalmente en:

- cards;
- formularios;
- botones;
- opciones;
- menú móvil;
- secciones.

Las animaciones se mantienen integradas al diseño de Bootstrap y no utilizan Tailwind.

---

# 📱 Responsive Design

CareerPath AI utiliza Bootstrap para adaptarse a diferentes tamaños de pantalla.

Durante la revisión de Mi Ruta se probaron tamaños como:

```text
375 × 667
768 × 1024
1366 × 768
```

Se verificaron:

- títulos;
- tarjetas;
- barra de progreso;
- estadísticas;
- etapas;
- checkboxes;
- botones;
- Navbar;
- Footer.

---

# 🔍 SEO

El proyecto implementa SEO básico mediante:

```text
index.html
src/hooks/useSEO.js
```

El hook permite modificar dinámicamente:

```text
document.title
meta description
og:title
og:description
og:type
canonical URL
```

Mi Ruta también utiliza este hook.

---

# ❌ Página 404

El proyecto incorpora:

```text
src/pages/NotFound.jsx
```

React Router utiliza:

```jsx
<Route path="*" element={<NotFound />} />
```

para mostrar una página personalizada cuando la ruta solicitada no existe.

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/mmore-cloud/Career-Path-IA-frontend.git
```

## 2. Entrar a la carpeta

```bash
cd Career-Path-IA-frontend
```

## 3. Instalar dependencias

```bash
npm install
```

También puede utilizarse:

```bash
npm i
```

---

# ▶️ Ejecutar el proyecto

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173/
```

---

# 🏗️ Build de producción

Para generar la versión optimizada:

```bash
npm run build
```

La aplicación genera los archivos dentro de:

```text
dist/
```

Durante la implementación de la Parte 4 del TP Nº 7 se verificó correctamente el build utilizando Vite.

---

# 📜 Scripts disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo.

### Build

```bash
npm run build
```

Genera la versión de producción.

### Lint

```bash
npm run lint
```

Ejecuta ESLint.

### Preview

```bash
npm run preview
```

Permite probar localmente la versión generada por el build.

---

# 🌿 Organización con Git

La rama utilizada como base de desarrollo es:

```text
dev
```

Cada integrante trabaja utilizando una rama independiente.

Flujo recomendado:

```bash
git switch dev
git pull --ff-only origin dev
git switch -c nombre-de-rama
```

Después de completar el trabajo:

```bash
git add .
git commit -m "mensaje descriptivo"
git push -u origin nombre-de-rama
```

Finalmente se crea un Pull Request hacia:

```text
dev
```

No se realizan integraciones directas hacia `main` durante el desarrollo.

---

# 🌱 Ramas del TP Nº 7

La división de trabajo utiliza ramas independientes.

```text
feat/local-users-bootstrap-icons
feat/test-vocacional
feat/resultados-integracion
feat/ruta-integracion
```

La rama correspondiente a la Parte 4 es:

```text
feat/ruta-integracion
```

---

# 👥 División del trabajo

## Parte 1

Login local, registro, perfil vocacional, usuarios locales, Bootstrap Icons y animaciones.

## Parte 2

Test Vocacional y guardado de respuestas.

## Parte 3

Resultados conectados al Test y al perfil, recomendaciones y generación de la ruta.

## Parte 4

Mi Ruta, estados vacíos, progreso, integración final, README, responsive y build.

---

# 🌐 Deploy con Vercel

El proyecto está preparado para desplegarse mediante:

```text
Vercel
```

URL:

```text
https://career-path-ia-frontend.vercel.app
```

El archivo:

```text
vercel.json
```

contiene la configuración necesaria para que React Router funcione correctamente al acceder directamente a rutas como:

```text
/perfil
/test
/resultados
/ruta
```

---

# 🔗 Repositorios

## Repositorio actual

```text
https://github.com/mmore-cloud/Career-Path-IA-frontend
```

## Repositorio original

```text
https://github.com/Leandro-Nunez21/TP1-C9-TUP-UTN
```

---

# ✅ Estado técnico del TP Nº 7

Actualmente la aplicación cuenta con:

```text
✅ React + Vite
✅ React Router
✅ BrowserRouter
✅ Navbar con NavLink
✅ Bootstrap
✅ Bootstrap Icons
✅ Login local
✅ Registro local
✅ Sesión persistente
✅ Perfil vocacional
✅ Test Vocacional
✅ Resultados
✅ Carreras recomendadas
✅ localStorage
✅ Mi Ruta dinámica
✅ Estados vacíos
✅ RouteStep reutilizable
✅ RouteTopic reutilizable
✅ Etapas dinámicas
✅ Temas dinámicos
✅ Progreso automático
✅ Progreso por usuario y carrera
✅ Diseño responsive
✅ Animaciones CSS
✅ SEO básico
✅ Página 404
✅ Configuración de Vercel
✅ Build de producción verificado
```

---

# 🔮 Posibles mejoras futuras

La arquitectura actual permite continuar incorporando:

- backend;
- base de datos real;
- autenticación segura;
- recuperación de contraseña;
- Inteligencia Artificial real;
- recomendaciones más avanzadas;
- historial de tests;
- historial de rutas;
- sincronización entre dispositivos;
- APIs de universidades;
- panel administrativo.

---

# 📚 Información académica

**Proyecto:** CareerPath AI

**Trabajo Práctico:** Nº 7

**Carrera:** Tecnicatura Universitaria en Programación

**Institución:** Universidad Tecnológica Nacional

**Tipo de proyecto:** Frontend

**Tecnología principal:** React + Vite

**Equipo:** C9 TUP UTN

### Integrantes

- Leandro Nuñez
- Valentina Perez del Rien
- Tatiana Herrera
- Morena Marina Noguera

---

## © 2026 CareerPath AI

Proyecto académico desarrollado por el equipo **C9 TUP UTN**.