const LIGHT = true;
const DARK = false;
const CENTER = true;
const RIGHT = false;
const OK_ = 1;
const DEFAULT_ = 0;
const ERR_ = -1;
const SESSION_EXPIRED_ = -2;
const NO_FOUND_RECORDS_ = -3;
const USER_NAME_OR_PASSWORD_INCORRECT_ = -4;
const NOT_FOUND_LANGUAGES_ = -5;
const PROJECT_NO_SETTED_ = -6;
const RESOURCES_NOTFOUND_ = -7;
const RESOURCES_DIF_COST_ = -8;
const RESOURCES_DIF_DESC_ = -9;
const PASSWORD_DEFAULT_ = -10;
const NO_FOUND_PROTOTYPE = -11;
const NEED_CALCULATION_ = -12;
const EXPENSES_NOTFOUND = -13;
const NEODATA_RESOURCEEXISTS_OR_UNITORTYPENOTEXISTS = -14;
const RESOURCES_INCORRECT_ID = -15;
const RESOURCE_WITH_EXPENSE = -16;
const BUDGET_LOWER_SPEND = -17;
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"; 


/** Constants to create PDF reports from HTML */
//Page size
const LETTER =1;
const A4 = 2;
const A5 = 3;
const A3 = 4;
//Page orientation
const PORTRAIT = 1;
const LANDSCAPE = 2;

String.prototype.isEmpty = function ()
{
    return !this.match(/\S/);
}

//this functin require jquery.blockUI.js
function blockUI(mensaje, spinColor, textColor) {
    mensaje = mensaje || Language_General["es-ES"].LOADING;

    //armamos un codigo html para representar el dialogo de cargando
    var html = "<div class='col-md-12 center'>" +
                    "<h3 class='header smaller lighter " + (textColor != null ? textColor : 'grey') + "'>" +
                        "<i class='icon-spinner icon-spin " + (spinColor != null ? spinColor : 'orange') + " bigger-150'></i>" +
                        "<small>  "
                            + mensaje +
                        "</small>" +
                    "</h3>" +
                 "</div>";

    //inicializamos el bloqueo de pantalla con sus respectivas opciones.
    $.blockUI({ message: html, css: { 'border-radius': '17px', 'border-color': '#3B4D82', 'width': 'auto' } });
    if(mensaje!=undefined){
        var offset=$(".blockMsg").offset();
        var width=$(".blockMsg").width();
        var swidth=$(window).width();
        offset.left=(swidth-width)/2;
        $(".blockMsg").offset(offset)
    }

    $(".blockOverlay").css("z-index",1100);
    $(".blockMsg").css("z-index",1111);
}

//desbloqueamos la pantalla
function unblockUI() {
    $.unblockUI();
}

//this functin require jquery.gritter.min.js
function toast(sTitulo, sMensaje, sColor, iTimeOut, bColorLigth, bCentrado)
{
    clase_css= "";
    mantener = false;
    switch(sColor)
    {
        case "red":
            clase_css += " gritter-error " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");// 
            break;
        case "green":
            clase_css += " gritter-success " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");
            break;
        case "orange":
            clase_css += " gritter-warning " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");
            break;
        case "blue":
            clase_css += " gritter-info " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");
            break;
        case "gray":
            clase_css  += " gritter-regular " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");
            break;
        default:
            clase_css  += " gritter-regular " + (bColorLigth  == true ? "gritter-light " : "") + (bCentrado  == true ? "gritter-center" : "");
            break;
            

    }
  
    $.gritter.add({
// (string | mandatory) the heading of the notification
        title: "<strong>"+sTitulo+"</strong><br><br>",
        
        class_name: clase_css,
        /*image: 'assets/avatars/avatar.png',*/
        // (string | mandatory) the text inside the notification
        text: "<div style = 'font-size : 13px;'>" + sMensaje + "</div> <br>",
        // (bool | optional) if you want it to fade out on its own or just sit there
        sticky: mantener,
        // (int | optional) the time you want it to be alive for before fading out
        time: iTimeOut
      
    });
}

function SpecialAlert(selector, message, style)
{
    css_class = "alert " + (style != null ? "alert-" + style : "alert-success");
    
    $(selector).html("<div class = '" + css_class + "' style='position:relative'>" +
        "<button type='button' class='close' data-dismiss='alert'>"+
			"<i class='icon-remove'></i>"+
		"</button>"+
        "<p> <strong>"+
			"<i class='icon-ok'></i>"+
            "</strong>" + message + 
        "</p>"
        );
}


