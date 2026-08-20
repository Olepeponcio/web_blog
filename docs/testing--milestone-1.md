# Pruebas del HITO 1

## Propósito

Validar el flujo inicial de la epístola digital antes de cerrar el HITO 1. La
batería combina comprobaciones automatizadas con Playwright y revisiones manuales
cuando el resultado depende de percepción visual o criterio de diseño.

## Alcance

```text
Sobre → arrastre → sello → texto de apertura → scroll → recorrido narrativo
```

La entrada táctil, el teclado y `prefers-reduced-motion` permanecen como requisitos
posteriores y no bloquean el cierre de este hito.

## Viewports

| Identificador | Anchura × altura | Referencia          |
| :------------ | :--------------- | :------------------ |
| `mobile-sm`   | 375 × 667        | Móvil estrecho      |
| `mobile-lg`   | 390 × 844        | Móvil alto          |
| `tablet`      | 768 × 1024       | Tableta vertical    |
| `desktop-sm`  | 1024 × 768       | Escritorio reducido |
| `desktop-lg`  | 1440 × 900       | Escritorio amplio   |

Los nombres identifican configuraciones de prueba, no tipos cerrados de
dispositivo.

## Pruebas automatizadas con Playwright

### Carga inicial

| ID    | Comprobación                 | Resultado esperado                              |
| :---- | :--------------------------- | :---------------------------------------------- |
| `A01` | Cargar la página             | No existen errores JavaScript críticos          |
| `A02` | Consultar el estado inicial  | `data-page-state="sealed"`                      |
| `A03` | Intentar desplazar la página | El scroll permanece bloqueado                   |
| `A04` | Comprobar el sobre           | Existe una porción visible dentro del viewport  |
| `A05` | Comprobar el sello           | Muestra el recurso intacto y está deshabilitado |

### Arrastre

| ID    | Comprobación                  | Resultado esperado                          |
| :---- | :---------------------------- | :------------------------------------------ |
| `B01` | Pulsar con el botón izquierdo | El estado cambia a `dragging`               |
| `B02` | Desplazar horizontalmente     | La posición horizontal no cambia            |
| `B03` | Realizar un arrastre parcial  | La posición alcanzada se conserva al soltar |
| `B04` | Reanudar el arrastre          | Continúa desde la posición conservada       |
| `B05` | Superar el límite inicial     | El sobre no se oculta más de lo permitido   |
| `B06` | Superar el límite final       | El sobre no rebasa su posición final        |
| `B07` | Completar el despliegue       | El estado cambia a `seal-ready`             |
| `B08` | Volver a arrastrar            | El sobre permanece inmóvil                  |

### Sello y apertura

| ID    | Comprobación                         | Resultado esperado                         |
| :---- | :----------------------------------- | :----------------------------------------- |
| `C01` | Pulsar el sello antes del despliegue | No cambia el estado                        |
| `C02` | Pulsar el sello habilitado           | Comienza la secuencia de apertura          |
| `C03` | Esperar la transición                | El recurso final corresponde al sello roto |
| `C04` | Pulsar de nuevo                      | La secuencia no se reinicia                |
| `C05` | Observar el estado de escritura      | Cambia a `writing`                         |
| `C06` | Completar la apertura                | Sobre, solapa y sello roto siguen visibles |

### Texto de apertura

| ID    | Comprobación                         | Resultado esperado                      |
| :---- | :----------------------------------- | :-------------------------------------- |
| `D01` | Comprobar el autoscroll              | La vista termina situada sobre el texto |
| `D02` | Intentar scroll durante la escritura | El scroll permanece bloqueado           |
| `D03` | Registrar las palabras reveladas     | Mantienen el orden del texto fuente     |
| `D04` | Comprobar párrafos y saltos          | La estructura documental se conserva    |
| `D05` | Esperar la última palabra            | Finaliza con «Por eso decidí escribir.» |
| `D06` | Comprobar el estado final            | Cambia a `open`                         |

### Recorrido y contenido

| ID    | Comprobación                      | Resultado esperado                     |
| :---- | :-------------------------------- | :------------------------------------- |
| `E01` | Desplazar después de la escritura | Barra y rueda quedan habilitadas       |
| `E02` | Comprobar el indicador de scroll  | Aparece al finalizar el texto          |
| `E03` | Iniciar el desplazamiento         | El indicador desaparece                |
| `E04` | Consultar las secciones           | Existen en el orden narrativo definido |
| `E05` | Alcanzar el final                 | Destinatario y footer son accesibles   |
| `TC01` | Arrastrar mediante gesto táctil  | Despliega el sobre y devuelve `pan-y`  |

