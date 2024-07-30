import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";

const NewPerson = () => {
  const [, forceUpdate] = useState();
  const [form] = Form.useForm();

  const [addPerson] = useMutation(ADD_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    const id = uuidv4(); // Generate a new unique id for each person

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form
      name="add-contact-form"
      layout="inline"
      size="large"
      style={{ margin: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        <Button type={"primary"} htmlType="submit">
          Add Person
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPerson;
