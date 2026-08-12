# Tormenta de ideas — Recursos por sección

## Objetivo

Aplicar recursos visuales e interactivos sencillos que refuercen la narrativa de la carta sin convertir el proyecto en una implementación técnicamente compleja.

Prioridades:

- HTML semántico.
- CSS3.
- JavaScript ligero.
- Animaciones discretas.
- Buena composición visual.
- Código entendible y mantenible.
- Resultado válido como portfolio.

---

## 1. Portada — A quien encuentre estas palabras

### Recursos visuales

- Fondo blanco con textura de papel.
- Fecha y lugar alineados como encabezado de carta.
- Título con tipografía caligráfica.
- Mucho espacio negativo.
- Línea fina negra como elemento editorial.

### Recursos interactivos

- Entrada suave del texto al cargar.
- Aparición progresiva de las primeras líneas.
- Indicador de scroll muy discreto.

### Ideas técnicas

- `background-image` para textura.
- `letter-spacing`, `line-height` y márgenes amplios.
- `opacity` + `transform` con CSS.

---

## 2. Origen — Por qué escribo

### Recursos visuales

- Texto central con bloques muy separados.
- Alternancia entre frases cortas y párrafos.
- Palabras clave destacadas como si fueran anotaciones.

### Recursos interactivos

- Las frases pueden aparecer al entrar en viewport.
- Subrayados que se dibujen lentamente.
- Cambio sutil de posición al hacer scroll.

### Ideas técnicas

- `IntersectionObserver`. API de JavaScript
- Pseudoelementos `::before` y `::after`.
- Transiciones CSS.

---

## 3. Memoria — Lo que aprendimos

### Recursos visuales

- Aspecto de documento archivado.
- Fragmentos ligeramente desplazados.
- Notas en los márgenes.
- Inicial capitular.
- Numeración o pequeñas referencias editoriales.

### Recursos interactivos

- Aparición escalonada de fragmentos.
- Leve movimiento vertical de algunos elementos.
- Notas marginales que aparezcan después del cuerpo principal.
- Al hacer scroll en transición con la siguiente sección aparece una mancha con forma de gota de tinta

### Ideas técnicas

- CSS Grid para cuerpo + margen.
- `position: relative`.
- Animaciones simples con `transform`.

---

## 4. Presente — Lo que estamos construyendo

### Recursos visuales

- Diseño más limpio y contemporáneo.
- Ruptura intencionada respecto a la parte histórica.
- Introducción de una retícula más técnica.
- Bloques para proyectos, tecnologías o principios.

### Recursos interactivos

- Elementos que se revelan durante el scroll.
- Hover sencillo en proyectos.
- Expansión mínima de detalles.

### Ideas técnicas

- CSS Grid.
- `hover`.
- Transiciones de borde, escala u opacidad.
- Posible uso de `<details>` para contenido ampliable. Details es una etiqueta semántica html crea
  contenido desplegable sin necesidad de javaScript

---

## 5. Futuro — Lo que todavía no existe

### Recursos visuales

- Mucho espacio vacío.
- Texto progresivamente más grande o más aislado.
- Composición más abstracta.
- Líneas o elementos que sugieran continuidad.

### Recursos interactivos

- Movimiento lento de algunas palabras.
- Aparición progresiva de conceptos.
- Elementos que desaparecen mientras otros entran.

### Ideas técnicas

- `position: sticky` para una frase central.
- `transform: translateY()`.
- Animaciones vinculadas al scroll de forma ligera.

---

## 6. A quien reciba estas palabras.

### Recursos visuales

- Cambio de lector a participante.
- Formulario integrado en la estética de correspondencia. Los entry deben tener poca sensación de profundidad
- Campos tratados como líneas de escritura.
- Área de mensaje amplia.

### Recursos interactivos

- Focus visual muy claro.
- Animación sutil al seleccionar cada campo.
- Confirmación elegante tras el envío.

### Ideas técnicas

- `<form>` semántico. etiqueta semántica par recoger y enviar datos
- `label` correctamente asociado.
- Estados `:focus` y `:focus-visible`. pseudo-clase css que aplica cuando el elemento interactivo tiene foco; ya sea por input por ejemplo.
- JavaScript solo para validación y feedback.

---

## 7. Cierre — Post scriptum

### Recursos visuales

- Composición casi vacía.
- Firma, fecha o inicial.
- Línea final o pequeña marca tipográfica.
- Espacio blanco como recurso principal.

### Recursos interactivos

- Aparición lenta de la última frase.
- Posible desaparición progresiva de elementos previos.
- Pequeño enlace para volver al inicio.

### Ideas técnicas

- `opacity`.
- Scroll suave.
- Enlace interno con ancla.

---

# Recursos globales del sitio

## Scroll

Usarlo como principal mecanismo narrativo.

Recursos razonables:

- `scroll-behavior: smooth`.
- `IntersectionObserver`. API nativa de JavaScript que permite detectar cuando un elemento entra, sale o cruza el viewport
- Elementos `sticky`.
- Animaciones cortas y discretas.

Evitar inicialmente:

- librerías complejas de animación;
- scroll hijacking;
- efectos 3D;
- WebGL;
- animaciones difíciles de mantener.

---

## Textura

La textura del papel puede convertirse en uno de los elementos principales de identidad.

Opciones sencillas:

- imagen de textura optimizada;
- gradientes CSS muy sutiles;
- ruido ligero mediante SVG.

Evitar texturas demasiado intensas que dificulten la lectura.

---

## Tipografía

Trabajar con dos niveles:

**Tipografía expresiva**

- títulos;
- frases;
- firma;
- anotaciones.

**Tipografía funcional**

- párrafos;
- formularios;
- navegación;
- contenido técnico.

Esto mantiene la identidad sin sacrificar legibilidad.

---

## Animación

Principio general:

> La animación debe acompañar la lectura, no competir con ella.

Priorizar:

- `opacity`;
- `translate`;
- subrayados;
- pequeñas escalas;
- aparición progresiva.

---

# Nivel técnico recomendado

Para una primera versión:

```text
HTML5
   ↓
CSS3
   ↓
JavaScript
   ↓
IntersectionObserver
```

No necesitas inicialmente un framework de animación.

Una implementación limpia con estas tecnologías puede demostrar mejor tu capacidad como desarrollador que una web cargada de dependencias.

---

# Idea central del portfolio

El valor del proyecto no debería estar en demostrar cuántos se pueden implementar.

Debería demostrar que se puede relacionar:

**narrativa → diseño → interacción → código**
