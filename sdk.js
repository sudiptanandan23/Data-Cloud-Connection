SalesforceInteractions.setLoggingLevel("DEBUG");

document.addEventListener("DOMContentLoaded", function () {

let deviceId;
let sessionId;
let pageStartTime = Date.now();

/* --------------------------
COOKIE BANNER ELEMENTS
-------------------------- */

const banner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookies");
const rejectBtn = document.getElementById("rejectCookies");

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

/* CHECK STORED CONSENT */

let storedConsent = localStorage.getItem("userConsent");

if(!storedConsent){

banner.style.display="flex";

}
else{

banner.style.display="none";

sendConsent(storedConsent);

}

});


/* --------------------------
ACCEPT BUTTON
-------------------------- */

acceptBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","OptIn");

banner.style.display="none";

sendConsent("OptIn");

});


/* --------------------------
REJECT BUTTON
-------------------------- */

rejectBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","OptOut");

banner.style.display="none";

sendConsent("OptOut");

});


/* --------------------------
SEND CONSENT
-------------------------- */

function sendConsent(status){

SalesforceInteractions.updateConsents([{

status: SalesforceInteractions.ConsentStatus[status],
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"

}]).then(()=>{

console.log("Consent Sent:",status);

/* Only start tracking if accepted */

if(status === "OptIn"){
initializeTracking();
}

});

}


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

/* PAGE VIEW EVENT */

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

sendEvent("Tab Visibility","webInteraction",{
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
