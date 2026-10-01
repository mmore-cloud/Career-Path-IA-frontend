# 🎓 CareerPath AI

> Plataforma web de orientación vocacional desarrollada con React + Vite.

CareerPath AI es una aplicación web orientada a acompañar a estudiantes durante el proceso de explorar sus intereses, habilidades y posibles caminos académicos.

El proyecto corresponde al **Trabajo Práctico Nº 5** de la **Tecnicatura Universitaria en Programación de la Universidad Tecnológica Nacional (UTN)** y representa la evolución del proyecto original desarrollado con HTML, CSS, Bootstrap y JavaScript hacia una arquitectura moderna basada en **React + Vite**.

La aplicación organiza el recorrido del usuario en distintas etapas: presentación de la plataforma, creación del perfil, test vocacional, exploración de carreras, resultados y seguimiento de una ruta de aprendizaje.

---

# 👥 Equipo de desarrollo

**Equipo:** C9 TUP UTN

Integrantes:

- **Leandro Nuñez**
- **Valentina Perez del Rien**
- **Tatiana Herrera**
- **Morena Marina Noguera**

---

# 🎯 Objetivo del proyecto

El objetivo de CareerPath AI es ofrecer una experiencia clara, interactiva y organizada que ayude al estudiante a explorar distintas alternativas académicas y comenzar a construir su propio recorrido.

La plataforma permite:

- conocer la propuesta de CareerPath AI;
- completar información relacionada con el perfil del estudiante;
- realizar un test vocacional;
- responder preguntas relacionadas con intereses y preferencias;
- visualizar el progreso del test;
- explorar carreras;
- buscar carreras por nombre o descripción;
- filtrar carreras por área o tipo;
- guardar carreras favoritas;
- consultar una ruta de aprendizaje;
- marcar conocimientos como completados;
- visualizar el progreso general de aprendizaje;
- conservar determinada información mediante `localStorage`.

---

# 📌 Alcance actual

CareerPath AI se encuentra actualmente desarrollado como una aplicación **frontend**.

La versión actual incluye:

- navegación SPA mediante React Router;
- página de Inicio;
- página de Perfil;
- Test Vocacional interactivo;
- sección de Resultados;
- búsqueda y filtrado de carreras;
- favoritos almacenados en el navegador;
- Ruta de Aprendizaje interactiva;
- persistencia del progreso con `localStorage`;
- SEO básico;
- diseño responsive con Bootstrap;
- página personalizada de error 404;
- configuración para deploy mediante Vercel.

La arquitectura queda preparada para futuras ampliaciones como:

- backend;
- base de datos;
- autenticación;
- persistencia de usuarios;
- APIs externas;
- sistema de recomendaciones;
- integración real de Inteligencia Artificial.

> En el estado actual del proyecto, CareerPath AI representa el concepto y la arquitectura de una plataforma de orientación vocacional. La implementación de un motor real de Inteligencia Artificial queda planteada como una evolución futura del sistema.

---

# 🔄 Migración del proyecto

La primera versión del proyecto fue desarrollada principalmente con:

```text
HTML
CSS
Bootstrap
JavaScript
```

Durante el Trabajo Práctico Nº 5 se realizó la migración hacia:

```text
React
Vite
React Router
Bootstrap
JSX
Componentes reutilizables
Hooks
Datos separados de la interfaz
```

La migración no consistió simplemente en copiar archivos HTML a JSX.

El proyecto fue reorganizado para separar responsabilidades mediante:

```text
pages/
components/
data/
hooks/
assets/
```

Esta estructura permite obtener un código más modular, reutilizable, mantenible y preparado para seguir creciendo.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- React DOM
- JavaScript
- JSX
- HTML5
- CSS3

## Framework y herramientas visuales

- Bootstrap
- React Bootstrap

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

Las dependencias utilizadas por el proyecto se encuentran definidas en:

```text
package.json
```

Entre las principales se encuentran:

```text
React
React DOM
React Router DOM
Bootstrap
React Bootstrap
```

Vite se utiliza como herramienta de desarrollo y construcción del proyecto.

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

