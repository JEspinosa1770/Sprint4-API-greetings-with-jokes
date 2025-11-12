# 🏬 Sprint 4 IT Academy - Ejercicios con APIs y TypeScript

Este repositorio contiene ejercicios diseñados para aprender a usar APIs en su forma más sencilla, con GETs. Se afianza el uso de  **testing** como método a seguir en cada proyecto antes de crear las funciones.

## Tabla de contenidos
1. [📄 Requisitos](#-requisitos)
2. [🛠️ Instalación](#️-instalación)
4. [📁 Estructura del Proyecto](#-estructura-del-proyecto)
5. [🚀 Funciones Implementadas](#-funciones-implementadas)
7. [💻 Tecnologías usadas](#-tecnologías-usadas)
6. [🎁 Demo](#-demo)
8. [🤝 Contribuciones y Contacto](#-contribuciones-y-contacto)

## 📄 Requisitos
Para poder ejecutar y desarrollar el proyecto, necesitas tener instalado en tu sistema:

* **Node.js**: Se recomienda la versión LTS (Long Term Support).
* **npm** o **Yarn** (o cualquier otro gestor de paquetes de Node.js).

## 🛠️ Instalación
Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias.

1. Accede a la carpeta local donde quieres clonar el repositorio.
2. Clona el repositorio con la terminal bash:
```bash
$ git clone https://github.com/JEspinosa1770/Sprint4-API-greetings-with-jokes
```
3. Ves a la carpeta del proyecto:
```bash
$ cd Sprint4-API-greetings-with-jokes
```
4. Si no lo tienes ya instalado, instala las dependencias del proyecto:
```bash
$ npm install
```
5. Ejecuta el proyecto:
```bash
$ npm run dev
```
Esto iniciará el servidor local, generalmente en http://localhost:5173/.

O transpila el proyecto con:
```bash
$ npm run build
```
y abre el `index.html` con tu navegador.

Para ejecutar los tests:
```bash
$ npm run test
```

## 📁 Estructura del Proyecto

El proyecto en este punto consta principalmente de los archivos:

1. `index.html`: Con la estructura básica de html. Sin maquetar y con estilos básico.
1. `main.ts`: Archivo typescript que tiene la función de distribuir las tareas.
4. `joke.test.ts`: Archivo con las pruebas unitarias de la función `getJoke()`.
3. `joke.ts`: Archivo typescript con la función principal `getJoke()`, encargada de solicitar un nuevo chiste a la API.
2. `interfaces.ts`: Contiene las interfaces necesarias para el programa.
3. `utils.ts`: Contiene diferentes utilidades, como la función que inserta el chiste en el DOM.
4. `vote-joke.test.ts`: Archivo con las pruebas unitarias para validar la función `vote-joke()`.
4. `vote-joke.ts`: Archivo con la función que manejará el voto de los chistes.
4. `style.css`: Estilos básicos.

---

## 🚀 Funciones Implementadas

A continuación, se describen las funciones disponibles en el proyecto.

### 🎬 *Ejercicio 1*
**Función:** `getJoke(url)`

**Descripción:** Obtiene los datos correspondientes a un chiste, que en este caso es la estructura de datos definida en `interfaces.ts`. ```url``` contiene la dirección de la web donde está la API.

**Comentarios:** Su test comprueba:
* que sea una función ✅
* que devuelve los datos esperados ✅
* que detecta y maneja un error de fetch o de red ✅
* que detecta y maneja un error de status, habiendo recibido correctamente los datos de la API ✅

### 🎬 *Ejercicio 2*

**Descripción:** Maquetación básica de la página web, definiendo la estructura y dando unos estilos iniciales. Diseño con mobile-first y responsive.

**Comentarios:** Se realiza la maquetación de la web con diseño responsive y mobile first. Se pone una imagen de fondo y se crea un título y una tarjeta donde se presentan los chistes.

![Monjes riendo](./images/sample_monjes.jpg)
---

### 🎬 *Ejercicio 3*

**Descripción:** Implementar un sistema de votación de los chistes, guardando los datos de cada voto en un array de datos.

**Comentarios:** Se crea el archivo `vote-joke.test.ts` para diseñar los test que deberá pasar la lógica necesaria de esta sección. Después se crea la función `voteJoke()` y las funciones auxiliares necesarias, como `findJoke()` y `haveVotedMessage()` en el archivo `utils.ts`. En `index.html` se crean los botones necesarios para seleccionar la satisfacción con el chiste y para emitir el voto. Se aplican los estilos necesarios para ello.

La función `findJoke()` se encarga de buscar si el chiste ya ha sido votado o no. Si lo ha sido, modifica la puntuación dada al chiste, sino, crea una puntuación nueva para el chiste.
```js
export function findJoke(joke: string): number { return reportJokes.findIndex(elem => elem.joke == joke) }
```

La función `haveVotedMessage()` presenta un mensaje en pantalla cada vez que se vota.

### 🎬 *Ejercicio 4*
**Función:** `getWeather()`

**Descripción:** Obtiene los datos del tiempo atmosférico de la ciudad de Barcelona. Los procesa y los muestra en un mensaje en la esquina superior izquierda de la web.

**Comentarios:** Su test comprueba:
* que sea una función ✅
* que detecta y maneja un error de fetch o de red ✅
* que detecta y maneja un error de status, habiendo recibido correctamente los datos de la API ✅

### 🎬 *Ejercicio 5*
**Función:** `getJoke(url)`

**Descripción:** Se definen dos fuentes más para obtener los datos correspondientes a un chiste, y se crea una función para que escoja aleatoriamente una de las tres fuentes. Se crea una función `normalizeJoke` para normalizar los campos que vienen de las diferentes fuentes.
```js
export function normalizeJoke(answer: Response, dataJoke: any, randomJoke: number): DataJoke {
  let jokeCatched: string;
  let idCatched: string;
  console.log(randomJoke)
  switch (randomJoke) {
      case 0:
          jokeCatched = dataJoke.joke;
          idCatched = dataJoke.id;
          break;
      case 1:
          jokeCatched = dataJoke.value;
          idCatched = dataJoke.id;
          break;   
      case 2:
          jokeCatched = dataJoke.setup + " -- " + dataJoke.punchline;
          idCatched = dataJoke.id;
          break;   
      default:
          throw new Error(`Problemas con la fuente de chistes`);
  }
  const finalJoke: DataJoke = {
      id: idCatched,
      joke: jokeCatched,
      status: answer.status
  }
  return finalJoke;
}
```

**Comentarios:** Su test comprueba:
* que sea una función ✅
* que devuelve los datos esperados ✅
* que detecta y maneja un error de fetch o de red ✅
* que detecta y maneja un error de status, habiendo recibido correctamente los datos de la API ✅


---

## 💻 Tecnologías usadas

Este proyecto está desarrollado utilizando las siguientes tecnologías y herramientas:

* **Vite**: Como herramienta de construcción (build tool) y servidor de desarrollo.
* **TypeScript**: Para el desarrollo del código, proporcionando tipado estático.
* **HTML5** y **CSS3**: Para la estructura y los estilos básicos de la interfaz de usuario.
* **Vitest**: Framework de pruebas unitarias para testing rápido y moderno.
---
## 🎁 Demo

Puede verse una demo del proyecto en su estado actual en:

https://jespinosa1770.github.io/Sprint4-API-greetings-with-jokes/

---
## 🤝 Contribuciones y Contacto
Este proyecto ha sido desarrollado por **Jordi Espinosa** como parte de unos ejercicios sobre APIs.

Cualquier sugerencia o consulta, contactad con: **[JEspinosa](https://github.com/JEspinosa1770)**


