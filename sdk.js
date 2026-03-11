SalesforceInteractions.setLoggingLevel("DEBUG");

document.addEventListener("DOMContentLoaded", function () {

let deviceId;
let sessionId;

/* COOKIE BANNER ELEMENTS */

const banner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookies");
const rejectBtn = document.getElementById("rejectCookies");

let userConsent = localStorage.getItem("userConsent");

/* Initialize SDK */

SalesforceInteractions.init({

cookieDomain: "sudiptanandan23.github.io",

consents:[
{
status: SalesforceInteractions.ConsentStatus.OptOut,
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}
]

}).then(()=>{

console.log("Salesforce Data Cloud SDK initialized");

/* SHOW COOKIE BANNER IF NO CONSENT */

if(!userConsent){
banner.style.display="flex";
}else{
banner.style.display="none";

if(userConsent === "accepted"){
sendConsent("OptIn");
}else{
sendConsent("OptOut");
}

}

/* ACCEPT COOKIES */

acceptBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","accepted");
banner.style.display="none";

sendConsent("OptIn");

});

/* REJECT COOKIES */

rejectBtn.addEventListener("click",function(){

localStorage.setItem("userConsent","rejected");
banner.style.display="none";

sendConsent("OptOut");

});

});

/* FUNCTION TO SEND CONSENT */

function sendConsent(status){

SalesforceInteractions.updateConsents([
{
status: SalesforceInteractions.ConsentStatus[status],
purpose: SalesforceInteractions.ConsentPurpose.Tracking,
provider:"Website"
}
]);

console.log("Consent Sent:",status);

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

}

});
