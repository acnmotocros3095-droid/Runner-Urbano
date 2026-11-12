# RunnerUrbano — Portal actualizado

Portal individual de **Alexander Condori Nina**, con RunnerUrbano y La Ciudad Sangrienta en un único `index.html`.

## Abrir el portal

Extrae todo el ZIP y abre `index.html` en un navegador. Conserva las carpetas `css`, `js` e `img` junto a ese archivo. También puedes servir esta carpeta con cualquier servidor HTTP estático. El portal no necesita instalación ni compilación.

Los juegos necesitan Internet, WebGL, aceleración por hardware y un teclado físico. Sus builds permanecen alojados en los servidores Netlify originales; el ZIP contiene el portal, no los proyectos Unity ni sus builds. Todas las partidas se muestran dentro del portal, sin enlaces que abran otros sitios.

## Requisitos incorporados

- Nombre del desarrollador visible en el banner principal.
- Menú y selección para los dos juegos mediante anclas internas.
- Una única página HTML, con una sección para cada videojuego.
- Botón START propio situado encima de cada área de juego.
- Ningún iframe tiene `src` al abrir el portal: los juegos esperan una acción explícita.
- Los enlaces del menú no inician partidas. Pantalla completa tampoco inicia un juego que esté detenido.
- Historia, instrucciones, controles, objetivos y explicación funcional del desarrollo para ambos juegos.
- Paleta de verde profundo, menta, coral y marfil; imágenes flotantes, desplazamiento suave y entradas al hacer scroll.
- Menú móvil, opción para pausar animaciones y respeto a `prefers-reduced-motion`.
- Fondo urbano oscuro alrededor de los juegos, incluido el modo de pantalla completa.

## RunnerUrbano

Carrera 3D por una avenida nocturna. El personaje avanza automáticamente: ↑ salta y ↓ agacha al corredor. Cada choque resta una de las tres vidas; la meta es alcanzar 1000 puntos. R reinicia al terminar.

## La Ciudad Sangrienta

El Sujeto 001 debe escapar del Sector Cero. Recoge 36 núcleos de energía, evita los bumeranes que persiguen al personaje al verlo y atraviesa la puerta superior cuando esté abierta. Tras START y la carga de Unity, haz clic dentro del juego y pulsa Enter. Las flechas controlan el movimiento.

## Funcionamiento del reproductor

START carga solo el juego elegido y cambia a DETENER. Detener descarga ese iframe y pierde la partida. Iniciar el otro juego detiene el anterior para evitar consumo simultáneo y audio duplicado. «Volver a cargar» reinicia únicamente la sesión elegida.

Los iframes muestran builds Unity de 960 × 600. El encuadre oculta el pie de la plantilla del host, conservando el canvas. La altura interna del iframe es 638 px (600 de canvas y 38 del pie), y el contenedor visible conserva los 600 px. Si cambia la plantilla externa, debe revisarse este ajuste. No es posible controlar el progreso real de la descarga de Unity desde otro dominio: los mensajes diferencian la apertura del reproductor de la carga del juego.

La explicación «Cómo está hecho» describe la estructura y el comportamiento observable de los juegos. Este paquete no contiene ni pretende documentar nombres de scripts o clases del proyecto Unity original.

## Publicar sobre el portal existente

1. Copia `index.html`, `css`, `js` e `img` en la raíz del repositorio Runner-Urbano, reemplazando los archivos del portal anterior. Conserva la carpeta `.git` de tu repositorio.
2. Haz commit y push a la rama que ya usa tu alojamiento.
3. Espera al despliegue y revisa la URL pública real. Si usas GitHub Pages, conserva su configuración existente para la rama y carpeta publicadas.
4. Completa la evidencia solicitada por la práctica siguiendo `GUIA-DE-ENTREGA.md`.

No se ha publicado esta versión desde el ZIP ni se ha inventado un enlace público de despliegue.

## Estructura

```text
index.html
css/style.css
js/script.js
img/
README.md
GUIA-DE-ENTREGA.md
```

Equipo de los juegos: Harold Abdel Carpio Santander, Alexander Condori Nina y Pablo Alejandro Zaconeta Guanca. Universidad Privada del Valle · Game Development, Unidad 4.
