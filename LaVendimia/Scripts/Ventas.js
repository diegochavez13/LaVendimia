var inFolioVenta = 0;
var dataArticulos = [];
var bExistenciaMayor = true;
var TotalAdeudo = 0;
var DatosAGuardar = [];
var dataVentasDetalle = [];
$(document).ready(function() {
    iniPagina();
});

function iniPagina() {

    iniGridBonosMensuales();
    $("#txtdePrecioOculto").hide();
    $("#txtClienteID").hide();
    $("#txtArticuloID").hide();
    $("#txtArticuloModelo").hide();
    iniGridVentas();
    iniGridVentasDetalle();
    ObtenerVentas();
    $("#btnNuevaVenta").click(function() {
        //clearDialogData();
        ObtenerClientes();
        ObtenerArticulos();
        FolioVenta();
        nuevaVenta();

    });

    $("#btnAgregar").click(function() {
            AgregarArticulos();
        })
        //Numerics("numde", true, false);
}

function iniGridVentas() {

    var widthParentGrid = $("#div-grid-Clientes").width();

    var columns = ["Folio Venta", "Clave Cliente", "Nombre", "Total", "Fecha", ""]
    var colModel = [{
        name: 'inFolioVenta',
        index: "inFolioVenta"
    }, {
        name: 'inClaveCliente',
        index: "inClaveCliente",
        width: widthParentGrid * .25
    }, {
        index: "nvNombreCompleto",
        name: "nvNombreCompleto",
        width: widthParentGrid * .55
    }, {
        index: "deTotal",
        name: "deTotal"
    }, {
        index: "daFechaRegistro",
        name: "daFechaRegistro"
    },{
        index: "unClienteID",
        name: "",
        hidden: true
    }];

    jQuery($("#grid-Ventas")).jqGrid({
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
        pager: "#pager-Ventas",
        caption: "Ventas Activas",
        altRows: true,
        editurl: 'clientArray',
        loadComplete: function(griddata) {
            // var Ids = $("#grid-Clientes").getDataIDs();

            // for (var i in Ids) {
            //     var button = $("<div>").addClass('center').append(
            //         $("<button>").attr({
            //             "onclick": "EditarCliente('" + Ids[i] + "')"
            //         })
            //         .addClass('btn btn-xs btn-link')
            //         .append($("<i>").addClass('icon-edit bigger-150 icon-only blue'))
            //     );

            //     $("#" + Ids[i]).find("td[aria-describedby='grid-Ventas_Accion']").html(button);
            // }
        },
        onSelectRow: function(rowid) {},
        beforeSelectRow: function(rowid) {}
    });
    updatePagerIcons();
};

function ObtenerVentas() {
    connection.invoke('Ventas', 'ObtenerVentas', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
            console.log(Respuesta.data);
	            $("#grid-Ventas").jqGrid('clearGridData');
                jQuery($("#grid-Ventas")).addRowData($.jgrid.randId(), Respuesta.data);
                $("#grid-Ventas").trigger("reloadGrid", [{
                    page: 1
                }]);
                break;
            case NO_DATOS:
                break;
        }
    });
};

function FolioVenta() {
    connection.invoke('Ventas', 'FolioVenta', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                inFolioVenta = Respuesta.data[0].inFolioVenta
                break;
            case NO_DATOS:
                break;
        }
    }, false);
}

