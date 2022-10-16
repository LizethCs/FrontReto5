function getMensajes (){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    if (
        $("#messageText").val().length == 0 ||
        $("#select-client").val().length == 0 || 
        $("#select-machine").val().length == 0
        ) {
        alert("Todos los campos son obligatorios.");
      } else{
    
    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-client").val()},
        machine:{id: +$("#select-machine").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://144.24.42.113:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Mensaje enviado.");
            window.location.reload();
           
    
        }
    });
}
}

function putMensajes(idDesdeBoton){
    if (
      $("#messageText").val().length == 0 ||
      $("#select-client").val().length == 0 || 
      $("#select-machine").val().length == 0
    ) {
      alert("Todos los campos son obligatorios.");
    } else {
      
        let cajas = {
            idMessage: idDesdeBoton,
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            machine:{id: +$("#select-machine").val()}

        };
      $.ajax({
        url: "http://144.24.42.113:8080/api/Message/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success: function (respuesta) {
          alert("Mensaje editado correctamente.");
          window.location.reload();
        },
      });
    }
}

function deleteMensajes(idDesdeBoton){
    let myData={
        id:idDesdeBoton
    };
  $.ajax({
    url: "http://144.24.42.113:8080/api/Message/"+idDesdeBoton,
    type: "DELETE",
    datatype: "JSON",
    data: JSON.stringify(myData),
    contentType: "application/json",
    success: function (respuesta) {
      alert("Mensaje borrado correctamente.");
      window.location.reload();
    },
  });
}


function pintarMensajes(respuesta){
    let myTable='<div class="container px-5 py-24 mx-auto"><table class="table-auto w-full text-center whitespace-no-wrap">';
    myTable+="<td><strong>Mensaje<strong></td>";
    myTable+="<td><strong>Máquina<strong></td>";
    myTable+="<td><strong>Cliente<strong></td>";
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].machine.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='putMensajes("+respuesta[i].idMessage+") '> Editar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='deleteMensajes("+respuesta[i].idMessage+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table></div>";
    $("#resultado1").html(myTable);


}

function getMachine_Message(){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}

function getClient_Message(){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });
}

