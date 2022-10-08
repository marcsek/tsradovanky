import { ListValues, bClickActions } from "../types";
import { v4 as uuidv4 } from "uuid";

const ButtonClickReducer = (state: ListValues, action: bClickActions): ListValues => {
  let stateCopy = [...state];

  switch (action.type) {
    case "add":
      return [...state, { title: action.props.title, value: action.props.value, id: uuidv4(), checked: false, date: new Date() }];

    case "removeSelected":
      let newArray: ListValues = [];
      if (action.ids !== undefined) {
        state.forEach((listElement) => {
          if (!action.ids?.includes(listElement.id)) {
            newArray.push(listElement);
          }
        });
        return newArray;
      }
      // ak undefined deletnu sa vsetky
      state.forEach((listElement) => {
        if (!listElement.checked) {
          newArray.push(listElement);
        }
      });
      return newArray;

    case "check":
      if (action.id !== undefined) {
        let itemToCheck = stateCopy.find((el) => el.id === action.id);
        if (itemToCheck) {
          itemToCheck.checked = action.value;
          return stateCopy;
        }
      }
      if (action.ids !== undefined) {
        stateCopy.forEach((el) => {
          if (action.ids?.includes(el.id)) {
            el.checked = action.value;
            return el;
          }
        });
        return stateCopy;
      }

      stateCopy.forEach((listElement) => {
        listElement.checked = action.value;
        return listElement;
      });
      return stateCopy;

    case "reorder":
      return action.reorderedState;

    default:
      return state;
  }
};

export default ButtonClickReducer;
