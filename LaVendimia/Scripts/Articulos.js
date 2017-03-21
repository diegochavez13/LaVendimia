var inClaveArticulo = 0;
$(document).ready(function() {
    iniPagina();
});

function iniPagina() {
    iniGridArticulos();
    ObtenerArticulos();
    $("#btnNuevo").click(function() {
        clearDialogData();
        ClaveArticulo();
        nuevoArticulo(inClaveArticulo);

    });

    Numerics("numde", true, false);
    Numerics("numint", false, false);

}

function iniGridArticulos() {

    var widthParentGrid = $("#div-grid-Articulos").width();

    var columns = ["", "Clave Articulo", "Descripción", "", "", "", "", ""]
    var colModel = [{
        name: 'unID',
        index: "unID",
        label: "",
        hidden: true
    }, {
        name: 'inClaveArticulo',
        index: "inClaveArticulo",
        label: "Clave Articulo",
        width: widthParentGrid * .25
    }, {
        index: "nvDescripcion",
        name: "nvDescripcion",
        label: "Descripción",
        width: widthParentGrid * .55
    }, {
        index: "nvModelo",
        name: "nvModelo",
        hidden: true
    }, {
        index: "deExistencia",
        name: "deExistencia",
        hidden: true
    }, {
        index: "dePrecio",
        name: "dePrecio",
        hidden: true
    }, {
        index: "inClaveArticulo",
        name: "inClaveArticulo",
        hidden: true
    }, {
        name: "Accion",
        index: "Accion",
        label: "",
        width: widthParentGrid * .20
    }];

    jQuery($("#grid-Articulos")).jqGrid({

        loadonce: true,
        autowidth: true,
        datatype: 'local',
        height: 'auto',
        colNames: columns,
        colModel: colModel,
        viewrecords: false,
        autowidth: true,
        rowNum: 5,
        rowList: [5, 10, 15],
        pager: "#pager-Articulos",
        caption: "Articulos Registrados",
        altRows: true,
        editurl: 'clientArray',
        loadComplete: function(griddata) {
            var Ids = $("#grid-Articulos").getDataIDs();

            for (var i in Ids) {
                var button = $("<div>").addClass('center').append(
                    $("<button>").attr({
                        "onclick": "EditarArticulo('" + Ids[i] + "')"
                    })
                    .addClass('btn btn-xs btn-link')
                    .append($("<i>").addClass('icon-edit bigger-150 icon-only blue'))
                );

                $("#" + Ids[i]).find("td[aria-describedby='grid-Articulos_Accion']").html(button);
            }
        },
        onSelectRow: function(rowid) {},
        beforeSelectRow: function(rowid) {}
    });
    updatePagerIcons();
};

function nuevoArticulo(inClaveArticulo) {

    $("#lblClaveArticulo").html("Clave: <b> " + _filter.formatCode(inClaveArticulo, 4) + "</b>");

    buttons = [{
        html: "<i class='icon-remove bigger-110'></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-Articulos").hide();
            clearDialogData();

        }
    }, {
        html: "<i class='icon-save bigger-110'></i>&nbsp; " + "Guardar",
        class: "btn btn-xs btn-primary",
        click: function() {
            if (validarCampos()) {
                GuardarArticulo();
                ObtenerArticulos();
                $(this).dialog("destroy");
                $("#modal-Articulos").hide();
                clearDialogData();
                $("#txtDescripcion").focus()
            }
        }
    }];

    _dialog.open("modal-Articulos", "Registro de Articulos", '65%', 'auto', buttons);
}

function ClaveArticulo() {
    connection.invoke('Articulos', 'ClaveArticulo', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                inClaveArticulo = Respuesta.data[0].inClaveArticulo
                break;
            case NO_DATOS:
                break;
        }
    }, false);
}

function clearDialogData() {
    $("#txtDescripcion").val("");
    $("#txtModelo").val("");
    $("#txtPrecio").val("");
    $("#txtExistencia").val("");
}

function validarCampos() {
    var bRet = false;
    if ($("#txtDescripcion").val() != "") {
        if ($("#txtPrecio").val() != "" && $("#txtPrecio").val() > 0) {
            if ($("#txtExistencia").val() != "" && $("#txtExistencia").val() > 0) {
                bRet = true;
            } else {
                toast("Notification", "No es posible continuar, debe ingresar " + "<b>Existencia</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
                $("#txtExistencia").focus();
            }
        } else {
            toast("Notification", "No es posible continuar, debe ingresar " + "<b>Precio</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
            $("#txtPrecio").focus();
        }
    } else {
        toast("Notification", "No es posible continuar, debe ingresar " + "<b>Descipción</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
        $("#txtDescripcion").focus();
    }
    return bRet;
}

function GuardarArticulo() {
    var Argumentos = {
        nvDescripcion: $("#txtDescripcion").val(),
        dePrecio: parseFloat($("#txtPrecio").val()),
        inExistencia: parseFloat($("#txtExistencia").val()),
        inClaveArticulo: inClaveArticulo,
        nvModeloArticulo: $("#txtModelo").val()
    };
    connection.invoke('Articulos', 'GuardarArticulo', Argumentos, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                toast("Éxito", "Bien Hecho. El Articulo ha sido registrado correctamente", "green", 3000, LIGHT, RIGHT);
                break;
            case NO_DATOS:
                break;
        }
    });
}

function ObtenerArticulos() {
    connection.invoke('Articulos', 'ObtenerArticulos', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                $("#grid-Articulos").jqGrid('clearGridData');
                jQuery($("#grid-Articulos")).addRowData($.jgrid.randId(), Respuesta.data);
                $("#grid-Articulos").trigger("reloadGrid", [{
                    page: 1
                }]);
                break;
            case NO_DATOS:
                break;
        }
    });
}

function EditarArticulo(rowid) {
    var GridDatos = $('#grid-Articulos').jqGrid('getGridParam', 'data')
    for (var i = 0; i < GridDatos.length; i++) {
        if (rowid == GridDatos[i].id) {
             inClaveArticulo = GridDatos[i].inClaveArticulo;
            $("#txtDescripcion").val(GridDatos[i].nvDescripcion);
            $("#txtModelo").val(GridDatos[i].nvModelo);
            $("#txtPrecio").val(GridDatos[i].dePrecio);
            $("#txtExistencia").val(GridDatos[i].deExistencia);

            $("#lblClaveArticulo").html("Clave: <b> " + _filter.formatCode(GridDatos[i].inClaveArticulo, 4) + "</b>");

            i = GridDatos.length;
        }
    }

    buttons = [{
        html: "<i class='icon-remove bigger-110'></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-Articulos").hide();
            clearDialogData();

        }
    }, {
        html: "<i class='icon-save bigger-110'></i>&nbsp; " + "Guardar",
        class: "btn btn-xs btn-primary",
        click: function() {
            if (validarCampos()) {
                GuardarArticulo();
                ObtenerArticulos();
                $(this).dialog("destroy");
                $("#modal-Articulos").hide();
                clearDialogData();
                $("#txtDescripcion").focus()
            }
        }
    }];

    _dialog.open("modal-Articulos", "Registro de Articulos", '65%', 'auto', buttons);
}