function drawPieChart(placeholder, data, position) {
  $.plot(placeholder, data, {
    series: {
        pie: {
            show: true,
            tilt:0.8,
            highlight: {
                opacity: 0.25
            },
            stroke: {
                color: '#fff',
                width: 2
            },
            startAngle: 2
        }
    },
    legend: {
        show: true,
        position: position || "ne", 
        labelBoxBorderColor: null,
        margin:[-30,15]
    }
    ,
    grid: {
        hoverable: true,
        clickable: true
    }
 })
}


/*Example
  var d1 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d1.push([i, Math.sin(i)]);
    }
    var d2 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d2.push([i, Math.cos(i)]);
    }
    var d3 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.2) {
        d3.push([i, Math.tan(i)]);
    }
    drawChart("#chart", [{ label: "Name 1", data: d1 }, { label: "Name 2", data: d2 }, { label: "Name 3", data: d3 }])

*/
function drawChart(tag_selector, data)
{
    var tag = $(tag_selector);
    if (tag)
    {
        $(tag_selector).css({ 'width': '100%', 'height': '220px' });
        $.plot(tag_selector, data,
            {
            hoverable: true,
            shadowSize: 0,
            series: {
                lines: { show: true },
                points: { show: true }
            },
            xaxis: {
                tickLength: 0
            },
            yaxis: {
                ticks: 10,
                min: 0,
                max: 100,
                tickDecimals: 3
            },
            grid: {
                backgroundColor: { colors: ["#fff", "#fff"] },
                borderWidth: 1,
                borderColor: '#555'
            }
        });
    }
}

function dialogconfirm(msj, functionYES, functionNOT)
{
    bootbox.confirm(msj, function(result) {
        if(result) {
            if(typeof functionYES == "function")
                functionYES();
        }
        else
        {
            if(typeof functionNOT == "function")
            functionNOT();
        }
    });
}

$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
    _title: function (title) {
        var $title = this.options.title || '&nbsp;'
        if (("title_html" in this.options) && this.options.title_html == true)
            title.html($title);
        else title.text($title);
    }
}));

function dialogRegular(tagSelector, title, pwidth, pheight)
{
    
    var dialog = $("#" + tagSelector).removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> " + title + "</h4></div>",
        title_html: true,
        width: 'auto',
        height: 'auto',
        show: { duration: 400 },
        position: { my: "center", at: "center", of: window },//Posicionar el dialog en el centro
    });
}

function dialogRegular2(tagSelector, title, pwidth, pheight) {

    var dialog = $("#" + tagSelector).removeClass('hide').dialog({
        modal: true,
        resizable: false,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> " + title + "</h4></div>",
        title_html: true,
        width: pwidth,
        height: pheight,
        show: { duration: 400 },
        position: { my: "center", at: "center", of: window },//Posicionar el dialog en el centro
        close: function () {
            $("#" + tagSelector).dialog("destroy").addClass("hide");
        }
    });
    $('#'  +tagSelector).css('overflow', 'hidden');
}

