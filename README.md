# Front-end Web Blog

Proyecto front-end orientado a construir una experiencia web narrativa con HTML, CSS y JavaScript. Su concepto visual se desarrolla como una **epístola digital**: una pieza editorial continua que se despliega mediante el scroll.

## Estado del proyecto

La base utiliza HTML semántico, CSS por capas, JavaScript mediante módulos ES y Vite. Los hitos 1, 2 y 3 están implementados y cuentan con validación automatizada. Las revisiones manuales de los hitos 2 y 3 permanecen pendientes de registro.

La versión publicada es `v3.0.0`. El manifiesto mantiene temporalmente `2.0.0` y debe sincronizarse antes de la siguiente publicación. La batería automatizada vigente ejecuta 365 casos sobre cinco viewports; debe repetirse después de cada cambio funcional.

## Registro técnico

Esta tabla funciona como registro mutable. Se ampliará con nuevas filas cuando el proyecto incorpore tecnologías, convenciones o decisiones de versionado.

| Materia       | Elemento              | Definición actual                   |    Estado    |
| :------------ | :-------------------- | :---------------------------------- | :----------: |
| Tecnología    | HTML                  | HTML Living Standard                | Configurado  |
| Tecnología    | JavaScript            | ES Modules                          | Implementado |
| Herramienta   | Vite                  | `^8.2.1`                            | Configurado  |
| Gestor        | pnpm                  | `11.21.0`                           | Configurado  |
| Herramienta   | Figma                 | Diseño y prototipado                |  Utilizado   |
| Herramienta   | Playwright            | Pruebas E2E en cinco viewports      | Implementado |
| API web       | Intersection Observer | Entrada controlada en `origin` y `memory` | Implementado |
| API web       | Pointer Events        | Arrastre compatible con ratón y entrada táctil | Implementado |
| API web       | Constraint Validation | Validación semántica del formulario | Planificado  |
| Accesibilidad | Reduced Motion        | Aplicado en Origin y Memory         | Implementado |
| Accesibilidad | Teclado               | Despliegue, bote y controles narrativos | Implementado |
| Convención    | Directorios           | Organización por responsabilidad    |   Aplicado   |
| Convención    | HTML                  | Marcado semántico                   |   Aplicado   |
| Convención    | CSS                   | BEM pragmático + `kebab-case`       |   Aplicado   |
| Convención    | JavaScript            | Nombres semánticos + ES Modules     |   Aplicado   |
| Convención    | Responsive            | Enfoque híbrido                     |   Adoptado   |
| Convención    | Nomenclatura          | Inglés técnico                      |   Adoptado   |
| Versionado    | Proyecto              | manifiesto `2.0.0` / etiqueta `v3.0.0` | Revisar   |
| Git           | Ramas principales     | `main` + `develop`                  |  constante   |

### Observaciones del registro

- El flujo funcional del hito 1 está implementado mediante HTML, CSS y JavaScript modular.
- El hito 2 implementa la apertura del bote, el revelado con tinta y la salida hacia `memory`.
- El hito 3 implementa la escena de Memoria, sus controles y la postal interactiva.
- Los estados de cada sección están centralizados y las transiciones entre secciones utilizan eventos narrativos.
- CSS conserva la autoridad sobre la geometría final; JavaScript calcula únicamente estados y animaciones transitorias.
- La arquitectura por responsabilidad y las convenciones del proyecto ya están aplicadas.
- Vite se utiliza para desarrollo, compilación y previsualización.
- Playwright valida carga, arrastre, apertura, escritura, recorrido, responsive y recursos.
- El estándar de seguridad adopta OWASP ASVS 5.0 nivel 1 como referencia mínima.
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
│   ├── security-standard.md
│   ├── testing--milestone-1.md
│   ├── testing--milestone-2.md
│   └── testing--milestone-3.md
├── src/
│   ├── assets/fonts/
│   ├── assets/images/
│   ├── scripts/cover/
│   ├── scripts/origin/
│   ├── scripts/memory/
│   ├── scripts/shared/
│   └── styles/{settings,generic,elements,components,pages}/
├── scripts/
│   └── optimize-images.mjs
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

El modelo es deliberadamente híbrido: parte de estilos móviles, amplía la
composición mediante consultas de anchura y permite consultas de altura o de
contenedor cuando el contenido lo exige. CSS es la autoridad sobre geometría y
tamaños finales; JavaScript se limita a estados, eventos y valores transitorios
de animación.

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
| [Pruebas del HITO 2](docs/testing--milestone-2.md)                                  | Matriz manual y automatizada de la interacción de Origen.  |
| [Pruebas del HITO 3](docs/testing--milestone-3.md)                                  | Matriz automatizada y revisión manual pendiente de Memoria. |
| [Estándar de seguridad](docs/security-standard.md)                                  | Controles OWASP, inventario y riesgos pendientes.          |

## Comandos disponibles

| Comando         | Finalidad                               |
| --------------- | --------------------------------------- |
| `pnpm dev`      | Iniciar el servidor local de desarrollo |
| `pnpm build`    | Generar una compilación de producción   |
| `pnpm preview`  | Previsualizar localmente la compilación |
| `pnpm test:e2e` | Ejecutar la batería E2E con Playwright  |
| `pnpm images:optimize -- <rutas PNG>` | Generar variantes WebP con las herramientas ya instaladas |

## Control de versiones

El proyecto sigue versionado semántico `MAYOR.MINOR.PATCH`. La rama `develop` concentra el trabajo en curso y `main` recoge las versiones consolidadas. La etiqueta publicada es `v3.0.0`; queda pendiente actualizar el valor `2.0.0` de `package.json`.

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
15. Automatización E2E con Playwright sobre cinco viewports configurados.
16. Cierre del hito 1 dentro de su alcance inicial para ratón.
17. Implementación modular del hito 2: entrada en Origen, apertura del bote, tinta interactiva y continuación hacia `memory`.
18. Validación automatizada del hito 2 en los cinco viewports; corregida la tolerancia subpíxel de K03.
19. Incorporación del estándar de seguridad OWASP ASVS 5.0 nivel 1.
20. Implementación modular del hito 3: entrada en Memoria, controles, efectos y postal interactiva.
21. Aplicación de `prefers-reduced-motion` en Origin y Memory.
22. Preparación de recursos visuales para la futura sección `present`, todavía sin lógica aprobada.
23. Conversión de los once recursos activos a WebP: reducción aproximada de 23 MB a 3,5 MB.
24. Centralización de estados y eventos narrativos; adopción de Pointer Events y recorridos por teclado.
25. Validación automatizada vigente: 365 casos recorridos sobre cinco viewports.
