const initialState = {
  signingUp: false,
  singingIn: false,
  error: null,
  done: false,
  token: localStorage.getItem("token"),
  Id: localStorage.getItem("Id"),
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case "application/signup/pending":
      return {
        ...state,
        signingUp: true,
        singingIn: false,
        error: null,
        done: false,
      };
    case "application/signup/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false,
      };
    case "application/signup/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true,
      };
    case "application/signin/pending":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: false,
        role: null,
      };
    case "application/signin/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false,
        role: null,
      };
    case "application/signin/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true,
        token: action.payload.token,
        Id: action.payload.id,
        role: action.payload.role,
      };
    case "application/logout/fulfilled":
      return {
        ...state,
        token: null,
        id: null,
      };
    default:
      return state;
  }
}

export const createUser = (name, mail, password, birthday, gender, image) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });
    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        mail,
        password,
        birthday,
        gender,
        image,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (json.error) {
      dispatch({
        type: "application/signup/rejected",
        error: json.error,
      });
    } else {
      dispatch({
        type: "application/signup/fulfilled",
        payload: json,
      });
    }
  };
};

export const signin = (mail, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });
    const res = await fetch("http://localhost:4000/signin", {
      method: "POST",
      body: JSON.stringify({ mail, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (json.error) {
      dispatch({
        type: "application/signin/rejected",
        error: json.error,
      });
    } else {
      dispatch({
        type: "application/signin/fulfilled",
        payload: json,
      });
      localStorage.setItem("token", json.token);
      localStorage.setItem("Id", json.id);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "application/logout/fulfilled" });
    localStorage.clear();
  };
};
