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
| 2.4.2 Página titulada | Aprobado | `index.html` contiene un título descriptivo: «Carta al futuro». |
| 3.1.1 Idioma de la página | Aprobado | El documento declara `lang="es"`. |
| 3.2.6 Ayuda coherente | Aprobado | La guía y la ayuda contextual conservan posición, nombre y comportamiento comunes durante el recorrido. |
| 3.3.2 Etiquetas o instrucciones | Aprobado | Los campos del formulario tienen etiquetas visibles y descripciones asociadas mediante `aria-describedby`. |

## Criterios pendientes

| Criterio | Estado | Comprobación o corrección necesaria |
| :-- | :--: | :-- |
| 1.1.1 Contenido no textual | Prueba manual | Revisar sistemáticamente imágenes, iconos, controles gráficos y elementos decorativos. |
| 1.3.1 Información y relaciones | Prueba manual | Confirmar encabezados, regiones, formulario y relaciones semánticas con lector de pantalla. |
| 1.3.2 Secuencia significativa | Prueba manual | Comparar el orden del DOM, la lectura asistida y el recorrido visual de las cuatro secciones. |
| 1.3.3 Características sensoriales | Prueba manual | Revisar todas las instrucciones narrativas y evitar referencias exclusivamente visuales o espaciales. |
| 1.4.1 Uso del color | Prueba manual | Comprobar que estados, activaciones y mensajes disponen de una señal adicional al color. |
| 2.1.1 Teclado | Prueba manual | Ejecutar el recorrido completo sin ratón, incluidos sobre, bote, postal, controles y formulario. |
| 2.1.2 Sin trampa de teclado | Prueba manual | Verificar entrada y salida del foco en la guía, la ayuda y todos los estados narrativos. |
| 2.2.2 Pausar, detener, ocultar | Pendiente | Determinar qué animaciones automáticas cumplen las condiciones del criterio y proporcionar control cuando corresponda. |
| 2.3.1 Tres destellos o por debajo del umbral | Prueba manual | Revisar los efectos visuales y confirmar que no superan el umbral de destellos. |
| 2.4.1 Evitar bloques | Pendiente | No se ha localizado un mecanismo para saltar directamente al contenido principal. |
| 2.4.3 Orden del foco | Prueba manual | Validar que el foco sigue un orden lógico en todos los viewports y estados. |
| 2.4.4 Propósito de los enlaces en contexto | Prueba manual | Inventariar los enlaces presentes y comprobar su nombre accesible dentro del contexto. |
| 2.5.1 Gestos del puntero | Prueba manual | Confirmar que cada gesto de arrastre dispone de una alternativa simple funcional. |
| 2.5.2 Cancelación del puntero | Prueba manual | Validar cancelación, abandono y activación en `pointerup` para las interacciones aplicables. |
| 2.5.3 Etiqueta en el nombre | Prueba manual | Comparar las etiquetas visibles de los controles con sus nombres accesibles. |
| 3.2.1 Al recibir foco | Prueba manual | Confirmar que ningún componente cambia el contexto únicamente al recibir foco. |
| 3.2.2 Al introducir datos | Prueba manual | Comprobar que editar campos o activar opciones no cambia inesperadamente el contexto. |
| 3.3.1 Identificación de errores | Pendiente | Implementar o verificar mensajes textuales accesibles para los errores del formulario. |
| 4.1.2 Nombre, función y valor | Prueba manual | Inspeccionar con tecnologías de asistencia los controles personalizados y sus cambios de estado. |

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

## Condiciones de cierre

El nivel A podrá considerarse validado cuando:

1. Los criterios pendientes hayan sido corregidos y comprobados.
2. Las pruebas manuales se hayan ejecutado en las variaciones responsive.
3. Se registre la evidencia, fecha, entorno y resultado de cada comprobación.
4. Los criterios no aplicables se revisen cuando se añada contenido nuevo.

## Referencias

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Comprender la conformidad](https://www.w3.org/WAI/WCAG22/Understanding/conformance.html)

