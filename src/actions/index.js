import {formResults} from '../firebase'
export const FETCH_TODOS = 'FETCH_TODOS'

export const addToDo = newToDo => async dispatch => {
  formResults.push().set(newToDo);
};

export const completeToDo = completeToDo => async dispatch => {
  formResults.child(completeToDo).remove();
};

export const fetchToDos = () => async dispatch => {
  formResults.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
