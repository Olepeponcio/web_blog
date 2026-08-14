# Narrativa de diseño — Epístola digital

## Marco del documento

Este documento define la intención narrativa, el lenguaje visual y el
comportamiento técnico de la epístola digital. Es la fuente de verdad para diseñar
e implementar la experiencia, aunque la composición concreta pueda evolucionar.

Las tareas, entregables y criterios de cierre se organizan en
`docs/project-milestones.md`.

## Concepto

Una web concebida como una **correspondencia que se despliega**.

El usuario no navega entre bloques tradicionales, sino que avanza por una pieza editorial continua mediante el scroll, como si estuviera leyendo una carta extensa o una sucesión de pliegos.

---

## Lenguaje visual

### Fondo

- Blanco dominante.
- Textura rugosa y fibrosa.
- Referencia visual: papel de carta, sobres artesanales o papel de algodón.

### Color

- Negro como color principal.
- Uso mínimo de otros tonos.
- El negro actúa como tinta: estructura, jerarquiza y delimita.

### Tipografía

- Tipografía estilográfica o caligráfica para elementos expresivos.
- Inspiración en correspondencia de los siglos XVI-XVII.
- Combinar con una tipografía más legible para textos extensos si fuera necesario.

---

## Narrativa del scroll

### 1. Apertura

La sección `cover` funciona como umbral narrativo. Inicialmente solo muestra su
fondo y mantiene bloqueado el scroll.

El elemento `header` representa el anverso de un sobre cerrado. Aparece casi por
completo oculto sobre el límite superior, dejando una pequeña parte dentro del
viewport para sugerir que puede extraerse.

Cuando el sobre queda totalmente desplegado, el sello de cera funciona como
control de acceso a la narrativa.

La portada se organiza en dos planos consecutivos:

- un plano superior, formado por la solapa del sobre y el sello de cera;
- un plano inferior, formado por el cuerpo de la carta y su texto de apertura.

El plano inferior contiene:

- lugar y fecha;
- destinatario;
- texto introductorio;
- gran cantidad de espacio vacío.

El texto permanece oculto hasta que el usuario activa el sello. Después se
desvela progresivamente, palabra por palabra, para simular que la carta se está
escribiendo en ese momento:

> Madrid, 2026
>
> A quien encuentre estas palabras:
>
> No sé cuándo llegará esta carta a tus manos.
>
> Quizá mañana.<br>
> Quizá dentro de muchos años.
>
> Solo sé que fue escrita en un momento en el que todo parecía avanzar demasiado
> deprisa y, aun así, seguíamos buscando algo que permaneciera.
>
> Por eso decidí escribir.

#### Recursos de apertura

Los recursos oficiales de esta fase se agrupan por tipo y sección narrativa:

```text
src/assets/
├── images/01-cover/
│   ├── img__envelop.png
│   ├── img__wax_seal.png
│   └── img__wax_seal_broken.png
└── icons/01-cover/
    └── hand-click.svg
```

- `images/01-cover/` contiene el sobre y los estados visuales del sello.
- `icons/01-cover/` contiene los indicadores gráficos asociados a la interacción.

### 2. Despliegue

El usuario arrastra verticalmente el sobre hasta hacerlo completamente visible.
Después activa el sello para abrir el acceso al contenido y habilitar el scroll.

La página transmite la sensación de que el documento se está desplegando progresivamente.

### 3. Desarrollo

Cada sección puede adoptar el lenguaje de:

- párrafos;
- anotaciones;
- márgenes;
- fragmentos documentales;
- numeraciones;
- iniciales;
- pequeñas marcas editoriales.

El scroll sustituye visualmente al acto de pasar páginas.

Cada punto clave de la narrativa constituye un contenedor o una `section`
independiente. Su diseño interno permanece mutable, pero su presencia garantiza
un recorrido completo y una evolución localizada del responsive.

#### Interacción de Origen

Cuando la sección `origin` queda centrada en el viewport, el scroll se bloquea
y comienza una interacción basada en un bote de tinta.

La secuencia narrativa es:

```text
CENTRAR origin
    → bloquear scroll
    → mostrar bote cerrado

ACTIVAR bote
    → sustituir por bote abierto
    → expulsar el corcho fuera del viewport

ACTIVAR bote abierto
    → unir bote al puntero
    → habilitar revelado por radio de acción

REVELAR todo el texto
    → desactivar bote-puntero
    → mostrar flecha de continuación

ACTIVAR flecha
    → autoscroll hasta memory
```

##### Recursos de Origen

```text
src/assets/images/02-origin/
├── img__jar.png
├── img__jar_2.png
└── img__cork.png
```

- `img__jar.png` representa el bote cerrado.
- `img__jar_2.png` representa el bote abierto.
- `img__cork.png` se utiliza durante la animación de expulsión.

El recurso definitivo de la flecha permanece pendiente de creación o selección.

##### Estados de Origen

