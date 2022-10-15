function traerReporteStatus(){
    $.ajax({
        url:"http://144.24.42.113:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(json_maquinas){
            pintarStatus(json_maquinas);
            function  pintarStatus(json_maquinas){
                let myTable='<div class="container px-5 py-6 mx-auto flex h-4 items-center justify-center"><table class="table-auto w-full text-center whitespace-no-wrap">';
                  myTable+="<td><strong>Completadas<strong></td>";
                  myTable+="<td><strong>Canceladas<strong></td>";
                       myTable+="<tr>";
                       myTable+="<td>"+json_maquinas.completed+"</td>";
                       myTable+="<td>"+json_maquinas.cancelled+"</td>";
                       myTable+="</tr>";
                 
                   myTable+="</table></div>";
                   $("#resultado1").html(myTable);
               }
        }
    });
}



function traerReportesFechas(){
    var fechaInicio = document.getElementById("RstartDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
    $.ajax({
        url:"http://144.24.42.113:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarFechas(respuesta);
        }
    });
}

function traerReportesClientes(){
    
    $.ajax({
        url:"http://144.24.42.113:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarTopCliente(respuesta);

            function pintarTopCliente(answer){
                let myTable='<div class="container px-10 py-10 mx-auto flex h-4 items-center justify-center"><table class="table-auto w-full text-center whitespace-no-wrap">';
                myTable+="<td><strong>Nombre<strong></td>";
                myTable+="<td><strong>Total de reservas<strong></td>";
                for(let i=0;i<answer.length;i++){
                    myTable+="<tr>";
                    myTable+="<td>"+answer[i].client.name+"</td>";
                    myTable+="<td>"+answer[i].total+"</td>";
                    myTable+="</tr>";
                
                }
                myTable+="</table></div>";
                $("#resultado3").html(myTable);
            }
        }
    });
}

function pintarFechas(answer){
    let myTable='<div class="container px-1 py-1 mx-auto"><table class="table-auto w-full text-left whitespace-no-wrap">';
    myTable+="<td><strong>Fecha Inicio<strong></td>";
    myTable+="<td><strong>Fecha Devolución<strong></td>";
    myTable+="<td><strong>Estado<strong></td>";
    myTable+="<td><strong>Cliente<strong></td>";

    for(let i=0;i<answer.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+answer[i].startDate+"</td>";
        myTable+="<td>"+answer[i].devolutionDate+"</td>";
        myTable+="<td>"+answer[i].status+"</td>";
        myTable+="<td>"+answer[i].client.name+"</td>";
        myTable+="</tr>";
    

    }
    myTable+="</table></div>";
    $("#resultado2").html(myTable);
}
