var ons = require('onsenui.min.js');
var bleList = []

main();

//main function
function main() {
    setPlatform();
    
    reqPrices();
}

// Set Platform
function setPlatform() {
    if (!ons.platform.isIOS()) {
        ons.platform.select("android");
    }
}
//Connect and Push Page-Controller
document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'start') {
      page.querySelector('#push-button').onclick = BLEFuncs;
      /*function() {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
      };*/
    } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });

//Dictionaries

var getResults = {};
var pushingdict = {};
var currentPage = 0;


document.addEventListener('show', function (event) {
    var page = event.target;

    if (page.id == "Settings") {
        currentPage = 1;
        appendToList();
       
    };

    if (page.id == "Flex") {
        createPreferences();
       
    }


});

function appendList(device){
    var i = document.getElementById("myList");
    var c = document.createElement("ons-list-item");
    c.setAttribute("tappable");
    c.setAttribute("modifier","chevron");
    c.setAttribute("id", device.id);
    c.innerHTML = device.name;
    i.appendChild(c);

}

/*
function appendToList() {

    for (x = 0; x < rawData.length; x++) {
        var i = document.getElementById("myList");
        var c = document.createElement("ons-list-item");
        var dict = rawData[x];
        var name = dict["name"];
        var calories = dict["calories"];
        var price = dict["price"];
        c.innerHTML = '<div class="center">' +
            name +
            '<br> $' + price +
            '<br> ' + calories + ' calories' +
            '</div>' +
            '<div class="right">' +
            '<ons-row>' +

            '<ons-col>' +
            '<ons-range style="width: 100px;" value="0"; id="slider' + x + '"></ons-range>' +

            '</ons-col>' +
            '</ons-row>' +
            '</div>' +
            '<div class="right">' +
            '<ons-switch id="switch' + x + '"></ons-switch>' +
            '</div>'

        '<ons-list-item>' +
        '<div class="center">'

        i.appendChild(c);
    }
}
*/

//BLE Successes and Failure
function BLEFuncs(){
    ble.isEnabled(isEnabledSuccess, isEnabledFail);
}   

var isEnabledSuccess = function(){
    ble.scan([],60, scanSuccess, function(){
        alert("No devices found")
    });
}

function scanSuccess(device){
    appendToList(device);
    bleList += device;
    document.getElementByID(device.id).addEventListener("click", function(){alert("it works")});

}

var isEnabledFail = function(){
    ble.enable(isEnabledSuccess, function(){
        alert("Please enable your bluetooth and retry")
    });
}
