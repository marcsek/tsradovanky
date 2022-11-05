import { EventDataType, PopupComponentType, CustomNotePopupProps } from "./types";

const PopUpService = {
  on(eventName: string, callback: (data: EventDataType) => void) {
    document.addEventListener(eventName, (e: any) => callback(e.detail));
  },

  remove(eventName: string) {
    document.removeEventListener(eventName, () => {});
  },

  open(component: PopupComponentType, customProps?: CustomNotePopupProps) {
    const event = new CustomEvent("open", { detail: { component, customProps } as EventDataType });
    document.dispatchEvent(event);
  },
};

export default PopUpService;
