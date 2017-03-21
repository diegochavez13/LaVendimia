function fuzzyMatch(searchSet, query) {
    var tokens = query.toUpperCase().split(''),
        matches = [];

    searchSet.forEach(function(module) {
        module.listFuncionalities.forEach(function(option) {
            var tokenIndex = 0,
                stringIndex = 0,
                matchWithHighlights = '',
                matchedPositions = [];

            var string = option.vaNameFunctionalitie.toUpperCase();
            while (stringIndex < string.length) {
                if (string[stringIndex] === tokens[tokenIndex]) {
                    matchWithHighlights += highlight(string[stringIndex]);
                    matchedPositions.push(stringIndex);
                    tokenIndex++;

                    if (tokenIndex >= tokens.length) {
                        matches.push({
                            match: string,
                            highlighted: matchWithHighlights + string.slice(stringIndex + 1),
                            positions: matchedPositions,
                            vaNameModule: module.NameModule,
                            vaAction: option.vaAction,
                            unId: option.unId
                        });

                        break;
                    }
                } else {
                    matchWithHighlights += string[stringIndex];
                }

                stringIndex++;
            }
        });
    });

    return matches;
}
function showFuzzyOptions(matches) {
    var sHtml = "<li class='li_item_custom_nav open'>" +
                "<a href='#'>" +
                        "<i class='icon-desktop'></i>" +
                        "<span class='menu-text'> " + LanguageMainMenu[Culture].Results + " </span>" +
                        // "<b class='arrow icon-angle-down'></b>" +
                    "</a>" +
                    "<ul class='submenu' id='searchResult'>";
    for (var i = 0 ; i < matches.length ; i++) {
        sHtml += "<li>" +
                    "<a un-id='" + matches[i].unId + "' href='#' class='lnkHref' title = '" + matches[i].vaNameModule.toUpperCase() + " - " + matches[i].match.toUpperCase() + "' id ='" + matches[i].vaAction + "'>" +
                        "<i class='icon-double-angle-right'></i>" +
                        //matches[i].match.toUpperCase() +
                        matches[i].highlighted+
                    "</a>" +
                "</li>";
    }
    sHtml += "</ul>" +
         "</li>";


    //$("#customNavList").html(sHtml).show(1000, "linear");
    $("#customNavList").html(sHtml).show(400);
    $("#searchResult").css("display", "block");
}

function highlight(string) {
    return '<span class="blue bolder">' + string + '</span>';
}