<script>
const sitemapConfig = {
  global: {
    onActionEvent: function (event) {

      event.pageUrl = window.location.href;
      event.pageName = document.title;
      event.referrer = document.referrer;
      event.browser = navigator.userAgent;

      return event;
    }
  },

  pageTypes: [

    {
      name: "Home Page",
      interaction: {
        name: "ViewPage"
      },
      isMatch: () =>
        window.location.pathname === "/" ||
        window.location.pathname.includes("Data-Cloud-Connection")
    }

  ]
};

SalesforceInteractions.initSitemap(sitemapConfig);
</script>
