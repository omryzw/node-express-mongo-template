const tlPosts = require('./tlpost')

module.exports = (app) => {
    app.get("/", (req, res) => {
      res.status(200).send({
        message:
          "Welcome to Omnisoft API",
      });
    });

    app.use('/tlpost', tlPosts);

}