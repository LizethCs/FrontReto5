//GET, POST , PUT Y DELETE

function getCliente (){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){   
            pintarCliente(respuesta);
        }
    });

}
function postCliente(){
    if (
      $("#correo").val().length == 0 ||
        $("#password").val().length == 0 || 
        $("#name").val().length == 0 ||
        $("#age").val().length == 0
      ) {
        alert("Todos los campos son obligatorios.");
      } else{
    
    let cajas = {
        email:$("#correo").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    $.ajax({
        url:"http://144.24.42.113:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Cliente registrado correctamente.");
            window.location.reload();
    
        }
    });
}
}


function putCliente(idDesdeBoton){
    if (
      $("#password").val().length == 0 || 
      $("#name").val().length == 0 ||
      $("#age").val().length == 0
    ) {
      alert("Todos los campos son obligatorios.");
    } else {
      
        let cajas = {
        idClient: idDesdeBoton,
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
      };
      $.ajax({
        url: "http://144.24.42.113:8080/api/Client/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success: function (respuesta) {
          alert("Información actualizada correctamente.");
         window.location.reload();
        },
      });
    }
}

function deleteCliente(idDesdeBoton){
    let myData={
        id:idDesdeBoton
    };
  $.ajax({
    url: "http://144.24.42.113:8080/api/Client/"+idDesdeBoton,
    type: "DELETE",
    datatype: "JSON",
    data: JSON.stringify(myData),
    contentType: "application/json",
    success: function (respuesta) {
      alert("Cliente borrado correctamente.");
      window.location.reload();
    },
  });
}


////////////////////////////////////////////

function pintarCliente(respuesta){

  let myTable='<div class="container px-5 py-24 mx-auto"><table class="table-auto w-full text-center whitespace-no-wrap">';
  myTable+="<td><strong>Correo<strong></td>";
  myTable+="<td><strong>Nombre<strong></td>";
  myTable+="<td><strong>Edad<strong></td>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='putCliente("+respuesta[i].idClient+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='deleteCliente("+respuesta[i].idClient+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table></div>";
    $("#resultado1").html(myTable);


}
