import * as ACTIONTYPE from './actionTypes'

export const fillData = data => ({
  type: ACTIONTYPE.FILL_DATA,
  payload: data
});

export const updateProj = (pid, data) => ({
  type: ACTIONTYPE.UPDATE_PROJ,
  payload: {pid, data}
});

export const removeProj = pid => ({
  type: ACTIONTYPE.REMOVE_PROJ,
  payload: {pid}
});