function iniGridVentasDetalle() {

    var widthParentGrid = $("#div-grid-Clientes").width();

    var columns = ["", "Descripcion Articulo", "Modelo", "Cantidad", "Precio", "", "Importe", ""]
    var colModel = [{
        name: 'unID',
        index: "unID",
        hidden: true
    }, {
        name: 'nvDescripcionArticulo',
        index: "nvDescripcionArticulo",
        width: widthParentGrid * .25
    }, {
        name: 'nvModelo',
        index: "nvModelo",
        width: widthParentGrid * .25
    }, {
        name: 'deCantidad',
        index: 'deCantidad',
        editable: true,
        editoptions: {
            dataInit: function(elem) {
                Numerics(elem.id, true, false);
                $(elem).prop('placeholder', '0');
                $(elem).focusout(function(ev) {
                    $(elem).val(Number($(elem).val()));
                    $("#grid-VentasDetalle").jqGrid('saveRow', lastrowselected);
                    var dataGrid = $('#grid-VentasDetalle').jqGrid('getGridParam', 'data');

                    for (var i = 0; i < dataGrid.length; i++) {
                        for (var x = 0; x < dataArticulos.length; i++) {
                            if (dataGrid[i].id == lastrowselected) {
                                if (dataGrid[i].unID == dataArticulos[x].unID) {
                                    if (dataGrid[i].deCantidad > dataArticulos[x].deExistencia) {
                                        $("#grid-VentasDetalle").jqGrid('editRow', lastrowselected);
                                        toast("Notification", "La cantidad es mayor a la existencia", "orange", 3000, LIGHT, RIGHT);
                                        $(elem).focus();
                                        bExistenciaMayor = true;
                                        i = dataGrid.length;
                                        x = dataArticulos.length;
                                    } else {
                                        i = dataGrid.length;
                                        x = dataArticulos.length;
                                        bExistenciaMayor = false;
                                        $("#grid-VentasDetalle").jqGrid('saveRow', lastrowselected);
                                        var deCantidad = Number($(elem).val())
                                        GuardarCantidad(deCantidad, lastrowselected);
                                    }
                                }
                            }
                        }

                    }

                });

            },
            dataEvents: [{
                type: 'keydown',
                fn: function(e) {
                    if (!bExistenciaMayor) {

                        var key = e.charCode || e.keyCode || e.which; //carlos
                        if (key == 13 || key == 9) //enter
                        {
                            
                            //setTimeout(function() {
                            
                            var RowID = lastrowselected;
                            lastrowselected = RowID.substring(3, 100);
                            var sNextRowID = (parseInt(lastrowselected) + (key == 9 && e.shiftKey ? -1 : 1));
                            $("#jqg" + sNextRowID).trigger("click");
                            $("#jqg" + sNextRowID + "deCantidad").select();

                            //}, 300);

                        }
                    }
                }
            }]
        }
    }, {
        name: 'dePrecio',
        index: 'dePrecio',
        formatter: "currency",
        formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
        }
    }, {
        index: "dePrecio",
        name: "dePrecio",
        hidden: true
    }, {
        index: "deImporte",
        name: "deImporte",
        formatter: "currency",
        formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
        },
        width: widthParentGrid * .25
    }, {
        index: "Accion",
        name: "Accion",

    }];

    jQuery($("#grid-VentasDetalle")).jqGrid({
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
        pager: "#pager-VentasDetalle",
        caption: "",
        altRows: true,
        editurl: 'clientArray',
        loadComplete: function(griddata) {
            var Ids = $("#grid-VentasDetalle").getDataIDs();

            for (var i in Ids) {
                var button = $("<div>").addClass('center').append(
                    $("<button>").attr({
                        "onclick": "EliminarArticulo('" + Ids[i] + "')"
                    })
                    .addClass('btn btn-xs btn-link')
                    .append($("<i>").addClass('icon-remove bigger-150 icon-only red'))
                );

                $("#" + Ids[i]).find("td[aria-describedby='grid-VentasDetalle_Accion']").html(button);
            }
        },
        onSelectRow: function(rowid) {
            lastrowselected = rowid;
            var row = $(this).getRowData(rowid);
            $("#grid-VentasDetalle").jqGrid('editRow', rowid, {
                keys: true,
                oneditfunc: function() {

                },
                successfunc: function() {

                },
                aftersavefunc: function(rowid_) {

                    var data = $(this).getRowData(rowid_);

                    for (var i = 0; i < dataArticulos.length; i++) {
                        if (dataArticulos[i].unID == data.unID) {
                            if (dataArticulos[i].deExistencia < data.deCantidad) {
                                $("#grid-VentasDetalle").jqGrid('saveRow', rowid_);
                                toast("Notification", "La cantidad es mayor a la existencia", "orange", 3000, LIGHT, RIGHT);
                                $("#grid-VentasDetalle").jqGrid('editRow', rowid_);
                                lastrowselected = rowid_;
                            } else {
                                GuardarCantidad(data.deCantidad, lastrowselected);
                            }
                        }
                    }

                    // if (data.deCantidad > 0 && data.deCantidad != "") {
                    //     data.deCantidad = Number(data.deCantidad);
                    //     data.deImporte = data.deCantidad * data.dePrecio;
                    //     $("#grid-VentasDetalle").setRowData(rowid_, data);
                    // } else {
                    //     //data.deReceived = Number(data.deReceived);
                    //     $("#grid-VentasDetalle").setRowData(rowid_, data);
                    // }
                },
                restoreAfterError: true
            });

            if (lastrowselected != rowid) {
                $("#grid-VentasDetalle").jqGrid('saveRow', lastrowselected)
                lastrowselected = rowid;
            }

        },
        beforeSelectRow: function(rowid) {}
    });
    updatePagerIcons();
}

