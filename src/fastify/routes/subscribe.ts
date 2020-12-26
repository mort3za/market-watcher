const routes = async function routes(fastify, options) {
  fastify.get("/subscribe", async (request, reply) => {
    const html = `
    <html><body>
    <p>Subscribe for push notifications</p>
    <!-- PushAlert -->
    <script type="text/javascript">
      (function(d, t) {
        var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
        g.src = "https://cdn.pushalert.co/integrate_7b24b5a90fe158409148fefa1498b0e7";
        s.parentNode.insertBefore(g, s);
      }(document, "script"));
    </script>
    <!-- End PushAlert -->
    </body></html>
    `;

    try {
      return reply.type("text/html").send(html);
    } catch (error) {
      console.log("error", error);
    }
  });
};

export default routes;
