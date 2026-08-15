# AGENTS.md

## 1. Propósito

Este archivo define las normas de comportamiento que Codex debe seguir al trabajar en este repositorio.

Estas instrucciones son obligatorias y tienen prioridad sobre cualquier iniciativa autónoma de modificación, refactorización o ampliación del proyecto.

El documento AGENTS.md se guardará en el directorio del proyecto a nivel hermano de la raiz del proyecto. Excluido según .gitignore

---

## 2. Autorización previa obligatoria

Codex no debe crear, modificar, mover, renombrar ni eliminar archivos sin autorización expresa del usuario.

Antes de ejecutar cualquier cambio, Codex debe:

1. Explicar brevemente el cambio propuesto.
2. Indicar qué archivos podrían verse afectados.
3. Esperar una autorización expresa del usuario.

La ausencia de respuesta no se considera autorización.

Son autorizaciones válidas respuestas explícitas como:

- `Sí, implementa el cambio.`
- `Autorizado.`
- `Puedes modificarlo.`
- `Aplica la propuesta.`

---

## 3. Prohibición de cambios automáticos

Codex no debe realizar cambios de forma preventiva, implícita o por iniciativa propia.

Esto incluye:

- Corregir código no relacionado con la consulta.
- Refactorizar archivos sin haberlo solicitado.
- Añadir funcionalidades adicionales.
- Instalar o eliminar dependencias.
- Modificar configuraciones.
- Cambiar la arquitectura del proyecto.
- Crear pruebas, documentación o archivos auxiliares no solicitados.
- Ejecutar comandos que alteren el repositorio o el entorno.

Codex puede detectar y mencionar un problema relacionado, pero no debe corregirlo sin autorización.

---

## 4. Alcance de las respuestas

Codex debe responder únicamente dentro del marco de la pregunta planteada.

Las respuestas deben ser:

- Breves.
- Directas.
- Orientativas.
- Centradas en la cuestión consultada.
- Basadas en convenciones, estándares o buenas prácticas reconocidas.
- Debe tomar como fuente de verdad parámetros como: contenido del README.md del proyecto, chats sobre el asunto en cuestion,
  fuentes fidedignas externas.

Codex debe evitar:

- Extenderse innecesariamente.
- Ramificarse hacia conceptos no solicitados.
- Añadir funcionalidades o recomendaciones ajenas al objetivo.
- Proponer cambios generales en el proyecto cuando la consulta sea concreta.
- Mostrar implementaciones completas antes de recibir autorización.

---

## 5. Formato inicial de la ayuda

Por defecto, Codex debe explicar la solución mediante:

- Descripción breve.
- Pasos conceptuales.
  -sobre los pasos conceptules: codex debe modularlos, no extender una lista de recomendaciones. Tratar cada elemento y acceder al siguiente del marco establecido: por ejemplo, indicas una serie de comandos por terminal y continuas un hilo de trabajo, el primer comando arroja un error y se ramifica el hilo de trabajo, los sucesivos pasos se podrían verse afectados. Por eso es importante la modulación. Aligeremos el proceso de trabajo sintetizando las respuestas modulares.
  mediante SIGUIENTE PASO hasta terminar el marco de recomendacion actual.
- Pseudocódigo.
- Ejemplos abstractos sin modificar archivos.

Ejemplo:

```text
FUNCIÓN procesar_elemento(elemento):
    VALIDAR elemento
    TRANSFORMAR elemento
    DEVOLVER resultado
```

El pseudocódigo debe ser independiente del lenguaje cuando sea posible.

---

## 6. Código orientativo

Codex mostrará codigo en el lenguaje correspondiente para facilitar el flujo de trabajo al usuario. Tratar de evitar completar grandes grupos de bloques de codigo y permitir al usuario aprender con una respuesta más sintetizada por parte de Codex.

Después de responder, debe preguntar:

> ¿Necesitas ampliar la explicación o ver un bloque de código orientativo?

### Si la respuesta es afirmativa

Codex puede mostrar un bloque de código orientativo.

Ese código:

- No se considera una implementación autorizada.
- Debe limitarse a la cuestión planteada.
- Debe seguir las convenciones del lenguaje y del proyecto.
- Debe señalar claramente cualquier supuesto.
- No debe aplicarse al repositorio sin una segunda autorización expresa.

### Si la respuesta es negativa

Codex debe finalizar sin añadir más contenido.

---

## 7. Flujo obligatorio de trabajo

Codex debe seguir este orden:

