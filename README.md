# README

[![Platform](https://img.shields.io/badge/node-%3E%3D12.x%20%3C15.0.0-green)](https://developer.ibm.com/languages/node-js)

[![Platform](https://img.shields.io/badge/typescript-%5E4.7.4-blue)](https://www.typescriptlang.org/)

[![Platform](https://img.shields.io/badge/TYPEORM-0.3.7-orange)](https://typeorm.io/)

Wordle REST-API, designed with Node.js, Typescript, TypeORM, Postgres & Docker

### Stack

- Typescript
- Node.js
- TypeORM
- Docker
- Postgres

### Table of Contents

- [Nombre del proyecto](#nombre-del-proyecto)
- [Resumen](#resumen)
- [Desarrollador](#desarrollador)
- [Instalación](#instalación)
- [Postman](#postman)
- [Enviroments](#enviroments)

### Nombre del proyecto

API WORDLE

### Resumen

[Wordle](https://es.wikipedia.org/wiki/Wordle) es un juego de palabras de navegador desarrollado por Josh Wardle, un programador que previamente había creado los experimentos sociales Place y The Button para Reddit.

Estos son algunos endpoints que ayudarán para dar funcionalidad al juego.

> Funcionalidad 1: Un usuario solo tiene 5 intentos para evaluar la palabra.

> Funcionalidad 2: Cada 5 minutos se seleccionará una nueva palabra, no se deberá repetir la palabra.

> Funcionalidad 3: Cada vez que se genera una nueva palabra, el contador de intentos se reinicia a 0 para todos los usuarios

> Funcionalidad 4: Permitirá obtener cuantas partidas a jugado un usuario y cuantas victorias ha tenido.

> Funcionalidad 5: Permitirá obtener los mejores 10 jugadores con su número de victorias

> Funcionalidad 6: Permitirá obtener las palabras más acertadas.

### Desarrollador

- Oscar Pérez González

#### Pre-requisitos:

- Versión de **_Nodejs_** declarada en el repositorio **_GitHub_** del proyecto debe de ser mayor a **_12.0.0_** y menor **_15.0.0_**.

- Se hace uso de Docker para la creación de la base de datos Local.

- Una vez creada la base de datos local ejecutar el script INSERT_WORDS

Use the package manager npm to install modules.

### Instalación

#### Scripts Development

```console
> npm install
```

```console
> npm run db-start
```

_Ejecutar script en base de datos (DBeaver)_

```console
> npm run dev
```

_Output_

```console
> ts-node-dev --respawn src/index.ts

[INFO] 05:53:41 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.7.4)
Database connected
Server is listening on port 3000
```

```console
> npm test
```

_Output_

```console
Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        13.963 s, estimated 15 s
Ran all test suites.
```

#### Scripts Production

```console
> npm run build
```

```console
> npm start
```

### Postman

Testing con Postman

- Import the collection from postman folder.

### Enviroments

| env              | value       |
| ---------------- | ----------- |
| DB_HOST          | localhost   |
| DB_USERNAME      | userdd3     |
| DB_PASSWORD      | password    |
| DB_PORT          | 5432        |
| DB_DATABASE      | wordledb    |
| NODE_RUN_ENV     | dev or prod |
| TIME_CHANGE_WORD | 5           |
| USER_ATTEMPTS    | 5           |
