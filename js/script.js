document.addEventListener("DOMContentLoaded", () => {
  const prePantalla = document.getElementById("pre-pantalla-carga");
  const pantallaCarga = document.getElementById("pantalla-carga");
  const video = pantallaCarga.querySelector("video");
  const menu = document.getElementById("menu");
  const boton = document.getElementById("btn-play");
  const audio = document.getElementById("st-audio");

  // Bloqueamos scroll al inicio
  document.body.classList.add("no-scroll");

  // El vídeo NO debe arrancar solo
  video.pause();

  boton.addEventListener("click", () => {
    // Ocultamos la pre-pantalla
    prePantalla.style.opacity = "0";
    prePantalla.style.pointerEvents = "none";

    setTimeout(() => {
      prePantalla.style.display = "none";
    }, 1000);

    // Arrancamos vídeo y audio A LA VEZ
    video.play();
    audio.play();
  });

  video.addEventListener("ended", () => {
    // Ocultamos pantalla de carga
    pantallaCarga.classList.add("ocultar");

    // Mostramos el menú
    menu.classList.add("visible");

    // Quitamos bloqueo de scroll
    document.body.classList.remove("no-scroll");

    // Eliminamos el section tras la animación
    setTimeout(() => {
      pantallaCarga.style.display = "none";
    }, 1000);
  });
});

// PARTICULAS

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const PARTICLE_COUNT = 150;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(reset = false) {
    this.reset(reset);
  }

  reset(startTop = true) {
    this.x = Math.random() * width;
    this.y = startTop ? Math.random() * -height : Math.random() * height;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.4 + 0.2;
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  update() {
    this.y += this.speed;

    if (this.y > height) {
      this.reset(true);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Crear partículas
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ventana modal

function openModal() {
  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("email").value;
  var mensaje = document.getElementById("comment").value;

  console.log("Nombre:", nombre);
  console.log("Correo:", correo);
  console.log("Mensaje", mensaje);

  document.getElementById("n").innerHTML = nombre
  document.getElementById("c").innerHTML = correo
  document.getElementById("m").innerHTML = mensaje

  document.getElementById("modal").style.display = "flex";

  return false;
}

// cerrar ventana modal

function closeModal() {
  document.getElementById("modal").style.display = "none";

  return false;
}