### Responsive estructural

Playwright ejecutará el flujo en cada viewport y comprobará:

- ausencia de scroll horizontal;
- porción inicial del sobre dentro del viewport;
- sello contenido y accionable;
- sello proporcionado y remitente escalable por viewport;
- texto sin recortes;
- secciones dentro del ancho disponible;
- footer contenido dentro del viewport.

### Recursos y enlaces

| ID    | Comprobación         | Resultado esperado                           |
| :---- | :------------------- | :------------------------------------------- |
| `G01` | Recursos de portada  | Responden sin error                          |
| `G02` | Font Awesome externo | CSS y fuente de marcas se cargan             |
| `G03` | LinkedIn             | El enlace coincide con la URL documentada    |
| `G04` | Instagram            | Se presenta deshabilitado y sin enlace vacío |

## Pruebas manuales

Estas comprobaciones no deben automatizarse como condición única porque requieren
valoración humana.

| ID    | Comprobación            | Criterio                                               |
| :---- | :---------------------- | :----------------------------------------------------- |
| `M01` | Pista inicial del sobre | Comunica que el elemento puede arrastrarse             |
| `M02` | Sensación del arrastre  | El movimiento se percibe continuo y controlable        |
| `M03` | Rotura del sello        | El cambio es perceptible y conserva el sello roto      |
| `M04` | Autoscroll              | Resulta pausado y no desorienta                        |
| `M05` | Escritura progresiva    | Tiene un ritmo legible y coherente con la narrativa    |
| `M06` | Indicador de scroll     | Comunica la acción sin competir con el texto           |
| `M07` | Lectura completa        | El recorrido mantiene continuidad y claridad           |
| `M08` | Comparación con Figma   | Las diferencias son intencionales o quedan registradas |
| `M09` | Responsive visual       | La composición conserva jerarquía en cada viewport     |
| `M10` | Iconos sociales         | Son visibles, reconocibles y coherentes con el footer  |

## Criterio de aprobación

El HITO 1 puede cerrarse cuando:

- todas las pruebas automatizadas críticas pasan;
- ninguna resolución impide completar el flujo;
- no existe scroll horizontal involuntario;
- las pruebas manuales no detectan bloqueos de lectura o interacción;
- las diferencias respecto a Figma y los asuntos posteriores quedan documentados.

Un fallo se considera crítico cuando impide abrir la carta, leer el contenido o
alcanzar alguna sección.

## Automatización implementada

La batería utiliza Playwright con:

- configuración común en `playwright.config.js`;
- cinco proyectos asociados a los viewports definidos;
- utilidades compartidas para desplegar y abrir la epístola;
- pruebas agrupadas por carga, arrastre, sello, escritura, recorrido, responsive
  y recursos;
- script `pnpm test:e2e`;
- validación independiente de `dist/` mediante `pnpm test:e2e:build`;
- capturas y trazas conservadas únicamente cuando existen fallos;
- resultados temporales excluidos del control de versiones.

La compilación no se ejecuta dentro de la batería paralela. Las comprobaciones
de desarrollo utilizan el servidor de Vite, mientras que la validación de
recursos empaquetados se mantiene en un flujo independiente sobre `dist/` y
`vite preview`.

## Estado de las pruebas manuales

Las pruebas `M01–M10` se revisaron manualmente. Durante la revisión se detectó
y corrigió la aparición de fondos ajenos a la textura del proyecto durante el
autoscroll y la escritura. La corrección se validó visualmente y mediante la
regresión automatizada del bloque `D01–D06`.

## Cierre de la fase

La fase de testing del HITO 1 queda finalizada: la batería automatizada completa
no presenta fallos y la revisión manual está aprobada.

## Registro de ejecución

| Fecha      | Entorno                | Resultado             | Incidencias                 |
| :--------- | :--------------------- | :-------------------: | :-------------------------- |
| 2026-08-14 | Chromium + Playwright  | 181 pasan, 4 omitidas | Ningún fallo automatizado   |
| 2026-08-14 | Revisión visual manual |    M01–M10 aprobadas   | Fondo de escritura corregido |