El punto de entrada de la aplicación es:

```text
src/main.jsx
```

Allí React renderiza el componente principal y utiliza:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

Esto permite que React Router administre la navegación interna de la aplicación.

---

# 📂 Estructura del proyecto

```text
Career-Path-IA-frontend/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── CareerPath.jpeg
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── CardItem.jsx
│   │   ├── CareerCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── OptionButton.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── RouteStep.jsx
│   │   ├── RouteTopic.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── SectionTitle.jsx
│   │
│   ├── data/
│   │   ├── careers.js
│   │   ├── homeFeatures.js
│   │   ├── menuItems.js
│   │   ├── routeTopics.js
│   │   └── testQuestions.js
│   │
│   ├── hooks/
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
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── .oxlintrc.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

# 🧭 Navegación con React Router

La aplicación utiliza:

```text
react-router-dom
```

para manejar la navegación como una SPA.

Las rutas principales se encuentran definidas en:

```text
src/App.jsx
```

Actualmente existen las siguientes rutas:

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Página principal |
| `/perfil` | Perfil | Información del estudiante |
| `/test` | Test | Test vocacional |
| `/resultados` | Resultados | Exploración de carreras |
| `/ruta` | Ruta | Ruta de aprendizaje |
| `*` | NotFound | Página de error 404 |

La configuración general es:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/perfil" element={<Perfil />} />
  <Route path="/test" element={<Test />} />
  <Route path="/resultados" element={<Resultados />} />
  <Route path="/ruta" element={<Ruta />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Esto permite navegar entre vistas sin tener que recargar completamente la aplicación.

---

# 🧭 Navbar y NavLink

El componente:

```text
src/components/Navbar.jsx
```

utiliza `NavLink` de React Router.

Los elementos del menú se encuentran separados dentro de:

```text
src/data/menuItems.js
```

Cada elemento posee información como:

```text
id
label
number
description
path
```

El Navbar recorre el array utilizando:

```jsx
menuItems.map(...)
```

para generar automáticamente las opciones de navegación.

También posee una versión responsive para dispositivos móviles.

El estado del menú se controla utilizando:

```javascript
useState
```

---

# 🔝 ScrollToTop

El proyecto incorpora:

```text
src/components/ScrollToTop.jsx
```

Este componente utiliza:

```javascript
useLocation()
```

para detectar los cambios de ruta.

Cuando cambia el `pathname`, se ejecuta:

```javascript
window.scrollTo(...)
```

Esto permite que al ingresar a una nueva página la vista vuelva automáticamente a la parte superior.

---

# 🏠 Inicio

La página:

```text
src/pages/Home.jsx
```

representa la presentación principal de CareerPath AI.

Utiliza los componentes:

```text
Hero
FeatureCard
```

El contenido de las tarjetas se encuentra separado en:

```text
src/data/homeFeatures.js
```

Actualmente se muestran tres etapas principales:

```text
01 Perfil
02 Test vocacional
03 Resultados
```

Las tarjetas son creadas dinámicamente utilizando:

```jsx
homeFeatures.map(...)
```

De esta manera se evita repetir manualmente la misma estructura JSX.

---

# 👤 Perfil

La página:

```text
src/pages/Perfil.jsx
```

utiliza el componente reutilizable:

```text
ProfileForm.jsx
```

El formulario incluye campos para:

- nombre y apellido;
- edad;
- ciudad;
- intereses principales;
- habilidades.

El componente recibe información mediante props.

Ejemplo:

```jsx
<ProfileForm
  title="Completá tus Datos Personales"
  buttonText="Guardar y Continuar"
