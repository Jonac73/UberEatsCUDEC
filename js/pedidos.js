let mapa = null;
let marcador = null;

// ======================
// CARGAR PLATILLOS
// ======================
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

// ======================
// GUARDAR PEDIDO
// ======================

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

        // Limpiar formulario
        formularioPedido.reset();

        // Reiniciar selector
        const lista = document.getElementById("listaPlatillo");
        lista.selectedIndex = 0;
        M.FormSelect.init(lista);

        // Limpiar dirección
        document.getElementById("direccion").value = "";
        M.textareaAutoResize(document.getElementById("direccion"));
        M.updateTextFields();

        // Eliminar mapa
        if (mapa !== null) {
            mapa.remove();
            mapa = null;
            marcador = null;
        }

        document.getElementById("mapa").innerHTML = "";

    })

    .catch((error) => {

        console.error(error);
        alert("Error al realizar el pedido");

    });

});

// ======================
// OBTENER UBICACIÓN
// ======================

document.getElementById("btnObtenerDireccion").addEventListener("click", function () {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(exito, error);

    } else {

        alert("Geolocalización no soportada por el navegador");

    }

});

function error(error) {

    alert("Error al obtener la ubicación: " + error.message);

}

// ======================
// UBICACIÓN EXITOSA
// ======================

function exito(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`, {
        headers: {
            'User-Agent': 'COFFEMAKER'
        }
    })

    .then(response => response.json())

    .then(data => {

        const ciudad = data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        "";

        const pais = data.address.country || "";

        // Mostrar dirección
        document.getElementById("direccion").value =
            `Ciudad: ${ciudad}, País: ${pais}`;

        M.textareaAutoResize(document.getElementById("direccion"));
        M.updateTextFields();

        // Si ya existe un mapa, eliminarlo
        if (mapa !== null) {
            mapa.remove();
        }

        // Crear mapa
        mapa = L.map('mapa').setView([latitud, longitud], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'

        }).addTo(mapa);

        marcador = L.marker([latitud, longitud]).addTo(mapa);

    })

    .catch(error => console.error(error));

}