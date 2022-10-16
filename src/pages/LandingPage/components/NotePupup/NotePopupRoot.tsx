import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { bClickActions } from "../../types";
import NotePopupService from "./NotePopupService";
import { EventDataType, PopupComponentType } from "./types";

interface RootPopupCompType extends EventDataType {
  close: () => void;
}

interface ListHeaderProps {
  dispatch: React.Dispatch<bClickActions>;
  doesAlreadyExist: (newValue: string) => boolean;
}

const defaultPopUpCompState: RootPopupCompType = { component: null, close: () => {} };

export const NotePopupRoot: React.FC<ListHeaderProps> = ({ dispatch, doesAlreadyExist }) => {
  const [popUpComp, setPopUpComp] = useState<RootPopupCompType>(defaultPopUpCompState);

  useEffect(() => {
    NotePopupService.on("open", ({ component, customProps }) => {
      setPopUpComp({
        component,
        customProps,
        close: () => {
          setPopUpComp(defaultPopUpCompState);
        },
      });
    });

    return () => {
      NotePopupService.remove("open");
    };
  }, []);

  const PopupComponent: PopupComponentType = popUpComp.component ? popUpComp.component : null;

  return (
    <AnimatePresence>
      {PopupComponent && (
        <PopupComponent
          {...popUpComp.customProps}
          dispatch={dispatch}
          doesAlreadyExist={doesAlreadyExist}
          handleClose={popUpComp.close}
        ></PopupComponent>
      )}
    </AnimatePresence>
  );
};

export default NotePopupRoot;
