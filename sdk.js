SalesforceInteractions.setLoggingLevel("DEBUG");

document.addEventListener("DOMContentLoaded", function () {

let deviceId;
let sessionId;
let pageStartTime = Date.now();

/* COOKIE BANNER */

const banner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookies");
const rejectBtn = document.getElementById("rejectCookies");

/* PROFILE TABLE */

const profileTable = document.getElementById("profileTable");

/* INITIALIZE SDK */

SalesforceInteractions.init({

cookieDomain: window.location.hostname,

consents:[{
status: SalesforceInteractions.ConsentStatus.OptOut,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}]

}).then(()=>{

console.log("SDK Initialized");

let storedConsent = localStorage.getItem("userConsent");

if(!storedConsent){
banner.style.display="flex";
}else{
banner.style.display="none";
sendConsent(storedConsent);
}

});


/* ACCEPT COOKIES */

acceptBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","OptIn");
banner.style.display="none";

sendConsent("OptIn");

});


/* REJECT COOKIES */

rejectBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","OptOut");
banner.style.display="none";

sendConsent("OptOut");

});


/* SEND CONSENT */

function sendConsent(status){

SalesforceInteractions.updateConsents([{

status: SalesforceInteractions.ConsentStatus[status],
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"

}]).then(()=>{

console.log("Consent Sent:",status);

if(status==="OptIn"){
initializeTracking();
}

});

}


/* INITIALIZE TRACKING */

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

/* CTA TAB BUTTONS */

document.querySelectorAll(".btn").forEach(btn => {

btn.addEventListener("click",function(){

const interactionName = btn.innerText;

/* ACTIVATE TAB */

document.querySelectorAll(".btn").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

/* SEND EVENT */

sendEvent("CTA Click","webClick",{
buttonName: interactionName
});

/* OPEN PROFILE TABLE */

profileTable.style.display="block";

document.getElementById("deviceId").innerText=deviceId;
document.getElementById("sessionId").innerText=sessionId;
document.getElementById("sourceUrl").innerText=window.location.href;
document.getElementById("referrer").innerText=document.referrer || "Direct";
document.getElementById("interactionName").innerText=interactionName;
document.getElementById("dateTime").innerText=new Date().toISOString();

});

});


/* LINK CLICK */

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

if(scrollPercent>50){

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


/* SEND EVENT */

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
