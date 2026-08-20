# Auditoría de accesibilidad — WCAG 2.2 nivel A

## Alcance

Esta matriz registra el estado provisional de la página completa y de sus
variaciones responsive. Es la primera puerta de validación hacia el objetivo
general WCAG 2.2 nivel AA y no constituye todavía una declaración de
conformidad.

Estados utilizados:

- **Aprobado:** existe evidencia verificable en la implementación actual.
- **Pendiente:** falta corregir o completar la comprobación.
- **Prueba manual:** requiere observación humana o medición específica.
- **No aplicable:** el proyecto no contiene actualmente el contenido o la
  funcionalidad a la que se dirige el criterio.

## Criterios aprobados

| Criterio | Estado | Evidencia |
| :-- | :--: | :-- |
| 2.1.2 Sin trampa de teclado | Aprobado | La guía y las ayudas permiten entrar, salir con `Escape` y recuperar el foco sin bloquear la navegación. |
| 2.4.2 Página titulada | Aprobado | `index.html` contiene un título descriptivo: «Carta al futuro». |
| 2.5.1 Gestos del puntero | Aprobado | El arrastre del sobre dispone de una alternativa simple mediante `Intro` o `Espacio`. |
| 3.1.1 Idioma de la página | Aprobado | El documento declara `lang="es"`. |
| 3.2.6 Ayuda coherente | Aprobado | La guía de teclado y las ayudas textuales funcionan y conservan posición, nombre y comportamiento comunes durante el recorrido. |

## Criterios pendientes

| Criterio | Estado | Comprobación o corrección necesaria |
| :-- | :--: | :-- |
| 1.1.1 Contenido no textual | Prueba manual | Revisar sistemáticamente imágenes, iconos, controles gráficos y elementos decorativos. |
| 1.3.1 Información y relaciones | Prueba manual | Confirmar encabezados, regiones y relaciones semánticas con lector de pantalla. |
| 1.3.2 Secuencia significativa | Prueba manual | Comparar el orden del DOM, la lectura asistida y el recorrido visual de las cuatro secciones. |
| 1.3.3 Características sensoriales | Prueba manual | Revisar todas las instrucciones narrativas y evitar referencias exclusivamente visuales o espaciales. |
| 1.4.1 Uso del color | Prueba manual | Comprobar que estados, activaciones y mensajes disponen de una señal adicional al color. |
| 2.1.1 Teclado | Prueba manual | Ejecutar el recorrido completo sin ratón, incluidos sobre, bote, postal y controles narrativos. |
| 2.2.2 Pausar, detener, ocultar | Pendiente | Determinar qué animaciones automáticas cumplen las condiciones del criterio y proporcionar control cuando corresponda. |
| 2.3.1 Tres destellos o por debajo del umbral | Prueba manual | Revisar los efectos visuales y confirmar que no superan el umbral de destellos. |
| 2.4.1 Evitar bloques | Pendiente | No se ha localizado un mecanismo para saltar directamente al contenido principal. |
| 2.4.3 Orden del foco | Prueba manual | Validar que el foco sigue un orden lógico en todos los viewports y estados. |
| 2.4.4 Propósito de los enlaces en contexto | Prueba manual | Inventariar los enlaces presentes y comprobar su nombre accesible dentro del contexto. |
| 2.5.2 Cancelación del puntero | Prueba manual | Validar cancelación, abandono y activación en `pointerup` para las interacciones aplicables. |
| 2.5.3 Etiqueta en el nombre | Prueba manual | Comparar las etiquetas visibles de los controles con sus nombres accesibles. |
| 3.2.1 Al recibir foco | Prueba manual | Confirmar que ningún componente cambia el contexto únicamente al recibir foco. |
| 4.1.2 Nombre, función y valor | Prueba manual | Corregido el rol ausente del marcador de Instagram detectado por Axe; falta confirmar la corrección y revisar los controles personalizados con tecnologías de asistencia. |

