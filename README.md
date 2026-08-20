# Front-end Web Blog

Proyecto front-end orientado a construir una experiencia web narrativa con HTML, CSS y JavaScript. Su concepto visual se desarrolla como una **epístola digital**: una pieza editorial continua que se despliega mediante el scroll.

## Estado del proyecto

| Materia | Estado actual |
| :-- | :-- |
| Versión consolidada | `v5.0.1` en `main`; manifiesto `5.0.1`. |
| Publicación | GitHub Pages despliega `main` mediante GitHub Actions en `https://olepeponcio.github.io/web_blog/`. |
| Desarrollo | Los hitos 1–4 están implementados; Future y Ending disponen de una implementación funcional. |
| Automatización | Playwright recorre cinco viewports; los dos móviles emulan touch y Axe audita WCAG A. |
| Revisión manual | Recorrido responsive comprobado en smartphone físico; las matrices manuales formales siguen abiertas. |

## Registro técnico

Esta tabla funciona como registro mutable. Se ampliará con nuevas filas cuando el proyecto incorpore tecnologías, convenciones o decisiones de versionado.

| Materia       | Elemento              | Definición actual                              |    Estado    |
| :------------ | :-------------------- | :--------------------------------------------- | :----------: |
| Tecnología    | HTML                  | HTML Living Standard                           | Configurado  |
| Tecnología    | JavaScript            | ES Modules                                     | Implementado |
| Herramienta   | Vite                  | `^8.2.1`                                       | Configurado  |
| Gestor        | pnpm                  | `11.21.0`                                      | Configurado  |
| Herramienta   | Figma                 | Diseño y prototipado                           |  Utilizado   |
| Herramienta   | Playwright            | Pruebas E2E en cinco viewports                 | Implementado |
| API web       | Intersection Observer | Entrada controlada en `origin` y `memory`      | Implementado |
| API web       | Pointer Events        | Arrastre compatible con ratón y entrada táctil | Implementado |
| Biblioteca    | Matter.js             | Física del cañón de suministros                 | Implementado |
| Accesibilidad | Reduced Motion        | Aplicado en Origin, Memory y Present           | Implementado |
| Accesibilidad | Teclado               | Despliegue, bote y controles narrativos        | Implementado |
| Convención    | Directorios           | Organización por responsabilidad               |   Aplicado   |
| Convención    | HTML                  | Marcado semántico                              |   Aplicado   |
| Convención    | CSS                   | BEM pragmático + `kebab-case`                  |   Aplicado   |
| Convención    | JavaScript            | Nombres semánticos + ES Modules                |   Aplicado   |
| Convención    | Responsive            | Enfoque híbrido                                |   Adoptado   |
| Convención    | Nomenclatura          | Inglés técnico                                 |   Adoptado   |
| Versionado    | Proyecto              | manifiesto `5.0.1` / etiqueta `v5.0.1`         | Sincronizado |
| Despliegue    | GitHub Pages           | GitHub Actions desde `main`                     | Publicado    |
| Git           | Ramas principales     | `main` + `develop`                             |  constante   |

## Estructura actual

```text
front-end--web-blog/
├── design/
│   ├── mockups/
│   ├── references/
│   └── ui/
├── docs/
│   ├── brainstorming--resources-by-section.md
│   ├── accessibility--wcag-2.2-level-a.md
│   ├── design-narrative--digital-epistle.md
│   ├── design-narrative--text-sections.md
│   ├── project-milestones.md
│   ├── security-standard.md
│   ├── testing--milestone-1.md
│   ├── testing--milestone-2.md
│   ├── testing--milestone-3.md
│   └── testing--milestone-4.md
├── src/
│   ├── assets/fonts/
│   ├── assets/images/
│   ├── scripts/cover/
│   ├── scripts/debug/
│   ├── scripts/ending/
│   ├── scripts/future/
│   ├── scripts/origin/
│   ├── scripts/memory/
│   ├── scripts/present/
│   ├── scripts/shared/
│   └── styles/{settings,generic,elements,components,pages}/
├── scripts/
│   └── optimize-images.mjs
├── tests/
├── index.html
├── package.json
├── playwright.config.js
├── playwright.production.config.js
├── pnpm-lock.yaml
└── README.md
```

La estructura se organiza por responsabilidad y se amplía únicamente cuando aparece una necesidad concreta.

### Gestión de recursos

- HTML declara los recursos semánticos o necesarios desde la carga inicial.
- CSS gestiona fondos y recursos decorativos; JavaScript importa los recursos dinámicos.
- `src/assets/` contiene recursos procesados por Vite y `dist/` permanece temporal.
- Los atributos `data-*` representan comportamiento y estado, no rutas.

