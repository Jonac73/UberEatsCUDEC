const recetas = document.querySelector(".recipes");

db.collection("platillos").onSnapshot((datos) => {

    recetas.innerHTML = "";

    datos.forEach((registro) => {

        const platillo = registro.data();

        const card = document.createElement("div");

        card.className = "card-panel recipe";

        card.innerHTML = `
            <div class="recipe-image">
                <i class="material-icons">restaurant</i>
            </div>

            <div class="recipe-details">
                <div class="recipe-title">
                    ${platillo.nombre}
                </div>

                <div class="recipe-ingredients">
                    ${platillo.ingredientes}
                </div>
            </div>

            <div class="recipe-select">
                <button
                    class="btn-small seleccionar-pedido"
                    data-nombre="${platillo.nombre}">
                    Seleccionar
                </button>
            </div>
        `;

        recetas.appendChild(card);

    });

    const botones =
        document.querySelectorAll(".seleccionar-pedido");

    botones.forEach((boton) => {

        boton.addEventListener("click", function () {

            const nombre =
                this.getAttribute("data-nombre");

            document.getElementById("pedidoNombre").value =
                nombre;

            M.updateTextFields();

            document.getElementById("pedidoSeleccionado").innerHTML = `
                <div class="selected-order">
                    <i class="material-icons">check_circle</i>
                    Pedido seleccionado: <strong>${nombre}</strong>
                </div>
            `;

            window.scrollTo({
                top: document.querySelector(".pedido-panel").offsetTop,
                behavior: "smooth"
            });

        });

    });

});