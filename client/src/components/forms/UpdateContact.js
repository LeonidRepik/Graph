import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR, GET_CARS } from "../../graphql/queries";

const UpdateContact = ({
  id,
  year,
  make,
  model,
  price,
  personId,
  setEditingCarId,
}) => {
  const [form] = Form.useForm();

  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    form.setFieldsValue({ year, make, model, price });
  }, [form, year, make, model, price]);

  const onFinish = (values) => {
    console.log("Updating car with values:", { id, personId, ...values });
    updateCar({
      variables: { id, personId, ...values },
      refetchQueries: [{ query: GET_CARS }],
    })
      .then(() => {
        setEditingCarId(null);
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      });
  };

  return (
    <Form
      form={form}
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please enter a make" }]}
      >
        <Input placeholder="make" />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please enter a model" }]}
      >
        <Input placeholder="model" />
      </Form.Item>
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <Input placeholder="year" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please enter a price" }]}
      >
        <Input placeholder="price" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button onClick={() => setEditingCarId(null)} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateContact;
