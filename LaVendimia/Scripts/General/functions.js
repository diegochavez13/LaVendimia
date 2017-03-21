////////////////////////////////////////////
//    /            DIALOG                 //
////////////////////////////////////////////
window._dialog={
    open: function(id,title, pwidth, pheight, buttons,fnc_onClose){
        pwidth=pwidth || "auto";
        pheight = pheight || "auto";
        buttons = buttons || [];

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            pwidth="99%";
        }

        var dialog = $("#" + id).removeClass('hide').dialog({
            modal: true,
            resizable: false,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> " + title + "</h4></div>",
            title_html: true,
            width: pwidth,
            height: pheight,
            show: { duration: 400 },
            buttons : buttons,
            position: { my: "center", at: "center", of: window },//Posicionar el dialog en el centro
            close: function( event, ui ) {
                $("#" + id).dialog("destroy").addClass('hide');
                if($.isFunction(fnc_onClose))
                    fnc_onClose();
            }
        });
        $('#'  +id).css('overflow', 'hidden');

        $(".ui-icon-closethick").remove();
        $(".ui-button-text").remove();
    },
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @param  {Element or String} element [Id or Element corresponding to dialog container]
     * @return {void}         */
	close: function(element){
        if($.type(element)==="string" && !element.match(/^#/) && !element.match(/^\./))
            $("#"+element).dialog('destroy').addClass('hide');
        else
        	$(element).dialog('destroy').addClass('hide');
	},
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @param  {string} element [Element corresponding to dialog container]
     * @return {boolean}         */
	isOpen: function(element){
        if($.type(element)==="string" && !element.match(/^#/) && !element.match(/^\./))
            return $("#"+element).hasClass('ui-dialog-content') && $("#"+element).dialog("isOpen");
        else
		  return $(element).hasClass('ui-dialog-content') && $(element).dialog("isOpen");
	},
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @param  {string} msj [Confirmation message to show]
     * @param {function} fncTrue [Launch on click ok]
     * @param {function} fncFalse [Launch on click cancel]
     * @return {void}         */
    confirm: function(msj,fncTrue, fncFalse){
        bootbox.confirm(msj, function(result) {
        if(result) {
            if($.isFunction(fncTrue))
                fncTrue();
        }
        else
        {
            if($.isFunction(fncFalse))
                fncFalse();
        }
    });
    }	
};
////////////////////////////////////////////
//               JQGRID                   //
////////////////////////////////////////////
window._jqGrid = {
	create: $createGrid,
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @description [Get data of row]
     * @param  {string} idTable [Table id, css selector]
     * @param  {string} idRow   [Index row]
     * @return {Object}         */
    getRowData: function(idTable, idRow) {
        return $("#" + idTable).jqGrid('getRowData', idRow);
	},
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @description [Clear data of grid]
     * @param  {string} idTable [Table id, css selector]
     * @return {void}         */
    clearGridData: function(idTable) {
        $("#" + idTable).jqGrid('clearGridData');
	},
	addRowData: $addRowData,
    /**@Author [Rey David Dominguez]
     * @date [09/15/2015]
     * @description [Get list of rows ids]
     * @param  {string} idTable [Table id, css selector]
     * @return {array}         */
    getDataIDs: function(idTable) {
        return $("#" + idTable).jqGrid("getDataIDs");
	},
    /**@Author [Rey David Dominguez]
     * @date [09/21/2015]
     * @description [Get all data grid]
     * @param  {string} idTable [Table id, css selector]
     * @return {array}         */
    getGridData: function(idTable) {
        var ids = $("#" + idTable).jqGrid("getDataIDs");
        var data = [];
        for (var i in ids)
            data.push($("#" + idTable).jqGrid('getRowData', ids[i]));

        return data;
    },
    /**@Author [Rey David Dominguez]
     * @date [10/12/2015]
     * @description [Get record count in the grid]
     * @param  {string} idTable [Table id, css selector]
     * @return {array}         */
    count: function(idTable) {
        return $("#" + idTable).getGridParam("reccount");
    },
    /**
     * @author [rey]
     * @date        [10/22/2015]
     * @description [Unload grid]
     * @param       {string} idTable [Table id, css selector]
     * @return      {void} */
    unload: function(idTable) {
        $.jgrid.gridUnload(idTable);
    },
    /**
     * @author [rey]
     * @date        [11/09/2015]
     * @description [Hide specific row of the grid]
     * @param       {string}     idTable      [Table id, css selector]
     * @param       {string}     idRow        [Row id, css selector]
     * @param       {bool}       status       [Status to hide or show row]
     * @return      {void}      */
    hideRow: function(idTable, idRow, status) {
        $("#" + idTable).find("tr#" + idRow).css("display", status == true ? 'none' : '');
    },
    /**
     * @author [rey]
     * @date        [11/09/2015]
     * @description [Get value of cell]
     * @param       {string}     idTable    [Table id, css selector]
     * @param       {string}     idRow      [Row id, css selector]
     * @param       {string}     idCol      [Name of column]
     * @return      {any}      */
    getCell: function(idTable, idRow, idCol) {
        return $('#' + idTable).jqGrid('getCell', idRow, idCol);
    },
    /**
     * @author [rey]
     * @date        [03/07/2016]
     * @description [Apply filter options to grid]
     * @param       {String}     idTable      [Table id, css selector]
     * @param       {Object}     fOptions     [Object with filters options
        Sample object: {
                groupOp: "OR|AND",
                rules: []
            };                                    
        [1]: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:toolbar_searching,
        [2]: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:singe_searching
        [3]: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:advanced_searching#options
    ]
     * @param       {String}     idPager      [description]
     * @return      {void}*/
    applyFilter: function(idTable, fOptions, idPager) {
        var grid = $('#' + idTable);
        var rowNum = idPager ? $("#" + idPager).find('[role="listbox"]').val() : 10;
        grid[0].p.search = fOptions.rules.length > 0;
        grid.jqGrid('setGridParam', {
            rowNum: rowNum,
             page: 1
        });
        if (grid[0].p.search)
            $.extend(grid[0].p.postData, {
                filters: JSON.stringify(fOptions)
            });
        else {
            delete grid[0].p.postData.filters;
    }

        grid.trigger("reloadGrid");
    },
    setPage: function(idTable, page){
        page=page || 1;
        $("#"+idTable).trigger("reloadGrid", [{ page: page }]);
}
}
//******************** jqGrid's functions ********************//
/**
 * @author [Rey David Dominguez]
 * @date [09/15/2015]
 * @description [createGrid description]
 * @param  {string}   idTable     [Table id, css selector]
 * @param  {string}   idPager     [Div id for pager]
 * @param  {string}   stTitle     [Header title of grid]
 * @param  {array}    data        [Data to fill grid]
 * @param  {array}    columns     [Definition of columns]
 * @param  {array}    model       [Model to set fields on grid fill]
 * @param  {Function} fncClick    [Function to launch on select a row]
 * @param  {Function} fncComplete [Function launch after grid are completed]
 * @param  {boolean}  viewrecords [Flag to indicate show or not show grid's footer]
 * @param  {Object}   pageConf    [Pager configuration, used when viewrecords = true]
 * @return {void}               */
function $createGrid(idTable ,idPager, stTitle, data, columns, model, fncClick,fncComplete,viewrecords, pageConf){
        var grid_selector = "#" + idTable;
        var pager_selector = idPager?"#" + idPager:'';
        viewrecords = viewrecords==undefined?true:viewrecords;
        pageConf = pageConf || {};
        pageConf.rowList = pageConf.rowList || [5, 10, 20, 30];
        pageConf.rowNum = pageConf.rowNum || 5;

        var grid = {
            loadonce: true,
            datatype: 'local',
            height: 'auto',
            width : 'auto',
            colNames: columns,
            colModel: model,
            viewrecords: viewrecords,
            rowNum: pageConf.rowNum,
            rowList: pageConf.rowList,
            pager: pager_selector,
            page: 1,
            altRows: true,
            multiselect: false,
            multiboxonly: true,
            editurl: 'clientArray',
            gridComplete: function () {
            	if ($.isFunction(fncComplete))
                	fncComplete();
            },
            onSelectRow :  function(rowid) {
                var row = $(this).jqGrid('getRowData', rowid);
                if ($.isFunction(fncClick))
                	fncClick(row, rowid);
            },                    
            caption: stTitle,
            autowidth: true,
            title: stTitle
        };

        

        jQuery(grid_selector).jqGrid(grid);
        
        if(data && $.isArray(data)){
            grid.data = data;
            jQuery(grid_selector).jqGrid('clearGridData');
            jQuery(grid_selector).setGridParam({ 'data': data }).trigger("reloadGrid");
        }

        $updatePagerIcons();    
}
/**
 * @author [Rey David Dominguez]
 * @date [09/15/2015]
 * @description  [Call this function after create jqGrid]
 * @return {void} */
function $updatePagerIcons() {
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
    });

    //fix scroll horizontal 
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
/**
 * @author [Rey David Dominguez]
 * @date [09/15/2015]
 * @description  [Add row to grid]
 * @param {string} idTable [Grid table]
 * @param {string} index   [Index row (unique)]
 * @param {Object or Array} dataRow [Object or Array Object to add to row]
 * @return {void} */
function $addRowData(idTable,index,dataRow){
	index= index || 1;
    $("#"+idTable).jqGrid('addRowData', index, dataRow);
    _jqGrid.setPage(idTable,1);
}

////////////////////////////////////////////
//              ALERTS                    //
////////////////////////////////////////////
window._alert={
    toast: toast,
    error: function(msg, inputField){
        if($(".gritter-error").length==0 || $(".gritter-error").find(".gritter-without-image").find("div").html()!=msg){
            toast(Language_General[Culture].Error, msg, "red", 4000, LIGHT, RIGHT);
            
            if(inputField)
                $(inputField).focus();
        }
    },
    warning: function(msg, inputField){       
        if($(".gritter-warning").length==0 || $(".gritter-warning").find(".gritter-without-image").find("div").html()!=msg){
            toast(Language_General[Culture].lbl_warning, msg, "orange", 2000, LIGHT, RIGHT);
            
            if(inputField)
                $(inputField).focus();
        } 
    },
    notification: function(msg, inputField){       
        if($(".gritter-warning").length==0 || $(".gritter-warning").find(".gritter-without-image").find("div").html()!=msg){
            toast(Language_General[Culture].Notification, msg, "orange", 2000, LIGHT, RIGHT);
            
            if(inputField)
                $(inputField).focus();
        } 
    },
    success: function(msg, inputField){
        if($(".gritter-success").length==0 || $(".gritter-success").find(".gritter-without-image").find("div").html()!=msg){
            toast(Language_General[Culture].lbl_success, msg, "green", 1000, LIGHT, RIGHT);
            
            if(inputField)
                $(inputField).focus();
        }
    }
}

//////////////////////////////////////////
//               FILTERS                //
//////////////////////////////////////////
window._filter={
    /**@author [Rey David Dominguez]
     * @description [Format code, asign N zeros to left]
     * @param  {Numeric} number        [Number to format]
     * @param  {Int} countZeroLeft [Number of zeros to add to left - @default=3]
     * @return {String}            */
    formatCode: function(number,countZeroLeft){
        if(isNaN(number) || number=="")
            return number;

        countZeroLeft = countZeroLeft || 3;
        if(number.toString().length>countZeroLeft)
            return number;

        var string="0000000000"+number;
        var start=string.length-countZeroLeft;

        return string.substring(start,string.length);
    },
    /**@author [Rey David Dominguez]
     * @description [Format number, can set currency sign or any sign (on the left or on the right)]
     * @param  {value} string        [Number to format]
     * @param  {int} fractionSize [Number of numbers to left of dot - @default=2]
     * @param  {string} sign [Currency sign or any sign - @default=""]
     * @param  {boolean} right [Flag that indicate if the sign position is on the left or the right - @default=false (left)]
     * @return {String}            */
    formatNumber: function(value,fractionSize,sign,right){
        if(isNaN(value) || value==="")
            return "";

        fractionSize = isNaN(fractionSize = Math.abs(fractionSize)) ? 2 : fractionSize;
        sign = sign==undefined?"":sign;
        
        var d = d == undefined ? "." : d, 
            t = t == undefined ? "," : t, 
            s = value < 0 ? "-" : "", 
            i = parseInt(value = Math.abs(+value || 0).toFixed(fractionSize)) + "", 
            j = (j = i.length) > 3 ? j % 3 : 0;

        //if right is true, set sign on the right
        if(right==true){
            sign = sign==""?"":" "+sign;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (fractionSize ? d + Math.abs(value - i).toFixed(fractionSize).slice(2) : "")+sign;
        }
        //else, default position is on the left
        else if(!right){
            sign = sign==""?"":sign+" ";
            return sign+s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (fractionSize ? d + Math.abs(value - i).toFixed(fractionSize).slice(2) : "");
        }
        
    },
    /**
     * @author [rey]
     * @date        [04/19/2016]
     * @description [Remove format from a number]
     * @param       {String}        value        [Formated number]
     * @return      {String}                     [Unformated number]*/
    unformatNumber: function(value){
        value= value || "";
        return value.replace(/[^0-9.*]/g,"");
    }
}
/**@author [Rey David Dominguez]
 * @description [Create a zero's string]
 * @param  {int} count [Number os zeros]
 * @return {string}       [0's string]*/
function getZeros(count){
    var format="";
    for(var i=1;i<=count;i++)
        format+="0";

    return format;
}

/**@author [carlos]
 * @description [get cursor index]
 * @param  {string}  [element id]
 * @return {int}       [index]*/
function doGetCaretPosition (target) {

      // Initialize
      var iCaretPos = 0;

      // IE Support
      if (document.selection) {

        // Set focus on the element
        target.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -target.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }

      // Firefox support
      else if (target.selectionStart || target.selectionStart == '0')
        iCaretPos = target.selectionStart;

      // Return results
      return iCaretPos;
    }

/**@author [carlos]
 * @description [set cursor index]
 * @param  {string}  [element id]
 * @param  {int}  [index]
 * @return {void} */
function setCaretPosition(elem, caretPos) {
        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
}

//////////////
//KeyEvents //
//////////////
const _keyEvents={
    noSpecialChar: function(e){
        var specialChars = [
            164,//¤
            165 //¥
        ];
        if (!(specialChars.indexOf(e.which) > -1 || (e.which >= 65 && e.which <= 90 || e.which >= 97 && e.which <= 122)) && e.which!=46 && !(e.which>=48 && e.which<=57)) {//46 is a dot
            e.preventDefault();
        }
    }, 
    /**@author [carlos]
     * @description [allow only money format used in accopro (18 integer, 6 decimals) (Only for keypress event)]
     * @return {void} */
    moneyFormat : function(event)
    {
            var key = event.which || event.keyCode;

            var indexCursor = doGetCaretPosition(this);

            if($.isNumeric(String.fromCharCode(key)))
            {
                var integerPart = "";

                var decimalPart = "";

                var currentvalue = $(this).val().substr(0, indexCursor) + String.fromCharCode(key) + $(this).val().substr(indexCursor);
                
                var sp =currentvalue.split(".");
                
                if(sp.length > 1){
                    integerPart = sp[0]; 
                    decimalPart = sp[1];
                }
                else{
                    integerPart = currentvalue;
                }
                
                if(!(integerPart.length > 18 || decimalPart.length > 2))
                    $(event.currentTarget).val(currentvalue.replace(/^([0-9]{1,18}\.?[0-9]{0,2}).*/g, "$1"));                     
                
                if(integerPart.length < 18 || (decimalPart.length > 0 && decimalPart.length < 2))
                    setCaretPosition(this, indexCursor + 1);
                else
                    setCaretPosition(this, indexCursor);

                event.preventDefault();
            }
    }
};

//////////////
//  Dates   //
//////////////
const _date={
    /**@author [Rey David Dominguez]
     * @description [Adds or subtracts a specified time interval from a dateAd]
     * @param {string} datepart [Is the part of date to which an integer number is added]
     * @param {int} number   [Is an expression that can be resolved to an int that is added to a datepart of date]
     * @param {Datetime} date     [Is an expression that can be resolved to a date]
     * @return {Datetime}*/
    add: function(datepart,number,date){
        number = number || 1;
        date = date || (new Date());
        var newD=date;

        switch(datepart.toUpperCase()){
            case "DAY":
                newD.setDate(date.getDate() + number);
                return newD;
            break;
            case "WEEK":
                newD.setDate(date.getDate() + (number*7));
                return newD;
            break;
            case "MONTH":
                newD.setMonth(date.getMonth() + number);
                return newD;
            break;
            case "YEAR":
                newD.setFullYear(date.getFullYear() + number);
                return newD;
            break;
            default:
                console.log("_date.add: Invalid datepart("+datepart+").");
                return -1;
            break;  
        }
    },
    /**@author [Rey David Dominguez]
     * @description [Get date corresponding to the first day of the month of the date]
     * @param {Datetime} date     [Is an expression that can be resolved to a date]
     * @return {Datetime}*/
    firstDayMonth: function(date){
        date = date || (new Date());
        var day = new Date(date.getFullYear(), date.getMonth(), 1);
        return day;
        //var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    /**@author [Rey David Dominguez]
     * @description [Get date corresponding to the last day of the month of the date]
     * @param {Datetime} date     [Is an expression that can be resolved to a date]
     * @return {Datetime}*/
    lastDayMonth: function(date){
        var date = date || (new Date());
        var day = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return day;
    },
    format: function(date,format){
        date= date || (new Date());
        format = format || 'MM/dd/yyyy';

        if((typeof date)=="string")
            date=new Date(date);
        
        return $.format.date(date, format);
    },
    diff: function(datePart , startDate , endDate){
        startDate= startDate || new Date();
        endDate= endDate || new Date();
        switch(datePart.toUpperCase()){
            case 'DAY':
                return parseInt((endDate.getTime()-startDate.getTime())/(24*3600*1000));
            break;
            case 'WEEK':
                return parseInt((endDate.getTime()-startDate.getTime())/(24*3600*1000*7));
            break;
            case 'MONTH':
                return (endDate.getMonth()+12*endDate.getFullYear())-(startDate.getMonth()+12*startDate.getFullYear());
            break;
            case 'YEAR':
                return endDate.getFullYear()-startDate.getFullYear();
            break;
            case 'MINUTE':
                var diffMs = (endDate - startDate);
                return Math.round(((diffMs % 86400000) % 3600000) / 60000);
            break;
            case 'SECOND':
                var dif = endDate.getTime() - startDate.getTime();
                return dif / 1000;
            break;
            default:
                console.log("_date.diff: Invalid option ("+datePart+").");
                return -1;
            break;
        }
    }
};

/////////////////////
// Form functions //
///////////////////
const _form={
    clearFields: function (not) {
        not = not != undefined ? "," + not : "";
        var inputs = $("input[type='text'], input[type='number']").not(".clearable" + not);
        for(var i=0;i<inputs.length;i++){
            $(inputs[i]).val("");
        }

        var hiddens = $("input[type='hidden']").not(".clearable" + not);
        for (var i = 0; i < hiddens.length; i++) {
            $(hiddens[i]).val(EMPTY_GUID);
        }

        var textarea = $("textarea").not(".clearable" + not);
        for (var i = 0; i < textarea.length; i++) {
            $(textarea[i]).val("");
        }

        var selects = $("select").not(".clearable" + not);
        for(var i=0;i<selects.length;i++){
            $($(selects[i]).find("option")[0]).prop("selected",true);
        }
    },
    notCopyFields: function () {
        $("input[type='text']").bind("cut copy paste drop", function (e) {
            e.preventDefault();
            return false;
        });

        $("textarea").bind("cut copy paste drop", function (e) {
            e.preventDefault();
            return false;
        });
    }
};

/////////////
//FACTORY  //
/////////////
const _fnc={
    /**
     * @author [rey]
     * @date        [10/20/2015]
     * @description [Create a interval]
     * @param       {Function}  fnc      Function execute on callback
     * @param       {Integer}   delay    Delay of interval
     * @param       {Integer}   count    Number times of execute
     * @return      {Number}    _timer_  A Number, representing the ID value of the timer that is set.*/
    interval: function(fnc,delay,count){
        delay=delay || 100;
        count=count!=undefined?count:1;
        var _flag_=1;
        var _timer_=setInterval(function(){
            if($.isFunction(fnc))
                fnc();
            else
                console.log("Interval: Callback no is a function");

            if(_flag_==count)
                clearInterval(_timer_);

            _flag_++;
        },delay);

        return _timer_;
    },
    clearInterval: function(timer){
        clearInterval(timer);
    }
}

String.prototype.removeCharSpecial=function(s){
    s=s || this;
    var translate = {
        "ä": "a", "ö": "o", "ü": "u","á":"a","é":"e","í":"i","ó":"o","ú":"u",
        "Ä": "A", "Ö": "O", "Ü": "U","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U",
        "!":"","@":"","#":"","$":"","%":"","^":"","&":"","*":"","(":"",")":"","-":"","-":"","+":""
    };

    var translate_re = /[öäüÖÄÜáéíóúÁÉÍÓÚ!@#$%^&*()-+]/g;

    return ( s.replace(translate_re, function(match) { 
        return translate[match];
    }) );

};

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

String.prototype.padRight = function (length, str) {
   str = str || ' ';
   return this.length >= length
       ? this
   : this + (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length));
};