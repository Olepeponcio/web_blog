# Hitos del proyecto — Front-end Web Blog

## Propósito

Organizar el aprendizaje y desarrollo progresivo de una experiencia web concebida
como una epístola digital.

Cada hito combina:

1. Estudio de conceptos y referencias.
2. Experimentación acotada.
3. Aplicación al proyecto.
4. Revisión de lo aprendido.
5. Decisión sobre el siguiente hito.

El diseño es mutable: cualquier decisión podrá revisarse cuando las pruebas aporten
una alternativa mejor.

---

## Hito 1 — Investigación visual y fundamentos de Figma

### Objetivo

Repasar los fundamentos de Figma, convertir la narrativa de la epístola digital
en un primer mockup exploratorio e implementar su flujo inicial en la web.

### Contenido

- Frames, retículas, componentes y Auto Layout.
- Jerarquía tipográfica y espacio negativo.
- Investigación de interfaces editoriales y correspondencia histórica.
- Análisis de referencias en Awwwards y CSS Design Awards.
- Exploración de papel, tinta, caligrafía, márgenes y anotaciones.
- Mockup inicial de escritorio.
- Portada representada como el anverso de un sobre cerrado.
- Sello de cera utilizado como control de acceso a la narrativa.
- Estados inicial, abierto y navegable.
- Eventos mediante puntero, teclado y entrada táctil.
- Recorrido continuo mediante scroll por todas las secciones.
- Primera adaptación responsive de cada sección.
- Implementación mediante HTML, CSS y JavaScript cuando proceda.

### Proceso de eventos

```text
ESTADO INICIAL
    → header con forma de sobre cerrado
    → sello intacto
    → scroll narrativo deshabilitado
    → navegación lateral deshabilitada

ACTIVACIÓN DEL SELLO
    → transición al sello roto
    → apertura de la narrativa
    → scroll habilitado
    → navegación lateral habilitada

RECORRIDO
    → acceso continuo a todas las secciones
```

### Resultado esperado

Un prototipo interactivo en Figma y una implementación web funcional que
representen el recorrido:

**Origen → Memoria → Presente → Futuro → Destinatario → Respuesta**

### Criterio de cierre

El flujo diseñado en Figma puede recorrerse en la implementación web. El sello
responde mediante puntero, teclado y entrada táctil; su activación habilita el
scroll y permite acceder a todas las secciones. Cada sección dispone de una
primera adaptación responsive, aunque su composición visual permanezca mutable.

### Lista de tareas

#### Recursos y composición

- [ ] Crear una imagen del sello intacto.
- [ ] Crear una imagen del sello roto.
- [ ] Representar el anverso del sobre mediante el `header`.
- [ ] Definir la posición de los textos de la portada.
- [ ] Situar el sello en el borde inferior y centrado.
- [ ] Representar cada punto narrativo mediante una `section` independiente.

#### Estado inicial

- [ ] Mostrar el sello intacto.
- [ ] Deshabilitar inicialmente el scroll narrativo.
- [ ] Ocultar o deshabilitar inicialmente la navegación lateral.

#### Activación mediante puntero

- [ ] Comunicar que el sello es interactivo al situar el cursor sobre él.
- [ ] Mostrar un halo tenue alrededor del sello.
- [ ] Cambiar del sello intacto al roto al hacer clic.
- [ ] Habilitar el scroll y la navegación lateral.

#### Activación mediante teclado

- [ ] Permitir enfocar el sello.
- [ ] Activar la apertura mediante `Enter` o la barra espaciadora.
- [ ] Mostrar un indicador de foco visible.

#### Activación táctil

- [ ] Permitir la apertura mediante toque.
- [ ] Comunicar la interacción sin depender de `hover`.

#### Responsive e implementación

- [ ] Aplicar la convención `mobile-first` desde cada sección.
- [ ] Usar composición y medidas fluidas.
- [ ] Definir breakpoints según las necesidades del contenido.
- [ ] Validar individualmente la adaptación de cada `section`.
- [ ] Completar el flujo interactivo en Figma.
- [ ] Implementar el modelo mediante HTML y CSS.
- [ ] Incorporar JavaScript cuando lo requieran los estados y eventos.
- [ ] Comprobar el recorrido completo mediante scroll en la implementación web.

---

## Hito 2 — Sistema visual y diseño responsive

### Objetivo

Transformar el mockup inicial en un sistema visual coherente y adaptable.

### Contenido

