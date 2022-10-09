import { bClickActions } from "./types";
import { faker } from "@faker-js/faker";

const FakerListGenerator: React.FC<{ dispatch: React.Dispatch<bClickActions> }> = ({ dispatch }) => {
  const generateData = () => {
    for (let i = 0; i < 10; i++) {
      dispatch({ type: "add", props: { title: faker.name.fullName(), value: faker.lorem.words(40) } });
    }
  };

  return <button onClick={generateData} style={{ width: 5, height: 5, backgroundColor: "black", outline: "none", border: "none" }}></button>;
};

export default FakerListGenerator;
