# Pruebas del HITO 2 — Origen

## Alcance

Validar la entrada controlada en `origin`, la apertura del bote, el revelado con
tinta y la continuación hacia `memory` en los cinco viewports del proyecto.

## Pruebas automatizadas con Playwright

| Grupo | Archivo | Cobertura |
| :-- | :-- | :-- |
| G | `origin-entry.spec.js` | Estado inicial, centrado, bloqueo y habilitación. |
| H | `origin-opening.spec.js` | Cambio de imagen, corcho, bloqueo y segundo clic. |
| I | `origin-reveal.spec.js` | Colisiones, palabras y condición de finalización. |
| J | `origin-exit.spec.js` | Flecha, autoscroll a `memory` y desbloqueo. |
| K | `origin-responsive.spec.js` | Contención y ausencia de scroll horizontal. |

Playwright ejecuta cada prueba en `375 × 667`, `390 × 844`, `768 × 1024`,
`1024 × 768` y `1440 × 900`.

Comando:

```text
pnpm test:e2e
```

## Pruebas manuales

| ID | Comprobación | Criterio |
| :-- | :-- | :-- |
| M11 | Suavidad de entrada | El autoscroll centra `origin` sin salto brusco. |
| M12 | Trayectoria del corcho | El arco, la caída y los giros resultan naturales. |
| M13 | Respuesta del bote-puntero | El bote sigue al ratón sin retrasos perceptibles. |
| M14 | Lectura del revelado | La tinta descubre palabras con ritmo y legibilidad. |
| M15 | Señal de continuación | La flecha aparece claramente al completar el texto. |
| M16 | Recorrido completo | No existe bloqueo permanente entre `origin` y `memory`. |

## Registro de ejecución

Primera ejecución automatizada realizada el 14 de agosto de 2026.

- 50 casos del HITO 2 iniciados: 10 pruebas en 5 viewports.
- `K01` detecta que el bote rebasa el límite inferior en `mobile-sm`,
  `desktop-sm` y `desktop-lg`.
- `J02` confirma el estado `completed`, el desbloqueo y la ocultación de la
  flecha, pero `memory` queda entre 30 y 115 px por debajo del borde superior.
- El proceso alcanzó el límite temporal antes de emitir el resumen consolidado.
- La revisión manual `M11–M16` permanece pendiente.

El HITO 2 no se considera validado hasta corregir ambos comportamientos y repetir
la batería completa.
