const _ = require("lodash");
const { URL } = require("url");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");


module.exports = (body, p) => {
    _.chain(body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponede: new Date(),
          }
        ).exec();
      })
      .value();
}