/**
* Show a Modal Message
* @tagSelector {String}  Id of the element where the dialog will be charged
* @title {String} Title of Dialog
* @message {String} Message to show in body dialog
* @style {String} can be: danger(red), warning(Yellow), success(green), info(blue).
* @width {String}  width of modal window
* @height {String} height of modal window
* @functionOk {function} function that exec after you click OK 
* @returns {void} el codigo de retorno 0
*/
function ModalMessage(tagSelector, title, message, style, width, height, functionOk, labelButton) {
    style = style || "success";
    width = width || "auto";
    height = height || "auto";
    labelButton = labelButton || "OK";
    functionOk = (typeof functionOk == 'function') ? functionOk : function() {
                                     $( this ).dialog( "destroy" );
                             }

    sHtml = "<div class='alert alert-block alert-" + style + " bigger-110'>" +
                                                "<strong>" + message + "</strong></div>"
    var icon = "";

    switch (style)
    {
        case "success":
            icon = "icon-ok green";
            break;
        case "warning":
            icon = "icon-warning-sign orange";
            break;
        case "danger":
            icon = "icon-warning-sign red";
            break;
        case "info":
            icon = "icon-info-sign";
            break;
        default:
            icon = "icon-ok";
            break;
    }
   
    $("#" + tagSelector).html(sHtml);
    var dialog = $("#" + tagSelector).removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='" + icon + "'></i> " + title + "</h4></div>",
        title_html: true,
        width: width,
        height: height,
        show : {duration: 400},
        position: { my: "center", at: "center", of: window },//Posicionar el dialog en el centro
        buttons: [
                    {
                        html: "<i class='icon-ok bigger-110'></i>&nbsp; "+ labelButton,
								                "class" : "btn btn-primary btn-xs",
						click: functionOk
                    }
        ]
    });
}
function createGrid(table_id ,div_pager_id, title, /*grid_data,*/ columns, model, functionClick)
{
        var grid_selector = "#" + table_id;
        var pager_selector = "#" + div_pager_id;

        jQuery(grid_selector).jqGrid({
            //data: grid_data,
            loadonce: true,
            datatype: 'local',
            height: 'auto',
            width : 'auto',
            colNames: columns,
            overlay: false,
            loadui: 'disable',
            colModel: model,
            viewrecords: true,
            rowNum: 10,
            rowList: [5, 10, 20, 30],
            pager: pager_selector,
            altRows: true,
            //toppager: true,
            editurl: 'clientArray',
            multiselect: false,
            //multikey: "ctrlKey",
            multiboxonly: true,

            loadComplete: function () {
                
            },
            onSelectRow :  function(rowid) {
                var row = $(this).jqGrid('getRowData', rowid);
                if (typeof functionClick == "function")
                {
                    functionClick(row);
                }
            },                    
            caption: title,
            autowidth: true,
            title: title
        });
        updatePagerIcons();
        
    
}

function createGridData(table_id ,div_pager_id, title, grid_data, columns, model, functionClick)
{
        var grid_selector = "#" + table_id;
        var pager_selector = "#" + div_pager_id;

        //jQuery(grid_selector).jqGrid('clearGridData');
        //jQuery(grid_selector).setGridParam({ 'data': grid_data }).trigger("reloadGrid");
        jQuery(grid_selector).jqGrid({
            data: grid_data,
            datatype: "local",
            height: 'auto',
            width : 'auto',
            colNames: columns,
            colModel: model,
            viewrecords: true,
            rowNum: 5,
            rowList: [5, 10, 20, 30],
            pager: pager_selector,
            altRows: true,
            //toppager: true,

            multiselect: false,
            //multikey: "ctrlKey",
            multiboxonly: true,

            loadComplete: function () {

            },
            onSelectRow :  function(rowid) {
                var row = $(this).jqGrid('getRowData', rowid);
                if (typeof functionClick == "function")
                {
                    functionClick(row);
                }
            },                    
            caption: title,
            autowidth: true,
            title: title
        });

        updatePagerIcons();
    
}

function aMayusculas(e) {
    var sCadena = $(e.currentTarget).val();

    sCadena = sCadena.toUpperCase();

    $(e.currentTarget).val(sCadena);
}

function NotCopy(Controlls) {
    $('#' + Controlls).bind("cut copy paste", function (e) {
        e.preventDefault();
    });
};

function Numerics(target, allowFloats, allowNegative) {

    //when param target_class is class 
    $('.' + target + ', #' + target).numericInput({
        allowFloat: allowFloats == undefined ? false : allowFloats, // Accpets positive numbers (floating point)
        allowNegative: allowNegative == undefined ? false : allowNegative // Accpets positive or negative integer
    });

      //when param target_class is class 
    $('.' + target + ', #' + target).bind("paste", function (e) {
        setTimeout(function () {
            ev = e;
            CleanStringOnlyNumbers(ev)
        }, 0);
    });
}

function CleanStringOnlyNumbers(e) {
    var sString = $(e.currentTarget).val();
    var sNewString = new Array();
    var bFirstPoint = false;

    //delete all characters no numerics except points
    sString = sString.replace(/[^0-9.]/g, "");
    //delete all point except the first
    for (var i = 0; i < sString.length ; i++) {
        if (sString[i] == ".") {
            if (!bFirstPoint) {
                bFirstPoint = true;
                sNewString.push(sString[i]);
            }
        }
        else {
            sNewString.push(sString[i]);
        }
    }
    sString = sNewString.join("");
    $(e.currentTarget).val(sString);
}



