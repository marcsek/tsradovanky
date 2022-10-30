import { useContext } from "react";
import { UserContext } from "./UserContext";

export const checkIfProtected = <TProps extends object>(Component: React.FunctionComponent<TProps>) => {
  return (props: TProps) => {
    const { user } = useContext(UserContext);

    return <>{user ? <Component {...props} /> : <div>Please log in</div>}</>;
  };
};
