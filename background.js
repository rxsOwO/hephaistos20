const extensions = 'https://app.roll20.net/editor'
const webstore = 'https://hephaistos.'
var rollid = null
var hephaistosid = null
var hephaistosRequest = null

chrome.tabs.onActivated.addListener(function(tab) {
  chrome.tabs.query(
  {active:true, currentWindow:true},
  function (tabs) {
      var activeTab = tabs[0];
      if(activeTab.url.startsWith(webstore)) {
        hephaistosid = activeTab.id;
        console.log(hephaistosid);
      }
      else if(activeTab.url.startsWith(extensions)) {
        rollid = activeTab.id;
        console.log(rollid);
      }
  }
);
});


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) =>{
  console.log(request);
  sendResponse({lol:"lol"});
  if(rollid != null) {
    console.log("balls: " + rollid);
    try {
      let tabInfo = await chrome.tabs.get(rollid);
      console.log(tabInfo);    
      if(tabInfo.url.startsWith(extensions)){
        chrome.tabs.sendMessage(rollid, {initiative: request.initiative, playername: request.playername, roll: request.roll, type: request.type});
        sendResponse({balls: "Nothing"});
      }  
      else {
        rollid = null;
        sendResponse({error:"No Roll20!"});
      }
    } catch (error) {
      console.log(error);
      rollid = null;
      sendResponse({error:"No Roll20!"});
    }

  }
  else {
    sendResponse({error:"No Roll20!"});
  }

});