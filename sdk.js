<script>
const sitemapConfig = {
  global: {
    onActionEvent: function (event) {

      event.eventId = Date.now().toString();
      event.pageName = document.title;
      event.pageUrl = window.location.href;
      event.eventDate = new Date().toISOString();

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
</script>

