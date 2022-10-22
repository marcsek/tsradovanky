import { bClickActions } from "./types";
import { faker } from "@faker-js/faker";

const colors = ["#00AB55", "#FDA92D", "#2065D1", "#FF3030", "#7635DC"];

const FakerListGenerator: React.FC<{ dispatch: React.Dispatch<bClickActions> }> = ({ dispatch }) => {
  const generateData = () => {
    for (let i = 0; i < 10; i++) {
      const color = faker.helpers.arrayElement(colors);
      dispatch({ type: "add", props: { title: faker.name.fullName(), value: faker.lorem.words(33), color } });
    }
  };

  return <button onClick={generateData} style={{ width: 5, height: 5, backgroundColor: "black", outline: "none", border: "none" }}></button>;
};

export default FakerListGenerator;
