// // paso de pantalla de carga y pantalla principal

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".carga");
    const video = loader.querySelector("video");

    // Seguridad por si algo falla
    if (!video || !loader) return;

    // Cuando el vídeo termine
    video.addEventListener("ended", () => {
        // Ocultamos la pantalla de carga
        loader.classList.add("ocultar");

        // Opcional: eliminar del DOM tras la animación
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000); // debe coincidir con el CSS
    });
});

