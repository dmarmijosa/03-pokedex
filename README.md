<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el comando
```bash
$npm install
```
3. Tener Nest CLI instalado
```bash
npm i -g @nestjs/cli
```
4. Levantar la base de datos
````
docker-compose up-d
````
## Stack usado
* MongoDB
* Nestjs

5. Clonar el archivo __.env.template__ y renombrar a __.env__

6. Llenar las variables de entorno definidas en el __.env__

7. Ejecutar la aplicación con:
````
npm run start:dev
````
8. Reconstruir la base de datos con la semilla
```bash
GET http://localhost:3000/api/v1/seed
```