function GuardarCantidad(deCantidad, rowid) {

    var dataGrid = $('#grid-VentasDetalle').jqGrid('getGridParam', 'data');
    var dataRow = $('#grid-VentasDetalle').getRowData(rowid);
    var TotalImporte = 0;
    var Enganche = 0;
    var BonificacionEnganche = 0;
    TotalAdeudo = 0;

    if (dataRow.deCantidad > 0 && dataRow.deCantidad != "") {
        dataRow.deCantidad = Number(dataRow.deCantidad);
        dataRow.deImporte = dataRow.deCantidad * dataRow.dePrecio;
        $("#grid-VentasDetalle").setRowData(rowid, dataRow);

        for (var i = 0; i < dataGrid.length; i++) {
            TotalImporte = TotalImporte + dataGrid[i].deImporte;
        }

        Enganche = ((parseInt(dataArticulos[0].deEngache) / 100) * TotalImporte);
        BonificacionEnganche = Enganche * ((parseFloat(dataArticulos[0].deTasaFinanciamiento) * parseInt(dataArticulos[0].inPlazoMaximo) / 100));
        TotalAdeudo = TotalImporte - Enganche - BonificacionEnganche;


        $("#lblEnganche").html(_filter.formatNumber(Enganche, 2))
        $("#lblBonificacionEnganche").html(_filter.formatNumber(BonificacionEnganche, 2))
        $("#lblTotal").html(_filter.formatNumber(TotalAdeudo, 2))

    }

    bExistenciaMayor = true;
}

function ObtenerClientes() {
    connection.invoke("Clientes", "ObtenerClientes", {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                var data = [];
                //arrayResourcesWithStock = response.data;
                for (var i in Respuesta.data)
                    data.push({
                        unID: Respuesta.data[i].unID,
                        nvRFC: Respuesta.data[i].nvRFC,
                        label: _filter.formatCode(Respuesta.data[i].inClaveCliente, 4) + " - " + Respuesta.data[i].nvNombreCompleto
                    });
                if ($("#txtCliente").data("ui-autocomplete")) {
                    $("#txtCliente").autocomplete("option", {
                        source: data
                    })
                } else {
                    arrResources = data;
                    $("#txtCliente").autocomplete({
                        source: data,
                        minLength: 3,
                        select: function(request, response) {
                            $("#txtClienteID").val(response.item.unID);
                            $("#lblRFC").html("RFC: " + response.item.nvRFC);
                            $("#txtCliente").val(response.item.label);
                        }
                    }).focus(function() {
                        $(this).autocomplete("search");
                    });
                }
                break;
            case NO_FOUND_RECORDS_:
                toast(LanguageGeneral.Notification, LanguageGeneral.NO_FOUND_RECORDS_, "orange", 3000, LIGHT, RIGHT);
                break;
        }

    });
}