## Criterios no aplicables actualmente

Estos criterios se conservan como registro porque deberán reabrirse si cambia
el contenido del proyecto.

| Criterio | Estado | Motivo |
| :-- | :--: | :-- |
| 1.2.1 Solo audio y solo vídeo pregrabado | No aplicable | No existe contenido temporal pregrabado de solo audio o solo vídeo. |
| 1.2.2 Subtítulos pregrabados | No aplicable | No existe contenido audiovisual pregrabado con audio. |
| 1.2.3 Audiodescripción o alternativa multimedia | No aplicable | No existe vídeo pregrabado que requiera alternativa. |
| 1.4.2 Control del audio | No aplicable | No se reproduce audio automáticamente; la narración guiada permanece inactiva. |
| 2.1.4 Atajos de teclas de caracteres | No aplicable | No se han localizado atajos basados en una sola letra, número o símbolo. |
| 2.2.1 Tiempo ajustable | No aplicable | La interfaz no impone límites de tiempo al usuario. |
| 2.5.4 Activación mediante movimiento | No aplicable | No existen funciones activadas por movimiento del dispositivo o del usuario. |
| 3.3.7 Entrada redundante | No aplicable | El flujo no solicita de nuevo información introducida anteriormente. |

## Registro de comprobaciones

| Fecha | Comprobación | Resultado | Evidencia |
| :-- | :-- | :--: | :-- |
| 2026-08-15 | Guía de accesibilidad mediante teclado | Superada | Apertura, cierre, gestión del foco y ausencia de bloqueo verificadas. |
| 2026-08-15 | Ayudas textuales contextuales | Superada | Activación, ocultación, nombres accesibles y convivencia con la guía verificadas. |
| 2026-08-15 | Primera auditoría automática WCAG A | Corrección pendiente de validar | Axe detectó un `aria-label` sin rol válido en el marcador de Instagram; se añadió `role="img"`. |

## Auditoría automática con Axe

La automatización WCAG de nivel A está centralizada para separar el análisis
general de las pruebas funcionales propias de cada sección.

| Módulo | Responsabilidad |
| :-- | :-- |
| `tests/helpers/accessibility.js` | Configura `AxeBuilder` y las etiquetas `wcag2a`, `wcag21a` y `wcag22a`. |
| `tests/accessibility.spec.js` | Ejecuta las auditorías automáticas y comprueba las relaciones semánticas principales. |
| `tests/*-accessibility.spec.js` | Conserva las pruebas específicas de teclado, movimiento reducido y comportamiento de cada sección. |

### Casos automatizados

| Caso | Alcance |
| :-- | :-- |
| AX01 | Portada inicial. |
| AX02 | Guía de teclado abierta. |
| AX03 | Ayudas contextuales activadas. |
| AX04 | Sección Origin preparada. |
| AX05 | Sección Memory preparada. |
| AX06 | Sección Present interactiva. |
| AX07 | Destinatario y pie de página. |
| AX08 | Regiones, secciones, encabezados y diálogo. |

### Ejecución

```text
pnpm test:e2e -- tests/accessibility.spec.js
pnpm test:e2e -- tests/accessibility.spec.js -g "AX04"
pnpm test:e2e -- tests/accessibility.spec.js --project=desktop-sm
```

Axe detecta únicamente infracciones automatizables. Sus resultados no
sustituyen las pruebas manuales con teclado, lector de pantalla, distintos
métodos de entrada y variaciones responsive.

## Condiciones de cierre

El nivel A podrá considerarse validado cuando:

1. Los criterios pendientes hayan sido corregidos y comprobados.
2. Las pruebas manuales se hayan ejecutado en las variaciones responsive.
3. Se registre la evidencia, fecha, entorno y resultado de cada comprobación.
4. Los criterios no aplicables se revisen cuando se añada contenido nuevo.

## Referencias

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Comprender la conformidad](https://www.w3.org/WAI/WCAG22/Understanding/conformance.html)