//Functions jqGrid (style Ace Admin)

//switch element when editing inline
function aceSwitch(cellvalue, options, cell) {
    setTimeout(function () {
        $(cell).find('input[type=checkbox]')
                .wrap('<label class="inline" />')
            .addClass('ace ace-switch ace-switch-5')
            .after('<span class="lbl"></span>');
    }, 0);
}
//enable datepicker
function pickDate(cellvalue, options, cell) {
    setTimeout(function () {
        $(cell).find('input[type=text]')
                .datepicker({ format: 'yyyy-mm-dd', autoclose: true });
    }, 0);
}


function showNavButtons(grid_selector, pager_selector)
{
    $(grid_selector).jqGrid('navGrid', pager_selector,
        { 	//navbar options
            edit: true,
            editicon: 'icon-pencil blue',
            add: true,
            addicon: 'icon-plus-sign purple',
            del: true,
            delicon: 'icon-trash red',
            search: true,
            searchicon: 'icon-search orange',
            refresh: true,
            refreshicon: 'icon-refresh green',
            view: true,
            viewicon: 'icon-zoom-in grey',
        },
        {
            //edit record form
            //closeAfterEdit: true,
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            }
        },
        {
            //new record form
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            }
        },
        {
            //delete record form
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                if (form.data('styled')) return false;

                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_delete_form(form);

                form.data('styled', true);
            },
            onClick: function (e) {
                alert(1);
            }
        },
        {
            //search form
            recreateForm: true,
            afterShowSearch: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                style_search_form(form);
            },
            afterRedraw: function () {
                style_search_filters($(this));
            }
            ,
            multipleSearch: true,
            /**
            multipleGroup:true,
            showQuery: true
            */
        },
        {
            //view record form
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            }
        }
    )
}

function style_edit_form(form) {
    //enable datepicker on "sdate" field and switches for "stock" field
    form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
        .end().find('input[name=stock]')
              .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

    //update buttons classes
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
    buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>')

    buttons = form.next().find('.navButton a');
    buttons.find('.ui-icon').remove();
    buttons.eq(0).append('<i class="icon-chevron-left"></i>');
    buttons.eq(1).append('<i class="icon-chevron-right"></i>');
}

function style_delete_form(form) {
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
    buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>')
}

function style_search_filters(form) {
    form.find('.delete-rule').val('X');
    form.find('.add-rule').addClass('btn btn-xs btn-primary');
    form.find('.add-group').addClass('btn btn-xs btn-success');
    form.find('.delete-group').addClass('btn btn-xs btn-danger');
}
function style_search_form(form) {
    var dialog = form.closest('.ui-jqdialog');
    var buttons = dialog.find('.EditTable')
    buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
    buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
    buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-primary').find('.ui-icon').attr('class', 'icon-search');
}

function beforeDeleteCallback(e) {
    var form = $(e[0]);
    if (form.data('styled')) return false;

    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
    style_delete_form(form);

    form.data('styled', true);
}

function beforeEditCallback(e) {
    var form = $(e[0]);
    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
    style_edit_form(form);
}



//it causes some flicker when reloading or navigating grid
//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
//or go back to default browser checkbox styles for the grid
function styleCheckbox(table) {
    
        $(table).find('input:checkbox').addClass('ace')
        .wrap('<label />')
        .after('<span class="lbl align-top" />')


        $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
        .find('input.cbox[type=checkbox]').addClass('ace')
        .wrap('<label />').after('<span class="lbl align-top" />');
    
}

function StyleRadio()
{

}

