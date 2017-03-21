var Culture=Culture || "";
/**@author [Rey David Dominguez]
 * @date [09/20/2015]
 * @Description [Init custom tags]
 * @return {void} */
function initCustomTags(){
	initButtons();
	initDatepicker();
	initClearables();
	initPasswordShow();
	// initToogleButtons_Group();
}
/**@author [Rey David Dominguez]
 * @date [09/20/2015]
 * @Description [Init acco-buttons]
 * @return {void} */
function initButtons(){
	var buttonSearch=$('acco-button');
	for (var i = 0; i < buttonSearch.length; i++) {
	    var _buttonClass = $(buttonSearch[i]).prop("class");
	    var _class = "";
	    var label="";
	    switch (_buttonClass.toUpperCase()) {
	        case "SAVE":
	            _class = "btn-primary";
	            label = "lbl_btnSave";
	            break;
	        case "SEARCH":
	            _class = "btn-info";
	            label = "lbl_btnSearch";
	            break;
	        case "RETURN":
	            _buttonClass = "undo";
	            _class = "btn-gray";
	            label="lbl_btnSearch";
	            break;
	        case "NEW":
	            _buttonClass = "certificate";
	            label="lbl_btnNew";
	            break;
	        case "AUTH":
	            _buttonClass = "key";
	            _class = "btn-gray";
	            label="lbl_btnAuth";
	            break;
	        case "DOWNLOAD":
	            _buttonClass = "download-alt";
	            _class = "btn-primary";
	            label="lbl_btnDownload";
	            break;
	        case "UPLOAD":
	            _buttonClass = "cloud-upload";
	            _class = "btn-primary";
	            label="lbl_btnUpload";
	            break;
	        case "CLEAR":
	            _buttonClass = "eraser";
	            _class = "btn-gray";
	            label="lbl_btnClear";
	            break;
	        case "CANCEL":
	            _buttonClass = "ban-circle";
	            _class = "btn-gray";
	            label="lbl_btnCacel";
	            break;
	        case "EXPORT":
	            _buttonClass = "external-link";
	            _class = "btn-primary";
	            label="lbl_btnExport";
	            break;

	    }

		var newButton=$("<button></button>");
		var newButtonIcon=$("<i></i>");
		var newButtonLabel=$("<span>"+Language_General[Culture][label]+"</span>");	
		$(newButton).prop("id",$(buttonSearch[i]).prop("id"));
		$(newButton).prop("class","btn "+_class+" btn-sm");
		$(newButton).prop("onclick",$(buttonSearch[i]).prop("onclick"));
		$(newButton).prop("title",$(buttonSearch[i]).prop("title"));
		$(newButtonIcon).prop("class", "icon-" + _buttonClass + " bigger-110");
		$(newButton).append(newButtonIcon);
		$(newButton).append(newButtonLabel);
		$(buttonSearch[i]).replaceWith(newButton);		
	}
}
/**@author [Rey David Dominguez]
 * @date [09/20/2015]
 * @Description [Init & create acco-datepicker]
 * @return {void} */
function initDatepicker(){
	var dpSearch=$('acco-datepicker');
	//var language = LANGUAGE!=undefined?LANGUAGE[Culture]:{};

	for (var i = 0; i < dpSearch.length; i++) {
		var newDiv=$('<div class="input-group"></div>')
		var newDp=$('<input type="text"/>');
		var $class=$(dpSearch[i]).prop("class") || "";
		var $onclick=$(dpSearch[i]).prop("onclick") || "";
		var $title=$(dpSearch[i]).prop("title") || "";
		var $name=$(dpSearch[i]).prop("name") || "";
		var $alias=$(dpSearch[i]).attr("alias");
		var $required=$(dpSearch[i]).attr("required");

		$(newDp).prop("id",$(dpSearch[i]).prop("id"));
		$(newDp).prop("class","form-control input acco-datepicker "+$class.replace(/form-control input /ig,""));
		if($onclick)
			$(newDp).prop("onclick",$onclick);

		if($title!="")
			$(newDp).prop("title",$title);
		
		if($name!="")
			$(newDp).prop("name",$name);

		var format = $(dpSearch[i]).attr("format") != undefined ? $(dpSearch[i]).attr("format") : "mm/dd/yyyy";
		$(newDp).attr("placeholder",format.toUpperCase());
		//if no is a valid format, it is assumed than is a element in the LANGUAGE object
		//if(!format.replace(/[\/\-\.]/g,"").match(/(ddmmyyy)|(mmddyyyy)|(yyyymmdd)/ig))
		//	format=language[format];
		$(newDp).attr("format",format);
		$(newDp).attr("alias",$alias);
		$(newDp).attr("required",$required);

		$(newDp).datepicker({
	        format: format,
	        language: Culture,
	        autoclose: $(dpSearch[i]).attr("autoclose")=="true" || $(dpSearch[i]).attr("autoclose")==undefined,
	        clearBtn: $(dpSearch[i]).attr("clearbtn")=="true",
	        todayBtn: $(dpSearch[i]).attr("todaybtn") == "true",
	        todayHighlight: true,
	        endDate: $(dpSearch[i]).attr("end-date") || '',
	        startDate: $(dpSearch[i]).attr("start-date") || ''
	    });

		var newSpan=$('<span class="input-group-btn"></span>');
		var newButton=$('<button class="btn btn-sm btn-info control"></button>');
		var newI=$('<i class="icon-calendar bigger-110"></i>');
		$(newButton).prop("id","btnShow_"+$(dpSearch[i]).prop("id"));
		$(newButton).click(function(){
			var id=$(this).prop("id").split("_")[1];
			$("#"+id).focus();
		});
		$(newButton).append(newI);
		$(newSpan).append(newButton);
		$(newDiv).append(newDp);
		$(newDiv).append(newSpan);

		$(dpSearch[i]).replaceWith(newDiv);
		$('.acco-datepicker').on('dragover',function(e) {
            e.preventDefault();
            e.stopPropagation();
        }).on('dragenter',function(e) {
            e.preventDefault();
            e.stopPropagation();
	    }).on("paste",function(e){
	        $(this).focus();
	    });
	}
}

