var css = "background: red; color: yellow; font-size: x-large;font-weight: bold;";
// if not is on localhost, show the message
if(!/^.*localhost.*$/.test(window.location.href))
    //%c indicates the beginning of the string to apply style
    console.log('%cStop, this is only for developer. If you are not developer closes immediately.', css);

var language = "es-ES"; 

var last_connection_params = {};

/** @type {Object} [Object Singleton for access to functions of Service] */
window.connection = {
    invoke: getConection,
    invokeUrl: getConectionUrl,
    loadPage: getPage,
    getUrlParams: getUrlParams,
    urlParams: {},
    getSession: getSession,
    uploadFile: $uploadFile,
    uploadCustomFile : $uploadCustomFile,
    fillCombo: $fillCombo
};

/**
 * @author [Rey David Dominguez]
 * @date [06-Sept-2015]
 * @description [Call method on the controller via ajax]
 * @param  {string}   controller    [Controller's name ]
 * @param  {string}   method        [Method's name for call]
 * @param  {json}     arguments     [Arguments of the method]
 * @param  {function} fncSuccess    [Function to execute when server response.]
 * @param  {boolean}  async         [Flag to indicate if is asynchronous or not]
 * @param  {string}   dataType      [Datatype of response]
 * @param  {function} fncError      [Function to execute when server don't response.]
 */
function getConection(controller, method, arguments, fncSuccess, async, dataType, fncError, waitMsg,showWaitScreen) {
    //init arguments
    async = async == undefined ? true : async;
    showWaitScreen = showWaitScreen == undefined ? true : showWaitScreen;
	arguments = arguments || {};
	dataType = dataType || 'json';

    last_connection_params = {
        _isUploadFile : false,
        _controller : controller,  
        _method : method,
        _arguments : arguments,  
        _fncSuccess : fncSuccess,  
        _async : async,  
        _dataType : dataType,  
        _fncError : fncError,  
        _waitMsg : waitMsg,
        _showWaitScreen : showWaitScreen
    };

	if(showWaitScreen)
		blockUI(waitMsg);

	args = JSON.stringify(arguments);
	$.ajax({
        type: "POST",
        url: '../' + controller + '/' + method,
        async: async,
        data: args,
        contentType: "application/json; charset=utf-8",
        dataType: dataType,
        success: function(response) {
            var language = Language_General[Culture]; 
            switch (response.shStatus) {
                case OK_:                   
                case NO_FOUND_RECORDS_:
                    if ($.isFunction(fncSuccess))
                        fncSuccess(response);
                    break;
                case SESSION_EXPIRED_:
                    //toast(language.Error, language.SESSION_EXPIRED_, "red", 10000, LIGHT, RIGHT);
                    ShowMessageSessionExpired();
                    break;
                case ERR_:
                    toast("Error", response.sDescription, "red", 10000, LIGHT, RIGHT);
                    break;
                case PROJECT_NO_SETTED_:
                    toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                    break;
                default:
                    toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                break;
            }

            unblockUI();
        },
        error: function(xhr, status, err) {
            if (err == 'Not Found') {
                LoadPageNoFound();
            }
            unblockUI();
            if($.isFunction(fncError))
            	fncError(xhr, status, err);
        }
    });
};

/**
 * @author [Rey David Dominguez]
 * @date [07-Sept-2015]
 * @description [Load specific HTML View]
 * @param  {string} url [Url of the HTML]
 */
function getPage(url,params,conteiner){
    conteiner = conteiner || "#page-content"
    $.ajax({
        type: "POST",
        url: url,
        async: true,//Important
        dataType: "html",
        success: function (response) {
            var language = Language_General[Culture];
            unblockUI(); 
            if(IsJsonString(response)){
                response = $.parseJSON(response);
            }
            else{
                connection.urlParams=params || {};
               $(conteiner).hide(500,function(){                
                    $(conteiner).html(response);
                    $(conteiner).show(600);
                });
                return;
            }
            switch (response.shStatus){
                case SESSION_EXPIRED_:
                    ShowMessageSessionExpired();
                    break;
                case ERR_:
                    toast(language.Error, response.sDescription, "red", 10000, LIGHT, RIGHT);
                    break;
                case PROJECT_NO_SETTED_:
                    toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                    break;
                default:
                    toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                break;
            }                      
        },
        beforeSend: function () {
            blockUI(LanguageMainMenu[Culture].LoadingPage);
        },
        error: function (xhr, status, err) {
            unblockUI();
            if (err == 'Not Found') {
                LoadPageNoFound();
            }
        }
    });
}

