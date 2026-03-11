SalesforceInteractions.setLoggingLevel("DEBUG");

/* Initialize SDK */

SalesforceInteractions.init({

cookieDomain: ".github.io",

consents:[
{
status: SalesforceInteractions.ConsentStatus.OptIn,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}
]

}).then(()=>{

console.log("Salesforce Data Cloud SDK initialized");

/* Generate device/session IDs */

let deviceId = localStorage.getItem("deviceId");
if(!deviceId){
deviceId = "device-" + Date.now();
localStorage.setItem("deviceId",deviceId);
}

let sessionId = sessionStorage.getItem("sessionId");
if(!sessionId){
sessionId = "session-" + Date.now();
sessionStorage.setItem("sessionId",sessionId);
}

/* PAGE VIEW EVENT */

SalesforceInteractions.sendEvent({

interaction:{
name:"Page_View"
},

eventType:"PageView",
category:"Engagement",

deviceId:deviceId,
sessionId:sessionId,

sourceUrl:window.location.href,
sourceUrlReferrer:document.referrer,
dateTime:new Date().toISOString()

});

console.log("Page View Event Sent");

/* CTA CLICK EVENT */

function trackCTA(event){

const button = event.target;
const interactionName = button.innerText;
const eventId = button.id;

document.querySelectorAll(".btn").forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

const dateTime = new Date().toISOString();

SalesforceInteractions.sendEvent({

interaction:{
name:"CTA_Click"
},

eventType:"ButtonClick",
category:"Engagement",

eventId:eventId,
deviceId:deviceId,
sessionId:sessionId,

attributes:{
buttonName:interactionName
},

sourceUrl:window.location.href,
sourceUrlReferrer:document.referrer,
dateTime:dateTime

});

console.log("CTA Event Sent");

/* Update UI */

document.getElementById("profileTable").style.display="block";

document.getElementById("deviceId").innerText=deviceId;
document.getElementById("sessionId").innerText=sessionId;
document.getElementById("sourceUrl").innerText=window.location.href;
document.getElementById("referrer").innerText=document.referrer || "Direct";
document.getElementById("interactionName").innerText=interactionName;
document.getElementById("dateTime").innerText=dateTime;

}

/* Add CTA listeners */

document.getElementById("ctaGoogle").addEventListener("click",trackCTA);
document.getElementById("ctaYahoo").addEventListener("click",trackCTA);
document.getElementById("ctaBing").addEventListener("click",trackCTA);

/* SCROLL EVENT */

let scrollTracked=false;

window.addEventListener("scroll",function(){

if(!scrollTracked && window.scrollY > 200){

scrollTracked=true;

SalesforceInteractions.sendEvent({

interaction:{
name:"Scroll_Depth"
},

eventType:"Scroll",
category:"Engagement",

deviceId:deviceId,
sessionId:sessionId,

attributes:{
scrollDepth:"200px"
},

dateTime:new Date().toISOString()

});

console.log("Scroll Event Sent");

}

});

/* LINK CLICK EVENT */

document.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",function(){

SalesforceInteractions.sendEvent({

interaction:{
name:"Link_Click"
},

eventType:"LinkClick",
category:"Engagement",

deviceId:deviceId,
sessionId:sessionId,

attributes:{
linkText:link.innerText
},

dateTime:new Date().toISOString()

});

console.log("Link Click Event Sent");

});

});

});
