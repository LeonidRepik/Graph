import React, { useState } from "react";
import { Card, List } from "antd";
import RemoveContact from "../buttons/RemoveContact";
import UpdateContact from "../forms/UpdateContact";
import { EditOutlined } from "@ant-design/icons";

const PersonCard = (props) => {
  const { firstName, lastName, cars } = props;
  const [editingCarId, setEditingCarId] = useState(null);

  const handleEditClick = (carId) => {
    setEditingCarId(carId);
  };

  return (
    <div>
      <Card title={`${firstName} ${lastName}`}>
        <List
          dataSource={cars}
          renderItem={(car) => (
            <List.Item
              actions={[
                <RemoveContact id={car.id} size="small">
                  Delete
                </RemoveContact>,
                <EditOutlined
                  key="edit"
                  onClick={() => handleEditClick(car.id)}
                />,
              ]}
            >
              {editingCarId === car.id ? (
                <UpdateContact
                  id={car.id}
                  year={car.year}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                  personId={car.personId}
                  setEditingCarId={setEditingCarId}
                />
              ) : (
                `${car.year} ${car.make} ${car.model} - $${car.price}`
              )}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default PersonCard;