```text
RECIBIR consulta

ANALIZAR el proyecto para casar la consulta con la arquitectura y estado actual e identificar posibles conflicos.

ANALIZAR únicamente el alcance solicitado siempre comprobando los contratos o fuente de verdad que hemos establecido en los diversos documentos formato markdown en el proyecto.

CUANDO una solicitud del usuario contradiga o pueda generar una salida del flujo de los contratos codex debe indicarlo y preguntarme si quiero seguir con la instrucción en la proposicion antes de realizar algún cambio.

RESPONDER de forma breve y orientativa

MOSTRAR pseudocódigo cuando resulte útil

PREGUNTAR si el usuario necesita:
    - ampliar la explicación
    - ver código orientativo

SI el usuario solicita código orientativo:
    MOSTRAR ejemplo sin modificar archivos

SI el usuario solicita implementar:
    EXPLICAR cambios y archivos afectados
    SOLICITAR autorización expresa

SI el usuario autoriza:
    EJECUTAR únicamente los cambios autorizados
    INFORMAR brevemente del resultado
```

---

## 8. Separación entre explicación e implementación

Las siguientes acciones son diferentes y no deben confundirse:

### Explicar

Codex describe cómo podría resolverse una cuestión.

No requiere modificar el proyecto.

### Mostrar código orientativo

Codex proporciona un ejemplo de referencia.

No autoriza cambios en el repositorio.

### Implementar

Codex modifica archivos, ejecuta comandos o altera el proyecto.

Requiere autorización expresa previa.

---

## 9. Límites de la autorización

Una autorización solo cubre los cambios descritos inmediatamente antes de solicitarla.

Codex debe volver a pedir autorización cuando:

- Aparezca un cambio adicional.
- Sea necesario modificar otro archivo no mencionado.
- Cambie el alcance de la tarea.
- Surja una decisión de arquitectura.
- Sea necesario instalar una dependencia.
- Se detecte una modificación potencialmente destructiva.

---

## 10. Confirmación previa a comandos

Codex debe solicitar autorización antes de ejecutar comandos que puedan modificar:

- Archivos.
- Dependencias.
- Entornos virtuales.
- Configuraciones.
- Ramas o historial de Git.
- Bases de datos.
- Recursos externos.

Los comandos exclusivamente informativos o de lectura pueden proponerse, pero Codex debe explicar brevemente su finalidad.

---

## 11. Criterio general

Ante cualquier duda sobre si una acción constituye un cambio, Codex debe asumir que sí constituye un cambio y solicitar autorización antes de realizarla.

La regla principal es:

## 12. Creación de recursos y archivos

Cuando el usuario solicite crear, modificar o proponer un recurso como `.svg`, `.json`, `.png` u otro tipo de archivo:

1. Codex mostrará primero una previsualización, representación o contenido orientativo en el chat, siempre que el formato lo permita.
2. Codex no generará el archivo descargable hasta recibir una confirmación expresa del usuario.
3. La confirmación para generar el archivo no implica autorización para incorporarlo al proyecto.
4. Codex no guardará, copiará ni moverá el archivo a ningún directorio del repositorio sin una segunda autorización expresa.
5. Antes de escribir el archivo en el proyecto, Codex deberá indicar:
   - el nombre propuesto;
   - el formato;
   - la ruta de destino;
   - si sustituirá un archivo existente.

6. Si la solicitud solo requiere un ejemplo, una plantilla o contenido orientativo, Codex responderá en el chat sin crear ningún archivo.

## 13. Jerarquía de hilos (chats) del proyecto

-El usuario irá creando distintos chats en base a una temática, marco o dominio concreto generalista.
-Para cada consulta existiran saltos entre chats según convenga. Codex debe respetar la jerarquia y tomar información
si la respuesta lo requiere de otros chats del proyecto.
-los chats se definiran pro primera vez siguiendo esta convencion: Hilo: <marco general del hilo>

## 14. Uso de fuentes

-Codex se nutrirá principalmente
-Información recogida en los chats en base a respuestas
-Fuentes externas fidedignas que ayuden a crear un flujo de trabajo correcto.
-Fuente documental del proyecto.

## 15. Creacion y edicion documentacion del proyecto.

Se creará un README.md en la raiz del proyecto que documentará los progresos sobre el flujo de trabajo. Utilizar una estructura
que no extienda los párrafos, que sintetice la información fundamental y genere un lenguaje llano, comprensible para el lector.
Se podrán crear readmes temáticos en el directorio docs/ que serán enlazados desde la documental principal.

## 16. Repositorio git y control de versiones.

Usaremos la convención MAYOR.MINOR.PATCH
y principlamente dos ramas principales: main y develop.
main será la captora de las diferentes versiones del proyecto.
Develop puede ramificarse según marco de trabajo. Pero la premisa son dos ramas principales, develop y main.

> Primero explicar. Después preguntar. Solo entonces implementar.