function _renderAutocompleteSupplierWithRate(ul, item) {
    
    var cssClass = "";

    switch (item.RateId) {
        case 1:
            cssClass = "supplier-rate-a-plus"
            break;
        case 2:
            cssClass = "supplier-rate-a"
            break;
        case 3:
            cssClass = "supplier-rate-b-plus"
            break;
        case 4:
            cssClass = "supplier-rate-b"
            break;
        case 5:
            cssClass = "supplier-rate-c-plus"
            break;
        case 6:
            cssClass = "supplier-rate-c"
            break;
        case 7:
            cssClass = "supplier-rate-d-plus"
            break;
        case 8:
            cssClass = "supplier-rate-d"
            break;
        case 9:
            cssClass = "supplier-rate-e-plus"
            break;
        case 10:
            cssClass = "supplier-rate-e"
            break;
        default:
            cssClass = "grey"
            break;
    }


    var ret = $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a>" + item.label + "</a>")
        .appendTo(ul);

    ul.children().last().prepend("<div class='pull-left'>" + item.Rate +
                    "<a href='#' class='" + cssClass + "'>" +
                        " <i class='icon-star bigger-130'></i>" +
                    "</a>" +
             "</div>");

    return ret;
}


//unlike navButtons icons, action icons in rows seem to be hard-coded
//you can change them like this in here if you want
function updateActionIcons(table) {
    /**
    var replacement = 
    {
        'ui-icon-pencil' : 'icon-pencil blue',
        'ui-icon-trash' : 'icon-trash red',
        'ui-icon-disk' : 'icon-ok green',
        'ui-icon-cancel' : 'icon-remove red'
    };
    $(table).find('.ui-pg-div span.ui-icon').each(function(){
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
    })
    */
}

//replace icons with FontAwesome icons like above
function updatePagerIcons(table) {
    var replacement =
    {
        'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
        'ui-icon-seek-prev': 'icon-angle-left bigger-140',
        'ui-icon-seek-next': 'icon-angle-right bigger-140',
        'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

        if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
    })


    for (var i = 0 ; i < $(".ui-jqgrid-bdiv").length ; i++) {
        widthgrid = $($(".ui-jqgrid-bdiv")[i]).width();
        $($(".ui-jqgrid-bdiv")[i]).css("width", widthgrid + 1);
    }
    for (var i = 0 ; i < $(".ui-jqgrid-hdiv").length ; i++) {
        widthgrid = $($(".ui-jqgrid-hdiv")[i]).width();
        $($(".ui-jqgrid-hdiv")[i]).css("width", widthgrid + 1);
    }

    for (var i = 0 ; i < $(".ui-jqgrid-pager").length ; i++) {
        widthgrid = $($(".ui-jqgrid-pager")[i]).width();
        $($(".ui-jqgrid-pager")[i]).css("width", widthgrid + 1);
    }
}

function enableTooltips(table) {
    $('.navtable .ui-pg-button').tooltip({ container: 'body' });
    $(table).find('.ui-pg-div').tooltip({ container: 'body' });
}


function ValidEmptyFileds(arrayControls, arrayMessages, arrayTypeControl) {
    var a = true;

    $.each(arrayControls, function (key, value) {

        if (arrayTypeControl[key] == 'text') {
            if ($("#" + arrayControls[key]).val() == '') {
                toast(LanguageMainMenu[Culture].Warning, arrayMessages[key], "orange", 3000, LIGHT, RIGHT);
                $("#" + arrayControls[key]).focus();
                a = false;
                return false;
            }
        }
        if (arrayTypeControl[key] == 'select') {
            if ($("#" + arrayControls[key]).val() == '-1') {
                toast(LanguageMainMenu[Culture].Warning, arrayMessages[key], "orange", 3000, LIGHT, RIGHT);
                $("#" + arrayControls[key]).focus();
                a = false;
                return false;
            }
        }
        if (arrayTypeControl[key] == 'hidden') {
            if ($("#" + arrayControls[key]).val() == '-1') {
                toast(LanguageMainMenu[Culture].Warning, arrayMessages[key], "orange", 3000, LIGHT, RIGHT);
                a = false;
                return false;
            }
        }
    });
    return a;
};

function ValidEmptyFiledsObject(arrayControls) {
    var a = true;
    $.each(arrayControls, function (key, value) {

        if (value.tipo == 'text') {
            if ($("#" + value.control).val() == '') {
                toast(LanguageMainMenu[Culture].Warning, value.mensaje, "orange", 3000, LIGHT, RIGHT);
                $("#" + value.control).focus();
                a = false;
                return false;
            }
        }
        if (value.tipo == 'select-one') {
            if ($("#" + value.control).val() == '-1') {
                toast(LanguageMainMenu[Culture].Warning, value.mensaje, "orange", 3000, LIGHT, RIGHT);
                $("#" + value.control).focus();
                a = false;
                return false;
            }
        }
    });
    return a;
};

