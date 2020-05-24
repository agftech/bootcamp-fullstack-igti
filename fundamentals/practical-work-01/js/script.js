
window.addEventListener('load', start);

var globalColors = ['#redText', '#greenText', '#blueText'];

function start() {
    setColorResult();
}

function onChangeRGBValue(event, index) {
    var colorValue = event.target.value;
    document.querySelector('#' + index + 'Text').value = colorValue;
    changeColorResult();
}

function setColorResult() {
    var red = document.querySelector(globalColors[0]).value;
    var green = document.querySelector(globalColors[1]).value;
    var blue = document.querySelector(globalColors[2]).value;
    return `rgb(${red}, ${green}, ${blue})`;
}

function changeColorResult() {
    document.querySelector('.handleResult').style.backgroundColor = setColorResult();
    document.querySelector('#handleColorResult').innerHTML = setColorResult();
}