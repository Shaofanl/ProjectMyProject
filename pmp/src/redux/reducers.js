import * as ACTIONTYPE from './actionTypes'

const initialState = {
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONTYPE.FILL_DATA: {
      return action.payload
    }
    case ACTIONTYPE.UPDATE_PROJ: {
      let {pid, data} = action.payload;
      let project_nxt_id = state.project_nxt_id;

      if (pid == -1) {
        pid = project_nxt_id;
        project_nxt_id += 1;
      }

      return {
        ...state,
        projects: {
          ...state.projects,
          [pid]: { ...state.projects[pid], ...data}
        },
        project_nxt_id
      };
    }
    case ACTIONTYPE.REMOVE_PROJ: {
      let pid = action.payload.pid;
      return {
        ...state,
        projects: {
          ...state.projects,
          [pid]: undefined
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