| Estado | Comportamiento |
| :-- | :-- |
| `idle` | La sección todavía forma parte del scroll libre. |
| `locked` | `origin` está centrada y el scroll queda bloqueado. |
| `uncorking` | El bote se abre y el corcho ejecuta su trayectoria. |
| `ink-ready` | El bote abierto espera la segunda activación. |
| `ink-cursor` | El bote sigue al puntero y permite aplicar tinta. |
| `revealing` | Una o varias palabras completan su animación. |
| `complete` | Todo el texto es visible y la flecha está habilitada. |
| `leaving` | Se ejecuta el autoscroll hacia `memory`. |

##### Entrada y bloqueo

La sección se detecta mediante `IntersectionObserver`. Cuando alcanza suficiente
presencia, se completa su alineación con un autoscroll corto. El bloqueo se aplica
solo después de que `origin` quede centrada, evitando detener el recorrido con la
sección parcialmente visible.

##### Apertura del bote

El primer clic sobre el bote cerrado:

1. impide activaciones repetidas;
2. muestra el bote abierto;
3. sitúa el corcho sobre la boca del bote;
4. impulsa el corcho hacia arriba;
5. describe un arco lateral descendente;
6. termina por debajo del límite inferior del viewport;
7. habilita el segundo clic sobre el bote.

El corcho utiliza posicionamiento fijo durante la animación para que su recorrido
dependa del viewport y no altere la composición de la sección.

##### Bote unido al puntero

Después del segundo clic, una representación del bote abierto utiliza
`position: fixed` y sigue las coordenadas del puntero. Debe tener
`pointer-events: none` para no impedir la detección del texto.

El punto de aplicación o *hotspot* se sitúa cerca de la boca del bote. Este punto,
y no necesariamente el centro de la imagen, determina el centro del radio de
acción.

##### Revelado por radio de acción

Cada palabra del texto se representa mediante un elemento identificable. Las
palabras permanecen en el flujo documental aunque todavía no sean visibles, para
conservar espacios, saltos de línea y zonas de interacción.

Cada clic genera un área circular alrededor del *hotspot*. Se comparan todas las
palabras ocultas con ese círculo:

```text
PARA cada palabra oculta:
    OBTENER su rectángulo visible
    CALCULAR el punto del rectángulo más próximo al centro del círculo

    SI la distancia hasta ese punto es menor o igual al radio:
        REVELAR la palabra completa
```

Un clic puede revelar varias palabras. Si el radio toca una palabra de forma
parcial, se revela la palabra completa. No se divide el texto por letras, porque
eso complicaría innecesariamente el DOM, los signos, los espacios y la
accesibilidad.

El radio debe poder ajustarse mediante un token como `--ink-reveal-radius` sin
modificar la lógica JavaScript.

##### Condición de finalización

Las palabras reveladas se registran una sola vez mediante un `Set`. Una palabra
solo cuenta como visible cuando termina su animación.

```text
texto completo =
    existen palabras
    Y revealedWords.size === totalWords
    Y no quedan animaciones de revelado activas
```

Solo cuando se cumplen las tres condiciones:

- el bote deja de seguir al puntero;
- se restaura el cursor normal;
- el estado cambia a `complete`;
- aparece y se habilita la flecha de continuación.

##### Salida de Origen

La flecha reutiliza el autoscroll de la apertura para desplazar la vista hasta
`#memory`. Durante esa transición el estado es `leaving`; al finalizar, el scroll
general de la narrativa vuelve a quedar disponible.

---

## Comportamiento técnico de la apertura

### Secuencia

```text
CARGAR página
MOSTRAR únicamente el fondo de cover
BLOQUEAR scroll
MOSTRAR parcialmente el sobre

AL mantener pulsado y arrastrar hacia abajo:
    DESPLAZAR el sobre suavemente
    LIMITAR el movimiento al recorrido permitido
    CONSERVAR la posición alcanzada al soltar

SI el sobre no está completamente desplegado:
    PERMITIR reanudar el arrastre desde esa posición

SI alcanza su posición final:
    INMOVILIZAR el sobre completamente visible
    HABILITAR la interacción con el sello

AL activar el sello:
    ANIMAR la transición del sello intacto al sello roto
    MANTENER visible el resultado de la rotura
    ABRIR el acceso a la narrativa
    DESPLAZAR de forma pausada la vista hasta el texto de apertura
    INICIAR el desvelado del texto de apertura palabra por palabra

AL completar el desvelado del texto:
    MOSTRAR «Por eso decidí escribir.»
    HABILITAR el scroll narrativo
    MOSTRAR temporalmente una indicación gráfica de desplazamiento

AL iniciar el usuario el scroll:
    OCULTAR la indicación gráfica de desplazamiento
```

### Estados

Los estados funcionales se registran en `data-page-state`:

