var ons = require('onsenui.min.js');


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
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
      };
    } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });

//Dictionaries

var getResults = {};
var pushingdict = {};
var currentPage = 0;


//Get items ajax req




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
