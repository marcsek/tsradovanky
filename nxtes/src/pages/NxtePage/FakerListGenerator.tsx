import { faker } from "@faker-js/faker";

const colors = ["#00AB55", "#FDA92D", "#2065D1", "#FF3030", "#7635DC"];

const FakerListGenerator: React.FC = () => {
  const generateData = () => {
    for (let i = 0; i < 10; i++) {
      const color = faker.helpers.arrayElement(colors);
      // dispatch({ type: "add", props: { title: faker.name.fullName(), value: faker.lorem.words(33), color } });
    }
  };

  return (
    <button
      onClick={generateData}
      style={{ width: 5, height: 5, backgroundColor: "black", outline: "none", border: "none", marginLeft: "20px" }}
    ></button>
  );
};

export default FakerListGenerator;
