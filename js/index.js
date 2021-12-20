$(document).ready(function() {
    console.log("Estas en la página Inicio");
    init();
});

function init() {

}

function login() {
    console.log("Estas presionando login");
    var usuarioLogin= $.trim($("#email").val());
    var usuarioPassword= $.trim($("#pwd").val());
    console.log( "usuario= " + usuarioLogin);
    console.log( "Password= " + usuarioPassword);
    if (usuarioLogin != "" && usuarioPassword != "") {

        $.ajax({
            url: "http://129.151.104.63:8080/api/user/" + usuarioLogin + "/" + usuarioPassword,
            type: "GET",
            datatype: "JSON",
            success: function(respuesta) {
                console.log(respuesta);
                console.log("id " + respuesta.id);
                if (respuesta.id === null) {
                    alert("El usuario no existe o el password es incorrecto");
                } else {
                    console.log("ENTRO");
                    validarperfil(respuesta.type);
                    sessionStorage.setItem('miUser', JSON.stringify(respuesta));

                }
            }
        });
    } else { alert("Ningun campo debe estar vacio") }

}

function validarperfil(perfil) {
    switch (perfil) {
        case 'ADM':
            console.log('Perfil Admin');
            window.location.href = "perfilAdmin.html";
            break;
        case 'COORD':
            console.log('Perfil Coordinador');
            window.location.href = "perfilAdmin.html";
            break;
        case 'ASE':
            console.log('Perfil Asesor');
            break;
    }


}
$(document).on("click",".btnlogin",function() {
    login();
});