/>
```

Actualmente esta sección representa la interfaz visual del perfil.

La persistencia definitiva de esta información podrá conectarse posteriormente con una base de datos o backend.

---

# 📝 Test Vocacional

La página:

```text
src/pages/Test.jsx
```

implementa un test vocacional interactivo.

Actualmente utiliza:

```javascript
useState
```

para manejar dos datos principales:

```text
currentIndex
userAnswers
```

Esto permite controlar:

- cuál es la pregunta actual;
- qué respuesta seleccionó el usuario;
- avance hacia la siguiente pregunta;
- navegación hacia la pregunta anterior;
- validación antes de continuar;
- porcentaje de progreso.

Las preguntas se encuentran separadas de la interfaz dentro de:

```text
src/data/testQuestions.js
```

Actualmente el test contiene:

```text
6 preguntas
```

Las opciones se relacionan con áreas como:

- Tecnología;
- Ingeniería;
- Construcción e Infraestructura;
- Industria.

---

# 🧩 QuestionCard y OptionButton

El test utiliza dos componentes reutilizables:

```text
QuestionCard.jsx
OptionButton.jsx
```

`QuestionCard` recibe mediante props:

```text
question
currentIndex
totalQuestions
selectedAnswer
onSelectOption
```

Las opciones de cada pregunta se generan mediante:

```jsx
question.options.map(...)
```

Cada opción es enviada al componente:

```text
OptionButton
```

evitando escribir manualmente cada alternativa.

---

# 📊 Resultados

La página:

```text
src/pages/Resultados.jsx
```

utiliza los datos almacenados en:

```text
src/data/careers.js
```

Las carreras se muestran utilizando:

```text
CareerCard.jsx
```

La página implementa:

- búsqueda por nombre;
- búsqueda por descripción;
- filtrado por área o tipo;
- renderizado dinámico;
- mensaje cuando no existen coincidencias;
- almacenamiento de favoritos.

Las carreras primero son filtradas utilizando:

```javascript
filter()
```

y posteriormente son mostradas con:

```jsx
filteredCareers.map(...)
```

---

# ⭐ Favoritos

La página Resultados utiliza:

```javascript
localStorage
```

para almacenar las carreras favoritas seleccionadas por el usuario.

La clave utilizada actualmente es:

```text
utn_favorites
```

Esto permite conservar los identificadores de las carreras favoritas dentro del navegador.

---

# 🛣️ Mi Ruta

La página:

```text
src/pages/Ruta.jsx
```

representa el recorrido de aprendizaje del estudiante.

Esta sección fue migrada desde la implementación del repositorio anterior hacia React.

La nueva estructura utiliza:

```text
Ruta.jsx
RouteStep.jsx
RouteTopic.jsx
routeTopics.js
```

La lógica anterior basada en manipulación directa del DOM fue adaptada a:

```text
useState
useEffect
props
map()
localStorage
```

---

# 🎯 Objetivo profesional de Mi Ruta

La ruta utiliza como objetivo inicial:

```text
Desarrollo de Software
```

La información relacionada con el objetivo se encuentra separada de la interfaz dentro de:

```text
src/data/routeTopics.js
```

De esta forma los datos pueden modificarse sin alterar directamente el componente visual.

---

# 🗺️ Etapas de aprendizaje

Mi Ruta se encuentra organizada en tres etapas.

## 01 — Fundamentos

Incluye:

- Algoritmos
- Lógica de programación
- HTML y CSS
- Git y GitHub

## 02 — Desarrollo

Incluye:

- JavaScript
- Bases de datos
- Programación Backend
- APIs

## 03 — Especialización

Incluye:

- Inteligencia Artificial
- Desarrollo web
- Desarrollo de aplicaciones
- Cloud Computing

En total la ruta contiene:

```text
3 etapas
12 temas de aprendizaje
```

---

# 🧩 RouteStep

El componente:

```text
src/components/RouteStep.jsx
```

representa una etapa completa de aprendizaje.

Recibe mediante props:

```text
etapa
temasCompletados
onToggleTema
abiertoInicial
```

Cada etapa puede abrirse o cerrarse.

Para controlar este comportamiento se utiliza:

```javascript
useState
```

Los temas pertenecientes a la etapa se generan utilizando:

```jsx
etapa.temas.map(...)
```

Esto permite reutilizar el mismo componente para las tres etapas.

---

# ✅ RouteTopic

El componente:

```text
src/components/RouteTopic.jsx
```

representa cada tema individual de aprendizaje.

Recibe:

```text
topic
completado
onToggle
```

El checkbox se encuentra controlado por React:

```jsx
checked={completado}
```

Cuando el usuario marca o desmarca un tema:

```jsx
onChange={() => onToggle(topic.id)}
```

se informa al componente padre qué elemento fue modificado.

Esto permite mantener el estado general de la ruta centralizado.

---

# 📈 Progreso dinámico de Mi Ruta

El porcentaje de progreso no se encuentra escrito manualmente.

Se calcula automáticamente utilizando la cantidad de temas completados.

Conceptualmente:

```text
temas completados / total de temas × 100
```

Ejemplos:

```text
0 de 12  → 0%
3 de 12  → 25%
6 de 12  → 50%
9 de 12  → 75%
12 de 12 → 100%
```

La interfaz muestra:

- barra de progreso;
- porcentaje general;
- cantidad de temas completados;
- cantidad de temas pendientes;
- porcentaje de avance;
- mensaje al alcanzar el 100%.

---

# 💾 Persistencia de Mi Ruta

Mi Ruta utiliza:

```javascript
useState
useEffect
localStorage
```

Los temas completados son almacenados bajo la clave:

```text
careerpath-ruta-completados
```

Cada vez que cambia el estado:

```javascript
useEffect(...)
```

actualiza automáticamente el contenido almacenado en el navegador.

Esto permite que el usuario pueda actualizar la página y conservar los temas previamente marcados.

---

# 💡 Conocimientos recomendados

La Ruta también contiene una sección de conocimientos recomendados.

Entre ellos se encuentran:

- HTML y CSS;
- JavaScript;
- Bases de datos;
- Git y GitHub;
- Inteligencia Artificial;
- APIs;
- Backend.

Los datos se encuentran almacenados dentro de:

```text
recommendedTopics
```

y son renderizados mediante:

```jsx
recommendedTopics.map(...)
```

---

# 🧩 Componentes reutilizables

Una parte importante de la migración consiste en dividir la interfaz en componentes pequeños y reutilizables.

Entre los principales componentes se encuentran:

| Componente | Función |
|---|---|
| `Navbar` | Navegación principal |
| `Footer` | Pie de la aplicación |
| `Hero` | Presentación de Inicio |
| `FeatureCard` | Tarjetas de funcionalidades |
| `ProfileForm` | Formulario de Perfil |
| `QuestionCard` | Estructura de preguntas |
| `OptionButton` | Alternativas del Test |
| `CareerCard` | Tarjeta de carrera |
| `RouteStep` | Etapa de aprendizaje |
| `RouteTopic` | Tema individual |
| `SectionTitle` | Encabezados reutilizables |
| `ScrollToTop` | Control de scroll al cambiar de ruta |

---

# 📥 Uso de props

Las props permiten enviar datos y funciones desde un componente padre hacia un componente hijo.

Por ejemplo, en Mi Ruta:

```jsx
<RouteTopic
  topic={topic}
  completado={temasCompletados.includes(topic.id)}
  onToggle={onToggleTema}
