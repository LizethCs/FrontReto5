//GET, POST , PUT Y DELETE

function getMachine() {
  $.ajax({
    url: "http://144.24.42.113:8080/api/Machine/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      pintarMachine(respuesta);
    },
  });
}

function postMachine() {
  let cajas = {
    name: $("#name").val(),
    brand: $("#brand").val(),
    year: $("#year").val(),
    description: $("#description").val(),
    category: { id: +$("#select-categoria").val() },
  };
  console.log(cajas);
  $.ajax({
    url: "http://144.24.42.113:8080/api/Machine/save",
    type: "POST",
    datatype: "JSON",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(cajas),
    success: function (respuesta) {
      alert("Máquina creada correctamente.");
      window.location.reload();
    },
  });
}

function putMachine(idDesdeBoton) {
  console.log(idDesdeBoton);
  if (
    $("#name").val().length == 0 ||
    $("#brand").val().length == 0 ||
    $("#year").val().length == 0 ||
    $("#description").val().length == 0
  ) {
    alert("Todos los campos son obligatorios");
  } else {
    let cajas = {
      id: idDesdeBoton,
      name: $("#name").val(),
      brand: $("#brand").val(),
      year: $("#year").val(),
      description: $("#description").val(),
      category: { id: +$("#select-categoria").val() },
    };
    $.ajax({
      url: "http://144.24.42.113:8080/api/Machine/update",
      type: "PUT",
      datatype: "JSON",
      contentType: "application/json",
      data: JSON.stringify(cajas),
      success: function (respuesta) {
        alert("Máquina actualizada correctamente.");
        window.location.reload();
      },
    });
  }
}

function deleteMachine(idDesdeBoton) {
    let myData={
        id:idDesdeBoton
    };
  $.ajax({
    url: "http://144.24.42.113:8080/api/Machine/"+idDesdeBoton,
    type: "DELETE",
    datatype: "JSON",
    data: JSON.stringify(myData),
    contentType: "application/json",
    success: function (respuesta) {
      alert("Máquina borrada correctamente.");
      window.location.reload();
    },
  });
}

////////////////////////////////////////////////////////

function pintarMachine(json_maquinas) {
  let myTable='<div class="container px-5 py-24 mx-auto"><table class="table-auto w-full text-center whitespace-no-wrap">';
  myTable+="<td><strong>Nombre<strong></td>";
  myTable+="<td><strong>Marca<strong></td>";
  myTable+="<td><strong>Año<strong></td>";
  myTable+="<td><strong>Descripción<strong></td>";
  myTable+="<td><strong>Categoría<strong></td>";
  for (i = 0; i < json_maquinas.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + json_maquinas[i].name + "</td>";
    myTable += "<td>" + json_maquinas[i].brand + "</td>";
    myTable += "<td>" + json_maquinas[i].year + "</td>";
    myTable += "<td>" + json_maquinas[i].description + "</td>";
    myTable += "<td>" + json_maquinas[i].category.name + "</td>";
    myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='putMachine("+json_maquinas[i].id+") '> Actualizar</button>"
    myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='deleteMachine("+json_maquinas[i].id+")'> Borrar</button>"
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultadoMachine").html(myTable);
}

myTable+="</table></div>";
$("#resultado1").html(myTable);

function getCategoria_Machine() {
  $.ajax({
    url: "http://144.24.42.113:8080/api/Category/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      let $select = $("#select-categoria");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + name.id + ">" + name.name + "</option>"
        );
      });
    },
  });
}
