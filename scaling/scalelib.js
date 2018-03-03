/*Задача: ест svg, нужно масштабировать по событиям прокрутки колесика мыши. В конечном варианте - с учетом местонахождения курсора мыши*/

/**/
function _onwheelActions(e) {
	e = e || window.event;
	var delta = e.deltaY || e.detail || e.wheelDelta;
	var mouseX = event.clientX;
	var mouseY = event.clientY;
	var docWidth = document.documentElement.clientWidth;
	var docHeight = document.documentElement.clientHeight;
	svgObj = document.getElementById('vvsvg');
	var stepSize = 10;
	var newVbElements = calcNewVbElements(parseViewboxParams(svgObj), stepSize, delta);
	svgObj.setAttribute("viewBox", newVbElements.join(" "));
}

/*Парсит аттрибут и его значения из svg*/
function parseViewboxParams(svgObj) {
	var vbElements = svgObj.getAttribute("viewBox").split(" ");
	var X0 = parseInt(vbElements[0], 10);
	var Y0 = parseInt(vbElements[1], 10);
	var X1 = parseInt(vbElements[2], 10);
	var Y1 = parseInt(vbElements[3], 10);
	var parsedVbElements = [X0, Y0, X1, Y1]
	return parsedVbElements;
}

/**/
function calcNewVbElements(vbElements, stepSize, delta) {
	if(delta<0){ 		//прокрутки мыши вниз
		vbElements[0] = vbElements[0] + stepSize/2;
		vbElements[1] = vbElements[1] + stepSize/2;
		vbElements[2] = vbElements[2] - stepSize;
		vbElements[3] = vbElements[3] - stepSize;
	}
	if(delta>0){		//прокрутки мыши вверх
		vbElements[0] = vbElements[0] - stepSize/2;
		vbElements[1] = vbElements[1] - stepSize/2;
		vbElements[2] = vbElements[2] + stepSize;
		vbElements[3] = vbElements[3] + stepSize;
	}
	return vbElements;
}