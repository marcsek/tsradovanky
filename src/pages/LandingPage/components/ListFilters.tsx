import { bClickActions } from "../types";
interface ListControlProps {
  dispatch: React.Dispatch<bClickActions>;
  shouldBeChecked: boolean;
  setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const ListFilters: React.FC<ListControlProps> = ({ dispatch, shouldBeChecked, setFilters }) => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setFilters(e.target.value);
        }}
      ></input>
      <input
        type="checkbox"
        checked={shouldBeChecked}
        onChange={(e) => {
          dispatch({ type: "check", value: e.target.checked });
        }}
      ></input>
    </div>
  );
};

export default ListFilters;
