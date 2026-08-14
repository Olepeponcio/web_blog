# Front-end Web Blog

Proyecto front-end orientado a construir una experiencia web narrativa con HTML, CSS y JavaScript. Su concepto visual se desarrolla como una **epístola digital**: una pieza editorial continua que se despliega mediante el scroll.

## Estado del proyecto

La base de desarrollo utiliza HTML, JavaScript mediante módulos ES y Vite. El proyecto se encuentra en una fase de definición técnica, documental y visual.

La versión actual es `0.0.0`: representa un proyecto en preparación, sin una primera versión funcional publicada. La narrativa, el lenguaje visual, los recursos por sección y el flujo de hitos están documentados como decisiones mutables.

## Registro técnico

Esta tabla funciona como registro mutable. Se ampliará con nuevas filas cuando el proyecto incorpore tecnologías, convenciones o decisiones de versionado.

| Materia       | Elemento              | Definición actual                    |   Estado    |
| :------------ | :-------------------- | :----------------------------------- | :---------: |
| Tecnología    | HTML                  | HTML Living Standard                 | Configurado |
| Tecnología    | JavaScript            | ES Modules                           |  Preparado  |
| Herramienta   | Vite                  | `^8.2.1`                             | Configurado |
| Gestor        | pnpm                  | `11.21.0`                            | Configurado |
| Herramienta   | Figma                 | Diseño, prototipado y sistema visual | Planificado |
| API web       | Intersection Observer | Interacciones vinculadas al scroll   | Planificado |
| API web       | Constraint Validation | Validación semántica del formulario  | Planificado |
| Accesibilidad | Reduced Motion        | Respeto de `prefers-reduced-motion`  | Planificado |
| Convención    | Directorios           | Organización por responsabilidad     |  Evaluado   |
| Convención    | HTML                  | Marcado semántico                    |  Evaluado   |
| Convención    | CSS                   | BEM pragmático + `kebab-case`        |  Evaluado   |
| Convención    | JavaScript            | Nombres semánticos + ES Modules      |  Evaluado   |
| Convención    | Responsive            | Enfoque híbrido                      |  Adoptado   |
| Convención    | Nomenclatura          | Inglés técnico                       |  Adoptado   |
| Versionado    | Proyecto              | `0.0.0`                              |   Inicial   |
| Git           | Ramas principales     | `main` + `develop`                   |  constante  |

### Observaciones del registro

- Los archivos HTML y JavaScript constituyen una base todavía sin funcionalidad.
- La jerarquía general sigue pendiente de formalización; la convención responsive y la nomenclatura técnica ya están adoptadas.
- Vite se utiliza para desarrollo, compilación y previsualización.
- El flujo Git utiliza `develop` para el trabajo en curso y `main` para las versiones consolidadas; la versión inicial está etiquetada como `v0.0.0`.

## Estructura actual

```text
front-end--web-blog/
├── design/
│   ├── mockups/
│   ├── references/
│   └── ui/
├── docs/
│   ├── brainstorming--resources-by-section.md
│   ├── design-narrative--digital-epistle.md
│   ├── design-narrative--text-sections.md
│   └── project-milestones.md
├── src/
│   ├── assets/images/
│   ├── scripts/
│   └── styles/
├── index.html
├── package.json
├── pnpm-lock.yaml
└── README.md
```

La estructura es todavía provisional. Se mantendrá simple y se ampliará por responsabilidad cuando exista una necesidad concreta.

## Convenciones de trabajo

### Responsive híbrido

El proyecto combina varias técnicas compatibles para mantener una interfaz adaptable sin vincularla a dispositivos concretos.

| Criterio    | Decisión                                             |
| :---------- | :--------------------------------------------------- |
| Base        | `mobile-first`                                       |
| Layout      | Diseño fluido con medidas relativas                  |
| Breakpoints | Definidos cuando el contenido necesite reorganizarse |
| Componentes | Container queries cuando mejoren su reutilización    |
| Nombres     | `sm`, `md`, `lg`, `xl`                               |

Los nombres de breakpoint sirven como identificadores compartidos, no como categorías de dispositivos. Sus valores se decidirán según el comportamiento real del contenido.

### Idioma técnico

El código, los nombres de archivos y directorios, los comentarios, la documentación técnica, las ramas y los commits utilizarán inglés. La conversación de trabajo puede mantenerse en español.

## Diseño y documentación

El diseño se entiende como un marco mutable. Los documentos recogen el concepto actual y sirven como referencia durante su investigación, validación e implementación.

| Documento                                                                             | Contenido                                                             |
| :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| [Narrativa de diseño — Epístola digital](docs/design-narrative--digital-epistle.md) | Fuente de verdad conceptual y técnica de la experiencia.               |
| [Narrativa web — Carta al futuro](docs/design-narrative--text-sections.md)          | Recorrido y contenido textual de las secciones.                        |
| [Recursos por sección](docs/brainstorming--resources-by-section.md)                 | Ideas visuales, interactivas y técnicas no vinculantes.                 |
| [Hitos del proyecto](docs/project-milestones.md)                                    | Planificación, tareas y criterios de cierre.                            |
| [Pruebas del HITO 1](docs/testing--milestone-1.md)                                  | Matriz manual y automatizable para validar el primer hito.              |

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
6. Definición de la epístola digital como narrativa de diseño mutable.
7. Desarrollo del contenido de la carta y su recorrido por secciones.
8. Identificación de recursos visuales, interactivos y técnicos por sección.
9. Organización del flujo de trabajo en siete hitos progresivos.
10. Adopción de una convención responsive híbrida y de nomenclatura técnica en inglés.
11. Definición técnica de la apertura mediante arrastre del sobre y activación posterior del sello.
