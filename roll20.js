chat = document.getElementById("textchat-input");
txt = chat.getElementsByTagName("textarea")[0];
btn = chat.getElementsByTagName("button")[0];


function postChatMessage(msg){
  if(msg.type != "Initiative") {
    txt.value = "&{template:sf_generic} {{name="+msg.playername +"}} {{characterid=" + msg.playername + "}} {{title="+ msg.type +"}} {{r1name=CHECK}}  {{r1=[[" + msg.roll + "]]}}";
  }
  else {
    txt.value = "&{template:sf_generic} {{name="+msg.playername +"}} {{characterid=" + msg.playername + "}} {{title="+ msg.type +"}} {{r1name=CHECK}}  {{r1=[[" + msg.roll + "&{tracker}]]}}";
  }  
    btn.click();
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  console.log(sender);
  postChatMessage(request);
});