/**
 * @author [Rey David Dominguez]
 * @date [07-Sept-2015]
 * @description [Extract params from specific URL]
 * @param  {string} url [Url from which they are extracted]
 */
function getUrlParams(url) {
    var search = url.split("?");
    search=search.length>1?search[1]:"";
    var json=search!=""?$.parseJSON('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'):{};
    for(var key in json)
        json[key] = $.parseJSON(json[key]);

    return json;
};

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**@author [Rey David Dominguez]
 * @date [20-Sept-2015]
 * @description [Call method on the controller via ajax]
 * @return {Object} [Session object]
 */
function getSession() {
    var retorno = {};

    $.ajax({
        type: "POST",
        url: '../Session/getSession',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            var language = Language_General[Culture]; 
            switch (response.shStatus) {
                case OK_:
                    retorno = response.data;
                    break;
                case SESSION_EXPIRED_:
                    ShowMessageSessionExpired();
                    break;
                case PROJECT_NO_SETTED_:
                    toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                    break;
                default:
                    toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                    break;
            }
        },
        error: function(xhr, status, err) {
            console.log("Error when try access to session.")
        }
    });

    return retorno;
};
/**
 * @author [rey]
 * @date        [10/19/2015]
 * @description [$uploadFile description]
 * @param       {string}     controller   [description]
 * @param       {string}     method       [description]
 * @param       {string}     input        [description]
 * @param       {Function}   fnc          [description]
 * @return      {string}                  [description]
 */
function $uploadFile(controller,method,input,fnc){

    last_connection_params = {
        _isUploadFile : true,
        _controller : controller,
        _method : method,
        _input : input,
        _fnc : fnc
    }

    var files = $(input).prop("files");
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }

            $.ajax({
                type: "POST",
                url: '../'+controller+'/'+method,
                contentType: false,
                processData: false,
                data: data,
                success: function (response) {
                    var language = Language_General[Culture]; 
                    if($.isFunction(fnc))
                        fnc(response);
                    switch (response.shStatus) {                        
                        case OK_:
                            break;
                        case SESSION_EXPIRED_:
                            ShowMessageSessionExpired();
                            break;
                        case ERR_:
                            toast(language.Error, response.sDescription, "red", 10000, LIGHT, RIGHT);
                            break;
                        case PROJECT_NO_SETTED_:
                            toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                            break;
                        default:
                            toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                        break;
                    }
                },
                error: function (xhr, status, p3, p4) {
                    var err = "Error " + " " + status + " " + p3 + " " + p4;
                    if (xhr.responseText && xhr.responseText[0] == "{")
                        err = JSON.parse(xhr.responseText).Message;
                }
            });
        } else {
            alert("This browser doesn't support HTML5 file uploads!");
        }
    }
}

/**
 * @author [carlos]
 * @date        [10/26/2016]
 * @description [$uploadCustomFile description]
 * @param       {string}     controller   [description]
 * @param       {string}     method       [description]
 * @param       {object}     formData     [description]
 * @param       {Function}   fnc          [description]
 * @return      {string}                  [description]
 */
