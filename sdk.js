SalesforceInteractions.setLoggingLevel("DEBUG");

document.addEventListener("DOMContentLoaded", function () {

let deviceId;
let sessionId;
let pageStartTime = Date.now();

/* --------------------------
INITIALIZE SDK
-------------------------- */

SalesforceInteractions.init({

cookieDomain: window.location.hostname,

consents:[{
status: SalesforceInteractions.ConsentStatus.OptOut,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}]

}).then(()=>{

console.log("SDK Initialized");

/* AUTO CONSENT FOR DEMO */

SalesforceInteractions.updateConsents([{
status: SalesforceInteractions.ConsentStatus.OptIn,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}]).then(()=>{

console.log("Consent Sent");

initializeTracking();

});

});


/* --------------------------
INITIALIZE TRACKING
-------------------------- */

function initializeTracking(){

/* DEVICE ID */

deviceId = localStorage.getItem("deviceId");

if(!deviceId){
deviceId = "device-" + crypto.randomUUID();
localStorage.setItem("deviceId", deviceId);
}

/* SESSION ID */

sessionId = sessionStorage.getItem("sessionId");

if(!sessionId){
sessionId = "session-" + Date.now();
sessionStorage.setItem("sessionId", sessionId);
}

/* PAGE VIEW */

sendEvent("Page View","webPageView",{});

/* CTA BUTTON EVENTS */

document.querySelectorAll(".btn").forEach(btn => {

btn.addEventListener("click",function(){

sendEvent("CTA Click","webClick",{
buttonName: btn.innerText
});

});

});

/* LINK CLICK EVENTS */

document.querySelectorAll("a").forEach(link => {

link.addEventListener("click",function(){

sendEvent("Link Click","webClick",{
linkText: link.innerText,
linkUrl: link.href
});

});

});

/* SCROLL DEPTH */

window.addEventListener("scroll",function(){

let scrollPercent =
Math.round((window.scrollY /
(document.body.scrollHeight - window.innerHeight)) * 100);

if(scrollPercent > 50){

sendEvent("Scroll Depth","webInteraction",{
scrollDepth: scrollPercent
});

}

});

/* TAB VISIBILITY */

document.addEventListener("visibilitychange",function(){

sendEvent("Tab Visibility Change","webInteraction",{
state: document.visibilityState
});

});

/* PAGE EXIT */

window.addEventListener("beforeunload",function(){

let timeSpent = Math.round((Date.now() - pageStartTime)/1000);

sendEvent("Page Exit","webInteraction",{
timeOnPage: timeSpent
});

});

}


/* --------------------------
SEND EVENT FUNCTION
-------------------------- */

function sendEvent(name,type,attributes){

SalesforceInteractions.sendEvent({

interaction:{
name:name,
type:type
},

category:"Engagement",

deviceId:deviceId,
sessionId:sessionId,

attributes:attributes,

sourceUrl:window.location.href,
sourceUrlReferrer:document.referrer,

dateTime:new Date().toISOString()

});

console.log("Event Sent:",name);

}

});
