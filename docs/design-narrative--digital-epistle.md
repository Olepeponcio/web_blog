# Narrativa de diseño — Epístola digital

## Marco del documento

Este documento define la intención narrativa, el lenguaje visual y los principios
de experiencia de la epístola digital. Actúa como referencia conceptual para el
diseño y permite que la composición concreta evolucione sin perder su identidad.

No organiza tareas, entregables ni criterios técnicos de cierre. Ese seguimiento
corresponde a `docs/project-milestones.md`.

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

El elemento `header` representa el anverso de un sobre cerrado. El sello de cera,
situado en el borde inferior y centrado, funciona como control de acceso a la
narrativa.

La portada puede contener:

- título;
- destinatario;
- fecha;
- frase breve;
- gran cantidad de espacio vacío.

### 2. Despliegue

La activación del sello abre el acceso al contenido y habilita el scroll.

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
