/**
 * @author [rey]
 * @mod        [05/03/2016]
 * @description [Validate fields]
 * @param       {array}      fields       [Array of elements of the DOM to validate, Default: input[type="text"],input[type="password"],select,textarea in .main-content]
 * @return      {boolean}    [Status of validation] */
function validateForm(fields){
	fields=fields || $('.main-content').find('input[type="text"],input[type="password"],input[type="number"],input[type="hidden"],select,textarea');
	var language=Language_General[Culture];

	$addAliasToFields();

	for(var i=0;i<fields.length;i++){
		var required = $(fields[i]).attr("required") || false;
		var value = $(fields[i]).val();
		var alias = $(fields[i]).attr("alias") || language.alias;
		
		//var condition= evaluateCondition($(fields[i]).attr("condition") || '');

		//If "alias" is a variable, get his value
		if(isVar(alias))
			alias=eval(alias);

		switch($(fields[i])[0].nodeName.toUpperCase()){
		    case "INPUT":
		        if (!required && value == "") break;
				var inClass = ($(fields[i]).prop("class") || "text").toUpperCase();
				var type = ($(fields[i]).prop("type") || "text").toUpperCase();			

				//check if field is required
				if(required){
					//if the value is empty string, show error
					if(value==""){
					    _alert.toast(language.Error, language.fieldRequired.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
					    $(fields[i]).focus();
						return false;
					}
				}

				// NUMBER
				if (inClass.indexOf("NUMBER") > -1) {
				    if (!required && value == "") break;
					//if is numeric
					if(!isNaN(value)){
						//if need be greater than zero and not be
						if(inClass.indexOf("UPZERO")>-1 && Number(value)<=0){
						    _alert.toast(language.Error, language.fieldNumericFail_upZero.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
						    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
						    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
							$(fields[i]).focus();
							return false;
						}
						//if need be less than zero and not be
						else if(inClass.indexOf("DOWNZERO")>-1 && Number(value)>=0){
						    _alert.toast(language.Error, language.fieldNumericFail_downZero.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
						    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
						    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
							$(fields[i]).focus();
							return false;
						}
					}
					//if no is numeric
					else{
					    _alert.toast(language.Error, language.fieldNumericFail.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
				// INTEGER
				else if (inClass.indexOf("INTEGER") > -1) {
				    if (!required && value == "") break;
					value = Number(value);
					//if is integer
					if(Number(value)===value && value%1===0){
						//if need be greater than zero and not be
						if(inClass.indexOf("UPZERO")>-1 && Number(value)<=0){
						    _alert.toast(language.Error, language.fieldIntegerFail_upZero.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
						    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
						    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
							$(fields[i]).focus();
							return false;
						}
						//if need be less than zero and not be
						else if(inClass.indexOf("DOWNZERO")>-1 && Number(value)>=0){
						    _alert.toast(language.Error, language.fieldIntegerFail_downZero.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
						    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
						    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
							$(fields[i]).focus();
							return false;
						}
					}
					//if no is integer
					else{
					    _alert.toast(language.Error, language.fieldIntegerFail.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
				//DATE
				else if (inClass.indexOf("DATE") > -1) {
				    if (!required && value == "") break;
					var format=$(fields[i]).attr("format").replace(/\/|\-|\./g,"");
					//format DDMMYYYY
					if(format=="ddmmyyyy" && !value.match(/^(0[1-9]|1[0-9]|2[0-9]|3(0|1))[\/|\-|\.]?(0[1-9]|1[0-2])[\/|\-|\.]?(19[0-9]{2}|20[01-99]{2})$/)){
					    _alert.toast(language.Error, language.fieldDateWrong.replace("{0}", alias).replace("{1}", $(fields[i]).attr("format")), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
					//format MMDDYYYY
					else if(format=="mmddyyyy" && !value.match(/^(0[1-9]|1[0-2])[\/|\-|\.]?(0[1-9]|1[0-9]|2[0-9]|3(0|1))[\/|\-|\.]?(19[0-9]{2}|20[01-99]{2})$/)){
					    _alert.toast(language.Error, language.fieldDateWrong.replace("{0}", alias).replace("{1}", $(fields[i]).attr("format")), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
					//format YYYYMMDD
					else if(format=="yyyymmdd" && !value.match(/^(19[0-9]{2}|20[01-99]{2})[\/|\-|\.]?(0[1-9]|1[0-2])[\/|\-|\.]?(0[1-9]|1[0-9]|2[0-9]|3(0|1))$/)){
					    _alert.toast(language.Error, language.fieldDateWrong.replace("{0}", alias).replace("{1}", $(fields[i]).attr("format")), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
				//EMAIL
				else if (inClass.indexOf("EMAIL") > -1) {
				    if (!required && value == "") break;
					if(!value.match(/^[a-z0-9\!#$%&'\*+\/=\?\^_`\{\|\}~-]+(?:\.[a-z0-9\!#$%&'\*+\/=\?\^_`\{\|\}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)){
					    _alert.toast(language.Error, language.fieldEmailWrong.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
				//PASSWORD
				else if (type == "PASSWORD") {
				    if (!required && value == "") break;
					if(!value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&\-_\|\\\(\)\+\*\=\{\}\[\]\^\.?]).{8,40}$/)){
					    _alert.toast(language.Error, language.fieldPasswordWrong.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
			break;
		    case "SELECT":
		        if (!required && value == "") break;
				//check if field is required
				if(required){
					//if the value is empty string, show error
					if(value==$(fields[i]).find("option")[0].value || value==null){
					    _alert.toast(language.Error, language.fieldRequired.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
					    if($(fields[i]).data("chosen"))
					    	$(fields[i]).trigger('chosen:activate')
					    else
							$(fields[i]).focus();
						return false;
					}
				}
			break;
		    case "TEXTAREA":
		        if (!required && value == "") break;
				//check if field is required
				if(required){
					//if the value is empty string, show error
					if(value==""){
					    _alert.toast(language.Error, language.fieldRequired.replace("{0}", alias), "orange", 2000, LIGHT, RIGHT);
					    $("a[href='#" + $(fields[i]).parents("div[role='tabpanel']").attr("id") + "']").trigger("click");
					    $("a[href='#" + $(fields[i]).parents("div.tab-pane").attr("id") + "']").trigger("click");
						$(fields[i]).focus();
						return false;
					}
				}
			break;
		}
		
	}

	return true;
}

/**
 * @author [rey]
 * @date        [07/27/2016]
 * @description [$addAliasToFields description]
 * @param       {Object}           language     [description]
 */
function $addAliasToFields(language){
    language=language || (LANGUAGE && LANGUAGE[Culture]) || {};

    if(("alias" in language)){
	    var inputs=$("input,textarea,select").not("input[id=''],textarea[id=''],select[id='']");

	    for(var i=0, len=inputs.length;i<len;i++){
	        if(language.alias[$(inputs[i]).prop("id")])
	            $(inputs[i]).attr("alias", language.alias[$(inputs[i]).prop("id")]);
	    }
	}
}

function isVar(variable){
	try{
		eval(variable);
		return true;
	}
	catch(e){
		return false;
	}
}

function evaluateCondition(condition){
	
	var chunks=condition.replace(/\s/g,"").split(/\|\||&&/);
	var chunks2=chunks[chunks.length-1].split("?");
	var setence=chunks2[chunks2.length-1].split(":");

	for(var i in chunks)
		if(chunks[i].match(/.*[#>^*"'.]+.*/)){
			var operator=chunks[i].replace(/[#\w\d\-]/g,"");
			var parts=chunks[i].split(/==|!=|>|<|>=|<=/);
			
		}


	if(setence.length!=2)
		console.log("Condicion invalida")
}