function $uploadCustomFile(controller,method,formData,fnc)
{
    last_connection_params = {
        _isCustomUploadFile : true,
        _controller : controller,
        _method : method,
        _formData : formData,
        _fnc : fnc
    }

    if (window.FormData !== undefined) {

        $.ajax({
            type: "POST",
            url: '../'+controller+'/'+method,
            contentType: false,
            processData: false,
            data: formData,
            async: true,
            beforeSend : function(){
                blockUI();
            },
            success: function (response) {
                unblockUI();
                var language = Language_General[Culture]; 
                if($.isFunction(fnc))
                    fnc(response);
                switch (response.shStatus) {                        
                    case OK_:
                        break;
                    case SESSION_EXPIRED_:
                        ShowMessageSessionExpired();
                        break;
                    case ERR_:
                        toast(language.Error, response.sDescription, "red", 10000, LIGHT, RIGHT);
                        break;
                    case PROJECT_NO_SETTED_:
                        toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                        break;
                    default:
                        toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                    break;
                }
            },
            error: function (xhr, status, p3, p4) {
                unblockUI();
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
            }
        });
    } else {
        alert("This browser doesn't support HTML5 file uploads!");
    }
    
}
/**
 * @author [rey]
 * @date        [10/22/2015]
 * @description [Create options for especified combobox]
 * @param       {string}     controller    [Controller where is the method]
 * @param       {string}     method        [Method to get values]
 * @param       {string}     idSelect      [Id of DOM element]
 * @param       {string}     value         [Element to assign in attribute "value"]
 * @param       {string}     display       [Element to assign display in the option]
 * @param       {string}     defValue      [Value for the first option]
 * @param       {string}     defDisplay    [Display for the first option]
 * @param       {string}     arguments     [Arguments required in the method for filtering data]
 * @param       {boolean}    includeEntity [Adds attribute to option with all data of the row]
 * @return      {void}     */
function $fillCombo(controller,method,idSelect,value,display,defValue,defDisplay,arguments,includeEntity){
    getConection(controller,method,arguments,function(response){
        defValue= defValue || EMPTY_GUID;
        defDisplay= defDisplay || Language_General[Culture].SELECT;

        var entity=includeEntity?'entity=\'{}\'':'';

        var sHtml = "<option value = '"+defValue+"' "+entity+" selected>" + defDisplay + "</option>";
        for(var i in response.data){
                entity=includeEntity?' entity=\''+JSON.stringify(response.data[i])+'\'':'';

            sHtml += '<option value =\"' + response.data[i][value]+'\"' + entity +'>' + response.data[i][display]  + "</option>";
        }
        $('#' + idSelect).html(sHtml);
    });
}
/**
 * @author [Rey David Dominguez]
 * @date [06-Sept-2015]
 * @description [Call method on the controller via ajax]
 * @param  {string}   controller    [URL to method ]
 * @param  {json}     arguments     [Arguments of the method]
 * @param  {function} fncSuccess    [Function to execute when server response.]
 * @param  {boolean}  async         [Flag to indicate if is asynchronous or not]
 * @param  {string}   dataType      [Datatype of response]
 * @param  {function} fncError      [Function to execute when server don't response.]
 */
function getConectionUrl(url, arguments, fncSuccess, _async, dataType, fncError, waitMsg,showWaitScreen) {
    //init arguments
    _async = _async == undefined ? true : _async;
    showWaitScreen = showWaitScreen == undefined ? true : showWaitScreen;
    arguments = arguments || {};
    dataType = dataType || 'json';
    if(showWaitScreen)
        blockUI(waitMsg);

    args = JSON.stringify(arguments);
    $.ajax({
        type: "POST",
        url: url,
        async: _async,
        data: args,
        contentType: "application/json; charset=utf-8",
        dataType: dataType,
        success: function(response) {
            var language = Language_General[Culture]; 
            switch (response.shStatus) {
                case OK_:                   
                case NO_FOUND_RECORDS_:
                    if ($.isFunction(fncSuccess))
                        fncSuccess(response);
                    break;
                case SESSION_EXPIRED_:
                    //toast(language.Error, language.SESSION_EXPIRED_, "red", 10000, LIGHT, RIGHT);
                    ShowMessageSessionExpired();
                    break;
                case ERR_:
                    toast(language.Error, response.sDescription, "red", 10000, LIGHT, RIGHT);
                    break;
                case PROJECT_NO_SETTED_:
                    toast(language.Error, language.PROJECT_NO_SETTED_, "red", 10000, LIGHT, RIGHT);
                    break;
                default:
                    toast(language.Error, language.teamSystem, "red", 10000, LIGHT, RIGHT);
                break;
            }
            if(showWaitScreen)
                unblockUI();
        },
        error: function(xhr, status, err) {
            if (err == 'Not Found') {
                LoadPageNoFound();
            }
            unblockUI();
            if($.isFunction(fncError))
                fncError(xhr, status, err);
        }
    });
};