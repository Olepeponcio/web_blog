# Narrativa de diseño — Epístola digital

## Marco del documento

Este documento es la fuente de verdad conceptual y técnica de la experiencia.
Describe el recorrido real, diferencia lo implementado de lo pendiente y enlaza
cada interacción con los módulos que la gobiernan. Las tareas y criterios de
cierre se registran en [Hitos del proyecto](project-milestones.md).

## Concepto y lenguaje visual

La web se concibe como una correspondencia que se despliega. El usuario avanza
por una pieza editorial continua cuya estética evoluciona con la cronología:
origen, memoria, presente y futuro.

- Fondo blanco con textura fibrosa de papel.
- Negro carbón como tinta y color estructural.
- Imágenes tratadas como documentos superpuestos.
- Tipografía expresiva por sección y fuentes locales cuando están disponibles.
- CSS controla la composición final; JavaScript coordina estados y movimiento.

### Tipografía por sección

Las familias se declaran en [`tokens-font.css`](../src/styles/settings/tokens/tokens-font.css)
y las fuentes locales se registran mediante `@font-face` en
[`fonts.css`](../src/styles/settings/fonts.css). Cada pila incluye alternativas
del sistema para conservar legibilidad si la fuente principal no carga.

| Sección o elemento       | Fuente principal       | Alternativas                           | Estado                    |
| :----------------------- | :--------------------- | :------------------------------------- | :------------------------ |
| Cover: remitente y carta | Snell Roundhand        | Segoe Script, Brush Script MT, cursiva | Aplicada                  |
| Cover: secuencia binaria | Cascadia Mono          | Consolas, Courier New, monoespaciada   | Aplicada                  |
| Origin                   | Bubblegum Sans         | Trebuchet MS, Segoe UI, sans-serif     | Aplicada localmente       |
| Memory: pósit            | Snell Roundhand        | Segoe Script, Brush Script MT, cursiva | Aplicada                  |
| Memory: postal           | Integrada en la imagen | No procede                             | No recibe CSS tipográfico |
| Cabin Sketch             | —                      | —                                      | Disponible, no aplicada   |
| Stack Sans Notch         | —                      | —                                      | Disponible, no aplicada   |

### Escala y unidades tipográficas

- `rem` define tamaños estáticos y los límites mínimo y máximo de `clamp()`.
- El valor preferente de una escala fluida combina `rem` con `vw`, `svh` o
  `cqi`, según dependa del viewport o del contenedor.
- El límite máximo relativo de un `clamp()` tipográfico será al menos el doble
  de su límite mínimo.
- `line-height` utiliza números sin unidad y `letter-spacing` puede utilizar
  `em` cuando deba depender de la fuente local.
- El proyecto no redefine el tamaño raíz del navegador y no utiliza `px` para
  `font-size`.
- Los tamaños compartidos se declaran en
  [`tokens-font.css`](../src/styles/settings/tokens/tokens-font.css); las escalas
  expresivas exclusivas permanecen junto a su componente.
- Los cambios tipográficos se revisan con tamaño raíz ampliado al 200 % y sin
  pérdida de contenido ni desbordamiento horizontal.

