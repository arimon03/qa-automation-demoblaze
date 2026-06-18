PROYECTO: QA Automation Demoblaze con Cypress

DESCRIPCION
Este proyecto resuelve un reto tecnico de automatizacion QA usando Cypress con JavaScript.
Incluye pruebas E2E sobre el flujo de compra en https://www.demoblaze.com/ y pruebas API sobre los endpoints de signup y login de Demoblaze.

ESTRUCTURA DEL PROYECTO
qa-automation-demoblaze/
  cypress/
    e2e/
      demoblaze-e2e.cy.js
      demoblaze-api.cy.js
    fixtures/
    support/
      commands.js
      e2e.js
  cypress.config.js
  package.json
  README.txt
  conclusiones.txt

REQUISITOS PREVIOS
1. Tener instalado Node.js en version LTS recomendada.
2. Tener acceso a internet para ejecutar las pruebas contra Demoblaze.
3. Usar una terminal ubicada en la carpeta raiz del proyecto qa-automation-demoblaze.

INSTALACION
1. Abrir una terminal.
2. Ingresar a la carpeta del proyecto:
   cd qa-automation-demoblaze
3. Instalar dependencias:
   npm install

EJECUCION DE PRUEBAS
Ejecutar todas las pruebas en modo headless:
   npx cypress run

Ejecutar todas las pruebas usando script npm:
   npm test

Ejecutar solo la prueba E2E:
   npm run test:e2e

Ejecutar solo las pruebas API:
   npm run test:api

Abrir Cypress en modo interactivo:
   npm run cy:open

PRUEBA E2E
Archivo:
   cypress/e2e/demoblaze-e2e.cy.js

Flujo cubierto:
1. Ingresa a https://www.demoblaze.com/.
2. Agrega dos productos al carrito.
3. Maneja y valida las alertas del navegador al agregar productos.
4. Abre el carrito.
5. Valida que los dos productos agregados esten presentes.
6. Completa el formulario de compra.
7. Finaliza la compra.
8. Valida el mensaje de confirmacion: Thank you for your purchase!

PRUEBAS API
Archivo:
   cypress/e2e/demoblaze-api.cy.js

Endpoints cubiertos:
1. POST https://api.demoblaze.com/signup
2. POST https://api.demoblaze.com/login

Casos cubiertos:
1. Crear un usuario nuevo con username dinamico.
2. Intentar crear el mismo usuario nuevamente.
3. Login con usuario y password correctos.
4. Login con password incorrecto.

DATOS DE PRUEBA
Las pruebas API generan un username dinamico usando fecha/hora y un numero aleatorio para evitar conflictos por repeticion.
La prueba E2E usa datos de comprador ficticios, sin informacion real de tarjetas.

RESULTADOS
Al ejecutar npx cypress run, Cypress genera resultados en consola.
Si una prueba falla, Cypress puede generar capturas de pantalla y videos segun la configuracion del proyecto.

NOTAS
Demoblaze es un sitio publico de practica. Su disponibilidad, tiempos de respuesta o cambios en UI/API pueden afectar la ejecucion.
Las esperas se manejan principalmente con aserciones de Cypress, evitando waits fijos innecesarios.