function ObtenerArticulos() {
    connection.invoke('Ventas', 'ObtenerArticulos_Ventas', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:
                var data = [];
                dataArticulos = [];
                dataArticulos = Respuesta.data;
                for (var i in Respuesta.data)
                    if (Respuesta.data[i].deExistencia > 0) {
                        data.push({
                            unID: Respuesta.data[i].unID,
                            dePrecio: Respuesta.data[i].dePrecio,
                            nvModelo: Respuesta.data[i].nvModelo,
                            label: Respuesta.data[i].nvDescripcion
                        });
                    }
                if ($("#txtArticulo").data("ui-autocomplete")) {
                    $("#txtArticulo").autocomplete("option", {
                        source: data
                    })
                } else {
                    arrResources = data;
                    $("#txtArticulo").autocomplete({
                        source: data,
                        minLength: 3,
                        select: function(request, response) {
                            $("#txtArticuloID").val(response.item.unID);
                            $("#txtdePrecioOculto").val(response.item.dePrecio);
                            $("#txtArticulo").val(response.item.label);
                            $("#txtArticuloModelo").val(response.item.nvModelo);
                        }
                    }).focus(function() {
                        $(this).autocomplete("search");
                    });
                }
                break;
            case NO_DATOS:
                break;
        }
    });
}

function clearDialogData() {
    $("#txtdePrecioOculto").val("");
    $("#txtClienteID").val("");
    $("#txtArticuloID").val("");
    $("#txtCliente").val("");
    $("#txtArticulo").val("");
    $("#lblRFC").html("");
    $("#txtArticuloModelo").val("");
    $("#txtExistencia").val("");
    $("#lblEnganche").html("");
    $("#lblBonificacionEnganche").html("");
    $("#lblTotal").html("");
    $("#grid-VentasDetalle").jqGrid('clearGridData');
}

function AgregarArticulos() {
    var DataGrid = [];
    var bExiste = false;
    var data = [];
    data = $('#grid-VentasDetalle').jqGrid('getGridParam', 'data');

    DataGrid.push({
        nvDescripcionArticulo: $("#txtArticulo").val(),
        nvModelo: $("#txtArticuloModelo").val(),
        dePrecio: $("#txtdePrecioOculto").val(),
        unID: $("#txtArticuloID").val()

    });

    for (var i = 0; i < DataGrid.length; i++) {
        for (var x = 0; x < data.length; i++) {
            if (DataGrid[i].unID == data[x].unID) {
                bExiste = true;

                i = DataGrid.length;
                x = data.length;
            }
        }

    }

    if (!bExiste) {
        jQuery($("#grid-VentasDetalle")).addRowData($.jgrid.randId(), DataGrid);
        $("#grid-VentasDetalle").trigger("reloadGrid", [{
            page: 1
        }]);
    } else {
        toast("Notification", "El Articulo seleccionado ya esta agregado", "orange", 3000, LIGHT, RIGHT);
    }

    $("#txtArticuloID").val("");
    $("#txtArticulo").val("");
    $("#txtArticuloModelo").val("");
}

function EliminarArticulo(rowid) {
    var dataGrid = $("#grid-VentasDetalle").jqGrid('getGridParam', 'data');

    $("#grid-VentasDetalle").jqGrid('delRowData', rowid);
    $("#grid-VentasDetalle").trigger("reloadGrid", [{
        page: 1
    }]);

    if (dataGrid.length == 0) {
        clearDialogData();
    }
}

function validarCampos() {
    var bBandera = false
    var dataGrid = $("#grid-VentasDetalle").jqGrid('getGridParam', 'data');

    if (dataGrid.length > 0) {
        for (var i = 0; i < dataGrid.length; i++) {
            if (dataGrid[i].deCantidad > 0 && dataGrid[i].deCantidad != "" && dataGrid[i].deCantidad != "undifined") {
                bBandera = true;
            }
        }
    }
    return bBandera;
}

