export const utils = {
  checkError: (validationReports) => {
    for (const report of validationReports) {
      for (const prop in report) {
        if (report[prop]) return true;
      }
    }

    return false;
  },
  showError: (reports, dispatchers) => {
    for (let i = 0; i < reports.length; i++) {
      for (const prop in reports[i]) {
        if (reports[i][prop]) {
          dispatchers[i]({
            type: `error-${prop}`,
            payload: {
              error: true,
              msg: reports[i][prop],
            },
          });
        }
      }
    }
  },
  resetError: (action, dispatch) => {
    dispatch({
      type: action,
      payload: { error: false, msg: "" },
    });
  },
};