- Tipografía expresiva y tipografía funcional.
- Paleta basada principalmente en blanco y negro.
- Textura de papel y recursos editoriales.
- Escalas de espaciado y tamaños tipográficos.
- Componentes y variantes reutilizables en Figma.
- Adaptación a móvil, tableta y escritorio.
- Contraste y legibilidad iniciales.

### Resultado esperado

Prototipo visual responsive y conjunto mínimo de decisiones reutilizables.

### Criterio de cierre

Las principales secciones funcionan en diferentes tamaños de pantalla sin perder
legibilidad ni identidad.

---

## Hito 3 — Arquitectura semántica y contenido

### Objetivo

Traducir el diseño a una estructura HTML comprensible, accesible y mantenible.

### Contenido

- Jerarquía de encabezados.
- Secciones narrativas y landmarks.
- Orden de lectura sin estilos.
- Integración semántica del formulario.
- Organización de recursos y archivos.
- Formalización de convenciones HTML, CSS y JavaScript.

### Resultado esperado

Una estructura HTML completa que pueda leerse y entenderse sin CSS ni JavaScript.

### Criterio de cierre

El documento conserva su sentido, jerarquía y recorrido narrativo usando solamente
HTML.

---

## Hito 4 — Implementación visual con CSS

### Objetivo

Reproducir el lenguaje visual aprobado mediante CSS mantenible.

### Contenido

- Retícula y composición editorial.
- Tipografía, márgenes y espacio negativo.
- Textura de papel optimizada.
- Iniciales, líneas, notas y marcas documentales.
- Diseño responsive.
- Estados de interacción y foco.
- Metodología BEM pragmática.

### Resultado esperado

Versión estática responsive próxima al prototipo visual.

### Criterio de cierre

La página representa la epístola digital sin necesitar JavaScript para sostener
su composición.

---

## Hito 5 — Narrativa del scroll e interacción

### Objetivo

Añadir movimiento únicamente cuando refuerce la lectura.

### Contenido

- Fundamentos de `IntersectionObserver`.
- Apariciones mediante `opacity` y `transform`.
- Subrayados y revelados progresivos.
- Uso moderado de elementos `sticky`.
- Transición visual entre épocas narrativas.
- Preferencia `prefers-reduced-motion`.
- Evaluación del coste y utilidad de cada animación.

### Resultado esperado

Una experiencia de scroll fluida, discreta y coherente con el relato.

### Criterio de cierre

Las animaciones acompañan la lectura, no bloquean contenido y pueden reducirse
por accesibilidad.

---

## Hito 6 — Participación, accesibilidad y calidad

### Objetivo

Completar la experiencia del destinatario y comprobar su calidad técnica.

### Contenido

- Formulario entendido como respuesta a la carta.
- Etiquetas, validación y mensajes de estado.
- Navegación mediante teclado.
- Contraste y foco visible.
- Optimización de fuentes, imágenes y textura.
- Pruebas responsive y entre navegadores.
- Revisión de HTML, CSS y JavaScript.

### Resultado esperado

Una versión funcional, accesible y estable preparada para evaluación.

### Criterio de cierre

El recorrido y el formulario funcionan con teclado, mantienen la legibilidad y
no presentan errores críticos.

---

## Hito 7 — Documentación, portfolio y primera versión funcional

### Objetivo

Consolidar el proyecto como caso de estudio y preparar la publicación de su
primera versión funcional.

### Contenido

- Documentación de decisiones y cambios de dirección.
- Comparación entre mockup y resultado final.
- Registro de aprendizajes y limitaciones.
- Compilación de producción con Vite.
- Revisión final de rendimiento y contenido.
- Preparación y publicación de la primera versión funcional `0.1.0`.
- Integración del trabajo consolidado en `main`.

### Resultado esperado

Primera versión funcional publicada y caso de estudio que explique la relación:

**narrativa → diseño → interacción → código**

### Criterio de cierre

El proyecto puede presentarse, ejecutarse y comprenderse mediante su documentación.

---

## Ciclo interno de cada hito

```text
INVESTIGAR
    ↓
SELECCIONAR una aplicación concreta
    ↓
CREAR una prueba pequeña
    ↓
EVALUAR el resultado
    ↓
APLICAR al proyecto
    ↓
DOCUMENTAR la decisión
    ↓
CERRAR o revisar el hito
```

## Regla de alcance

No comenzar el siguiente hito hasta disponer de:

- un resultado observable;
- una revisión breve;
- una decisión documentada;
- una lista explícita de asuntos pendientes.