function initClearables() {
	//if exists, remove previous icons, to prevent icons repeated
    $(".ic-clearable").remove();
    //get the all inputs in "main-content"
    //Except:
    //	With class "noClearable"
    //	Inputs disabled, readonly or hidden
    //	Inputs for datepicker
    //	Inputs inside of jdGrid
    var inputs = $('.main-content').find("input[type='text']").not(".noClearable,input[disabled],input[readonly],input:hidden,.acco-datepicker,.ui-jqgrid input[type='text']");

    for (var i = 0, len = inputs.length; i < len; i++) {
        var input = inputs[i];

        if(!$(input).parents(".input-icon").length){
	        $(input).bind("keyup cls", function() {
	            if ($(this).val() != '') {
	                $("#cl_" + $(this).prop("id")).removeClass('hide');
	                $("#cl_" + $(this).prop("id")).css("left", $(this).width() + "px");
	            } else
	                $("#cl_" + $(this).prop("id")).addClass('hide');
	        });

	        $("<i>").addClass('icon-remove hide ic-clearable').css({
	            width: "10px",
	            position: "absolute",
	            top: "10px",
	            cursor: "pointer",
	            color: "#99bbf2"
	        }).attr({
	            id: "cl_" + $(input).prop("id"),
	            parent: $(input).prop("id")
	        }).insertAfter(input).click(function() {
	            var input = "#" + $(this).attr("parent");

	            $(input).val("").focus();
	            $(this).addClass('hide');
	        });
	    }
    }
}

function initPasswordShow() {
    var inputs = $('.main-content').find("input[type='password']");

    for (var i = 0, len = inputs.length; i < len; i++) {
        var input = inputs[i];

        if(!$(input).parents(".input-icon").length){
	        $(input).bind("keyup cls", function() {
	            if ($(this).val() != '') {
	                $("#sh_" + $(this).prop("id")).removeClass('hide');
	                $("#sh_" + $(this).prop("id")).css("left", $(this).width() + "px");
	            } else
	                $("#sh_" + $(this).prop("id")).addClass('hide');
	        });

	        $("<i>").addClass('icon-eye-open hide').css({
	            width: "10px",
	            position: "absolute",
	            top: "10px",
	            cursor: "pointer"
	        }).attr({
	            id: "sh_" + $(input).prop("id"),
	            parent: $(input).prop("id")
	        }).insertAfter(input).mousedown(function() {
	            var input = "#" + $(this).attr("parent");
	            $(input).prop("type","text");
	        }).mouseup(function(){
	        	var input = "#" + $(this).attr("parent");
	            $(input).prop("type","password");
	        });
	    }
    }
}

function initToogleButtons_Group(){
	var buttons = $('.main-content').find("[data-toggle]").not("[data-toggle='']");

	for (var i = 0, len = buttons.length; i < len; i++) {
		$(buttons[i]).click(function(){
			var name = $(this).prop("name");
			$("[data-toggle][name='"+name+"']").not(this).removeClass('active');
		});
	}
}

$(document).on("mousemove", function() {
    $('.main-content').find("input").not(".noClearable,input[disabled],input[readonly],input:hidden,.acco-datepicker").trigger("cls");
});

