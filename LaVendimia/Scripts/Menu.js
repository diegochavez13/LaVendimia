$(document).ready(function() {
    iniPantalla();
});

function iniPantalla() {

    connection.invoke('Menu','iniDatos', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                var daFecha = "<b> FECHA: " + Respuesta.data+ "</b>"
                $("#lblCurrentDate").html(daFecha)
                break;
            case NO_DATOS:
                break;
        }
    });

    connection.invoke("Menu", "CargarMenu", {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                createSideMenu(Respuesta)
                _Respuesta = Respuesta;
                $(".lnkHref").unbind("click");
                $(".lnkHref").click(function(event) {
                    last_view_selected = this;
                    var unFunctionalityId = $(this).attr("un-id");
                    var urlView = $(this).attr('id');
                    getView(urlView, unFunctionalityId);
                });
                break;
            case NO_DATOS:
                alert("NO DATOS");
                break;
        }
    });
}

function createSideMenu(Respuesta) {
    var sHtml = "";
    for (var i = 0 ; i < Respuesta.data.length ; i++) {
        sHtml += "<li class='li_item_custom_nav'>" +
                    "<a href='#' class='dropdown-toggle'>" +
                            "<i class='icon-desktop'></i>" +
                            "<span class='menu-text'> " + Respuesta.data[i].sNombreModulo.toUpperCase() + " </span>" +
                            "<b class='arrow icon-angle-down blue'></b>" +
                        "</a>" +
                        "<ul class='submenu'>";
        for (var j = 0 ; j < Respuesta.data[i].ListaFuncionalidades.length ; j++) {
            sHtml += "<li>" +
                        "<a un-id='" + Respuesta.data[i].ListaFuncionalidades[j].unIDFuncionalidad + "' href='#' class='lnkHref' title = '" + Respuesta.data[i].ListaFuncionalidades[j].sNombreFuncionalidad.toUpperCase() + "' id ='" + Respuesta.data[i].ListaFuncionalidades[j].sAccion + "'>" +
                            "<i class='icon-double-angle-right red'></i>" +
                            Respuesta.data[i].ListaFuncionalidades[j].sNombreFuncionalidad.toUpperCase() +
                        "</a>" +
                    "</li>";
        }
        sHtml += "</ul>" +
             "</li>";
    }
    //$("#customNavList").html(sHtml).show(1000, "linear");
    $("#customNavList").html(sHtml).show(400);
}

function getView(urlView, unFunctionalityId){
    $.ajax({
        type: "post",
        url: urlView,
        async: true,//Important
        dataType: "html",
        success: function (response) {
            $ruleFunctionsByProfile(unFunctionalityId,$(response));
            //moveScrollTop();
            unblockUI();
        },
        beforeSend: function () {
            $("#menu-toggler,#sidebar").removeClass("display")
            blockUI("Procesando..");
        },
        error: function (xhr, status, err) {
            unblockUI();
           /* if (err == 'Not Found') {
                LoadPageNoFound();
            }*/
        }
    });
}