/>
```

En este caso:

```text
topic
```

contiene la información correspondiente al tema.

```text
completado
```

indica si el tema está marcado.

```text
onToggle
```

permite comunicar una acción nuevamente hacia el componente padre.

Gracias a esto se puede reutilizar el mismo componente para todos los temas de la ruta.

---

# 🔁 Uso de map()

El proyecto utiliza `map()` para transformar arrays de datos en elementos visuales.

Algunos ejemplos son:

```text
menuItems.map(...)
homeFeatures.map(...)
question.options.map(...)
filteredCareers.map(...)
routeTopics.map(...)
etapa.temas.map(...)
recommendedTopics.map(...)
```

Esto permite evitar estructuras JSX repetidas y trabajar con contenido dinámico.

---

# 🔎 Uso de filter()

También se utiliza:

```javascript
filter()
```

para seleccionar determinados elementos.

Ejemplos:

- filtrar carreras según la búsqueda;
- filtrar carreras según su área;
- obtener los temas completados;
- eliminar favoritos;
- remover temas marcados.

---

# 🗃️ Separación de datos

Los datos que utiliza la aplicación se encuentran separados de los componentes visuales.

La carpeta:

```text
src/data/
```

contiene:

| Archivo | Responsabilidad |
|---|---|
| `careers.js` | Información de carreras |
| `homeFeatures.js` | Tarjetas de Inicio |
| `menuItems.js` | Elementos de navegación |
| `routeTopics.js` | Etapas y temas de Mi Ruta |
| `testQuestions.js` | Preguntas del Test |

Esta separación permite modificar información sin tener que cambiar directamente la estructura visual.

---

# 🪝 Hooks

La aplicación utiliza distintos hooks.

## useState

Permite manejar estados que cambian durante la ejecución.

Se utiliza, por ejemplo, para:

- menú móvil;
- respuestas del Test;
- pregunta actual;
- filtros;
- búsqueda;
- temas completados;
- apertura de etapas.

---

## useEffect

Permite ejecutar lógica cuando cambia determinado estado o información.

Se utiliza, entre otras cosas, para:

- guardar el progreso de Mi Ruta;
- administrar SEO;
- controlar determinadas acciones posteriores al renderizado.

---

## useLocation

Se utiliza dentro de:

```text
ScrollToTop.jsx
```

para detectar cuándo cambia la ruta actual.

---

# 🔍 SEO

El proyecto implementa SEO básico.

Dentro de:

```text
index.html
```

se encuentran configurados elementos como:

- idioma del documento;
- `charset`;
- viewport;
- meta description;
- keywords;
- autor;
- título inicial.

Además existe un hook personalizado:

```text
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

