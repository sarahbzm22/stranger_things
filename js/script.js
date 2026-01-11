//AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1500,
  });
  document.getElementById("only-section").classList.add("visible");
});

// PANTALLA DE CARGA

document.addEventListener("DOMContentLoaded", () => {
  const pantallaCarga = document.getElementById("pantalla-carga");
  if (!pantallaCarga) return;

  const prePantalla = document.getElementById("pre-pantalla-carga");
  const video = pantallaCarga.querySelector("video");
  const menu = document.getElementById("menu");
  const boton = document.getElementById("btn-play");
  const audio = document.getElementById("st-audio");

  document.body.classList.add("no-scroll");
  video.pause();

  boton.addEventListener("click", () => {
    prePantalla.style.opacity = "0";
    prePantalla.style.pointerEvents = "none";

    setTimeout(() => {
      prePantalla.style.display = "none";
    }, 1000);

    video.play();
    audio.play();
  });

  video.addEventListener("ended", () => {
    pantallaCarga.classList.add("ocultar");
    menu.classList.add("visible");
    document.body.classList.remove("no-scroll");

    audio && !audio.paused ? showOffButton() : showOnButton();

    setTimeout(() => {
      pantallaCarga.style.display = "none";
    }, 1000);
  });
});


// MENÚ HAMBURGUESA

function getNavMenu() {
  return document.querySelector("#nav-menu, #nav-menu2, #nav-menu3");
}

// Abre el menú
function openMenu() {
  const nav = getNavMenu();
  if (!nav) return;

  nav.firstElementChild.lastElementChild.style.right = "0vw";
}

// Cierra el menú
function closeMenu() {
  const nav = getNavMenu();
  if (!nav) return;

  nav.firstElementChild.lastElementChild.style.right = "100vw";
}


// PARTÍCULAS

const canvas = document.getElementById("particulas");
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

// Crea partículas
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

// VENTANA MODAL DEL FORM

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

// Cierra la ventana modal

function closeModal() {
  document.getElementById("modal").style.display = "none";

  return false;
}

// GRÁFICO

function cargaGraficoTarta() {
    var datos = {
        labels: ["STEVE", "DUSTIN", "ELEVEN", "EDDIE", "MAX"],
        datasets: [{
            label: "2024",
            backgroundColor: ["#76040a", "#90250dff", "#b60710ff", "#3f0407ff", "#733000ff"],
            data: [28, 24, 22, 15, 11]
        }]
    };

    var config = {
        type: "pie",
        data: datos,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 40 // Espacio entre gráfico y leyenda
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "MOST LOVED CHARACTERS (%)",
                    font: {
                        size: 17,
                        family: "Benguiat Bold"
                    },
                    padding: {
                        bottom: 25
                    }
                },
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 25,   // Separación entre gráfico y leyenda
                        font: {
                            size: 17,
                            family: "Benguiat Bold"
                        }
                    }
                }
            }
        }
    };

    var grafico = $("#tarta")[0].getContext("2d");
    new Chart(grafico, config);
}

$(document).ready(function () {
    cargaGraficoTarta();
});

// PRIMERA LLAMADA AL API

$(document).ready(function() {
  // Se guarda la lista de personajes
  let personajes = [];

  // Petición AJAX
  $.ajax({
    url: "https://stranger-things-api.fly.dev/api/v1/characters?perPage=5?page=1",
    method: "GET",
    success: function(data) {
      personajes = data;
      rellenarCartas();
    },
    error: function(err) {
      console.error(err);
    }
  });

  function rellenarCartas() {
    $(".card").each(function() {
      const $card = $(this);
      const nombre = $card.data("character");

      // Para que no muestre los datos de EDDIE
      if ($card.attr("id") === "Eddie") return;

      // Para que aparezca el personaje que queremos en la API
      const personaje = personajes.find(p => p.name === nombre);

      if (!personaje) {
        console.warn("No encontrado:", nombre);
        return;
      }

      // Info del dorso
      $card.find(".name").text(personaje.name);
      $card.find(".status").text(`Status: ${personaje.status || "N/A"}`);
      $card.find(".born").text(`Born: ${personaje.born || "N/A"}`);
      $card.find(".gender").text(`Gender: ${personaje.gender || "N/A"}`);
    });
  }
});

// SEGUNDA LLAMADA

const API_URL = "https://stranger-things-api.fly.dev/api/v1/characters?perPage=5?page=1";

function openApiModal(button) {
  const $card = $(button).closest(".card");
  const characterName = $card.data("character");

  if (!characterName) return;

  $.ajax({
    url: API_URL,
    method: "GET",
    data: {
      name: characterName
    },
    success: function (data) {
      if (!data || data.length === 0) return;

      const character = data[0];

      $("#modal-img")
        .attr("src", character.photo)
        .attr("alt", character.name);

      $("#modal-name").text(character.name);
      $("#modal-aliases").text("Aliases: " + (character.aliases || "Unknown"));
      $("#modal-status").text("Status: " + (character.status || "Unknown"));
      $("#modal-residence").text("Residence: " + (character.residence || "Unknown"));
      $("#modal-occupation").text("Occupation: " + (character.occupation || "Unknown"));
      $("#modal-portrayed").text("Portrayed by: " + (character.portrayedBy || "Unknown"));

      $("#modal-api").css("display", "flex");
    },
    error: function (error) {
      console.error("Error al cargar el personaje:", error);
    }
  });
}

function closeApiModal() {
  $("#modal-api").css("display", "none");
}

// VENTANA MODAL EDDIE (para que se parezca al modal del API)

// Abrir modal 
function openEddieModal() {
  const modal = $("#modal-eddie");
  modal.css("display", "flex").css("opacity", 0); // Inicio invisible
  modal.animate({ opacity: 1 }, 600);
}

// Cerrar modal
function closeEddieModal() {
  const modal = $("#modal-eddie");
  modal.animate({ opacity: 0 }, 400, () => {
    modal.css("display", "none"); // Cuando termina, se oculta
  });
}

// BOTÓN ON/OFF MUSICA

document.addEventListener("DOMContentLoaded", () => {
  const btnOn  = document.getElementById("musica-on");
  const btnOff = document.getElementById("musica-off");
  const pantallaCarga = document.getElementById("pantalla-carga");
  const audio = document.getElementById("st-audio");

  // Home
  if (pantallaCarga) {
    if (btnOn)  btnOn.style.display = "none";
    if (btnOff) btnOff.style.display = "none";
    return;
  }

  // Páginas sin pantalla de carga
  if (!audio || audio.paused) {
    showOnButton();
  } else {
    showOffButton();
  }
});


let musicPlaying = false;
const audio = document.getElementById("st-audio");

const btnOn  = document.getElementById("musica-on");
const btnOff = document.getElementById("musica-off");

// On
function playMusic() {
  if (!audio) return;

  audio.play();
  musicPlaying = true;
  showOffButton();
}

// Off
function stopMusic() {
  if (!audio) return;

  audio.pause();
  musicPlaying = false;
  showOnButton();
}

// Ayudas visuales
function showOnButton() {
  if (btnOn)  btnOn.style.display = "flex";
  if (btnOff) btnOff.style.display = "none";
}

function showOffButton() {
  if (btnOn)  btnOn.style.display = "none";
  if (btnOff) btnOff.style.display = "flex";
}

