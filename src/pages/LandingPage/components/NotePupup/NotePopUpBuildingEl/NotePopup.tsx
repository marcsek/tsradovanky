import React, { useState } from "react";
import { ElementColors, NewNoteInpuType, NewNoteFormType } from "../../../types";
import { PopupChildProps } from "../types";

interface NewNotePopupExtra {
  children?: JSX.Element;
  defaultFormValues: NewNoteFormType;
  handleClose: () => void;
}

const NewNotePopup: React.FC<NewNotePopupExtra> = ({ children, defaultFormValues, handleClose }) => {
  const [formValues, setFormValues] = useState<NewNoteFormType>(defaultFormValues);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { color, ...onlyTextValues } = formValues;

    if (onlyTextValues[event.target.name as keyof NewNoteInpuType].maxSize >= event.target.value.length) {
      setFormValues({
        ...formValues,
        [event.target.name]: { ...onlyTextValues[event.target.name as keyof NewNoteInpuType], value: event.target.value },
      });
    }
  };

  const handleCloseExtended = () => {
    setFormValues(defaultFormValues);
    handleClose();
  };

  const handleColorChange = (color: ElementColors) => {
    setFormValues({ ...formValues, color });
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<PopupChildProps>(child)) {
      return React.cloneElement(child, {
        handleColorChange,
        handleInputChange,
        formValues,
        initialValues: defaultFormValues,
        handleClose: handleCloseExtended,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default NewNotePopup;
