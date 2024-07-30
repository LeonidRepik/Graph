import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CAR, GET_CARS } from "../../graphql/queries";
import filter from "lodash/filter";

const RemoveContact = ({ id }) => {
  const [removeCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: cars.filter((car) => car.id !== removeCar.id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    console.log(`${id} is id`);
    if (result) {
      removeCar({
        variables: { id },
      });
    }
  };

  return (
    <DeleteOutlined
      onClick={handleButtonClick}
      key="delete"
      style={{ color: "red" }}
    />
  );
};

export default RemoveContact;
