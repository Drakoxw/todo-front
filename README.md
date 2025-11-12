# 🌍 FRONT APP

Este proyecto es una aplicación web construida con **Angular** y desplegada en **Netlify** o usando **Docker**.

### Arquitectura de modulos orientada a servicios (MVVM). 

> [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

---

## 📦 Tecnologías utilizadas
- [Angular 20 (sin ZoneJs)](https://angular.dev/) - Framework frontend
- [Docker](https://www.docker.com/) - Contenerización
- [Nginx](https://nginx.org/) - Servidor web para producción
- [Node.js 22.20.0](https://nodejs.org/) - Entorno de construcción

---

## 🌐 App Desplegada
Despliegue realizado en netlify


Instalar dependencias e iniciar app
```sh
npm install
npm start
```

> [http://localhost:4200](http://localhost:4200) en el navegador

## 🐳 Construcción con Docker
#### Compose
Crear el contenedor e iniciarlo
```sh
docker-compose up --build -d    
```

#### Manual

Crear el contenedor e iniciarlo
```sh
docker build -t front-app .
```
```sh
docker run -p 4000:80 front-app
```
> Abre el navegador: [http://127.0.0.1:4000](http://127.0.0.1:4000)

## 🔬 Pruebas Unitarias

```sh
npm run test
```

## 🔭 Pruebas E2E

```sh
npm run e2e
```
> Ver reporte
```sh
npx playwright show-report
```

## 👤 Autor

### Wilmar RM (Drako)

* 📧 drakowdev@gmail.com
* 🌐 [linkedin](https://www.linkedin.com/in/wilmar-roncancio-mendez-b344761bb/)
* 📱[+57 310 801 83888](https://wa.me/573108018388)
