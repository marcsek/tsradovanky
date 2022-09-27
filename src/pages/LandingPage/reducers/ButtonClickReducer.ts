import { ListValues, bClickActions } from "../types";

const ButtonClickReducer = (state: ListValues, action: bClickActions): ListValues => {
  switch (action.type) {
    case "add":
      if (state.find((listValue) => listValue.value === action.value) !== undefined) return state;
      return [...state, { value: action.value, id: Math.random() * 100 }];
    case "remove":
      if (action.idx !== undefined) {
        return state.filter((_, index) => action.idx !== index);
      }
      return [];
    default:
      return state;
  }
};

export default ButtonClickReducer;
