import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE, ADD_CAR, GET_CARS } from "../../graphql/queries";

const { Option } = Select;

const NewCar = () => {
  const [, forceUpdate] = useState();
  const [form] = Form.useForm();
  const { data, loading, error } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    const id = uuidv4();

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });

        cache.writeQuery({
          query: GET_CARS,
          data: {
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form
      name="add-car-form"
      layout="inline"
      size="large"
      style={{ margin: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please enter the year" }]}
      >
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please enter the make" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please select a person" }]}
      >
        <Select placeholder="Select Person">
          {data.people.map((person) => (
            <Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        <Button type={"primary"} htmlType="submit">
          Add Car
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCar;
