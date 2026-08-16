# Estándar de seguridad web

## Propósito

Integrar la seguridad durante el desarrollo y verificarla antes de publicar. No se
considera una tarea exclusiva del último hito.

## Referencia

El proyecto adopta **OWASP ASVS 5.0, nivel 1**, como base mínima verificable para
una aplicación web. El nivel deberá revisarse si se incorporan autenticación,
datos sensibles, pagos u operaciones con mayor impacto.

La aplicación de cada control será proporcional a las funciones realmente
implementadas.

## Criterio de trabajo

Cada funcionalidad seguirá este ciclo:

```text
IDENTIFICAR entradas, datos y servicios externos
    ↓
DEFINIR controles antes de implementar
    ↓
IMPLEMENTAR el mínimo privilegio y valores seguros por defecto
    ↓
PROBAR casos válidos, inválidos y manipulados
    ↓
DOCUMENTAR controles y riesgos pendientes
```

El cierre del proyecto incluirá una verificación general, pero no sustituirá los
controles aplicados en cada hito.

## Inventario actual

Inventario realizado sobre el estado del proyecto del 14 de agosto de 2026.

| Superficie                   | Estado observado                                                                        | Control o decisión pendiente                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Formulario de respuesta      | Presente sin `action`, envío ni tratamiento JavaScript                                  | Definir destino, tratamiento de datos y controles antes de habilitarlo     |
| Campos del formulario        | `name`, `email`, `subject` y `message`; solo el correo dispone de validación de tipo    | Definir obligatoriedad, longitudes y formatos permitidos                   |
| Validación                   | Constraint Validation API planificada                                                   | Validar también en el servidor cuando exista backend                       |
| Escritura en el DOM          | Se utilizan `textContent`, nodos de texto y atributos controlados                       | Mantener APIs seguras y evitar HTML generado desde datos no confiables     |
| Recursos externos            | Dos hojas de estilo de Font Awesome desde cdnjs                                         | Valorar alojamiento local o fijar integridad y una política CSP compatible |
| Enlaces externos             | LinkedIn utiliza `target="_blank"` con `noopener noreferrer`                            | Mantener este patrón                                                       |
| Código dinámico              | No se observan `eval`, `new Function` ni inserciones mediante `innerHTML`               | Conservar esta restricción                                                 |
| Persistencia cliente         | No se observan cookies, `localStorage` ni `sessionStorage`                              | Evaluar finalidad, caducidad y exposición antes de incorporarlos           |
| Comunicaciones               | No se observan llamadas `fetch`, API ni WebSocket                                       | Definir orígenes autorizados y manejo de errores al incorporarlos          |
| Autenticación y autorización | No implementadas                                                                        | Revisar el nivel ASVS si pasan a formar parte del alcance                  |
| Secretos                     | No se observan credenciales en el código revisado                                       | No introducir secretos en el front-end ni en variables expuestas por Vite  |
| Encabezados HTTP             | No definidos en el repositorio                                                          | Configurarlos y comprobarlos en el alojamiento de producción               |
| Dependencias                 | Vite y Playwright como dependencias de desarrollo                                       | Revisar vulnerabilidades y mantener el archivo de bloqueo                  |
| Pruebas                      | Pruebas E2E funcionales; no hay matriz específica de seguridad                          | Añadir casos negativos junto con cada superficie nueva                     |
| Interacciones narrativas     | Origin y Memory usan eventos, atributos `data-*` y Web Animations API con datos locales | Mantener estados cerrados y evitar interpretar contenido no confiable      |
| Recursos de secciones        | Imágenes de Cover, Origin y Memory servidas desde rutas locales                         | Optimizar formatos y eliminar recursos sin uso durante la auditoría final  |
| Movimiento reducido          | Implementado en Origin y Memory                                                         | Extender el mismo criterio a cada sección futura                           |

Este inventario describe el código visible y no acredita por sí solo la seguridad
del futuro alojamiento, CDN o backend.

## Revisión de exposición local

Revisión actualizada para la versión publicada `v3.0.2`:

- no se detectan rutas absolutas en README ni en `docs/`;
- no existen archivos `.env`, claves privadas o certificados versionados;
- no se detectan credenciales, tokens, contraseñas ni claves API en texto;
- no se detectan direcciones de correo en los archivos revisados;
- no se utilizan `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`,
  `new Function` ni `document.write` en la aplicación;
- no se observan cookies, almacenamiento web ni comunicaciones remotas desde
  JavaScript;
- los recursos narrativos se cargan desde rutas relativas del proyecto.

Permanece como superficie externa Font Awesome mediante cdnjs. Continúa pendiente
incorporar SRI o alojar el recurso localmente y definir una CSP compatible antes
de publicar.

La etiqueta Git canónica `v3.0.2` y el valor `3.0.2` de `package.json` están
sincronizados. La etiqueta histórica `v.3.1.0` no sigue la convención acordada y
no se utiliza como referencia de publicación ni de trazabilidad.