| Estado | Comportamiento |
| :-- | :-- |
| `sealed` | Sobre parcialmente oculto, agarrable y con scroll bloqueado. |
| `dragging` | Arrastre vertical activo mediante `grabbing`. |
| `seal-ready` | Sobre desplegado e inmóvil; sello habilitado. |
| `writing` | Sello roto, autoscroll y texto en revelado progresivo. |
| `open` | Escritura finalizada, scroll habilitado e indicador visible. |

### Recorrido y límites

El sobre se desplaza de forma suave y progresiva:

- sin saltos ni resistencia simulada;
- sin retroceder cuando se suelta;
- sin completar automáticamente el recorrido;
- sin superar sus posiciones inicial y final.

La distancia máxima no equivale necesariamente a la altura de la imagen:

```text
distancia máxima = posición final − posición inicial
```

La posición final coincide con el punto en el que el sobre queda completamente
visible dentro del viewport.

### Alcance inicial

La primera implementación del arrastre se limita al ratón. La adaptación para
teclado, entrada táctil y `prefers-reduced-motion` permanece como requisito
posterior de accesibilidad y calidad.

En resoluciones estrechas, la porción inicialmente visible del sobre aumenta
para que la portada continúe siendo reconocible y accionable. Este ajuste de
composición no implica todavía compatibilidad con entrada táctil.

### Arquitectura implementada

| Módulo | Responsabilidad |
| :-- | :-- |
| `src/scripts/cover/cover.js` | Coordina estados y secuencia completa. |
| `src/scripts/cover/envelope-drag.js` | Controla arrastre, límites y despliegue. |
| `src/scripts/cover/seal-opening.js` | Precarga y transición del sello roto. |
| `src/scripts/cover/text-reveal.js` | Prepara y revela el texto palabra por palabra. |
| `src/scripts/shared/math.js` | Limita valores numéricos mediante `clamp`. |
| `src/scripts/shared/motion.js` | Centraliza tiempos, esperas y autoscroll. |

Las duraciones se definen como tokens CSS en
`src/styles/settings/tokens.css`:

- `--duration-seal-break`;
- `--duration-opening-scroll`;
- `--duration-word-reveal-step`.

El texto de apertura utiliza un ancho máximo y centrado horizontal para mantener
una composición estable en resoluciones amplias.

### Validación

La implementación se valida mediante Playwright y revisión manual. La matriz,
los viewports y el último resultado están registrados en
[`testing--milestone-1.md`](testing--milestone-1.md).

### 4. Interacción

La animación debe ser discreta y formar parte de la narrativa:

- texto que aparece progresivamente;
- palabras o frases que se subrayan;
- elementos que emergen desde los márgenes;
- imágenes que aparecen como documentos adjuntos;
- líneas o marcas que acompañan el desplazamiento.

### 5. Cierre

La página termina como una carta:

- firma;
- lugar;
- fecha;
- sello;
- posdata;
- llamada a la acción integrada en ese lenguaje.

---

## Estructura narrativa

La estructura conceptual del documento es:

```html
<header>Portada y apertura</header>

<main>
  <section>Origen</section>
  <section>Memoria</section>
  <section>Presente</section>
  <section>Futuro</section>
  <section>Destinatario</section>
  <section>Respuesta</section>
</main>
```

Esta representación define unidades narrativas, no una implementación HTML
cerrada. El contenido y la composición de cada sección pueden evolucionar sin
fracturar el recorrido esencial.

---

## Responsive progresivo

La adaptación responsive comienza al diseñar cada sección. No se pospone hasta
que el recorrido completo esté terminado, porque las decisiones locales podrían
generar conflictos estructurales posteriores.

| Criterio    | Aplicación                                     |
| :---------- | :--------------------------------------------- |
| Base        | `mobile-first`                                 |
| Layout      | Medidas y composición fluidas                  |
| Breakpoints | Determinados por las necesidades del contenido |
| Secciones   | Cada `section` se valida individualmente       |
| Componentes | Container queries cuando aporten reutilización |
| Nombres     | `sm`, `md`, `lg`, `xl`                         |

Los nombres de breakpoint funcionan como identificadores compartidos, no como
categorías de dispositivos. Sus valores se decidirán cuando el contenido necesite
reorganizarse.

Principio:

> Cada sección debe adaptarse mientras se diseña para evitar conflictos
> estructurales posteriores.

## Principio de diseño

> La interfaz debe desaparecer para que el contenido se comporte como un objeto editorial.

Evitar, cuando no sean necesarios:

- tarjetas convencionales;
- botones volumétricos;
- bloques visuales propios de una landing page genérica;
- exceso de componentes independientes.

---

## Dirección estética

No se pretende recrear literalmente una página del siglo XVI-XVII.

Se toman algunos de sus códigos:

**papel → tinta → caligrafía → márgenes → correspondencia → firma**

y se reinterpretan mediante:

- retícula contemporánea;
- composición minimalista;
- scroll narrativo;
- microinteracciones;
- diseño responsive.

---

## Concepto síntesis

**Epístola digital**

Una página continua concebida como una carta que se despliega mediante el scroll, combinando materialidad histórica y composición digital contemporánea.