Esto permite que determinadas páginas tengan información SEO específica.

Mi Ruta también utiliza este sistema para definir su propio título, descripción y URL canónica.

---

# ❌ Página 404

El proyecto incorpora:

```text
src/pages/NotFound.jsx
```

React Router utiliza esta página mediante:

```jsx
<Route path="*" element={<NotFound />} />
```

Si el usuario intenta ingresar a una ruta inexistente, se muestra una interfaz personalizada que permite volver al Inicio.

---

# 📱 Responsive Design

CareerPath AI utiliza principalmente Bootstrap para adaptar la aplicación a diferentes tamaños de pantalla.

Se utilizan clases como:

```text
container
row
col-12
col-md-6
col-lg-4
d-flex
flex-wrap
gap
```

El proyecto está preparado para visualizarse en:

- dispositivos móviles;
- tablets;
- notebooks;
- computadoras de escritorio.

Durante la revisión responsive de Mi Ruta se verificaron elementos como:

- títulos;
- tarjetas;
- etapas;
- checkboxes;
- barra de progreso;
- estadísticas;
- botones;
- Navbar;
- Footer.

---

# 🎨 Bootstrap

Bootstrap se utiliza para resolver gran parte del diseño y comportamiento visual.

Entre los elementos utilizados se encuentran:

- sistema de grillas;
- cards;
- badges;
- botones;
- formularios;
- barras de progreso;
- bordes;
- sombras;
- espaciado;
- flexbox;
- alineación;
- utilidades responsive.

Esto permite evitar una cantidad excesiva de CSS personalizado.

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

## 3. Instalar las dependencias

```bash
npm install
```

También puede utilizarse:

```bash
npm i
```

Ambos comandos instalan las dependencias definidas dentro de:

```text
package.json
```

---

# ▶️ Ejecutar el proyecto

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

---

# 📜 Scripts disponibles

El proyecto dispone de los siguientes scripts:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo.

---

## Build

```bash
npm run build
```

Genera la versión optimizada de producción dentro de:

```text
dist/
```

---

## Lint

```bash
npm run lint
```

Ejecuta ESLint sobre el código del proyecto.

---

## Preview

```bash
npm run preview
```

Permite ejecutar localmente la versión creada mediante:

```bash
npm run build
```

---

# 🌿 Organización con Git

La rama utilizada como base de desarrollo es:

```text
dev
```

