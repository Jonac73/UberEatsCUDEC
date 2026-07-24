let mapa = null;
let marcador = null;
db.collection("PLATILLOS").onSnapshot((datos) => {
    const lista = document.getElementById("listaPlatillo");
    lista.innerHTML = `
        <option value="" disabled selected>
            Seleccione un platillo
        </option>
    `;
    datos.forEach((doc) => {
        agregarPlatillo(doc.data(), doc.id);
    });
    M.FormSelect.init(lista);
});

function agregarPlatillo(platillo, id) {
    const lista = document.getElementById("listaPlatillo");
    const opcion = document.createElement("option");
    opcion.value = id;
    opcion.textContent = `${platillo.nombre} - $${platillo.costo}`;
    lista.appendChild(opcion);
}

const formularioPedido = document.getElementById("formPedido");
formularioPedido.addEventListener("submit", (e) => {
    e.preventDefault();
    const pedidoNuevo = {
        platillo: formularioPedido.listaPlatillo.value,
        nombre: formularioPedido.nombre.value,
        direccion: formularioPedido.direccion.value
    };

    db.collection("PEDIDOS").add(pedidoNuevo)
    .then(() => {
        alert("Pedido realizado exitosamente");
        formularioPedido.reset();
        document.getElementById("direccion").value =
        `Ciudad: ${ciudad}, País: ${pais}`;
        M.textareaAutoResize(document.getElementById("direccion"));
        M.updateTextFields();
        M.updateTextFields();
        if (mapa !== null) {
            mapa.remove();
            mapa = null;
        }
document.getElementById("mapa").innerHTML = "";
    })
    .catch((error) => {
        console.log(error);
        alert("Error al realizar el pedido");
    });
});

document.getElementById("btnObtenerDireccion").addEventListener("click", 
    function(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(exito, error);
        }
        else{
            alert("Geolocalización no soportada por el navegador");
        }
    })
function error(error){
    alert("Error al obtener la ubicación: " + error.message);
    console.log
}

function exito(posicion){
    alert(posicion.coords.latitude + " , " + posicion.coords.longitude);
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}&format=json`, {
        headers: {
            'User-Agent': 'COFFEMAKER (jc734090@gmail.com)'
        }
    })
    .then(response => response.json())
    .then(data => {
        let ciudad = data.address.city
        let pais = data.address.country;
        document.getElementById("direccion").innerHTML = `Ciudad: ${ciudad}, País: ${pais}`;
        if (mapa !== null) {
            mapa.remove();
        }
            mapa = L.map('mapa').setView([latitud, longitud], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(mapa);

            marcador = L.marker([latitud, longitud]).addTo(mapa);
        })
    .catch(error => console.error(error));
}