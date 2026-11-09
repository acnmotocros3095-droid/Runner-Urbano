# RunnerUrbano · Portal de juegos

Portal web en español de **RunnerUrbano** y **La Ciudad Sangrienta**, desarrollados en Unity y publicados para navegador con WebGL. El sitio reúne la historia, el personaje, las mecánicas y los reproductores de ambos juegos.

## La Ciudad Sangrienta

El **Sujeto 001** debe escapar del **Sector Cero**. Es un juego de laberinto 3D con una dinámica inspirada en Pac-Man, protagonizado por el personaje de RunnerUrbano. Los bumeranes te persiguen cuando te detectan.

### Cómo ganar

1. Recorre el laberinto y recoge los **36 núcleos de energía**.
2. Evita a los bumeranes y sus persecuciones.
3. Atraviesa la **puerta superior cuando esté abierta** para escapar.

### Controles

| Tecla | Acción |
| --- | --- |
| Enter | Empezar la partida |
| Flechas ↑ ← ↓ → | Mover al personaje |

[Jugar La Ciudad Sangrienta](https://illustrious-blancmange-930e81.netlify.app/)

## RunnerUrbano

Un endless runner 3D ambientado en una avenida nocturna. Salta sobre obstáculos bajos y agáchate para pasar bajo los altos. Empiezas con **3 vidas** y el objetivo es llegar a **1000 puntos**.

| Tecla | Acción |
| --- | --- |
| ↑ | Saltar |
| ↓ | Agacharse |
| R | Reiniciar al terminar |

[Jugar RunnerUrbano](https://aquamarine-pothos-2552f7.netlify.app/)

## Jugar desde el portal

Cada juego se carga al pulsar su botón de inicio. Haz clic dentro del reproductor para activar el teclado. Los botones del portal permiten entrar en pantalla completa o abrir el juego en otra pestaña.

Los reproductores conservan la proporción del canvas de Unity (960 × 600), ajustan su tamaño al espacio disponible y muestran un fondo urbano oscuro alrededor. El encuadre oculta los márgenes y el pie de la plantilla externa de Unity sin recortar el canvas. El fondo del portal también se mantiene al usar su botón de pantalla completa.

Se recomienda una computadora con teclado, un navegador compatible con WebGL y aceleración por hardware. La primera carga necesita conexión a Internet y puede tardar unos segundos.

## Desarrollo local

Es un sitio estático: no requiere compilación ni dependencias de aplicación. Abre `index.html` o sirve la carpeta con un servidor HTTP estático de tu preferencia.

```text
index.html       Contenido del portal y reproductores
css/style.css    Diseño, adaptación a móviles y fondos
js/script.js     Navegación, carga de juegos y pantalla completa
img/             Imágenes del portal
```

Los builds de Unity se cargan desde los enlaces de Netlify; este repositorio contiene el portal, no los proyectos fuente de Unity. Los cambios en el portal no modifican las páginas independientes de Netlify. Si cambia la plantilla externa o la resolución del canvas, debe revisarse el encuadre en CSS y JavaScript.

## Equipo

- Harold Abdel Carpio Santander
- Alexander Condori Nina
- Pablo Alejandro Zaconeta Guanca

Universidad Privada del Valle · Game Development.
