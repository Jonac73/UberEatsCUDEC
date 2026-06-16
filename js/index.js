document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});



function mostrarplatillo(platillo, id)
{
  contenido = `
  <div class='card-panel recipe white row' id='${id}'>
    <div class='recipe-details'>
      <div class='recipe-title'>
        ${platillo.nombre}
      </div>
      <div class='recipe-ingredients'>
        ${platillo.ingredientes}
      </div>  
      <div class='recipe-cost'>
        $${platillo.costo}
      </div>
      <div class='recipe-delete'>
        <i class='material-icons' data-id='${id}'>delete_outline</i>
      </div>
    </div>
  </div>
  `;
  
  document.querySelector(".recipes").innerHTML += contenido;

  function actualizarplatillo(platillo, id)
  {
  let tarjeta = document.getElementById(`.recipe[data-id=${id}]`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
  tarjeta.querySelector(".recipe-cost").innerHTML  = `$${platillo.costo}`;
  }
}