function ClearScrens(arrayControls, arrayTypeControl) {
    $.each(arrayControls, function (key, value) {

        if (arrayTypeControl[key] == 'text') {
            $("#" + arrayControls[key]).val('');
        }
        if (arrayTypeControl[key] == 'select') {
            $("#" + arrayControls[key]).val('-1');
        }

        if (arrayTypeControl[key] == 'checkbox') {
            $("#" + arrayControls[key]).prop("checked", true);
        }

        if (arrayTypeControl[key] == 'hidden') {
            $("#" + arrayControls[key]).val(EMPTY_GUID);
        }
        if (arrayTypeControl[key] == 'grid') {
            jQuery("#" + arrayControls[key]).jqGrid('clearGridData');
        }
        if (arrayTypeControl[key] == 'divsShow') {
            $("#" + arrayControls[key]).hide();
        }
    });
};

function InitializeComponentsUtilities(arrayControls, arrayTypeControl) {
    $.each(arrayControls, function (key, value) {
        if (arrayTypeControl[key] == 'checkbox') {
            $("#" + arrayControls[key]).prop("checked", true);
        }
        if (arrayTypeControl[key] == 'hidden') {
            $("#" + arrayControls[key]).val(EMPTY_GUID);
        }
        if (arrayTypeControl[key] == 'buttons') {
            $("#" + arrayControls[key]).css('cursor', 'pointer');
        }
        if (arrayTypeControl[key] == 'divs') {
            $("#" + arrayControls[key]).hide();
        }
        if (arrayTypeControl[key] == 'divsShow') {
            $("#" + arrayControls[key]).show();
        }
        if (arrayTypeControl[key] == 'texts') {
            $("#" + arrayControls[key]).prop('disabled', true);
        }
    });
};

function InitializeComponentsObjets(arrayControls) {
    $.each(arrayControls, function (key, value) {
        if (value.type == 'hidden') {
            $("#" + value.control).val(EMPTY_GUID);
        }
        if (value.type == 'checkbox') {
            $("#" + value.control).prop("checked", true);
        }
    });
};

function LoadLabelsUtilities(arrayControls, arrayTypeControl) {
    $.each(arrayControls, function (key, value) {
        $("#" + arrayControls[key]).text(arrayTypeControl[key]);
    });
};

function LoadLabelsUtilitiesObject(ALBS) {
    $.each(ALBS, function (key, value) {
        $("#" + value.control).text(value.mensaje);
    });
};

function validinteger(control,message) {
    var asp = true, regex = parseInt($("#" + control).val());
    if (isNaN(regex)) {
        toast(LanguageMainMenu[Culture].Warning, message, "orange", 3000, LIGHT, RIGHT);
        $("#" + control).val(''); $("#" + control).focus();
        asp = false;
    }
    return asp;
}

function ReplaceApostrophe(control) {
    var reemplazar = $("#" + control).val();
    var regx = "/[\']/g";
    var regx2 = "/[\/]/g";
    var regx3 = "/[\"]/g";
    var regx4 = "/[\,]/g";

    reemplazar = reemplazar.replace(eval(regx), '$');
    reemplazar = reemplazar.replace(eval(regx2), '~');
    reemplazar = reemplazar.replace(eval(regx3), '#');
    reemplazar = reemplazar.replace(eval(regx4), '@');

    for (var i = 0; i < reemplazar.length; i++) {
        reemplazar = reemplazar.replace("\\", "!");
    }
    return reemplazar;
}

function ValidCodeUtilities(control, controllers, methodss,message, param, valores) {
    var obj = {};
    if ($("#" + control).val() != '' && $("#" + control).val() != '0') {
        obj = getByCodeUtilities(controllers, methodss, $("#" + control).val(), param, valores);
    }
    else {
        toast(LanguageMainMenu[Culture].Warning, message, "orange", 3000, LIGHT, RIGHT);
        $("#" + control).focus();
    }
    return obj;
};