Referencias: [W3C — Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text),
[W3C — Styling](https://www.w3.org/WAI/tutorials/page-structure/styling/),
[W3C — técnica C28](https://www.w3.org/WAI/WCAG21/Techniques/css/C28),
[MDN — `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)
y [MDN — `line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height).

## Recorrido narrativo

```text
COVER → ORIGIN → MEMORY → PRESENT → FUTURE
      → DESTINATARIO + FORMULARIO → CIERRE POST SCRIPTUM
```

## 1. COVER

### Propósito

`cover` es el umbral de la carta. La página comienza con el scroll bloqueado y
una parte del sobre visible. El usuario lo despliega, rompe el sello y presencia
la escritura progresiva del texto inicial.

La solapa muestra los datos del remitente:

```text
José Lobato
Calle de la escueta epístola
CP [secuencia binaria] (Hado)
Camino
```

La secuencia binaria escribe cíclicamente, de izquierda a derecha y entre
corchetes, los bloques que codifican «Maktub». Después de abrir la carta, la
animación se pausa cuando Cover queda fuera del viewport y se reanuda cuando el
usuario regresa, sin mantener temporizadores activos fuera de la vista.

### Secuencia interactiva

```text
CARGAR página
    → mostrar parcialmente el sobre
    → bloquear scroll

ARRASTRAR o activar con teclado
    → desplegar el sobre
    → animar la secuencia binaria
    → habilitar el sello

ACTIVAR sello
    → sustituir sello intacto por sello roto
    → desplazar la vista hacia el texto
    → revelar el texto palabra por palabra
    → habilitar scroll y mostrar su indicador
```

El arrastre utiliza Pointer Events, admite ratón y entrada táctil, conserva un
recorrido parcial y no rebasa sus límites. `Enter` o espacio ofrecen una ruta
equivalente mediante teclado.

Después de activar el sello, el sobre desplegado y el sello roto permanecen en
el flujo documental. El sobre utiliza una anchura fluida limitada en todos los
viewports; el remitente y el sello escalan respecto al propio componente mediante
unidades de contenedor y límites en `rem`.

### Estados

| Estado       | Comportamiento                                 |
| :----------- | :--------------------------------------------- |
| `sealed`     | Sobre parcialmente oculto y scroll bloqueado.  |
| `dragging`   | Desplazamiento vertical activo.                |
| `seal-ready` | Sobre desplegado y sello habilitado.           |
| `writing`    | Sello roto, autoscroll y escritura progresiva. |
| `open`       | Carta abierta y recorrido general habilitado.  |

### Recursos

- [`img__envelop.webp`](../src/assets/images/01-cover/img__envelop.webp)
- [`img__wax_seal.webp`](../src/assets/images/01-cover/img__wax_seal.webp)
- [`img__wax_seal_broken.webp`](../src/assets/images/01-cover/img__wax_seal_broken.webp)

### Módulos responsables

| Interacción            | JavaScript                                                                                 | CSS                                                                                                     |
| :--------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| Coordinación y estados | [`cover.js`](../src/scripts/cover/cover.js), [`states.js`](../src/scripts/cover/states.js) | [`cover.css`](../src/styles/components/cover.css), [`narrative.css`](../src/styles/pages/narrative.css) |
| Despliegue y binario   | [`envelope-drag.js`](../src/scripts/cover/envelope-drag.js)                                | [`cover.css`](../src/styles/components/cover.css)                                                       |
| Rotura del sello       | [`seal-opening.js`](../src/scripts/cover/seal-opening.js)                                  | [`cover.css`](../src/styles/components/cover.css)                                                       |
| Escritura inicial      | [`text-reveal.js`](../src/scripts/cover/text-reveal.js)                                    | [`reveal-text.css`](../src/styles/components/reveal-text.css)                                           |
| Indicador de scroll    | [`cover.js`](../src/scripts/cover/cover.js)                                                | [`scroll-cue.css`](../src/styles/components/scroll-cue.css)                                             |

La validación está documentada en
[Pruebas del HITO 1](testing--milestone-1.md).

## 2. ORIGIN

### Propósito

`origin` explica por qué se escribe la carta. Cuando la sección alcanza la
presencia requerida, se centra y bloquea temporalmente el scroll. «ORIGEN» surge
suavemente durante `1000ms`; al concluir, «Por qué escribo» se escribe de
izquierda a derecha. El bloque narrativo conserva una separación fluida y
moderada respecto del título.

Bubblegum Sans se carga localmente y queda limitada a esta sección.

### Secuencia interactiva

```text
CENTRAR origin
    → mostrar «ORIGEN» suavemente durante 1000ms
    → escribir «Por qué escribo» al finalizar su aparición
    → bloquear scroll si la sección cabe en el viewport
    → habilitar bote cerrado

ACTIVAR bote
    → mostrar bote abierto
    → expulsar el corcho

ACTIVAR bote abierto
    → unir bote al puntero
    → revelar palabras dentro del radio de tinta

REVELAR todo el texto
    → detener bote-puntero
    → restaurar el scroll
    → emitir origin:complete
    → mostrar el indicador reutilizable
```

La ruta de teclado revela el texto completo sin depender del movimiento del
puntero. En viewports bajos, el bloqueo se retira si la sección no cabe para
evitar encerrar al usuario.

### Estados

| Estado         | Comportamiento                                         |
| :------------- | :----------------------------------------------------- |
| `idle`         | Sección dentro del scroll general.                     |
| `centering`    | Alineación mediante autoscroll.                        |
| `ready`        | Sección preparada y bote habilitado.                   |
| `opening`      | Apertura del bote y vuelo del corcho.                  |
| `opened-ready` | Espera de la segunda activación.                       |
| `active`       | Bote-puntero y revelado por tinta.                     |
| `complete`     | Estado transitorio al terminar el revelado.            |
| `completed`    | Scroll restaurado, indicador visible y evento emitido. |

### Recursos

- [`img__ink-jar--closed.webp`](../src/assets/images/02-origin/img__ink-jar--closed.webp)
- [`img__ink-jar--open.webp`](../src/assets/images/02-origin/img__ink-jar--open.webp)
- [`img__ink-jar--cork.webp`](../src/assets/images/02-origin/img__ink-jar--cork.webp)
- [`BubblegumSans-Regular.ttf`](../src/assets/fonts/font__BubblegumSans_Regular/BubblegumSans-Regular.ttf)

### Módulos responsables

| Interacción                 | JavaScript                                                                                     | CSS                                                                                                       |
| :-------------------------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Coordinación y estados      | [`origin.js`](../src/scripts/origin/origin.js), [`states.js`](../src/scripts/origin/states.js) | [`origin.css`](../src/styles/components/origin.css), [`narrative.css`](../src/styles/pages/narrative.css) |
| Entrada y título            | [`origin-entry.js`](../src/scripts/origin/origin-entry.js)                                     | [`origin.css`](../src/styles/components/origin.css)                                                       |
| Apertura del bote           | [`jar-opening.js`](../src/scripts/origin/jar-opening.js)                                       | [`origin.css`](../src/styles/components/origin.css)                                                       |
| Trayectoria del corcho      | [`cork-flight.js`](../src/scripts/origin/cork-flight.js)                                       | [`origin.css`](../src/styles/components/origin.css)                                                       |
| Bote-puntero                | [`jar-pointer.js`](../src/scripts/origin/jar-pointer.js)                                       | [`origin.css`](../src/styles/components/origin.css)                                                       |
| Revelado de palabras        | [`word-reveal.js`](../src/scripts/origin/word-reveal.js)                                       | [`origin.css`](../src/styles/components/origin.css)                                                       |
| Finalización sin autoscroll | [`origin-exit.js`](../src/scripts/origin/origin-exit.js)                                       | [`scroll-cue.css`](../src/styles/components/scroll-cue.css)                                               |

La validación está documentada en
[Pruebas del HITO 2](testing--milestone-2.md).

## 3. MEMORY

### Propósito

`memory` representa un escritorio con un corkboard. La escena contiene un
interruptor, un instrumento luminoso, una postal interactiva y un pósit con la
palabra «Memory». La postal es independiente del tablero para poder desprenderse,
centrarse, escalar y girar.

### Secuencia interactiva

```text
RECIBIR origin:complete y detectar memory visible
    → iniciar la escena sin alterar el scroll
    → mostrar tablero y una secuencia de ondas y chispas sobre el interruptor

ACTIVAR interruptor
    → detener inmediatamente la llamada visual del interruptor
    → centrar memory y bloquear scroll
    → cambiar a board_2
    → hacer parpadear el instrumento

ACTIVAR instrumento
    → fijar luz verde
    → mover y escalar la postal hasta el centro

ACTIVAR postal
    → girar 180 grados
    → mostrar reverso
    → conservar estado final
    → restaurar scroll
    → mostrar el indicador reutilizable
```

CSS define el tamaño final fluido de la postal. JavaScript mide el inicio y el
destino únicamente para interpolar la animación; no persiste dimensiones finales
en píxeles. Al redimensionar, la postal se adapta de nuevo a la escena. La llamada
del interruptor se limita al estado `board-ready`; con movimiento reducido se
convierte en un halo estático visible.

### Estados

| Estado          | Comportamiento                                       |
| :-------------- | :--------------------------------------------------- |
| `idle`          | Espera de Origen y visibilidad suficiente.           |
| `entering`      | Entrada visual de la escena.                         |
| `board-ready`   | Tablero inicial, postal y chispas.                   |
| `centering`     | Interruptor activado, centrado y bloqueo del scroll. |
| `signal`        | Segundo tablero e instrumento parpadeando.           |
| `triggered`     | Instrumento activo y postal liberada.                |
| `postal-moving` | Movimiento y escalado transitorios.                  |
| `postal-ready`  | Postal centrada y accionable.                        |
| `flipping`      | Giro entre anverso y reverso.                        |
| `complete`      | Reverso persistente y scroll restaurado.             |

### Recursos

- [`img__board_1.webp`](../src/assets/images/03-memory/img__board_1.webp)
- [`img__board_2.webp`](../src/assets/images/03-memory/img__board_2.webp)
- [`img__postal_front.webp`](../src/assets/images/03-memory/img__postal_front.webp)
- [`img__postal_back_02.webp`](../src/assets/images/03-memory/img__postal_back_02.webp)

El texto de la postal forma parte de la imagen y no recibe una fuente CSS. El
pósit conserva su tratamiento visual independiente.

### Módulos responsables

| Interacción                         | JavaScript                                                                                     | CSS                                                                                                       |
| :---------------------------------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Coordinación y estados              | [`memory.js`](../src/scripts/memory/memory.js), [`states.js`](../src/scripts/memory/states.js) | [`memory.css`](../src/styles/components/memory.css), [`narrative.css`](../src/styles/pages/narrative.css) |
| Entrada no bloqueante               | [`memory-entry.js`](../src/scripts/memory/memory-entry.js)                                     | [`memory.css`](../src/styles/components/memory.css)                                                       |
| Interruptor, centrado e instrumento | [`memory-controls.js`](../src/scripts/memory/memory-controls.js)                               | [`memory.css`](../src/styles/components/memory.css), [`narrative.css`](../src/styles/pages/narrative.css) |
| Coordinación de postal              | [`postcard.js`](../src/scripts/memory/postcard.js)                                             | [`memory.css`](../src/styles/components/memory.css)                                                       |
| Movimiento y escalado               | [`postcard-motion.js`](../src/scripts/memory/postcard-motion.js)                               | [`memory.css`](../src/styles/components/memory.css)                                                       |
| Giro y finalización                 | [`postcard-flip.js`](../src/scripts/memory/postcard-flip.js)                                   | [`memory.css`](../src/styles/components/memory.css)                                                       |

La validación está documentada en
[Pruebas del HITO 3](testing--milestone-3.md).

## 4. PRESENT

### Estado actual

La sección `present` existe en el HTML y mantiene contenido editorial dentro del
flujo normal. Sus recursos visuales están preparados, pero todavía no existe una
interacción aprobada ni un módulo JavaScript propio.

### Recursos disponibles

- [`img__road_sing_01.png`](../src/assets/images/04-present/img__road_sing_01.png)
- [`img__road_sing_02.png`](../src/assets/images/04-present/img__road_sing_02.png)
- [`img__road_sing_03.png`](../src/assets/images/04-present/img__road_sing_03.png)

### Módulos responsables

| Ámbito            | JavaScript            | CSS                                                                       |
| :---------------- | :-------------------- | :------------------------------------------------------------------------ |
| Estructura actual | Sin módulo específico | [`narrative-section.css`](../src/styles/components/narrative-section.css) |

No se documentará una interacción hasta que sea diseñada y autorizada.

## 5. FUTURE

### Estado actual

La sección `future` existe como bloque editorial. Sus imágenes están disponibles,
pero no están integradas en una interacción ni existe un módulo JavaScript
específico.

### Recursos disponibles

- [`img__block_01.png`](../src/assets/images/05-future/img__block_01.png)
- [`img__block_02.png`](../src/assets/images/05-future/img__block_02.png)
- [`img__block_03.png`](../src/assets/images/05-future/img__block_03.png)
- [`img__block_04.png`](../src/assets/images/05-future/img__block_04.png)

### Módulos responsables

| Ámbito            | JavaScript            | CSS                                                                       |
| :---------------- | :-------------------- | :------------------------------------------------------------------------ |
| Estructura actual | Sin módulo específico | [`narrative-section.css`](../src/styles/components/narrative-section.css) |

## 6. DESTINATARIO + FORMULARIO

### Propósito y estado actual

`recipient` dirige la carta a quien la encuentra. `response` ofrece una respuesta
mediante campos semánticos de nombre, correo, asunto y mensaje.

El formulario utiliza validación HTML nativa y todavía no tiene envío, conexión
externa ni controlador JavaScript. Añadir cualquiera de esas capacidades exige
una decisión funcional y de privacidad independiente.

### Módulos responsables

| Ámbito       | JavaScript                                    | CSS                                                                       |
| :----------- | :-------------------------------------------- | :------------------------------------------------------------------------ |
| Destinatario | Sin módulo específico                         | [`narrative-section.css`](../src/styles/components/narrative-section.css) |
| Formulario   | Sin módulo específico; validación HTML nativa | [`response-form.css`](../src/styles/components/response-form.css)         |

## 7. CIERRE — POST SCRIPTUM

### Propósito y estado actual

El cierre funciona como final de carta: firma, información complementaria,
posdata y enlaces sociales. Actualmente se implementa mediante el `footer` y no
posee lógica JavaScript propia.

### Módulos responsables

| Ámbito                    | JavaScript            | CSS                                                           |
| :------------------------ | :-------------------- | :------------------------------------------------------------ |
| Cierre y enlaces sociales | Sin módulo específico | [`site-footer.css`](../src/styles/components/site-footer.css) |

## Arquitectura transversal

### Gestión de recursos y compilación

- HTML conserva imágenes semánticas e imágenes visibles desde la carga inicial.
- CSS resuelve fondos y recursos estrictamente decorativos mediante rutas relativas.
- JavaScript importa estáticamente los recursos que cambian durante una interacción;
  Vite resuelve esas importaciones tanto en desarrollo como en la compilación.
- Las rutas de recursos no se almacenan en atributos `data-*`, porque Vite no
  transforma esos valores personalizados durante la compilación.
- Cada sección declara sus recursos dinámicos en el módulo que gobierna la
  interacción; no existe un registro global de imágenes.
- `dist/` es un resultado regenerable y ningún módulo fuente enlaza directamente
  con su contenido.
- `public/` solo se creará si aparece un recurso que necesite conservar una URL
  y un nombre fijos.
- La batería de desarrollo no genera `dist/`; `pnpm test:e2e:build` compila y
  valida separadamente los recursos dinámicos sobre `vite preview`.

| Responsabilidad               | Módulo                                                                                                              |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| Punto de entrada              | [`main.js`](../src/scripts/main.js)                                                                                 |
| Eventos entre secciones       | [`narrative-events.js`](../src/scripts/shared/narrative-events.js)                                                  |
| Indicador reutilizable        | [`scroll-cue.js`](../src/scripts/shared/scroll-cue.js), [`scroll-cue.css`](../src/styles/components/scroll-cue.css) |
| Autoscroll, esperas y tiempos | [`motion.js`](../src/scripts/shared/motion.js)                                                                      |
| Operaciones matemáticas       | [`math.js`](../src/scripts/shared/math.js)                                                                          |
| Entrada de tokens             | [`tokens/index.css`](../src/styles/settings/tokens/index.css)                                                       |
| Color                         | [`tokens-color.css`](../src/styles/settings/tokens/tokens-color.css)                                                |
| Tipografía                    | [`tokens-font.css`](../src/styles/settings/tokens/tokens-font.css)                                                  |
| Tiempos                       | [`tokens-time.css`](../src/styles/settings/tokens/tokens-time.css)                                                  |
| Geometría responsive          | [`tokens-layout.css`](../src/styles/settings/tokens/tokens-layout.css)                                              |
| Sombras y efectos             | [`tokens-effect.css`](../src/styles/settings/tokens/tokens-effect.css)                                              |
| Fuentes locales               | [`fonts.css`](../src/styles/settings/fonts.css)                                                                     |
| Base documental               | [`base.css`](../src/styles/elements/base.css)                                                                       |

## Responsive y accesibilidad

El proyecto adopta un modelo híbrido:

- base mobile-first;
- medidas fluidas y relativas;
- media queries de anchura cuando cambia la composición;
- consultas de altura para proteger escenas que deben caber en el viewport;
- container queries cuando un componente depende de su escena;
- CSS como autoridad de geometría final;
- JavaScript limitado a estados, eventos y valores transitorios.

Las interacciones implementadas contemplan teclado, Pointer Events y
`prefers-reduced-motion`. Si una sección no cabe verticalmente, no debe mantener
un bloqueo que impida continuar la navegación.

## Principio de diseño

> La interfaz debe desaparecer para que el contenido se comporte como un objeto editorial.

La estética toma códigos de papel, tinta, caligrafía, márgenes y correspondencia,
pero los reinterpreta mediante composición contemporánea, scroll narrativo,
microinteracciones y diseño responsive.

## Concepto síntesis

**Epístola digital:** una carta continua que se despliega mediante el scroll y
combina materialidad histórica con interacción digital contemporánea.
