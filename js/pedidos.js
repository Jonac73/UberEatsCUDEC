let contenidoPlatillo = "";
db.collection("PLATILLOS").onSnapshot((datos) => {
     datos.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            agregarPlatillo(registro.doc.data(), registro.doc.id);
        }
         });
         var elems = document.querySelectorAll('select');
         M.FormSelect.init(elems);
 });

 function agregarPlatillo(platillo, id) {
    contenidoPlatillo += `<option value='${id}'>
    ${platillo.nombre} -  $${platillo.costo}
    </option>`;
    document.getElementById("listaPlatillo").innerHTML = contenidoPlatillo;
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
    .then(data => alert(data.display_name))
    .catch(error => console.error(error));
}