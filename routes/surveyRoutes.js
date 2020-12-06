const { Path } = require("path-parser");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredit = require("../middleware/requireCredits");
const Survey = mongoose.model("surveys");
const choise = require('../helper/choise')
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Wow");
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select(
      (recipients = false)
    );

    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    choise(req.body, p)
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredit, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  })
};
