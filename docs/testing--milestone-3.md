# Pruebas del HITO 3 — Memoria

## Propósito

Validar la entrada controlada en `memory`, los controles de la escena, el
movimiento de la postal, su giro y la restauración del scroll.

La matriz automatizada está implementada y el desbordamiento responsive
detectado en la primera ejecución está corregido.

## Alcance

```text
Memory → interruptor → instrumento → postal centrada → reverso → scroll libre
```

## Pruebas automatizables

| Grupo | Cobertura | Resultado esperado |
| :-- | :-- | :-- |
| L — Entrada | Estados `idle`, `entering` y `board-ready` | La escena se activa sin bloquear el scroll. |
| M — Interruptor | Hotspot, centrado, bloqueo, precarga y cambio de tablero | La escena pasa una sola vez a `signal`. |
| N — Instrumento | Halo, bloqueo de repeticiones y evento de activación | La luz queda fija y comienza el movimiento. |
| O — Movimiento | Medición, centrado, escala y bloqueo de clics | La postal termina en `postal-ready`. |
| P — Giro | Caras, giro, desbloqueo e indicador | El reverso queda visible en `complete`. |
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
- el bloqueo de Memory comience con el interruptor y termine con el giro;
- la postal no invada secciones posteriores;
- el flujo pueda completarse con movimiento reducido;
- las pruebas manuales `M17–M24` estén registradas;
- las diferencias respecto al diseño queden documentadas.

## Registro de ejecución

Ejecución vigente:

- 365 casos globales recorridos sobre cinco viewports;
- ningún fallo funcional comunicado durante la ejecución;
- `R03` pasa en los cinco viewports;
- `R04` confirma que la postal recalcula su tamaño después de redimensionar;
- los recorridos añadidos por teclado pasan;
- los recursos WebP locales responden correctamente.

El proceso de Playwright quedó esperando durante el cierre del servidor local y
se detuvo manualmente después de obtener todos los resultados. Esto explica el
código de salida de esas ejecuciones y no añade fallos funcionales.

La batería automatizada queda validada. El cierre completo del HITO 3 conserva
como pendiente únicamente el registro de las pruebas manuales `M17–M24`.
