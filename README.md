# Front-end Web Blog

Proyecto front-end orientado a construir una experiencia web narrativa con HTML, CSS y JavaScript. Su concepto visual se desarrolla como una **epístola digital**: una pieza editorial continua que se despliega mediante el scroll.

## Estado del proyecto

La base utiliza HTML semántico, CSS por capas, JavaScript mediante módulos ES y Vite. El hito 1 está implementado y validado: la epístola puede abrirse, recorrerse y adaptarse a los viewports definidos.

Existe una discrepancia de versionado pendiente de resolver: `package.json` declara `0.0.0`, mientras el commit actual está etiquetado como `v1.0.0`.

## Registro técnico

Esta tabla funciona como registro mutable. Se ampliará con nuevas filas cuando el proyecto incorpore tecnologías, convenciones o decisiones de versionado.

| Materia       | Elemento              | Definición actual                   |    Estado    |
| :------------ | :-------------------- | :---------------------------------- | :----------: |
| Tecnología    | HTML                  | HTML Living Standard                | Configurado  |
| Tecnología    | JavaScript            | ES Modules                          | Implementado |
| Herramienta   | Vite                  | `^8.2.1`                            | Configurado  |
| Gestor        | pnpm                  | `11.21.0`                           | Configurado  |
| Herramienta   | Figma                 | Diseño y prototipado                |  Utilizado   |
| Herramienta   | Playwright            | Pruebas E2E en cinco viewports      |   Validado   |
| API web       | Intersection Observer | Interacciones vinculadas al scroll  | Planificado  |
| API web       | Constraint Validation | Validación semántica del formulario | Planificado  |
| Accesibilidad | Reduced Motion        | Respeto de `prefers-reduced-motion` | Planificado  |
| Convención    | Directorios           | Organización por responsabilidad    |   Aplicado   |
| Convención    | HTML                  | Marcado semántico                   |   Aplicado   |
| Convención    | CSS                   | BEM pragmático + `kebab-case`       |   Aplicado   |
| Convención    | JavaScript            | Nombres semánticos + ES Modules     |   Aplicado   |
| Convención    | Responsive            | Enfoque híbrido                     |   Adoptado   |
| Convención    | Nomenclatura          | Inglés técnico                      |   Adoptado   |
| Versionado    | Proyecto              | `0.0.0` / etiqueta `v1.0.0`         |   Revisar    |
| Git           | Ramas principales     | `main` + `develop`                  |  constante   |

### Observaciones del registro

- El flujo funcional del hito 1 está implementado mediante HTML, CSS y JavaScript modular.
- La arquitectura por responsabilidad y las convenciones del proyecto ya están aplicadas.
- Vite se utiliza para desarrollo, compilación y previsualización.
- Playwright valida carga, arrastre, apertura, escritura, recorrido, responsive y recursos.
- El flujo Git utiliza `develop` para el trabajo en curso y `main` para las versiones consolidadas.

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
│   ├── project-milestones.md
│   └── testing--milestone-1.md
├── src/
│   ├── assets/
│   ├── scripts/cover/
│   ├── scripts/shared/
│   └── styles/
├── tests/
├── index.html
├── package.json
├── playwright.config.js
├── pnpm-lock.yaml
└── README.md
```

La estructura se organiza por responsabilidad y se amplía únicamente cuando aparece una necesidad concreta.

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

| Documento                                                                           | Contenido                                                  |
| :---------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| [Narrativa de diseño — Epístola digital](docs/design-narrative--digital-epistle.md) | Fuente de verdad conceptual y técnica de la experiencia.   |
| [Narrativa web — Carta al futuro](docs/design-narrative--text-sections.md)          | Recorrido y contenido textual de las secciones.            |
| [Recursos por sección](docs/brainstorming--resources-by-section.md)                 | Ideas visuales, interactivas y técnicas no vinculantes.    |
| [Hitos del proyecto](docs/project-milestones.md)                                    | Planificación, tareas y criterios de cierre.               |
| [Pruebas del HITO 1](docs/testing--milestone-1.md)                                  | Matriz manual y automatizable para validar el primer hito. |

## Comandos disponibles

| Comando         | Finalidad                               |
| --------------- | --------------------------------------- |
| `pnpm dev`      | Iniciar el servidor local de desarrollo |
| `pnpm build`    | Generar una compilación de producción   |
| `pnpm preview`  | Previsualizar localmente la compilación |
| `pnpm test:e2e` | Ejecutar la batería E2E con Playwright  |

## Control de versiones

El proyecto seguirá versionado semántico `MAYOR.MINOR.PATCH`. La rama `develop` concentrará el trabajo en curso y `main` recogerá las versiones consolidadas. La diferencia entre `0.0.0` y la etiqueta `v1.0.0` debe resolverse antes de publicar la siguiente versión.

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
12. Implementación del recorrido narrativo completo y del formulario de respuesta.
13. Modularización de la apertura, el arrastre, el sello y la escritura progresiva.
14. Aplicación de estilos por capas, componentes y diseño responsive.
15. Automatización E2E con Playwright: 181 pruebas aprobadas y 4 omitidas intencionadamente.
16. Cierre del hito 1 dentro de su alcance inicial para ratón.