function iniGridBonosMensuales() {
    var widthParentGrid = $("#div-grid-BonosMensuales").width();

    var columns = ["Meses", "Abonos de", "Total a Pagar", "Se Ahorra", ""]
    var colModel = [{
        name: 'inMeses',
        index: "inMeses"
    }, {
        name: 'deImporteAbono',
        index: "deImporteAbono",
        formatter: "currency",
        formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
        }
    }, {
        index: "deTotalaPagar",
        name: "deTotalaPagar",
        formatter: "currency",
        formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
        }
    }, {
        index: "deImporteAhorro",
        name: "deImporteAhorro",
        formatter: "currency",
        formatoptions: {
            decimalSeparator: ".",
            thousandsSeparator: ",",
            decimalPlaces: 2
        }
    }, {
        name: 'inCheck',
        index: 'inCheck',
        edittype: "radio",
        editable: true,
        width: 25,
        editoptions: {
            value: "1:0"
        },
        formatter: function(cellValue, option) {
            return '<input type="radio" id="radioID" name="radio_' + option.gid + '"  />';
        },
        formatoptions: {
            disabled: false
        }
    }];

    jQuery($("#grid-BonosMensuales")).jqGrid({

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
        pager: "#pager-BonosMensuales",
        caption: "ABONOS MENSUALES",
        altRows: true,
        editurl: 'clientArray',
        loadComplete: function(griddata) {
            styleCheckbox(this);
        },
        onSelectRow: function(rowid) {},
        beforeSelectRow: function(rowid) {
            var row = $(this).getRowData(rowid);
            var bCheck = false;
            var ch = jQuery("#grid-BonosMensuales").find('#' + rowid + ' input[type=radio]').is(':checked');
            var data = $(this).getRowData(rowid)
            if (ch) {
                DatosAGuardar = [];
                DatosAGuardar.push({
                    inMeses: data.inMeses,
                    deImporteAbono: data.deImporteAbono,
                    deTotalaPagar: data.deTotalaPagar,
                    deImporteAhorro: data.deImporteAhorro,
                    unClienteID : dataVentasDetalle[0].unClienteID,
                    inFolioVenta:inFolioVenta
                });
            } else {
                // for (var i = 0; i < idsOfSelectedRows.length; i++) {
                //     if (idsOfSelectedRows[i].iFolio == row.iFolio) {
                //         idsOfSelectedRows[i].inCheck = 0;
                //     }
                // }
            }
        }
    });
    updatePagerIcons();
}

function datosBonosMensuales() {
    var DatosGridAbonos = [];
    var MesesAbonos = [];
    var PrecioContado = 0;
    var DatosAbonos = [];

    MesesAbonos = [{
        0: 3,
        1: 6,
        2: 9,
        3: 12
    }];

    PrecioContado = TotalAdeudo / (1 + ((parseFloat(dataArticulos[0].deTasaFinanciamiento) * parseFloat(dataArticulos[0].inPlazoMaximo)) / 100))


    $("#lblEnganche").html();
    $("#lblBonificacionEnganche").html();


    for (var i = 0; i < 4; i++) {


        DatosGridAbonos.push({
            inMeses: MesesAbonos[0][i],
            deTotalaPagar: PrecioContado * (1 + (parseFloat(dataArticulos[0].deTasaFinanciamiento) * MesesAbonos[0][i]) / 100)

        })

        DatosAbonos.push({
            inMeses: parseInt(DatosGridAbonos[i].inMeses),
            deTotalaPagar: parseFloat(DatosGridAbonos[i].deTotalaPagar),
            deImporteAbono: parseFloat(DatosGridAbonos[i].deTotalaPagar) / parseInt(DatosGridAbonos[i].inMeses),
            deImporteAhorro: TotalAdeudo - parseFloat(DatosGridAbonos[i].deTotalaPagar)
        })

    }
    jQuery($("#grid-BonosMensuales")).addRowData($.jgrid.randId(), DatosAbonos);
}

