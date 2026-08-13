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

1. **Parcialmente oculto:** muestra una pista visual desde el borde superior.
2. **Agarrable:** utiliza el cursor `grab`.
3. **En arrastre:** utiliza `grabbing` y sigue el desplazamiento vertical.
4. **Parcialmente desplegado:** conserva la posición alcanzada al soltarlo.
5. **Completamente desplegado:** queda inmóvil en su posición final.
6. **Sello disponible:** permite iniciar la apertura de la carta.
7. **Carta abierta:** el sello aparece roto y comienza el desvelado del texto.
8. **Texto en escritura:** la vista se sitúa sobre el texto y las palabras
   aparecen progresivamente en su orden de lectura, con el scroll bloqueado.
9. **Narrativa accesible:** el texto termina con «Por eso decidí escribir.» y el
   scroll narrativo queda habilitado junto a una indicación gráfica temporal.

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
