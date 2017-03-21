$(document).ready(function() {
    iniPagina();
});

function iniPagina() {

    Numerics("numde", true, false);
    Numerics("nument", false, false);

    CancelarConfiguracion();

    $("#txtEnganche").focusout(function() {
        if ($("#txtEnganche").val() > 100) {
            toast("Notification", "El Enganche no puede ser mayor al 100%", "orange", 3000, LIGHT, RIGHT);
            $("#txtEnganche").focus();
        }
    });

    $("#txtPlazoMaximo").focusout(function() {
        if ($("#txtPlazoMaximo").val() > 12) {
            toast("Notification", "El Plazo Maximo es mayor a 12, capturar un plazo menor o igual", "orange", 3000, LIGHT, RIGHT);
            $("#txtPlazoMaximo").focus();
        }

    })

    $("#btnGuardar").click(function() {
        GuardarConfiguracion();

    })

    $("#btnCancelar").click(function() {
        CancelarConfiguracion();
    });

}

function GuardarConfiguracion() {

    if (validarCampos()) {
        _dialog.confirm("¿Esta seguro de continuar con el guardado?, hacer clic en Aceptar para continuar.", function() {
            var Argumentos = {
                deTasaFinanciamiento: parseFloat($("#txtTasaFinanciamiento").val()),
                inEnganche: parseInt($("#txtEnganche").val()),
                inPlazoMaximo: parseInt($("#txtPlazoMaximo").val())
            };

            connection.invoke('Configuracion', 'GuardarConfiguracion', Argumentos, function(Respuesta) {
                switch (Respuesta.shStatus) {
                    case OK_:
                        toast("Éxito", "Bien Hecho. La configuración ha sido registrada", "green", 3000, LIGHT, RIGHT);
                        break;
                    case NO_DATOS:
                        break;
                }
            }, false);

        });
    }
}

function validarCampos() {
    var bBandera = false;

    if ($("#txtTasaFinanciamiento").val() > 0 && $("#txtTasaFinanciamiento").val() != "") {
        if ($("#txtEnganche").val() >= 0 && $("#txtEnganche").val() != "") {
            if ($("#txtPlazoMaximo").val() > 0 && $("#txtPlazoMaximo").val() != "") {
                bBandera = true;
            } else {
                toast("Notification", "Capturar un Plazo Maximo", "orange", 3000, LIGHT, RIGHT);
            }
        } else {
            toast("Notification", "Capturar un Enganche", "orange", 3000, LIGHT, RIGHT);
        }
    } else {
        toast("Notification", "Capturar una Tasa De Financiamiento", "orange", 3000, LIGHT, RIGHT);
    }
    return bBandera;
}

function CancelarConfiguracion() {

    connection.invoke('Configuracion', 'CancelarConfiguracion', {}, function(Respuesta) {
        switch (Respuesta.shStatus) {
            case OK_:

                if (Respuesta.data.length > 0) {
                    $("#txtTasaFinanciamiento").val(Respuesta.data[0].deTasaFinanciamiento);
                    $("#txtEnganche").val(Respuesta.data[0].inEnganche);
                    $("#txtPlazoMaximo").val(Respuesta.data[0].inPlazoMaximo);
                } else {
                    $("#txtTasaFinanciamiento").val("");
                    $("#txtEnganche").val("");
                    $("#txtPlazoMaximo").val("");
                    $("#txtTasaFinanciamiento").focus();
                }
                break;
            case NO_DATOS:
                break;
        }
    });
}