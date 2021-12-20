var myIndex;
$(document).ready(function() {
    console.log("Estas en la página de perfil Administrador Productos");
    init();
});

function init() {
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    $(".miNombreUsuario").html(d_user.name);
    traerInformacion();

    $('#tablaProductos tbody').on('click', 'tr', function() {
        var table = $('#tablaProductos').DataTable();
        miIndiceProducto = table.row(this).index();
        console.log("MiIndiceProducto " + miIndiceProducto);
    });


}

function traerInformacion() {

    $.ajax({
            method: "GET",
            url: "http://129.151.104.63:8080/api/clone/all"
        })
        .done(
            function(respuesta) {
                //alert("Datos"+respuesta);
                //recuperarJson = respuesta;
                $('#tablaProductos').dataTable({
                    responsive: true,
                    data: respuesta,
                    /* estos atributos son diferentes para cada reto */
                    columns: [
                        { "data": "id" },
                        { "data": "brand" },
                        { "data": "procesor" },
                        { "data": "os" },
                        { "data": "description" },
                        { "data": "memory" },
                        { "data": "hardDrive" },
                        { "data": "availability" },
                        { "data": "price" },
                        { "data": "quantity" },
                        { "data": "photography" },
                        { "defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-primary btnEditarAbrir'>Editar</button><button type='button' class='btn btn-danger btn_borrar'>Borrar</button></div></div>" }
                    ],
                });
            }
        )
        .fail(
            function() {
                //alert("Error servidor");
            }
        )
        .always(
            function() {
                //alert("siempre ejecutandose")
            }
        );

}

function agregarProductos() {
    var id = $.trim($("#id").val());
    var brand = $.trim($("#brand").val());
    var procesor = $.trim($("#procesor").val());
    var os = $.trim($("#os").val());
    var description = $.trim($("#description").val());
    var memory = $.trim($("#memory").val());
    var hardDrive = $.trim($("#hardDrive").val());
    var price = $.trim($("#price").val());
    var availability = $.trim($("#availability").val());
    var quantity = $.trim($("#quantity").val());
    var photography = $.trim($("#photography").val());


    let myData = {
        id:id,
        brand: brand,
        procesor:procesor,
        os:os,
        description: description,
        memory:memory,
        hardDrive:hardDrive,
        price: price,
        availability: availability, 
        quantity: quantity,
        photography: photography,
    }
    let dataToSend = JSON.stringify(myData);

    ///// Se crea producto
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://129.151.104.63:8080/api/clone/new",
        data: dataToSend,
        datatype: "json",
        cache: false,
        timeout: 600000,
        success: function(respuesta) {  //variable no read
            location.reload();
        },
        error: function(e) {
            alert("No FUNCIONA");
        },
        done: function(e) {
            alert("No FUNCIONA");
        }
    });

}

function getProductData(id) {
    $.ajax({
        url: "http://129.151.104.63:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            //console.log(respuesta);

            $("#id_e").val(respuesta[id].id);
            $("#brand_e").val(respuesta[id].brand);
            $("#procesor_e").val(respuesta[id].procesor);
            $("#os_e").val(respuesta[id].os);
            $("#description_e").val(respuesta[id].description);
            $("#memory_e").val(respuesta[id].memory);
            $("#hardDrive_e").val(respuesta[id].hardDrive);
            $("#availabillity_e").val(respuesta[id].availability);
            $("#price_e").val(respuesta[id].price);
            $("#quantity_e").val(respuesta[id].quantity);  
            $("#photography_e").val(respuesta[id].photography);            

            //esto es para abrir el modal modalEditProducts
            var myModal = new bootstrap.Modal(document.getElementById("modalEditProduct"), {});
            myModal.show();
        }
    });
}

function editProduct() {
    var id = $.trim($("#id_e").val());
    var brand = $.trim($("#brand_e").val());
    var procesor = $.trim($("#procesor_e").val());
    var os = $.trim($("#os_e").val());
    var description = $.trim($("#description_e").val());
    var memory = $.trim($("#memory_e").val());
    var hardDrive = $.trim($("#hardDrive_e").val());
    var price = $.trim($("#price_e").val());
    var availability = $.trim($("#availabillity_e").val());
    var quantity = $.trim($("#quantity_e").val());
    var photography = $.trim($("#photography_e").val());


    let myData = {
        id:id,
        brand: brand,
        procesor:procesor,
        os:os,
        description: description,
        memory:memory,
        hardDrive:hardDrive,
        price: price,
        availability: availability, 
        quantity: quantity,
        photography: photography,

    }
    let dataToSend = JSON.stringify(myData);

    ///// Se crea producto
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "http://129.151.104.63:8080/api/clone/update",
        data: dataToSend,
        datatype: "json",
        cache: false,
        timeout: 600000,
        success: function(respuesta) {
            location.reload();
        },
        error: function(e) {
            alert("No FUNCIONA");
        },
        done: function(e) {
            alert("FUNCIONA");
        }
    });

}

function borrarProducto(_miIndex) {
    let myData = {
        id: _miIndex
    };
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: "http://129.151.104.63:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            //console.log(respuesta);
            var id = respuesta[_miIndex].id;

            $.ajax({
                url: "http://129.151.104.63:8080/api/clone/"+id,
                type: "DELETE",
                data: dataToSend,
                contentType: "application/JSON",
                datatype: "JSON",
                success: function(respuesta) {
                    location.reload();
                }
            });

        }
    });

}

$(document).on("click", ".btn_agregarProductos", function() {
    agregarProductos();
});

$(document).on("click", ".btnEditarAbrir", function() {
    getProductData(miIndiceProducto);

});

$(document).on("click", ".btn_editarProducto", function() {
    editProduct();
});

$(document).on("click", ".btn_borrar", function() {
    borrarProducto(miIndiceProducto);

});