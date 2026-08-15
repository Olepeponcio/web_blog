# Pruebas del HITO 4 — Presente

## Propósito

Validar la escritura reversible, el dibujo y escalado de la carretera y las
interacciones de señal y sol sin bloquear el recorrido narrativo.

La matriz automatizada está implementada y validada en los cinco viewports. Las
pruebas manuales permanecen pendientes.

## Alcance

```text
Memory → escritura → carretera → señal y sol → siguiente sección
          ↕ rebobinado mediante scroll
```

## Pruebas automatizables

| Grupo | Cobertura | Resultado esperado |
| :-- | :-- | :-- |
| U — Entrada | Transición desde `memory` | `present` comienza sin bloquear el scroll. |
| V — Escritura | Orden de caracteres y saltos | El texto avanza de izquierda a derecha. |
| W — Rebobinado | Cambio de dirección | Los caracteres retroceden de derecha a izquierda sin saltos. |
| X — Carretera | Inicio, máscara, escala y límites | La carretera comienza después de la escritura y sigue el progreso. |
| Y — Señal | Ciclo automático, reposo, `Always` y `Forward` | Alterna sin mensajes, pausa y restaura el ciclo correctamente. |
| Z — Sol | Hotspot, halo y mensaje | La zona coincide con el sol y el texto aparece dentro de la carretera. |
| AA — Entradas | Puntero, teclado y toque | Las tres zonas son operables sin depender de `hover`. |
| AB — Responsive | Cinco viewports | Escena, textos y controles permanecen contenidos. |
| AC — Movimiento reducido | Preferencia `reduce` | El contenido y las interacciones siguen disponibles. |
| AD — Recursos | Imágenes locales de Presente | Todos los recursos responden sin error. |

## Pruebas manuales

| ID | Comprobación | Criterio |
| :-- | :-- | :-- |
| M25 | Escritura | El ritmo resulta legible durante el avance. |
| M26 | Rebobinado | La inversión se percibe continua y coherente. |
| M27 | Pincelada | El dibujo nace visualmente en la esquina superior izquierda. |
| M28 | Escalado | La carretera crece sin saltos ni deformaciones. |
| M29 | Señal | Las permutas resultan comprensibles y estables. |
| M30 | Mensajes | Posición, contraste y permanencia facilitan la lectura. |
| M31 | Entrada táctil | Activación y cierre no generan estados ambiguos. |
| M32 | Responsive | La composición conserva intención y accionabilidad. |

## Criterio de aprobación

El HITO 4 podrá cerrarse cuando:

- avance y retroceso reproduzcan exactamente el progreso del scroll;
- la carretera no comience antes de finalizar la escritura;
- no exista bloqueo permanente del scroll;
- señal y sol funcionen con puntero, teclado y toque;
- el contenido sea accesible con movimiento reducido;
- las pruebas automatizadas pasen en los cinco viewports;
- las pruebas manuales `M25–M32` estén registradas.

## Registro de ejecución

Primera validación automatizada:

- 85 casos funcionales, responsive y de accesibilidad superados;
- 5 comprobaciones adicionales de recursos locales superadas;
- escritura progresiva y rebobinado validados en los cinco viewports;
- ciclo automático, permutas `Always` y `Forward`, sol, teclado y toque validados;
- movimiento reducido y ausencia de desbordamiento horizontal validados;
- compilación de producción completada correctamente.

Durante la primera ejecución se detectó que el redondeo del progreso podía dejar
un carácter pendiente en el límite anterior al dibujo. Se ajustó la cuantización
y el grupo de progreso se repitió con 25 de 25 casos superados.

Las revisiones manuales `M25–M32` continúan pendientes antes del cierre completo
del HITO 4.
