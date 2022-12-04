import { createContext } from "react";

const DropContext = createContext<{ setDropOpen: React.Dispatch<React.SetStateAction<boolean>> }>({ setDropOpen: () => {} });

export default DropContext;