## Controles durante el desarrollo

### Entradas y salidas

- Considerar no confiables los formularios, parámetros URL, datos remotos y
  contenido de terceros.
- Validar formato, longitud, tipo y reglas de negocio mediante listas de valores
  permitidos cuando sea posible.
- Aplicar la validación en el cliente para facilitar el uso y repetirla siempre en
  el servidor para establecer seguridad.
- Insertar texto no confiable mediante `textContent` o nodos de texto.
- Evitar `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval` y código generado
  dinámicamente. Si una función futura exige HTML enriquecido, utilizar una
  biblioteca mantenida y una política de saneamiento explícita.

### Formulario de respuesta

Antes de habilitar su envío se deberá definir:

- finalidad y destino de cada dato;
- campos obligatorios y límites de longitud;
- validación sintáctica y semántica en cliente y servidor;
- codificación segura al mostrar respuestas;
- protección frente a automatización y abuso según el riesgo;
- limitación de frecuencia en el servidor;
- mensajes de error que no revelen detalles internos;
- conservación, eliminación y comunicación de privacidad;
- protección CSRF si se utilizan cookies para autenticar solicitudes.

La interfaz no debe afirmar que un mensaje fue enviado hasta recibir una respuesta
válida del servicio responsable.

### Dependencias y recursos externos

- Incorporar únicamente dependencias necesarias y mantenidas.
- Conservar versiones reproducibles mediante `pnpm-lock.yaml`.
- Revisar vulnerabilidades conocidas antes de publicar y después de cambios de
  dependencias.
- Reducir JavaScript y CSS de terceros. Preferir recursos locales cuando resulte
  viable.
- Cuando se carguen recursos externos compatibles, fijar versión, HTTPS,
  `crossorigin` e integridad SRI.
- Restringir mediante CSP los orígenes realmente necesarios.

### Datos y secretos

- No incluir contraseñas, claves privadas, tokens privilegiados ni credenciales en
  HTML, JavaScript, Git o variables expuestas al navegador.
- Recoger y conservar únicamente los datos necesarios.
- No guardar datos sensibles en almacenamiento web sin un análisis específico.
- Evitar registrar mensajes, tokens o datos personales completos.

## Controles de producción

El alojamiento deberá servir exclusivamente mediante HTTPS y establecer, como
base, encabezados equivalentes a:

- `Content-Security-Policy`, ajustada a los orígenes utilizados;
- `Strict-Transport-Security`, cuando el dominio opere completamente bajo HTTPS;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy` con capacidades no utilizadas deshabilitadas;
- protección contra framing mediante `frame-ancestors` en CSP.

La CSP deberá probarse primero en modo de informe si su implantación puede romper
recursos existentes. No sustituye la validación, la codificación contextual ni el
saneamiento.

La configuración final depende del proveedor de alojamiento y deberá verificarse
sobre las respuestas HTTP reales, no solo en el código fuente.

## Verificación por hito

Para cerrar una funcionalidad nueva:

- [ ] Se han inventariado sus entradas, salidas y servicios externos.
- [ ] Los controles se definieron antes o durante su implementación.
- [ ] Las entradas tienen límites y reglas explícitas.
- [ ] Los datos no confiables no se interpretan como HTML o código.
- [ ] Cliente y servidor separan sus responsabilidades de validación.
- [ ] No se han introducido secretos en el front-end.
- [ ] Las dependencias o terceros añadidos están justificados.
- [ ] Existen pruebas negativas para datos inválidos o manipulados.
- [ ] Los errores no revelan información interna.
- [ ] La documentación recoge riesgos aceptados o controles aplazados.

## Verificación final

Antes de publicar una versión:

- [ ] Revisar los requisitos aplicables de OWASP ASVS 5.0 nivel 1.
- [ ] Comprobar dependencias y compilación reproducible.
- [ ] Ejecutar pruebas funcionales y casos negativos de seguridad.
- [ ] Verificar HTTPS, CSP y demás encabezados sobre producción.
- [ ] Confirmar que solo se permiten los orígenes externos necesarios.
- [ ] Revisar formularios, privacidad, registros y tratamiento de errores.
- [ ] Documentar riesgos pendientes con responsable y criterio de resolución.

## Revisión del estándar

Este documento deberá revisarse cuando se incorpore cualquiera de estos elementos:

- backend o API;
- autenticación, sesiones o perfiles;
- base de datos;
- carga de archivos;
- contenido HTML creado por usuarios;
- analítica, publicidad u otros scripts de terceros;
- pagos o datos especialmente sensibles;
- nuevo proveedor de alojamiento.

Cada ampliación requiere seleccionar los apartados adicionales de ASVS aplicables
y actualizar el inventario antes de implementar sus controles.

## Fuentes principales

- [OWASP Application Security Verification Standard 5.0](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [OWASP Third Party JavaScript Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_JavaScript_Management_Cheat_Sheet.html)
