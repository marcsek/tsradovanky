import { EventDataType, PopupComponentType } from "./types";
import { CustomNotePopupProps } from "../../types";

const PopUpService = {
  on(eventName: string, callback: (data: EventDataType) => void) {
    document.addEventListener(eventName, (e: any) => callback(e.detail));
  },

  remove(eventName: string) {
    document.removeEventListener(eventName, () => {});
  },

  open(component: PopupComponentType, customProps?: CustomNotePopupProps) {
    const eventDetail: EventDataType = { component, customProps };
    const event = new CustomEvent("open", { detail: eventDetail });
    document.dispatchEvent(event);
  },
};

export default PopUpService;
