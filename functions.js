// JavaScript Document


 function search0() {
    
    var text = document.getElementById("query").value;
    var query = new RegExp("(\\b" + text + "\\b)", "gim");
    var e = document.getElementById("searchtext").innerHTML;
    var enew = e.replace(/(<span>|<\/span>)/igm, "");
    document.getElementById("searchtext").innerHTML = enew;
    var newe = enew.replace(query, "<span>$1</span>");
    document.getElementById("searchtext").innerHTML = newe;
}

var columnCount = 10;
var rowCount = 10;
var itemCount = columnCount * rowCount;

function search() {
		
    var text = document.getElementById("query").value;
    var firstLetterPositions = findLetterPositions(text[0]);
    for (let i = 0; i < firstLetterPositions.length; i++) {
        var initialPos = firstLetterPositions[i];
        tryAndMatchRight(text,initialPos);
        tryAndMatchDown(text,initialPos);
        tryAndMatchDownRight(text,initialPos);
        tryAndMatchUpRight(text,initialPos);
    }
}
function tryAndMatchRight(text,initialPos) {
	
        var x = initialPos.x;
        var y = initialPos.y;
        if (x + text.length > columnCount) {
            return;
        }
        var wholeWordFound = true;
        var wordIndices = [];
        wordIndices.push(initialPos);
        for (var x2 = 1; x2 < text.length; x2++) {
            var pos = { x: x + x2, y: y};
            if (text[x2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
                wholeWordFound = false;
                break;
            }
            wordIndices.push(pos);
        }
        if (wholeWordFound) {
            highLightIndices(wordIndices);
        }
}
function tryAndMatchDown(text,initialPos) {
        var x = initialPos.x;
        var y = initialPos.y;
        if (y + text.length > rowCount) {
            return;
        }
        var wholeWordFound = true;
        var wordIndices = [];
        wordIndices.push(initialPos);
        for (var y2 = 1; y2 < text.length; y2++) {
            var pos = { x: x, y: y + y2};
            if (text[y2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
                wholeWordFound = false;
                break;
            }
            wordIndices.push(pos);
        }
        if (wholeWordFound) {
            highLightIndices(wordIndices);
        }
}
function tryAndMatchDownRight(text,initialPos) {
     var x = initialPos.x;
        var y = initialPos.y;
        if (y + text.length > rowCount || x + text.length > columnCount) {
            return;
        }
        var wholeWordFound = true;
        var wordIndices = [];
        wordIndices.push(initialPos);
        for (var z2 = 1; z2 < text.length; z2++) {
            var pos = { x: x + z2, y: y + z2};
            if (text[z2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
                wholeWordFound = false;
                break;
            }
            wordIndices.push(pos);
        }
        if (wholeWordFound) {
            highLightIndices(wordIndices);
        }
}
function tryAndMatchUpRight(text,initialPos) {
     var x = initialPos.x;
        var y = initialPos.y;
        if (y - text.length < 0 || x + text.length > columnCount) {
            return;
        }
        var wholeWordFound = true;
        var wordIndices = [];
        wordIndices.push(initialPos);
        for (var z2 = 1; z2 < text.length; z2++) {
            var pos = { x: x + z2, y: y - z2};
            if (text[z2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
                wholeWordFound = false;
                break;
            }
            wordIndices.push(pos);
        }
        if (wholeWordFound) {
            highLightIndices(wordIndices);
        }
}

function getGridItems() {
	return document.getElementsByClassName('grid-item');
}
function getGridItem(pos) {
    var items = getGridItems();
    return items[posToIndex(pos)];
}
function indexToPos(index) {
    var y = Math.floor(index / columnCount);
    var x = index - y * columnCount;
    return { x: x, y: y };
}
function posToIndex(pos) {
    return pos.y * columnCount + pos.x;
}
function getLetterAtPos(pos) {
    var res = getGridItem(pos).innerHTML;
    return res;
}

function findLetterPositions(letter) {
    var positions = [];
    for (var i = 0; i < itemCount; i++) {
        var pos = indexToPos(i);
        if (getLetterAtPos(pos).toLowerCase() === letter.toLowerCase()) {
            positions.push(pos);
        }
    }
    return positions;
}
function addClass(elem, className) {
    var classNames = arr = elem.className.split(" ");
    if (classNames.indexOf(className) == -1) {
        elem.className += " " + className;
    }
}
function removeClass(elem, className) {
    var classNames = elem.className.split(" ");
    var index = classNames.indexOf(className);
    if (index !== -1) {
        classNames.splice(index, 1);
        elem.className = classNames.join(' ');
    }
}
function highLightIndices(positions) {
    for(var i = 0; i < positions.length; i++) {
        addClass(getGridItem(positions[i]),'sel');
    }
}

document.getElementById('search-button').addEventListener('click', search);

