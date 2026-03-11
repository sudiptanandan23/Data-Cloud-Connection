SalesforceInteractions.setLoggingLevel("DEBUG");

document.addEventListener("DOMContentLoaded", function () {

let deviceId;
let sessionId;

/* Initialize SDK */

SalesforceInteractions.init({

cookieDomain: "sudiptanandan23.github.io",

consents:[
{
status: SalesforceInteractions.ConsentStatus.OptIn,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}
]

}).then(()=>{

console.log("Salesforce Data Cloud SDK initialized");

/* Generate device ID */

deviceId = localStorage.getItem("deviceId");

if(!deviceId){
deviceId = "device-" + Date.now();
localStorage.setItem("deviceId",deviceId);
}

/* Generate session ID */

sessionId = sessionStorage.getItem("sessionId");

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

/* Toggle active tab */

document.querySelectorAll(".btn").forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

const dateTime = new Date().toISOString();

/* Send event */

SalesforceInteractions.sendEvent({

interaction:{
name:"CTA_Click"
},

eventType:"ButtonClick",
category:"Engagement",

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

/* Attach Button Listeners */

document.getElementById("ctaGoogle").addEventListener("click",trackCTA);
document.getElementById("ctaYahoo").addEventListener("click",trackCTA);
document.getElementById("ctaBing").addEventListener("click",trackCTA);

});

});
