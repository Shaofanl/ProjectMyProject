import * as ACTIONTYPE from './actionTypes'
import { get_init_project } from '../templates/project.js'

const initialState = {
};

const copy_obj_except = (raw, exclude_key) => {
  return raw?Object.keys(raw)
    .filter(key => exclude_key!==key)
    .reduce((acc, key) => ({...acc, [key]: raw[key]}), {}):{};
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONTYPE.FILL_DATA: {
      return action.payload
    }
    case ACTIONTYPE.REMOVE_DIM: {
      let did = action.payload.did;

      return {
        ...state,
        projects:
          Object.entries(state.projects).reduce((acc, [pid, proj]) =>
              ({ ...acc,
                [pid]: {
                  ...proj,
                  dimensions: copy_obj_except(proj.dimensions, did)
                }
              }), {}),
        dimensions: copy_obj_except(state.dimensions, did)
      }
    }
    case ACTIONTYPE.UPDATE_DIM: {
      let {did, data} = action.payload;
      let dim_nxt_id = state.dim_nxt_id;

      if (did === -1) {
        data = "";
        did = dim_nxt_id;
        dim_nxt_id += 1;
      }

      return {
        ...state,
        dim_nxt_id,
        dimensions: {
          ...state.dimensions,
          [did]: data
        }
      }
    }
    case ACTIONTYPE.UPDATE_PROJ: {
      let {pid, data} = action.payload;
      let project_nxt_id = state.project_nxt_id;
      let prev_data = {};

      if (pid === -1) {
        pid = project_nxt_id;
        project_nxt_id += 1;

        data = get_init_project();
      }
      else
        prev_data = state.projects[pid];

      return {
        ...state,
        projects: {
          ...state.projects,
          [pid]: { ...prev_data , ...data}
        },
        project_nxt_id
      };
    }
    case ACTIONTYPE.REMOVE_PROJ: {
      let pid = action.payload.pid;
      return {
        ...state,
        projects: copy_obj_except(state.projects, pid)
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
