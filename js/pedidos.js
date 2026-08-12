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


// ======================
// AGREGAR PLATILLO
// ======================

function agregarPlatillo(platillo, id) {

    const lista = document.getElementById("listaPlatillo");

    const opcion = document.createElement("option");

    opcion.value = id;

    opcion.textContent =
        `${platillo.nombre} - $${platillo.costo}`;

    lista.appendChild(opcion);

}


// ======================
// GUARDAR PEDIDO
// ======================

const formularioPedido =
    document.getElementById("formPedido");


formularioPedido.addEventListener("submit", (e) => {

    e.preventDefault();


    // ======================
    // OBTENER DATOS
    // ======================

    const listaPlatillo =
        document.getElementById("listaPlatillo");

    const opcionSeleccionada =
        listaPlatillo.options[listaPlatillo.selectedIndex];


    const pedidoNuevo = {

        platillo: listaPlatillo.value,

        nombre:
            document.getElementById("nombre").value,

        direccion:
            document.getElementById("direccion").value,

        fecha:
            new Date().toISOString()

    };


    // ======================
    // GUARDAR EN FIREBASE
    // ======================

    db.collection("PEDIDOS")
        .add(pedidoNuevo)

        .then((docRef) => {

            console.log(
                "Pedido guardado correctamente:",
                docRef.id
            );


            // ID DEL PEDIDO
            const idPedido = docRef.id;


            // ======================
            // NOMBRE DEL PLATILLO
            // ======================

            let nombrePlatillo =
                opcionSeleccionada
                    ? opcionSeleccionada.textContent
                    : pedidoNuevo.platillo;


            // ======================
            // MOSTRAR MENSAJE
            // ======================

            alert("Pedido realizado exitosamente");


            // ======================
            // ELEMENTOS DEL QR
            // ======================

            const contenedorQR =
                document.getElementById("codigoQR");

            const contenedorPedido =
                document.getElementById("qrPedido");

            const numeroPedido =
                document.getElementById("numeroPedido");


            // Comprobar que existen
            if (!contenedorQR ||
                !contenedorPedido ||
                !numeroPedido) {

                console.error(
                    "No se encontraron los elementos del QR en pedidos.html"
                );

                return;

            }


            // ======================
            // LIMPIAR QR ANTERIOR
            // ======================

            contenedorQR.innerHTML = "";


            // ======================
            // MOSTRAR ID
            // ======================

            numeroPedido.textContent =
                idPedido;


            // ======================
            // INFORMACIÓN DEL QR
            // ======================

            const datosQR =
`COFFE MAKER
PEDIDO: ${idPedido}
CLIENTE: ${pedidoNuevo.nombre}
PLATILLO: ${nombrePlatillo}
DIRECCION: ${pedidoNuevo.direccion}`;


            console.log(
                "Datos del QR:",
                datosQR
            );


            // ======================
            // GENERAR QR
            // ======================

            if (typeof QRCode === "undefined") {

                console.error(
                    "La librería QRCode no está cargada."
                );

                alert(
                    "El pedido se guardó, pero no se pudo generar el código QR."
                );

            } else {

                new QRCode(
                    contenedorQR,
                    {
                        text: datosQR,
                        width: 220,
                        height: 220,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel:
                            QRCode.CorrectLevel.H
                    }
                );

                // Mostrar QR
                contenedorPedido.style.display =
                    "block";


                // Llevar automáticamente hacia el QR
                contenedorPedido.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


            // ======================
            // LIMPIAR FORMULARIO
            // ======================

            formularioPedido.reset();


            // ======================
            // REINICIAR SELECT
            // ======================

            const lista =
                document.getElementById(
                    "listaPlatillo"
                );

            lista.selectedIndex = 0;

            M.FormSelect.init(lista);


            // ======================
            // LIMPIAR DIRECCIÓN
            // ======================

            const direccion =
                document.getElementById(
                    "direccion"
                );

            direccion.value = "";

            M.textareaAutoResize(
                direccion
            );

            M.updateTextFields();


            // ======================
            // IMPORTANTE:
            // NO ELIMINAMOS EL MAPA
            // ======================

            /*
                El mapa se mantiene visible
                para que el QR aparezca debajo.
            */

        })

        .catch((error) => {

            console.error(
                "ERROR AL GUARDAR PEDIDO:",
                error
            );

            alert(
                "Error al realizar el pedido"
            );

        });

});


// ======================
// OBTENER UBICACIÓN
// ======================

document
    .getElementById("btnObtenerDireccion")
    .addEventListener("click", function () {


        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                exito,
                error
            );

        } else {

            alert(
                "Geolocalización no soportada por el navegador"
            );

        }

    });


// ======================
// ERROR UBICACIÓN
// ======================

function error(error) {

    alert(
        "Error al obtener la ubicación: " +
        error.message
    );

}


// ======================
// UBICACIÓN EXITOSA
// ======================

function exito(posicion) {

    const latitud =
        posicion.coords.latitude;

    const longitud =
        posicion.coords.longitude;


    fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`,
        {
            headers: {
                "User-Agent": "COFFEMAKER"
            }
        }
    )

    .then(response =>
        response.json()
    )

    .then(data => {


        // ======================
        // OBTENER CIUDAD
        // ======================

        const ciudad =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";


        const pais =
            data.address.country ||
            "";


        // ======================
        // MOSTRAR DIRECCIÓN
        // ======================

        document.getElementById(
            "direccion"
        ).value =
            `Ciudad: ${ciudad}, País: ${pais}`;


        M.textareaAutoResize(
            document.getElementById(
                "direccion"
            )
        );


        M.updateTextFields();


        // ======================
        // ELIMINAR MAPA ANTERIOR
        // ======================

        if (mapa !== null) {

            mapa.remove();

            mapa = null;

            marcador = null;

        }


        // ======================
        // CREAR MAPA
        // ======================

        mapa =
            L.map("mapa")
                .setView(
                    [
                        latitud,
                        longitud
                    ],
                    13
                );


        // ======================
        // MAPA OPENSTREETMAP
        // ======================

        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {

                maxZoom: 19,

                attribution:
                    "&copy; OpenStreetMap"

            }
        )
        .addTo(mapa);


        // ======================
        // MARCADOR
        // ======================

        marcador =
            L.marker(
                [
                    latitud,
                    longitud
                ]
            )
            .addTo(mapa);


        marcador.bindPopup(
            "Ubicación del pedido"
        )
        .openPopup();

    })

    .catch(error => {

        console.error(
            "Error obteniendo dirección:",
            error
        );

    });

}