function getByCodeUtilities(controllers, methodss, codes, param, valores) {
    var returnobject = {};
    var ps = new Object();
    connection.invoke(controllers, methodss, { code: codes, GlobalProject: param, code2: valores }, function (response) {
        switch (response.shStatus) {
            case OK_:
                returnobject = response.data[0];
                break;
            case NO_FOUND_RECORDS_:
                toast(LanguageMainMenu[Culture].Warning, LanguageMainMenu[Culture].NoRecords, "orange", 4000, LIGHT, RIGHT);
                ps.error = '-1'
                returnobject = ps;
                break;
            default:
                toast(LanguageMainMenu[Culture].ErrorTitle, response.sDescription, "red", 20000, DARK, RIGHT);
                ps.error = '-1'
                returnobject = ps;
                break;
        }
    }, false);
    return returnobject;
};

function creacionGridHelpersUtilities(divs, pager, grid_data, columnas, modelo) {
    if (grid_data.length > 0) {
        jQuery(function ($) {
            var grid_selector = "#" + divs;
            var pager_selector = "#" + pager;

            if ($(grid_selector)[0].grid) {
                jQuery(grid_selector).jqGrid('clearGridData');
                jQuery(grid_selector).setGridParam({ 'data': grid_data }).trigger("reloadGrid");
            }
            else {
                jQuery(grid_selector).jqGrid({
                    data: grid_data,
                    loadonce: true,
                    datatype: "local",
                    height: 'auto',
                    colNames: columnas,
                    shrinkToFit: true,
                    colModel: modelo,
                    viewrecords: false,
                    rowNum: 10,
                    rowList: [5, 10, 20, 30],
                    altRows: true,
                    multiboxonly: true,
                    pager: pager_selector,
                    loadComplete: function () {
                        var table = this;
                    },
                    onSelectRow: function (rowid) {
                        $(this).closest('.ui-dialog-content').dialog('close');
                    },
                    autowidth: true,
                    autoheight: true
                });
                updatePagerIcons();
            }
        });

    }
};

function ViewerReportsGrid(divs, pager, grid_data, columnas, modelo) {
    if (grid_data.length > 0) {
        jQuery(function ($) {
            var grid_selector = "#" + divs;
            var pager_selector = "#" + pager;

            if ($(grid_selector)[0].grid) {
                jQuery(grid_selector).jqGrid('clearGridData');
                jQuery(grid_selector).setGridParam({ 'data': grid_data }).trigger("reloadGrid");
            }
            else {
                jQuery(grid_selector).jqGrid({
                    data: grid_data,
                    loadonce: true,
                    datatype: "local",
                    height: 'auto',
                    colNames: columnas,
                    shrinkToFit: true,
                    colModel: modelo,
                    viewrecords: false,
                    rowNum: 10,
                    rowList: [5, 10, 20, 30],
                    altRows: true,
                    multiboxonly: true,
                    pager: pager_selector,
                    loadComplete: function () {
                        var table = this;
                    },
                    onSelectRow: function (rowid) {
                        
                    },
                    autowidth: true,
                    autoheight: true
                });
                updatePagerIcons();
            }
        });

    }
};

function fileDownload(sUrl)
{
    $.fileDownload(sUrl, {
        successCallback: function (url) {
            WarningToast("File Downloaded Successfully")
        },
        failCallback: function (html, url) {

            WarningToast("Fail downloading file")
        }
    });
}

function RefreshSession(){
    connection.invoke("MainMenu", "RefreshSession", {}, null,true,null,null,null,false);
}

function WarningToast(sMessage) {
    toast(Language_General[Culture].Notification, sMessage, "orange", 4000, LIGHT, RIGHT);
}

function SuccessToast(sMessage) {
    toast(Language_General[Culture].Notification, sMessage, "green", 4000, LIGHT, RIGHT);
}

