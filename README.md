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
Despliegue realizado en netlify [Ir](https://drako-todo-app.netlify.app)


## 🧬 App Local
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

## 🔬 Decisiones técnicas

* Para aprovechar las nuevas caracteristicas se uso Angular20
* Arquitectura en modulos y MVVM
* Los servicios que hacen consumos de Apis esta separados de los servicios que usan los componentes y entregan una respuesta limpia en cada request.
* El estado global de la App se implemento un Store con NgRxStore y Signals, donde presta una manera instantanea y optima de gestionar los datos y con la facilidad de cambiar de persistencia a `localSession`, `localStorage`, `IndexDB`
* Se usa los Guards para proteger las rutas.
* Carga perezosa de y en los Routers de los modulos.
* Interceptor para injectar el token.
* PrimeNg para IU de celulas y atomos.
* Tailwind para el CSS.
* Karma y Jest para pruebas unitarias.
* Playwright para las pruebas `E2E`
* Uso de CustomValidators y CustomPipes


## 👤 Autor

### Wilmar RM (Drako)

* 📧 drakowdev@gmail.com
* 🌐 [linkedin](https://www.linkedin.com/in/wilmar-roncancio-mendez-b344761bb/)
* 📱[+57 310 801 83888](https://wa.me/573108018388)
