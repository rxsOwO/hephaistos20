
console.log("aaaaba");

var cancelbutton = document.getElementsByClassName("is-clickable is-hoverable");
var spellbutton = document.getElementsByClassName("button is-small is-compact mt-1");
var rollparent = document.getElementsByClassName("notification-popup-list")[1];
rollparent.setAttribute("style", "opacity:0;");

function call() {
    setTimeout(callback, 100)
}
const callback = (mutationList, observer) => {
    if(rollparent.children[0].firstChild) {
        var initiative = document.getElementsByClassName("is-size-4 is-clickable is-hoverable mx-4")[0].innerHTML;

        var rollbox = document.getElementsByClassName("box px-4 mb-2 has-background-grey-darker has-text-white-ter latest-dice-result")[0].children[0].children[0].children;
        var cancelbutton = document.querySelector('[title="Clear All"]');

        var playername = document.querySelectorAll("span")[23].innerHTML;
        var roll = rollbox[1].children[1].innerHTML;
        var type = rollbox[0].innerHTML;

        console.log(playername);
        console.log(initiative); 
        console.log(roll);
        console.log(type);
        console.log(rollbox);
        cancelbutton.click();

        chrome.runtime.sendMessage({initiative: initiative, playername:playername, roll: roll, type: type}, (response) => {if(response.error != undefined) {alert("No Roll20!");} else {console.log(response);}});
    }
}

const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver(call);
observer.observe(rollparent, config);

chrome.runtime.onMessage.addListener(function (request) {
if(request.state == "Off") {
    observer.disconnect();
}
else if(request.state == "On") {
    observer.observe(rollparent, config);
}
});  