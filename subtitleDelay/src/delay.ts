const delay = (subtitleString: string, delay: number): string => {
  interface subtitleObj {
    lineNumber: number;
    beforeTime: string;
    afterTime: string;
    string: string;
  }
  const subs = subtitleString.split("\n\r\n");
  const convertedSubs: subtitleObj[] = [];

  subs.pop();
  subs.forEach((sub, index) => {
    let strings = sub.split("\n");
    let string: string = "";
    strings.forEach((st, index) => {
      if (index == 2) {
        string = st + "\n";
      } else if (index > 2) {
        string += st;
      }
    });

    let beforeTime = sub.split("\n")[1].split(" --> ")[0];

    const bTmillSecs = beforeTime.split(",")[1];
    const beforeTimeOnly = beforeTime.split(",")[0];
    let bTHours = parseInt(beforeTimeOnly.split(":")[0]);
    let bTMins = parseInt(beforeTimeOnly.split(":")[1]);
    let bTSecs = parseInt(beforeTimeOnly.split(":")[2]);

    // the delay is in milliseconds
    const delayInMins = Math.floor(delay / 1000 / 60);
    const delayInSecs = Math.floor((delay / 1000) % 60);

    bTSecs -= delayInSecs;
    bTMins -= delayInMins;

    while (bTSecs < 0) {
      bTSecs += 60;
      bTMins -= 1;
    }

    const bTHoursString = bTHours < 10 ? "0" + bTHours : bTHours;
    const bTMinsString = bTMins < 10 ? "0" + bTMins : bTMins;
    const bTSecsString = bTSecs < 10 ? "0" + bTSecs : bTSecs;

    const beforeTimeString = `${bTHoursString}:${bTMinsString}:${bTSecsString},${bTmillSecs}`;
    // const beforeTimeString = `${bTHours}:${bTMins}:${bTSecs},${bTmillSecs}`;

    let afterTime = sub.split("\n")[1];
    afterTime = afterTime.split(" --> ")[1];

    const aTmillSecs = afterTime.split(",")[1];
    const afterTimeOnly = afterTime.split(",")[0];
    let aTHours = parseInt(afterTimeOnly.split(":")[0]);
    let aTMins = parseInt(afterTimeOnly.split(":")[1]);
    let aTSecs = parseInt(afterTimeOnly.split(":")[2]);

    aTSecs -= delayInSecs;
    aTMins -= delayInMins;

    while (aTSecs < 0) {
      aTSecs += 60;
      aTMins -= 1;
    }

    const aTHoursString = aTHours < 10 ? "0" + aTHours : aTHours;
    const aTMinsString = aTMins < 10 ? "0" + aTMins : aTMins;
    const aTSecsString = aTSecs < 10 ? "0" + aTSecs : aTSecs;

    const afterTimeString = `${aTHoursString}:${aTMinsString}:${aTSecsString},${aTmillSecs}`;
    // const afterTimeString = `${aTHours}:${aTMins}:${aTSecs},${aTmillSecs}`;

    const subObj = {
      lineNumber: index + 1,
      beforeTime: beforeTimeString,
      afterTime: afterTimeString,
      string: string,
    };

    convertedSubs.push(subObj);
  });

  let finalString = "";

  convertedSubs.forEach((sub) => {
    finalString += `\n${sub.lineNumber}\n${sub.beforeTime} --> ${sub.afterTime}\n${sub.string}\n`;
  });

  return finalString;
};

export default delay;
