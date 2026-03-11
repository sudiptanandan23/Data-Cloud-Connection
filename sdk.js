
const sitemapConfig = {
  global: {
    onActionEvent: function (event) {

      // Required IDs
      event.eventId = Date.now().toString();
      event.sessionId = sessionStorage.getItem("sessionId") || Date.now().toString();

      // Required schema fields
      event.category = "Engagement";
      event.eventType = "WebsitePageView";
      event.interactionName = "Website Page";

      // DateTime field
      event.dateTime = new Date().toISOString();

      // Device ID (stored in localStorage)
      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = "device-" + Date.now();
        localStorage.setItem("deviceId", deviceId);
      }
      event.deviceId = deviceId;

      // Source Tracking
      event.sourceChannel = "Web";
      event.sourceUrl = window.location.href;
      event.sourceUrlReferrer = document.referrer || "";

      // Optional page view counter
      let views = sessionStorage.getItem("pageView") || 0;
      views++;
      sessionStorage.setItem("pageView", views);
      event.pageView = views;

      return event;
    }
  },

  pageTypes: [
    {
      name: "Website Page",
      interaction: {
        name: "WebsitePageView"
      },
      isMatch: () => true
    }
  ]
};

SalesforceInteractions.initSitemap(sitemapConfig);





