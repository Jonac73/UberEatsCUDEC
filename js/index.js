
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

function MostrarPlatillo(platillo, id){

    let fotoPlatillo = "img/platillo.png";

    if (platillo.imagen && platillo.imagen !== "") {
        fotoPlatillo = platillo.imagen;
    }

    const contenido = `
        <div class="card-panel recipe" id="${id}" data-id="${id}">

            <img src="${fotoPlatillo}" class="recipe-image">

            <div class="recipe-details">

                <div class="recipe-title">
                    ${platillo.nombre}
                </div>

                <div class="recipe-ingredients">
                    ${platillo.ingredientes}
                </div>

                <div class="recipe-price">
                    $${platillo.costo}
                </div>

            </div>

            <div class="recipe-delete">
                <i class="material-icons" data-id="${id}">
                    delete_outline
                </i>
            </div>

        </div>
    `;

    document.querySelector(".recipes").innerHTML += contenido;
}

function actualizarPlatillo(platillo, id) {
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
  tarjeta.querySelector(".recipe-price").innerHTML = '$' + platillo.costo;
}

const borrarPlatillo = (id) => {
  const platillo = document.querySelector(`.recipe[data-id='${id}']`);
  platillo.remove();
}

let streaming = false;
const width = 320;
let height = 0;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const foto = document.getElementById('foto');
const btnFoto = document.getElementById('btnFoto');

btnFoto.addEventListener('click', function(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream){
    video.srcObject = stream;
    video.play();
  })
  .catch(function(error){
    console.log("Error: " + error);
  });
})

video.addEventListener('canplay', () => {
 if (!streaming) {
   height = video.videoHeight / (video.videoWidth/width);
   video.setAttribute('width', width);
   video.setAttribute('height', height);
   canvas.setAttribute('width', width);
   canvas.setAttribute('height', height);
   streaming = true;
 }
});

function tomarFoto() {
  const context = canvas.getContext('2d');
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const fotoFinal = canvas.toDataURL('image/png');
    document.getElementById("preview").src = fotoFinal;
    document.getElementById("foto").value = fotoFinal;
  }
  else{
    limpiarFoto();
  }
}

const btnTomarFoto = document.getElementById('btnTomarFoto');
btnTomarFoto.addEventListener('click', tomarFoto);

function limpiarFoto() {
  const context = canvas.getContext('2d');
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL('image/png');
  foto.setAttribute('src', data);
}