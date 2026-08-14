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

**Estado:** cerrado en su alcance inicial.

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
- Portada dividida entre la solapa y el cuerpo de la carta.
- Extracción del sobre mediante arrastre vertical.
- Sello de cera utilizado como control de acceso a la narrativa.
- Texto de apertura oculto hasta la activación del sello.
- Desvelado progresivo del texto palabra por palabra.
- Estados inicial, abierto y navegable.
- Interacción inicial mediante ratón.
- Recorrido continuo mediante scroll por todas las secciones.
- Primera adaptación responsive de cada sección.
- Implementación mediante HTML, CSS y JavaScript cuando proceda.

La definición técnica del comportamiento se encuentra en
[`design-narrative--digital-epistle.md`](design-narrative--digital-epistle.md#comportamiento-técnico-de-la-apertura).

### Resultado esperado

Un prototipo interactivo en Figma y una implementación web funcional que
representen la apertura de la carta y el recorrido:

**Sobre → Sello → Texto de apertura → Origen → Memoria → Presente → Futuro →
Destinatario → Respuesta**

### Criterio de cierre

El flujo diseñado en Figma puede recorrerse en la implementación web. El sobre
puede extraerse completamente mediante el ratón. Al activar el sello, este cambia
a su estado roto y el texto de apertura se desvela palabra por palabra hasta
terminar con «Por eso decidí escribir.». Después se habilitan el scroll y la
lectura para acceder a todas las secciones. Cada sección dispone de una primera
adaptación responsive, aunque su composición visual permanezca mutable.

### Lista de tareas

#### Recursos y composición

- [x] Incorporar la imagen del sobre.
- [x] Incorporar la imagen del sello intacto.
- [x] Incorporar la imagen del sello roto.
- [x] Representar el anverso del sobre mediante el `header`.
- [x] Diferenciar la solapa y el cuerpo de la carta.
- [x] Definir la posición de los textos de la portada.
- [x] Situar el sello en el borde inferior y centrado.
- [x] Incorporar el texto completo de apertura en el cuerpo de la carta.
- [x] Representar cada punto narrativo mediante una `section` independiente.

#### Estado inicial

- [x] Mostrar únicamente el fondo de la sección `cover`.
- [x] Situar el sobre parcialmente oculto sobre el límite superior.
- [x] Mostrar el sello intacto.
- [x] Mantener oculto el texto de apertura.
- [x] Deshabilitar inicialmente el scroll narrativo.

#### Despliegue mediante ratón

- [x] Mostrar `grab` cuando el sobre pueda arrastrarse.
- [x] Mostrar `grabbing` durante el arrastre.
- [x] Limitar el movimiento al eje vertical y al recorrido permitido.
- [x] Conservar la posición alcanzada cuando se suelte el sobre.
- [x] Permitir reanudar el arrastre desde la posición conservada.
- [x] Inmovilizar el sobre cuando quede completamente visible.
- [x] Habilitar el sello únicamente después de completar el despliegue.

#### Activación del sello

- [x] Comunicar que el sello es interactivo.
- [x] Mostrar un halo tenue alrededor del sello.
- [x] Cambiar del sello intacto al roto al hacer clic.
- [x] Desplazar automáticamente la vista hasta el texto de apertura.
- [x] Iniciar el desvelado del texto de apertura palabra por palabra.
- [x] Conservar los párrafos y su orden de lectura durante el desvelado.
- [x] Terminar el desvelado con «Por eso decidí escribir.».
- [x] Habilitar el scroll narrativo al finalizar el texto.
- [x] Mostrar temporalmente una indicación animada de desplazamiento.
- [x] Ocultar la indicación cuando el usuario inicie el scroll.

#### Responsive e implementación

- [x] Aplicar la convención `mobile-first` desde cada sección.
- [x] Usar composición y medidas fluidas.
- [x] Definir breakpoints según las necesidades del contenido.
- [x] Validar individualmente la adaptación de cada `section`.
- [x] Completar el flujo interactivo en Figma.
- [x] Implementar el modelo mediante HTML y CSS.
- [x] Incorporar JavaScript cuando lo requieran los estados y eventos.
- [x] Comprobar el recorrido completo mediante scroll en la implementación web.

#### Requisitos posteriores

- [ ] Adaptar la interacción para teclado.
- [ ] Adaptar la interacción para entrada táctil.
- [ ] Definir la alternativa para `prefers-reduced-motion`.

### Validación

El cierre se apoya en [`testing--milestone-1.md`](testing--milestone-1.md):

- 181 pruebas automatizadas aprobadas;
- 4 omisiones intencionadas;
- pruebas manuales `M01–M10` aprobadas;
- ausencia de fallos críticos en los cinco viewports definidos.

---

## Hito 2 — Origen e interacción con tinta

### Objetivo

Diseñar e implementar la sección `origin` como una interacción narrativa basada
en la apertura de un bote de tinta y el revelado progresivo del texto.

### Contenido

- Centrado y bloqueo controlado de la sección `origin`.
- Bote cerrado como primer control interactivo.
- Sustitución por el bote abierto.
- Expulsión del corcho mediante una trayectoria en arco.
- Bote abierto unido al puntero mediante un *hotspot*.
- Radio de acción configurable para revelar palabras.
- Revelado completo de las palabras tocadas parcial o totalmente.
- Condición lógica de finalización independiente de la apariencia CSS.
- Flecha de continuación y autoscroll hacia `memory`.
- Primera adaptación responsive de la interacción.

La definición técnica se encuentra en
[`design-narrative--digital-epistle.md`](design-narrative--digital-epistle.md#interacción-de-origen).

### Resultado esperado

Un prototipo interactivo en Figma y una implementación web funcional donde el
usuario abre el bote, utiliza la tinta para revelar todo el texto y continúa hacia
la siguiente sección.

### Criterio de cierre

La sección solo habilita la flecha cuando todas las palabras han terminado su
animación de revelado. El usuario puede completar la interacción, alcanzar
`memory` y repetir el flujo en los viewports definidos sin desbordamientos ni
bloqueos permanentes.

### Lista de tareas

#### Diseño y recursos

- [x] Incorporar la imagen del bote cerrado.
- [x] Incorporar la imagen del bote abierto.
- [x] Incorporar la imagen del corcho.
- [x] Crear o seleccionar la flecha minimalista de continuación.
- [x] Completar el prototipo de la interacción en Figma.

#### Entrada en Origen

- [x] Detectar la presencia suficiente de `origin`.
- [x] Completar el centrado mediante autoscroll.
- [x] Bloquear el scroll únicamente después del centrado.
- [x] Mostrar el bote cerrado como control disponible.

#### Apertura del bote

- [x] Comunicar la interacción mediante el cursor.
- [x] Sustituir el bote cerrado por el abierto al hacer clic.
- [x] Animar el corcho desde la boca del bote.
- [x] Generar un arco descendente hasta salir del viewport.
- [x] Evitar activaciones repetidas durante la animación.
- [x] Habilitar el segundo clic cuando termine la trayectoria.

#### Bote-puntero

- [x] Unir visualmente el bote abierto al puntero.
- [x] Definir el *hotspot* en la boca del bote.
- [x] Aplicar `pointer-events: none` al objeto flotante.
- [x] Mostrar visualmente el radio de acción cuando resulte útil.

#### Revelado del texto

- [x] Dividir el texto en palabras identificables sin alterar su estructura.
- [x] Mantener las palabras ocultas dentro del flujo documental.
- [x] Detectar la intersección entre el círculo y cada palabra.
- [x] Revelar todas las palabras tocadas por el radio.
- [x] Revelar la palabra completa ante una intersección parcial.
- [x] Evitar contabilizar varias veces una misma palabra.
- [x] Registrar como visible cada palabra al terminar su animación.
- [x] Definir `--ink-reveal-radius` como token configurable.

#### Finalización y salida

- [x] Comprobar que `revealedWords.size === totalWords`.
- [x] Comprobar que no quedan animaciones activas.
- [x] Desactivar el bote-puntero y restaurar el cursor.
- [x] Mostrar y habilitar la flecha únicamente al completar el texto.
- [x] Reutilizar el autoscroll para desplazarse hasta `memory`.
- [x] Restaurar el scroll narrativo al finalizar la transición.

#### Responsive y validación

- [x] Aplicar el enfoque `mobile-first`.
- [ ] Validar posiciones, trayectoria, radio y texto por viewport.
- [ ] Evitar scroll horizontal y bloqueos permanentes.
- [x] Diseñar pruebas automatizadas y manuales para el hito 2.

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