### Tipografía responsive

La escala utiliza `rem`, `clamp()` y tokens compartidos sin redefinir el tamaño
raíz del navegador. La norma completa está en la
[narrativa de diseño](docs/design-narrative--digital-epistle.md#escala-y-unidades-tipográficas).

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

Los breakpoints identifican cambios requeridos por el contenido, no categorías
cerradas de dispositivos. CSS gobierna la geometría; JavaScript se limita a
estados, eventos y animaciones transitorias.

### Idioma técnico

El código, los nombres de archivos y directorios, los comentarios, la documentación técnica, las ramas y los commits utilizarán inglés. La conversación de trabajo puede mantenerse en español.

## Diseño y documentación

El diseño se entiende como un marco mutable. Los documentos recogen el concepto actual y sirven como referencia durante su investigación, validación e implementación.

| Documento                                                                           | Contenido                                                    |
| :---------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| [Auditoría WCAG 2.2 — Nivel A](docs/accessibility--wcag-2.2-level-a.md)             | Estado, evidencia y pruebas de accesibilidad pendientes.     |
| [Narrativa de diseño — Epístola digital](docs/design-narrative--digital-epistle.md) | Fuente de verdad conceptual y técnica de la experiencia.     |
| [Narrativa web — Carta al futuro](docs/design-narrative--text-sections.md)          | Recorrido y contenido textual de las secciones.              |
| [Recursos por sección](docs/brainstorming--resources-by-section.md)                 | Ideas visuales, interactivas y técnicas no vinculantes.      |
| [Hitos del proyecto](docs/project-milestones.md)                                    | Planificación, tareas y criterios de cierre.                 |
| [Pruebas del HITO 1](docs/testing--milestone-1.md)                                  | Matriz manual y automatizable para validar el primer hito.   |
| [Pruebas del HITO 2](docs/testing--milestone-2.md)                                  | Matriz manual y automatizada de la interacción de Origen.    |
| [Pruebas del HITO 3](docs/testing--milestone-3.md)                                  | Matriz automatizada y revisión manual pendiente de Memoria.  |
| [Pruebas del HITO 4](docs/testing--milestone-4.md)                                  | Matriz automatizada y revisión manual pendiente de Presente. |
| [Estándar de seguridad](docs/security-standard.md)                                  | Controles OWASP, inventario y riesgos pendientes.            |

## Comandos disponibles

| Comando                                                             | Finalidad                                                 |
| ------------------------------------------------------------------- | --------------------------------------------------------- |
| `pnpm dev`                                                          | Iniciar el servidor local de desarrollo                   |
| `pnpm build`                                                        | Generar una compilación de producción                     |
| `pnpm preview`                                                      | Previsualizar localmente la compilación                   |
| `pnpm test:e2e`                                                     | Ejecutar la batería E2E con Playwright                    |
| `pnpm test:e2e -- tests/accessibility.spec.js`                      | Ejecutar la auditoría automática WCAG A con Axe           |
| `pnpm test:e2e:build`                                               | Compilar y validar los recursos dinámicos sobre `dist/`   |
| `pnpm images:optimize -- <rutas PNG>`                               | Generar variantes WebP con las herramientas ya instaladas |
| `pnpm test:e2e -- tests/accessibility.spec.js --project=desktop-sm` | Ejecutar Axe en el viewport `desktop-sm`               |

Vite transforma los módulos y recursos durante el desarrollo y genera `dist/`
para producción.

### Acceso directo de depuración

Durante el desarrollo puede omitirse el recorrido narrativo anterior mediante
el parámetro `debugSection`. El módulo objetivo conserva su inicialización real;
las secciones anteriores no se inicializan.

```text
pnpm dev -- --open "/?debugSection=present"
```

Para aislar el HITO 5:

```bash
pnpm dev -- --open "/?debugSection=future"
```

Valores disponibles: `cover`, `origin`, `memory`, `present`, `future` y
`ending`. Sin
parámetro se mantiene el recorrido completo. El acceso directo depende de
`import.meta.env.DEV`, por lo que la compilación de producción ignora el
parámetro.

## Control de versiones

El proyecto utiliza versionado semántico `MAYOR.MINOR.PATCH`. `develop`
concentra el trabajo en curso y `main` las versiones consolidadas. La versión
canónica publicada es `v5.0.1`; el historial de implementación se mantiene en
[Hitos del proyecto](docs/project-milestones.md) y en las matrices de testing.