Cada integrante trabaja utilizando una rama independiente.

El flujo general es:

```bash
git switch dev
git pull --ff-only origin dev
git switch -c nombre-de-rama
```

Después de completar y probar el trabajo:

```bash
git add .
git commit -m "mensaje descriptivo"
git push -u origin nombre-de-rama
```

Posteriormente se crea un:

```text
Pull Request
```

hacia:

```text
dev
```

Durante el desarrollo no se realizan integraciones directamente hacia `main`.

---

# 🌱 Ramas utilizadas en esta etapa

Entre las ramas utilizadas durante esta etapa se encuentran:

```text
feat/react-router-navigation
feat/home-profile-seo
feat/test-results
feat/route-readme-deploy
```

Cada rama corresponde a un bloque específico de trabajo.

---

# 👥 División de tareas

La migración se organizó en diferentes partes para reducir conflictos entre integrantes.

```text
Parte 1
React Router + navegación

Parte 2
Inicio + Perfil + SEO

Parte 3
Test Vocacional + Resultados

Parte 4
Mi Ruta + README + Responsive + Deploy
```

Cada integrante desarrolla su parte de forma independiente y posteriormente se integra mediante Pull Request hacia `dev`.

---

# 🌐 Deploy con Vercel

El proyecto está preparado para desplegarse utilizando:

```text
Vercel
```

URL del proyecto:

```text
https://career-path-ia-frontend.vercel.app
```

El repositorio contiene:

```text
vercel.json
```

con la siguiente configuración:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Esta configuración es importante para React Router.

Permite acceder directamente a rutas como:

```text
/perfil
/test
/resultados
/ruta
```

sin que Vercel devuelva un error 404 del servidor.

---

# 🔗 Repositorios

## Repositorio actual

Proyecto desarrollado con React + Vite:

```text
https://github.com/mmore-cloud/Career-Path-IA-frontend
```

## Repositorio anterior

Proyecto utilizado como referencia durante la migración:

```text
https://github.com/Leandro-Nunez21/TP1-C9-TUP-UTN
```

---

# ✅ Estado técnico actual

Actualmente el proyecto cuenta con:

```text
✅ React + Vite configurado
✅ Bootstrap integrado
✅ React Router implementado
✅ BrowserRouter configurado
✅ Navbar utilizando NavLink
✅ Menú responsive
✅ ScrollToTop implementado
✅ Página 404 personalizada
✅ Inicio migrado
✅ Perfil migrado visualmente
✅ Test Vocacional interactivo
✅ Preguntas separadas en src/data
✅ Resultados con búsqueda
✅ Resultados con filtros
✅ Carreras renderizadas con map()
✅ Favoritos mediante localStorage
✅ Mi Ruta migrada
✅ RouteStep reutilizable
✅ RouteTopic reutilizable
✅ 3 etapas de aprendizaje
✅ 12 temas de aprendizaje
✅ Progreso dinámico
✅ Estadísticas de progreso
✅ Persistencia de Mi Ruta
✅ Uso de props
✅ Uso de map()
✅ Uso de filter()
✅ Uso de useState
✅ Uso de useEffect
✅ Datos separados de la interfaz
✅ Hook personalizado de SEO
✅ Responsive revisado
✅ Configuración de Vercel incluida
```

---

# 🔮 Posibles mejoras futuras

La arquitectura actual permite continuar evolucionando el proyecto.

Algunas mejoras posibles son:

- implementar backend;
- incorporar base de datos;
- crear autenticación de usuarios;
- guardar perfiles de forma permanente;
- relacionar respuestas del Test con recomendaciones reales;
- desarrollar un algoritmo de matching;
- integrar un sistema real de Inteligencia Artificial;
- crear resultados personalizados;
- generar rutas diferentes según cada usuario;
- guardar el historial de tests;
- incorporar un panel administrativo;
- consumir información académica desde APIs externas;
- agregar instituciones educativas adicionales.

---

# 📚 Información académica

**Proyecto:** CareerPath AI

**Trabajo Práctico:** Nº 5

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