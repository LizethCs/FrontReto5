function getCategoria (){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){
    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://144.24.42.113:8080/api/Category/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Categoría creada correctamente.");
            window.location.reload();
    
            }
        });
    }
}

function putCategoria(idDesdeBoton){
    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios.");
    }else{
    
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://144.24.42.113:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Categoría actualizada correctamente.");
            window.location.reload();
    
            }
        });
    }
    

}

function deleteCategoria(idDesdeBoton){
  
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://144.24.42.113:8080/api/Category/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("Categoría eliminada correctamente.");
            window.location.reload();
        }
    });

}

////////////////////////////////////////////

function pintarCategoria(respuesta){
    let myTable='<br><div class="container px-5 py-24 mx-auto"><table class="table-auto w-full text-center whitespace-no-wrap">';
    myTable+="<td><strong>Nombre<strong></td>";
    myTable+="<td><strong>Descripción<strong></td>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='putCategoria("+respuesta[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='flex mx-auto text-white bg-blue-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 rounded text-lg' onclick='deleteCategoria("+respuesta[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table></div>";
    $("#resultado1").html(myTable);


}

