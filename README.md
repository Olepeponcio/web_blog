# Front-end Web Blog

Proyecto front-end orientado a construir un blog web. Actualmente se encuentra en una fase inicial de definición técnica y documental, previa al diseño de la interfaz.

## Estado del proyecto

La base de desarrollo utiliza HTML, JavaScript mediante módulos ES y Vite. La estructura definitiva de directorios, los estilos y el diseño visual todavía no se han implementado.

La versión actual es `0.0.0`: representa un proyecto en preparación, sin una primera versión funcional publicada.

## Registro técnico

Esta tabla funciona como registro mutable. Se ampliará con nuevas filas cuando el proyecto incorpore tecnologías, convenciones o decisiones de versionado.

| Materia     | Elemento          | Definición actual                |   Estado    |
| :---------- | :---------------- | :------------------------------- | :---------: |
| Tecnología  | HTML              | HTML Living Standard             | Configurado |
| Tecnología  | JavaScript        | ES Modules                       |  Preparado  |
| Herramienta | Vite              | `^8.2.1`                         | Configurado |
| Gestor      | pnpm              | `11.21.0`                        | Configurado |
| Convención  | Directorios       | Organización por responsabilidad |  Evaluado   |
| Convención  | HTML              | Marcado semántico                |  Evaluado   |
| Convención  | CSS               | BEM pragmático + `kebab-case`    |  Evaluado   |
| Convención  | JavaScript        | Nombres semánticos + ES Modules  |  Evaluado   |
| Versionado  | Proyecto          | `0.0.0`                          |   Inicial   |
| Git         | Ramas principales | `main` + `develop`               |  constante  |

### Observaciones del registro

- Los archivos HTML y JavaScript constituyen una base todavía sin funcionalidad.
- La jerarquía y las convenciones están evaluadas, pero pendientes de formalización.
- Vite se utiliza para desarrollo, compilación y previsualización.
- El repositorio Git y su flujo de ramas permanecen pendientes de configuración.

## Estructura actual

```text
front-end--web-blog/
├── design/
│   └── references/
├── src/
│   └── scripts/
│       └── main.js
├── index.html
├── package.json
├── pnpm-lock.yaml
└── README.md
```

La estructura es todavía provisional. Se mantendrá simple y se ampliará por responsabilidad cuando exista una necesidad concreta.

## Comandos disponibles

| Comando        | Finalidad                               |
| -------------- | --------------------------------------- |
| `pnpm dev`     | Iniciar el servidor local de desarrollo |
| `pnpm build`   | Generar una compilación de producción   |
| `pnpm preview` | Previsualizar localmente la compilación |

## Control de versiones

El proyecto seguirá versionado semántico `MAYOR.MINOR.PATCH`. La rama `develop` concentrará el trabajo en curso y `main` recogerá las versiones consolidadas.

## Trabajo realizado

1. Creación del documento HTML inicial.
2. Configuración de pnpm y Vite.
3. Preparación del punto de entrada JavaScript.
4. Evaluación de la jerarquía de directorios y de las convenciones para HTML, CSS y JavaScript.
5. Inicio del registro documental antes de abordar el diseño.

## Pendiente

- Definir la jerarquía definitiva de directorios.
- Formalizar las convenciones del proyecto.
- Establecer el repositorio y su flujo de ramas.
- Diseñar e implementar la interfaz.
