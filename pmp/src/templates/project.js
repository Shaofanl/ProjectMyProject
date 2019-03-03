import moment from 'moment'

export const get_init_project = () => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  return {
      dimensions: {},
      title: "",
      subtitle: "",
      start_date: date,
      is_ongoing: false,
      end_date: date,
      description: ""
  };
}

export const init_user_data = {
  theme: "",
  dimensions: ["Category"],
  project_nxt_id: 1,
  projects: {
    0: {
      dimensions: {"Category": ["Example", "coding"]},
      title: "Example project",
      subtitle: "This is an example project",
      start_date: "2019-01-01",
      is_ongoing: false,
      end_date: "2020-01-01",
      description: 
`Example Project
====

You should write description using markdown.
`
    }
  } 
};


