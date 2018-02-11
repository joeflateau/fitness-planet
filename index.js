const rp = require("request-promise");
const moment = require("moment");

const planetFitnessClubNumber = 7000;

const signin = (username, password) => {
  const jar = rp.jar();
  const client = rp.defaults({ jar, followAllRedirects: true });
  return Promise.resolve()
    .then(() => {
      return client("https://www.myiclubonline.com/iclub/members/signin.htm", {
        qs: { clubNumber: planetFitnessClubNumber }
      });
    })
    .then(resp => {
      return client(
        "https://www.myiclubonline.com/iclub/j_spring_security_check",
        {
          method: "POST",
          form: {
            "spring-security-redirect": "",
            j_username: username,
            j_password: password
          }
        }
      );
    })
    .then(() => client);
};

module.exports = class FitnessPlanet {
  signin(username, password) {
    this.client = signin(username, password);
    return this;
  }

  getCheckins(lowDate, highDate) {
    const client = this.client;

    if (this.client == null) throw new Error("You have to sign in first");

    return client
      .then(client => {
        return client(
          "https://www.myiclubonline.com/iclub/account/checkInHistory.htm",
          {
            qs: {
              lowDate: moment(lowDate).format("MM/DD/YYYY"),
              highDate: moment(highDate).format("MM/DD/YYYY")
            }
          }
        );
      })
      .then(resp => JSON.parse(resp))
      .then(resp => toMomentArray(resp));
  }
};

function toMomentArray(arr = []) {
  return arr.map(checkin =>
    moment(`${checkin.date} ${checkin.time}`, "MM/DD/YYYY hh:mm a")
  );
}
