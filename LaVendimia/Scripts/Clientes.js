var inClaveCliente = 0;
$(document).ready(function() {
    iniPagina();
});

function iniPagina() {
    iniGridClientes();
    ObtenerClientes();
    $("#btnNuevo").click(function() {
        clearDialogData();
        ClaveCliente();
        nuevoCliente(inClaveCliente);

    });

    Numerics("numde", true, false);
}

function iniGridClientes() {

    var widthParentGrid = $("#div-grid-Clientes").width();

    var columns = ["", "Clave Cliente", "Nombre", "", "", "", "", ""]
    var colModel = [{
        name: 'unID',
        index: "unID",
        label: "",
        hidden: true
    }, {
        name: 'inClaveCliente',
        index: "inClaveCliente",
        label: "Clave Articulo",
        width: widthParentGrid * .25
    }, {
        index: "nvNombreCompleto",
        name: "nvNombreCompleto",
        label: "Descripción",
        width: widthParentGrid * .55
    }, {
        index: "nvNombre",
        name: "nvNombre",
        hidden: true
    }, {
        index: "nvApellidoPaterno",
        name: "nvApellidoPaterno",
        hidden: true
    }, {
        index: "nvApellidoMaterno",
        name: "nvApellidoMaterno",
        hidden: true
    }, {
        index: "nvRFC",
        name: "nvRFC",
        hidden: true
    }, {
        name: "Accion",
        index: "Accion",
        label: "",
        width: widthParentGrid * .20
    }];

    jQuery($("#grid-Clientes")).jqGrid({

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
        pager: "#pager-Clientes",
        caption: "Clientes Registrados",
        altRows: true,
        editurl: 'clientArray',
        loadComplete: function(griddata) {
            var Ids = $("#grid-Clientes").getDataIDs();

            for (var i in Ids) {
                var button = $("<div>").addClass('center').append(
                    $("<button>").attr({
                        "onclick": "EditarCliente('" + Ids[i] + "')"
                    })
                    .addClass('btn btn-xs btn-link')
                    .append($("<i>").addClass('icon-edit bigger-150 icon-only blue'))
                );

                $("#" + Ids[i]).find("td[aria-describedby='grid-Clientes_Accion']").html(button);
            }
        },
        onSelectRow: function(rowid) {},
        beforeSelectRow: function(rowid) {}
    });
    updatePagerIcons();
};

function nuevoCliente(inClaveCliente) {

    $("#lblClaveCliente").html("Clave: <b> " + _filter.formatCode(inClaveCliente, 4) + "</b>");

    buttons = [{
        html: "<i class='icon-remove bigger-110'></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-Clientes").hide();
            clearDialogData();

        }
    }, {
        html: "<i class='icon-save bigger-110'></i>&nbsp; " + "Guardar",
        class: "btn btn-xs btn-primary",
        click: function() {
            if (validarCampos()) {
                GuardarCliente();
                ObtenerClientes();
                $(this).dialog("destroy");
                $("#modal-Clientes").hide();
                clearDialogData();
                $("#txtNombre").focus()
            }
        }
    }];

    _dialog.open("modal-Clientes", "Registro de Clientes", '65%', 'auto', buttons);
}

function ObtenerClientes() {
    connection.invoke('Clientes', 'ObtenerClientes', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                $("#grid-Clientes").jqGrid('clearGridData');
                jQuery($("#grid-Clientes")).addRowData($.jgrid.randId(), Respuesta.data);
                $("#grid-Clientes").trigger("reloadGrid", [{
                    page: 1
                }]);
                break;
            case NO_DATOS:
                break;
        }
    });
}

function ClaveCliente() {
    connection.invoke('Clientes', 'ClaveCliente', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                inClaveCliente = Respuesta.data[0].inClaveCliente
                break;
            case NO_DATOS:
                break;
        }
    }, false);
}

function clearDialogData() {
    $("#txtNombre").val("");
    $("#txtApellidoPaterno").val("");
    $("#txtApellidoMaterno").val("");
    $("#txtRFC").val("");
}

function validarCampos() {
    var bRet = false;
    if ($("#txtNombre").val() != "") {
        if ($("#txtApellidoPaterno").val() != "") {
            if ($("#txtRFC").val() != "") {
                bRet = true;
            } else {
                toast("Notification", "No es posible continuar, debe ingresar " + "<b>RFC</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
                $("#txtRFC").focus();
            }
        } else {
            toast("Notification", "No es posible continuar, debe ingresar " + "<b>Apellido Paterno</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
            $("#txtApellidoPaterno").focus();
        }
    } else {
        toast("Notification", "No es posible continuar, debe ingresar " + "<b>Nombre</b>" + " es obligatorio", "red", 3000, LIGHT, RIGHT);
        $("#txtNombre").focus();
    }
    return bRet;
}

function GuardarCliente() {
    var Argumentos = {
        nvNombre: $("#txtNombre").val(),
        nvApellidoPaterno: $("#txtApellidoPaterno").val(),
        nvApellidoMaterno: $("#txtApellidoMaterno").val(),
        inClaveCliente: inClaveCliente,
        nvRFC: $("#txtRFC").val()
    };
    connection.invoke('Clientes', 'GuardarCliente', Argumentos, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                toast("Éxito", "Bien Hecho. El Cliente ha sido registrado correctamente", "green", 3000, LIGHT, RIGHT);
                break;
            case NO_DATOS:
                break;
        }
    });
}

function EditarCliente(rowid) {
    var GridDatos = $('#grid-Clientes').jqGrid('getGridParam', 'data')
    console.log(GridDatos);
    for (var i = 0; i < GridDatos.length; i++) {
        if (rowid == GridDatos[i].id) {
            inClaveCliente = GridDatos[i].inClaveCliente;
            $("#txtNombre").val(GridDatos[i].nvNombre);
            $("#txtApellidoPaterno").val(GridDatos[i].nvApellidoPaterno);
            $("#txtApellidoMaterno").val(GridDatos[i].nvApellidoMaterno);
            $("#txtRFC").val(GridDatos[i].nvRFC);

            $("#lblClaveCliente").html("Clave: <b> " + _filter.formatCode(GridDatos[i].inClaveCliente, 4) + "</b>");

            i = GridDatos.length;
        }
    }

    buttons = [{
        html: "<i class='icon-remove bigger-110'></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-Clientes").hide();
            clearDialogData();

        }
    }, {
        html: "<i class='icon-save bigger-110'></i>&nbsp; " + "Guardar",
        class: "btn btn-xs btn-primary",
        click: function() {
            if (validarCampos()) {
                GuardarCliente();
                ObtenerClientes();
                $(this).dialog("destroy");
                $("#modal-Clientes").hide();
                clearDialogData();
                $("#txtNombre").focus()
            }
        }
    }];

    _dialog.open("modal-Clientes", "Registro de Clientes", '65%', 'auto', buttons);
}