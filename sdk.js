

<script>
/* Salesforce Data Cloud Sitemap Configuration */

document.addEventListener("DOMContentLoaded", function () {

const sitemapConfig = {

global: {
onActionEvent: function (event) {
console.log("Data Cloud Event Sent:", event);
return event;
}
},

pageTypes: [

{
name: "home_page",

isMatch: function () {
return window.location.pathname.includes("index") ||
window.location.pathname === "/" ||
window.location.pathname.includes("Data-Cloud-Connection");
},

interaction: {
name: "Home Page View"
}

},

{
name: "about_page",

isMatch: function () {
return window.location.pathname.includes("about");
},

interaction: {
name: "About Page View"
}

},

{
name: "contact_page",

isMatch: function () {
return window.location.pathname.includes("contact");
},

interaction: {
name: "Contact Page View"
}

}

]

};


/* Initialize Salesforce Data Cloud */

if (window.SalesforceInteractions) {

SalesforceInteractions.init({

cookieDomain: window.location.hostname,
sitemapConfig: sitemapConfig

});

}


/* Send Test Event */

setTimeout(function(){

if (window.SalesforceInteractions) {

SalesforceInteractions.sendEvent({

interaction: {
name: "Website Visit"
}

});

}

},2000);

});


</script>