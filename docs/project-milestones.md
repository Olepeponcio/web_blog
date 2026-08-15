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
- [x] Mantener visibles el sobre desplegado y el sello roto durante la lectura.
- [x] Desplazar automáticamente la vista hasta el texto de apertura.
- [x] Iniciar el desvelado del texto de apertura palabra por palabra.
- [x] Conservar los párrafos y su orden de lectura durante el desvelado.
- [x] Terminar el desvelado con «Por eso decidí escribir.».
- [x] Habilitar el scroll narrativo al finalizar el texto.
- [x] Mostrar temporalmente una indicación animada de desplazamiento.
- [x] Ocultar la indicación cuando el usuario inicie el scroll.

#### Responsive e implementación

- [x] Aplicar la convención `mobile-first` desde cada sección.
- [x] Escalar remitente y sello desde una base móvil fluida.
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

**Estado:** implementación y validación automatizada completadas; revisión manual pendiente.

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
- Indicador global de continuación y navegación manual hacia `memory`.
- Primera adaptación responsive de la interacción.

La definición técnica se encuentra en
[`design-narrative--digital-epistle.md`](design-narrative--digital-epistle.md#interacción-de-origen).

### Resultado esperado

Un prototipo interactivo en Figma y una implementación web funcional donde el
usuario abre el bote, utiliza la tinta para revelar todo el texto y continúa hacia
la siguiente sección.

### Criterio de cierre

La sección solo restaura el scroll y muestra el indicador cuando todas las
palabras han terminado su animación de revelado. El usuario puede completar la interacción, alcanzar
`memory` y repetir el flujo en los viewports definidos sin desbordamientos ni
bloqueos permanentes.

### Lista de tareas

#### Diseño y recursos

- [x] Incorporar la imagen del bote cerrado.
- [x] Incorporar la imagen del bote abierto.
- [x] Incorporar la imagen del corcho.
- [x] Reutilizar el indicador global de scroll como señal de continuación.
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
- [x] Mostrar el indicador global únicamente cuando el scroll esté disponible.
- [x] Permitir que el usuario avance manualmente hacia `memory` o regrese a Cover.
- [x] Restaurar el scroll narrativo al completar Origen.

#### Responsive y validación

- [x] Aplicar el enfoque `mobile-first`.
- [x] Validar posiciones, trayectoria, radio y texto por viewport.
- [x] Evitar scroll horizontal y bloqueos permanentes.
- [x] Diseñar pruebas automatizadas y manuales para el hito 2.

### Validación

La matriz se encuentra en [`testing--milestone-2.md`](testing--milestone-2.md).
La ejecución general aprobó 254 casos, presentó dos fallos subpíxel en K03 y
omitió cuatro casos intencionadamente. Después de aplicar una tolerancia de
`0.5px`, la batería responsive específica aprobó sus 25 ejecuciones.

Las comprobaciones manuales `M11–M16` permanecen pendientes.

---

## Hito 3 — Memoria y postal interactiva

**Estado:** implementado; batería automatizada creada y pendiente de
revalidación después del saneamiento responsive. La revisión manual continúa
sin completar.

### Objetivo

Diseñar e implementar la sección `memory` como una escena persistente donde el
usuario descubre un interruptor, activa un instrumento y libera una postal para
leer su reverso.

### Contenido

- Escena de escritorio y corkboard mediante dos estados visuales.
- Postal independiente fijada a la derecha de «THINGS TO DO».
- Hotspot invisible sobre el interruptor de la lámpara.
- Chispas intermitentes como invitación a interactuar.
- Cambio entre `img__board_1.webp` e `img__board_2.webp`.
- Halo verde intermitente sobre el instrumento.
- Desprendimiento, caída y ascenso de la postal.
- Giro de la postal entre anverso y reverso.
- Persistencia de la escena completada hasta recargar la página.
- Primera adaptación responsive de la interacción.

La definición técnica se encuentra en
[`design-narrative--digital-epistle.md`](design-narrative--digital-epistle.md#interacción-de-memoria).

### Resultado esperado

Un prototipo interactivo en Figma y una implementación web funcional donde el
usuario enciende la escena, activa el instrumento, libera la postal y muestra su
reverso.

### Criterio de cierre

La postal completa su movimiento sin saltos, gira hasta mostrar el reverso y
permanece en ese estado. Solo entonces se habilitan el scroll y la barra lateral.
La interacción puede completarse en los viewports definidos sin desbordamientos
ni superposición sobre secciones posteriores.

### Lista de tareas

#### Diseño y recursos

- [x] Incorporar las dos imágenes del tablero.
- [x] Incorporar el anverso y el reverso de la postal.
- [x] Completar el prototipo de la escena en Figma.
- [x] Posicionar la postal junto a «THINGS TO DO».
- [x] Ajustar rotación y escala a la composición del corkboard.

#### Entrada en Memoria

- [x] Detectar y centrar la sección `memory`.
- [x] Bloquear scroll y barra lateral después del centrado.
- [x] Mostrar `img__board_1.webp` como escena inicial.
- [x] Mantener la postal fijada y el reverso oculto.

#### Interruptor y chispas

- [x] Superponer un hotspot porcentual sobre el interruptor.
- [x] Comunicar la interacción mediante cursor y `hover`.
- [x] Generar una secuencia determinista de chispas.
- [x] Aplicar `pointer-events: none` a las partículas.
- [x] Detener definitivamente las chispas al activar el interruptor.
- [x] Precargar y mostrar `img__board_2.webp`.

#### Instrumento

- [x] Superponer un hotspot porcentual sobre el instrumento.
- [x] Generar el parpadeo mediante un halo verde localizado.
- [x] Evitar alternar las imágenes completas para producir el parpadeo.
- [x] Detener el parpadeo y mantener la luz fija al hacer clic.
- [x] Deshabilitar activaciones repetidas.

#### Movimiento de la postal

- [x] Medir la posición inicial con `getBoundingClientRect()`.
- [x] Desprender y desplazar la postal hacia el centro.
- [x] Aplicar rotación, contracción intermedia y expansión final.
- [x] Escalar y centrar la postal sobre la escena.
- [x] Aumentar su `z-index` durante el movimiento.
- [x] Bloquear clics hasta alcanzar `postal-ready`.

#### Giro y finalización

- [x] Construir las caras frontal y posterior de la postal.
- [x] Aplicar `backface-visibility: hidden`.
- [x] Girar la postal `180deg` al hacer clic.
- [x] Confirmar el final de la animación y el reverso activo.
- [x] Anclar la postal dentro de `memory` conservando su posición.
- [x] Mantener el estado completado hasta recargar la página.
- [x] Habilitar scroll y barra lateral únicamente al completar el giro.
- [x] Reducir o eliminar las animaciones con `prefers-reduced-motion`.

#### Responsive y validación

- [x] Aplicar posicionamiento porcentual a hotspots y postal.
- [x] Validar escena, trayectoria, escala y giro por viewport.
- [x] Evitar scroll horizontal y superposición sobre otras secciones.
- [x] Diseñar pruebas automatizadas y manuales para el hito 3.
- [x] Implementar la batería automatizada del hito 3.

La matriz y su registro de ejecución se encuentran en
[`testing--milestone-3.md`](testing--milestone-3.md). La batería global vigente
recorre 365 casos sobre cinco viewports, incluida la adaptación de la postal
después de redimensionar y los recorridos por teclado.

---

## Hitos posteriores

Los siguientes hitos se definirán progresivamente, uno por cada `section`. Las
propuestas anteriores quedan retiradas para evitar condicionar secciones cuya
lógica todavía no ha sido aprobada.

Los recursos existentes en `src/assets/images/04-present/` se consideran material
preparatorio y no una implementación del siguiente hito.

## Hito final — Depuración y auditoría

Cuando todas las secciones estén implementadas se realizará un hito transversal:

- depuración y eliminación de código o recursos sin uso;
- auditoría funcional y responsive;
- revisión de accesibilidad;
- revisión de seguridad según OWASP ASVS 5.0 nivel 1;
- auditoría de dependencias y recursos externos;
- revisión de rendimiento y compilación;
- sincronización de versión, etiqueta y manifiesto;
- consolidación documental y preparación de publicación.

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
