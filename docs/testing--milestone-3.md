# Pruebas del HITO 3 — Memoria

## Propósito

Validar la entrada controlada en `memory`, los controles de la escena, el
movimiento de la postal, su giro y la restauración del scroll.

La matriz automatizada está implementada. Su primera ejecución ha detectado un
desbordamiento responsive pendiente de corregir.

## Alcance

```text
Memory → interruptor → instrumento → postal centrada → reverso → scroll libre
```

## Pruebas automatizables

| Grupo | Cobertura | Resultado esperado |
| :-- | :-- | :-- |
| L — Entrada | Estados `idle`, `centering`, `entering`, `locked` y `board-ready` | La sección queda alineada antes del bloqueo. |
| M — Interruptor | Hotspot, chispas, precarga y cambio de tablero | La escena pasa una sola vez a `signal`. |
| N — Instrumento | Halo, bloqueo de repeticiones y evento de activación | La luz queda fija y comienza el movimiento. |
| O — Movimiento | Medición, centrado, escala y bloqueo de clics | La postal termina en `postal-ready`. |
| P — Giro | Caras, giro, estado final y desbloqueo | El reverso queda visible en `complete`. |
| Q — Persistencia | Salida y regreso a la sección | La escena no se reinicia sin recargar. |
| R — Responsive | Cinco viewports y ausencia de desbordamientos | La escena permanece contenida y accionable. |
| S — Movimiento reducido | Preferencia `reduce` | No existen animaciones imprescindibles para completar el flujo. |
| T — Recursos | Imágenes locales de Memory | Todos los recursos responden sin error. |

## Pruebas manuales

| ID | Comprobación | Criterio |
| :-- | :-- | :-- |
| M17 | Entrada de la escena | El centrado y la aparición resultan naturales. |
| M18 | Chispas | Invitan a interactuar sin distraer. |
| M19 | Señal del instrumento | El parpadeo dirige correctamente la atención. |
| M20 | Movimiento de la postal | El desplazamiento y la expansión se perciben fluidos. |
| M21 | Giro | La transición entre ambas caras resulta comprensible. |
| M22 | Lectura | El reverso mantiene legibilidad y jerarquía. |
| M23 | Persistencia | Al regresar, la postal conserva su estado final. |
| M24 | Responsive | Hotspots y postal conservan su relación con la escena. |

## Criterio de aprobación

El HITO 3 podrá validarse cuando:

- todas las pruebas automatizadas críticas pasen en los cinco viewports;
- no exista bloqueo permanente del scroll;
- la postal no invada secciones posteriores;
- el flujo pueda completarse con movimiento reducido;
- las pruebas manuales `M17–M24` estén registradas;
- las diferencias respecto al diseño queden documentadas.

## Registro de ejecución

Primera ejecución automatizada:

- 80 casos ejecutados sobre cinco viewports, incluidos los recursos locales;
- 76 casos funcionales tras corregir una espera asíncrona de la prueba de
  teclado;
- 4 fallos reales en `R03`: el reverso de la postal supera el límite inferior
  en `mobile-sm`, `mobile-lg`, `desktop-sm` y `desktop-lg`;
- `R03` pasa en `tablet`;
- las 15 comprobaciones de accesibilidad y movimiento reducido pasan;
- las 5 comprobaciones de recursos locales pasan.

El proceso de Playwright quedó esperando durante el cierre del servidor local y
se detuvo manualmente después de obtener todos los resultados. Esto explica el
código de salida de esas ejecuciones y no añade fallos funcionales.

La batería queda implementada, pero el HITO 3 no se considera validado hasta
resolver `R03` y completar las pruebas manuales `M17–M24`.
