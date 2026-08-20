document.addEventListener("DOMContentLoaded", function () {

    // Menú lateral
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, {
        edge: "right"
    });

    // Formulario lateral
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, {
        edge: "left"
    });

    // Referencias
    const btnAgregar = document.getElementById("btnAgregarPlatillo");
    const btnUbicacion = document.getElementById("btnUbicacion");
    const btnGuardarPedido = document.getElementById("btnGuardarPedido");

    const fotoPedido = document.getElementById("fotoPedido");
    const previewFoto = document.getElementById("previewFoto");

    let latitud = null;
    let longitud = null;
    let fotoSeleccionada = null;

    // ============================
    // AGREGAR PLATILLO
    // ============================

    if (btnAgregar) {

        btnAgregar.addEventListener("click", function (event) {

            event.preventDefault();

            const nombre = document.getElementById("title").value.trim();
            const ingredientes = document
                .getElementById("ingredients")
                .value
                .trim();

            if (nombre === "" || ingredientes === "") {
                M.toast({
                    html: "Completa todos los campos"
                });

                return;
            }

            db.collection("platillos").add({
                nombre: nombre,
                ingredientes: ingredientes,
                fecha: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {

                M.toast({
                    html: "Platillo agregado correctamente"
                });

                document.getElementById("title").value = "";
                document.getElementById("ingredients").value = "";

            })
            .catch((error) => {

                console.error(error);

                M.toast({
                    html: "Error al agregar el platillo"
                });

            });

        });
    }

    // ============================
    // OBTENER UBICACIÓN
    // ============================

    if (btnUbicacion) {

        btnUbicacion.addEventListener("click", function () {

            if (!navigator.geolocation) {

                M.toast({
                    html: "Tu navegador no permite obtener ubicación"
                });

                return;
            }

            document.getElementById("ubicacionTexto").textContent =
                "Obteniendo ubicación...";

            navigator.geolocation.getCurrentPosition(

                function (position) {

                    latitud = position.coords.latitude;
                    longitud = position.coords.longitude;

                    document.getElementById("ubicacionTexto").textContent =
                        "Ubicación obtenida correctamente";

                    M.toast({
                        html: "Ubicación registrada"
                    });

                    console.log("Latitud:", latitud);
                    console.log("Longitud:", longitud);
                },

                function (error) {

                    console.error(error);

                    document.getElementById("ubicacionTexto").textContent =
                        "No se pudo obtener la ubicación";

                    M.toast({
                        html: "Permite el acceso a tu ubicación"
                    });

                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );

        });

    }

    // ============================
    // TOMAR FOTOGRAFÍA
    // ============================

    if (fotoPedido) {

        fotoPedido.addEventListener("change", function (event) {

            const archivo = event.target.files[0];

            if (!archivo) {
                return;
            }

            fotoSeleccionada = archivo;

            const lector = new FileReader();

            lector.onload = function (e) {

                previewFoto.src = e.target.result;
                previewFoto.style.display = "block";

            };

            lector.readAsDataURL(archivo);

        });

    }

    // ============================
    // GUARDAR PEDIDO
    // ============================

    if (btnGuardarPedido) {

        btnGuardarPedido.addEventListener("click", async function () {

            const nombrePedido =
                document.getElementById("pedidoNombre").value.trim();

            const estado =
                document.getElementById("estadoPedido");

            if (nombrePedido === "") {

                M.toast({
                    html: "Escribe el nombre del pedido"
                });

                return;
            }

            if (latitud === null || longitud === null) {

                M.toast({
                    html: "Primero obtén la ubicación"
                });

                return;
            }

            if (!fotoSeleccionada) {

                M.toast({
                    html: "Primero toma una fotografía"
                });

                return;
            }

            try {

                estado.textContent = "Guardando pedido...";

                // Nombre único para la fotografía
                const nombreFoto =
                    "pedidos/" +
                    Date.now() +
                    "_" +
                    fotoSeleccionada.name;

                // Subir fotografía
                const referenciaFoto =
                    storage.ref().child(nombreFoto);

                await referenciaFoto.put(fotoSeleccionada);

                // Obtener URL
                const urlFoto =
                    await referenciaFoto.getDownloadURL();

                // Guardar pedido
                await db.collection("pedidos").add({

                    pedido: nombrePedido,

                    ubicacion: {
                        latitud: latitud,
                        longitud: longitud
                    },

                    fotografia: urlFoto,

                    fecha:
                        firebase.firestore.FieldValue.serverTimestamp()

                });

                estado.textContent =
                    "Pedido guardado correctamente";

                M.toast({
                    html: "Pedido registrado"
                });

                // Limpiar
                document.getElementById("pedidoNombre").value = "";

                document.getElementById("ubicacionTexto").textContent =
                    "Ubicación no registrada";

                previewFoto.src = "";
                previewFoto.style.display = "none";

                latitud = null;
                longitud = null;
                fotoSeleccionada = null;

            }
            catch (error) {

                console.error(error);

                estado.textContent =
                    "Error al guardar el pedido";

                M.toast({
                    html: "No se pudo guardar el pedido"
                });

            }

        });

    }

});