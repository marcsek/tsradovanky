import { ListValues, bClickActions } from "../types";

const ButtonClickReducer = (state: ListValues, action: bClickActions): ListValues => {
  let stateCopy = [...state];

  switch (action.type) {
    case "add":
      return [...state, { value: action.value, id: Math.random() * 100, checked: false }];

    case "removeSelected":
      let newArray: ListValues = [];

      if (action.ids !== undefined) {
        state.forEach((listElement) => {
          if (!action.ids?.includes(listElement.id) || !listElement.checked) {
            newArray.push(listElement);
          }
        });
        return newArray;
      }

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

    default:
      return state;
  }
};

export default ButtonClickReducer;
