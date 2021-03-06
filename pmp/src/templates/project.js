import moment from 'moment'

export const get_init_project = (dims) => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  return {
      dimensions: Object.keys(dims).reduce((acc, did) => 
                      ({ ...acc, [did]: "" }), {}),
      title: "",
      subtitle: "",
      start_date: date,
      is_ongoing: false,
      end_date: date,
      description: ""
  };
}

export const init_user_template = {
  theme: "",
  dimensions: {"1":"Category"},
  project_nxt_id: 2,
  dim_nxt_id: 2,
  projects: {
    1: {
      dimensions: {"1": "coding;here"},
      title: "Example project",
      subtitle: "This is an example project",
      start_date: "2019-01-01",
      is_ongoing: false,
      end_date: "2020-01-01",
      description: 
`Example Project
====

You should write description in markdown if you are going to use the default theme.
`
    }
  } 
};


