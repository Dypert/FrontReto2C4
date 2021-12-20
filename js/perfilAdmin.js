var myIndex;
$(document).ready(function() {
    console.log("Estas en la página de perfil Administrador");
    init();
});

function init() {
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre Usuario"+d_user.name);
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
            url: "http://129.151.104.63:8080/api/user/all"
        })
        .done(
            function(respuesta) {
                alert("Datos"+respuesta);
                recuperarJson = respuesta;
                $('#tablaUsuario').dataTable({
                    responsive: true,
                    data: respuesta,
                    columns: [
                        { "data": "identification" },
                        { "data": "name" },
                        //{ "data": "birthtDay" },
                        //{ "data": "monthBirthtDay" },
                        { "data": "address" },
                        { "data": "cellPhone" },
                        { "data": "email" },
                        { "data": "password" },
                        { "data": "zone" },
                        { "data": "type" },
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

function agregarUsuario(id) {
    var id = id;
    var identification = $.trim($("#identification").val());
    var name = $.trim($("#name").val());
    var address = $.trim($("#address").val());
    var cellPhone = $.trim($("#cellPhone").val());
    var email = $.trim($("#email").val());
    var password = $.trim($("#password").val());
    var zone = $.trim($("#zone").val());
    var type = $.trim($("#type").val());

    let myData = {
        id: id,
        identification: identification,
        name: name,
        address: address,
        cellPhone: cellPhone,
        email: email,
        password: password,
        zone: zone,
        type: type

    }
    let dataToSend = JSON.stringify(myData);


    $.ajax({
        url: "http://129.151.104.63:/api/user/all" + email + "/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            //console.log(respuesta);
            console.log("id " + respuesta.id);
            if (respuesta.id === null) {
                //alert("El usuario no existe");

                ///// Se crea usuario
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "http://129.151.104.63:8080/api/user/new"+ email + "/" + password,
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
                        alert("No FUNCIONA");
                    }
                });




            } else {
                alert("El usuario ya existe, no has sido agregado")

            }
        }
    });


}

function getUserData(email, password) {
    $.ajax({
        url: "http://129.151.104.63:8080/api/user/" + email + "/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            //console.log(respuesta);

            $("#identification_e").val(respuesta.identification);
            $("#name_e").val(respuesta.name);
            $("#address_e").val(respuesta.address);
            $("#cellPhone_e").val(respuesta.cellPhone);
            $("#email_e").val(respuesta.email);
            $("#password_e").val(respuesta.password);
            $("#zone_e").val(respuesta.zone);
            $("#type_e").val(respuesta.type);
            
            ///modal para editar usuario
            var myModal = new bootstrap.Modal(document.getElementById("modalEditUser"), {});
            myModal.show();
            
        }
    });
}

function editUser() {
    var id = id;
    var identification = $.trim($("#identification_e").val());
    var name = $.trim($("#name_e").val());
    var address = $.trim($("#address_e").val());
    var cellPhone = $.trim($("#cellPhone_e").val());
    var email = $.trim($("#email_e").val());
    var password = $.trim($("#password_e").val());
    var zone = $.trim($("#zone_e").val());
    var type = $.trim($("#type_e").val());

    let myData = {
        id: id,
        identification: identification,
        name: name,
        address: address,
        cellPhone: cellPhone,
        email: email,
        password: password,
        zone: zone,
        type: type

    }

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "http://129.151.104.63:8080/api/user/update",
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
            alert("No FUNCIONA");
        }
    });

}

function borrarUser(idElement) {
    let myData = {
        id: idElement
    };
    let dataToSend = JSON.stringify(idElement);
    $.ajax({
        url: "http://129.151.104.63:8080/api/user/" + idElement,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {

            location.reload();
        }
    });

}
function editarInformacion()
{
    ////Recoger los valores de los inputs
    var id = miIndice;
    var identification = $.trim($("#identificacion_e").val());
    var name = $.trim($("#nombre_e").val());
    var address = $.trim($("#direccion_e").val());
    var cellPhone = $.trim($("#celular_e").val());
    var email = $.trim($("#mail_e").val());
    var password = $.trim($("#pwd_e").val());
    var zone = $.trim($("#zona_e").val());
    var type = $.trim($("#type_e").val());
    ////
    let myData = {
        id:id,
        identification:identification,
        name:name,
        address:address,
        cellPhone:cellPhone,
        email:email,
        password:password,
        zone:zone,
        type:type,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.104.63:8080/api/user/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            location.reload();

        }
    });
}

$(document).on("click", ".btn_agregarUsuario", function() {
    var count_table = ($('#tablaUsuario').DataTable().data().count()) + 1;
    agregarUsuario(count_table);
});

$(document).on("click", ".btnEditarAbrir", function() {
    console.log("voy a traer el modal");
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(6)').text();
    var password = fila.find('td:eq(7)').text();
    console.log(" voy a traer el email " + email);
    console.log(" voy a traer el password " + password);

    getUserData(email, password);
});

$(document).on("click", ".btn_editUser", function() {
    editUser();

});

///Borrar
$(document).on("click", ".btn_borrar", function() {
    console.log("Vas a borrar");
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(6)').text();
    var password = fila.find('td:eq(7)').text();
    //console.log(" voy a traer el email " + email);
    //console.log(" voy a traer el password " + password);
    $.ajax({
        url: "129.151.104.63:8080/api/user/" + email + "/" + password,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log("ID USUARIO =" + respuesta.id);
            miIndice = respuesta.id;
            borrarUser(miIndice);
        }
    });

});