//Dialogos
function nuevaVenta() {  

    $("#lblFolioVenta").html("Folio Venta: <b> " + _filter.formatCode(inFolioVenta, 4) + "</b>");
    if ($("#txtCliente").data("ui-autocomplete")) {
        $("#txtCliente").autocomplete("destroy")
    }

    if ($("#txtArticulo").data("ui-autocomplete")) {
        $("#txtArticulo").autocomplete("destroy")
    }

    clearDialogData();

    buttons = [{
        html: "<i class='icon-remove bigger-110 id='btnCancelarVentas''></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-Ventas").hide();


        }
    }, {
        html: "<i class='icon-save bigger-110' id='btnSiguiente'></i>&nbsp; " + "Siguiente",
        class: "btn btn-xs btn-primary",
        click: function() {
        	var datosVenta = $('#grid-VentasDetalle').jqGrid('getGridParam', 'data');
            if (validarCampos()) {
                dataVentasDetalle = [];
                for (var i = 0; i < datosVenta.length; i++) {
                    dataVentasDetalle.push({
                        unClienteID: $("#txtClienteID").val(),
                        unArticuloID: datosVenta[i].unID,
                        deImporte: datosVenta[i].deImporte,
                        deCantidad: datosVenta[i].deCantidad,
                        dePrecio:$("#txtdePrecioOculto").val()
                    })
                }
                $(this).dialog("destroy");
                $("#modal-Ventas").hide();
                BonosMensuales();
            } else {
                toast("Notification", "Los datos ingresados no son correctos, favor de verificar", "red", 3000, LIGHT, RIGHT);
            }
        }
    }];

    _dialog.open("modal-Ventas", "Registro de Ventas", '65%', 'auto', buttons);
}

function BonosMensuales() {
    datosBonosMensuales();
    buttons = [{
        html: "<i class='icon-remove bigger-110'></i>&nbsp; " + "Cancelar",
        class: "btn btn-xs btn-grey",
        click: function() {
            $(this).dialog("destroy");
            $("#modal-BonosMensuales").hide();
            $("#grid-BonosMensuales").jqGrid('clearGridData');
            $("#grid-BonosMensuales").trigger("reloadGrid", [{
                page: 1
            }]);
        }
    }, {
        html: "<i class='icon-save bigger-110'></i>&nbsp; " + "Guardar",
        class: "btn btn-xs btn-primary",
        click: function() {
            if (validarVenta()) {
                GuardarVenta();
                $(this).dialog("destroy");
                $("#modal-BonosMensuales").hide();
                $("#grid-BonosMensuales").jqGrid('clearGridData');
                $("#grid-BonosMensuales").trigger("reloadGrid", [{
                    page: 1
                }]);
            } else {
                toast("Notificación", 'Debe seleccionar un plazo para realizar el pago de su compra', 'red', 3000, LIGHT, RIGHT);
            }
        }
    }];

    _dialog.open("modal-BonosMensuales", "Bonos Mensuales", '50%', 'auto', buttons);
}

function validarVenta() {
    var bandera = false;
    var Ids = $("#grid-BonosMensuales").getDataIDs();

    for (var i = 0; i < Ids.length; i++) {
        var ch = jQuery("#grid-BonosMensuales").find('#' + Ids[i] + ' input[type=radio]').is(':checked');
        if (ch) {
            bandera = true;
        }
    }
    return bandera;

}

function GuardarVenta() {
    connection.invoke('Ventas','GuardarVenta',  { args: JSON.stringify(DatosAGuardar), args2: JSON.stringify(dataVentasDetalle) }, function(Respuesta) {
    	switch (Respuesta.shStatus) {
    		case OK_:
    			toast("Notification", "Bien Hecho, Tu venta ha sido registrada correctamente", "green", 3000, LIGHT, RIGHT);
    			ObtenerVentas();
    			break;
    		case NO_DATOS:
    			break;
    	}
    });
}