function DangerToast(sMessage) {
    toast(Language_General[Culture].Notification, sMessage, "red", 4000, LIGHT, RIGHT);
}
/**
* @author [rey]
* @date        [02/15/2016]
* @description $loadLabels  Load text on all elements label
* @param       {Object}     language     Object of description to set text, Default: LANGUAGE[Culture]
* @return      void*/
function $loadLabels(language){
    language=language || LANGUAGE[Culture];
    var labels=$("label,button>span,legend, h1,span").not("label[id=''],button>span[id=''],legend[id=''], h1[id=''], span[id='']");

    for(var i=0, len=labels.length;i<len;i++){
        if(language[$(labels[i]).prop("id")])
            $(labels[i]).html(language[$(labels[i]).prop("id")]);
    }
};
/**
* @author [rey]
* @date        [02/15/2016]
* @description $loadPlaceholders  Load placeholder in input field
* @param       {Object}     language     Object of description to set text, Default: LANGUAGE[Culture]
* @return      void*/
function $loadPlaceholders(language){
    language=language || LANGUAGE[Culture];
    var inputs=$("input,textarea,select").not("input[id=''],textarea[id=''],select[id='']");

    for(var i=0, len=inputs.length;i<len;i++){
        if(language["ph_"+$(inputs[i]).prop("id")]){
            switch(inputs[i].nodeName){
                case "SELECT":
                    var option=$("<option/>").attr("value","-1").html(language["ph_"+$(inputs[i]).prop("id")]);
                    $(inputs[i]).html(option);
                break;
                default:
                    $(inputs[i]).attr("placeholder",language["ph_"+$(inputs[i]).prop("id")]);
                break;
                
            }
        }
    }
};
 
function $ruleFunctionsByProfile(unFunctionalityId, response){
  
        $("#page-content").html(response);
        //moveScrollTop();
        unblockUI();
        return;
    
    // connection.invoke("ProfileFunctionalitiesActions","getConfigurationFuncActions_byProfile",{unFunctionalityId: unFunctionalityId},function(res){
    //     if(res.shStatus==OK_ || res.shStatus==NO_FOUND_RECORDS_){            
    //         var buttons="";
    //         var elements="";
    //         var hasDualList=false;
    //         var dualLists="";

    //         if(res.data!=null){
    //             for(var i in res.data){
    //                 var element=$(response).find("#"+res.data[i].nvControlId).get(0);
    //                 if(element && (element.nodeName=="BUTTON" || element.nodeName=="ACCO-BUTTON"))
    //                     buttons+="#"+res.data[i].nvControlId+",";
    //                     // $("#"+res.data[i].nvControlId).remove();
    //                 else{
    //                     if(element && element.nodeName=="SELECT" && $(response).find("#"+res.data[i].nvControlId).attr("multiple")){
    //                         elements+="#bootstrap-duallistbox-nonselected-list_"+res.data[i].nvControlId+",#bootstrap-duallistbox-selected-list_"+res.data[i].nvControlId+",";
    //                         buttons+=".moveall,.move,.removeall,.remove,";
    //                         hasDualList=true;
    //                     }

    //                     elements+="#"+res.data[i].nvControlId+",";
    //                 }
    //                     // $("#"+res.data[i].nvControlId).prop("disabled",true);
    //             }
                
    //             buttons = buttons.replace(/,$/,"");
    //             elements = elements.replace(/,$/,"");
    //         }


    //         $(response).find("button,acco-button").not(buttons).remove();
    //         /*if(hasDualList)
    //             dualLists=$(response).find(".bootstrap-duallistbox-container").find("input");*/
            
    //         //not(dualLists).not(elements+",.ui-jqgrid input,.ui-jqgrid select,.ui-jqgrid button")
    //         $(response).find("input,select,textarea").not(elements).prop("disabled",true);
    //         $("#page-content").html(response);
    //         moveScrollTop();
    //         /*console.log(buttons);
    //         console.log(elements);*/
    //     }
    // });
}

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' &&
                (
                    d.type.toUpperCase() === 'TEXT' ||
                    d.type.toUpperCase() === 'URL' ||
                    d.type.toUpperCase() === 'TEL' ||
                    d.type.toUpperCase() === 'PASSWORD' ||
                    d.type.toUpperCase() === 'FILE' ||
                    d.type.toUpperCase() === 'SEARCH' ||
                    d.type.toUpperCase() === 'EMAIL' ||
                    d.type.toUpperCase() === 'NUMBER' ||
                    d.type.toUpperCase() === 'TIME' ||
                    d.type.toUpperCase() === 'DATE' ||
                    d.type.toUpperCase() === 'WEEK' ||
                    d.type.toUpperCase() === 'MONTH' ||
                    d.type.toUpperCase() === 'DATETIME-LOCAL')
            ) ||
            d.tagName.toUpperCase() === 'TEXTAREA' ||
            (d.tagName.toUpperCase() === 'DIV' && $(d).attr("contenteditable") !== undefined)) {
            doPrevent = d.readOnly || d.disabled;
        } else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});