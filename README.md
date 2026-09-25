# 🎓 CareerPath AI

CareerPath AI es una plataforma web de orientación vocacional pensada para ayudar a estudiantes a conocer mejor sus intereses, habilidades y posibles caminos académicos.

Este proyecto corresponde al Trabajo Práctico Nº 5 y consiste en la migración del proyecto anterior a una nueva aplicación frontend desarrollada con React + Vite.

---

## 🚀 Objetivo del proyecto

El objetivo de CareerPath AI es ofrecer una experiencia simple e interactiva donde el usuario pueda:

- Conocer información sobre la plataforma.
- Completar su perfil.
- Realizar un test vocacional.
- Visualizar posibles carreras.
- Consultar una ruta de aprendizaje personalizada.

---

## 🛠️ Tecnologías utilizadas

- React
- Vite
- JavaScript
- JSX
- Bootstrap
- HTML5
- CSS3
- Git
- GitHub
- npm

---

## 📂 Estructura del proyecto

```text
Career-Path-IA-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── CardItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── RouteStep.jsx
│   │   ├── RouteTopic.jsx
│   │   └── SectionTitle.jsx
│   │
│   ├── data/
│   │   ├── careers.js
│   │   ├── menuItems.js
│   │   ├── routeTopics.js
│   │   └── testQuestions.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
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
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 📄 Páginas principales

### 🏠 Inicio

Presenta CareerPath AI y permite al usuario conocer las principales funcionalidades de la plataforma.

### 👤 Perfil

Permite visualizar y completar información relacionada con el perfil del estudiante.

### 📝 Test vocacional

Presenta preguntas y opciones de respuesta para conocer los intereses y preferencias del usuario.

### 📊 Resultados

Muestra carreras y alternativas relacionadas con los resultados obtenidos.

### 🛣️ Mi Ruta

Muestra el recorrido de aprendizaje del usuario, incluyendo progreso, etapas y próximos pasos.

La página utiliza componentes reutilizables como:

- `RouteStep`
- `RouteTopic`

Los datos de las etapas se encuentran separados en:

`src/data/routeTopics.js`

---

## 🧩 Componentes reutilizables

La aplicación está dividida en componentes para evitar repetir código y mantener una estructura organizada.

Los componentes reciben información mediante `props`, permitiendo reutilizar una misma estructura con diferentes datos.

Ejemplo:

```jsx
<RouteTopic
  titulo={topic.titulo}
  descripcion={topic.descripcion}
  estado={topic.estado}
/>
```

---

## 💻 Instalación

Primero se debe clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar en la carpeta del proyecto:

```bash
cd Career-Path-IA-frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

---

## 📦 Build de producción

Para comprobar que el proyecto puede compilarse correctamente:

```bash
npm run build
```

El resultado de producción se genera en la carpeta:

```text
dist/
```

---

## 🌐 Responsive

La interfaz utiliza Bootstrap para adaptarse a diferentes tamaños de pantalla.

Se contemplan principalmente:

- Computadoras.
- Tablets.
- Dispositivos móviles.

---

## 🌿 Organización con Git

El proyecto utiliza la rama:

```text
dev
```

como rama base de desarrollo.

Cada integrante trabaja en una rama independiente y posteriormente realiza un Pull Request hacia `dev`.

Algunas ramas utilizadas son:

```text
feat/base-layout
feat/inicio-perfil
feat/test-resultados
feat/ruta-deploy
```

---

## 👥 Integrantes

Proyecto desarrollado por estudiantes de la Tecnicatura Universitaria en Programación.

**Equipo:** C9 TUP UTN

> Agregar aquí los nombres de todos los integrantes del grupo.

---

## 🌐 Deploy

El proyecto será desplegado utilizando Vercel.

Una vez publicado, el enlace de producción se colocará aquí:

```text
Deploy: pendiente
```

---

## ✅ Estado del proyecto

- React + Vite configurado.
- Bootstrap implementado.
- Componentes reutilizables.
- Uso de props.
- Páginas principales migradas.
- Diseño responsive.
- Build de producción funcionando.
- Deploy en Vercel pendiente.

---

## 📚 Trabajo Práctico Nº 5

**Proyecto:** CareerPath AI  
**Tecnología principal:** React + Vite  
**Tipo de proyecto:** Frontend  
**Institución:** UTN  
**Carrera:** Tecnicatura Universitaria en Programación