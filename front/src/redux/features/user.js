const initialState = {
  loading: false,
  error: null,
  user: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "user/fetch/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "user/fetch/rejected":
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case "user/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "user/edit/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "user/edit/rejected":
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case "user/edit/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
        user: {
          ...state.user,
          name: action.payload.name,
          password: action.payload.password,
        },
      };
    case "image/edit/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "image/edit/rejected":
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case "image/edit/fulfilled":
      return {
        ...state,
        loading: false,
        error: null,
        user: { ...state.user, image: action.payload.image },
      };
    default:
      return state;
  }
}

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: "user/fetch/pending" });
    try {
      const res = await fetch("http://localhost:4000/people");
      const json = await res.json();
      if (json.error) {
        dispatch({
          type: "user/fetch/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "user/fetch/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "user/fetch/rejected", error: e.toString() });
    }
  };
};

export function editUser(name, password) {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      dispatch({ type: "user/edit/pending" });
      const res = await fetch("http://localhost:4000/user/patch", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      const json = await res.json();
      dispatch({ type: "user/edit/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "user/edit/rejected", error: e.toString() });
    }
  };
}

export const editAvatar = (image) => {
  return async (dispatch, getState) => {
    const state = getState();
    const data = new FormData();
    data.append("images", image);
    dispatch({ type: "image/edit/pending" });
    try {
      const res = await fetch("http://localhost:4000/patch/image", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
        body: data,
      });
      const json = await res.json();
      dispatch({ type: "image/edit/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "image/edit/rejected", error: e.toString() });
    }
  };
};
