import React from "react";
import { List } from "antd";
import { useQuery } from "@apollo/client";
import PersonCard from "../listItems/PersonCard"; // Ensure this path is correct
import { GET_PEOPLE } from "../../graphql/queries";

const PeopleList = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.people.map(({ id, firstName, lastName, cars }) => (
        <List.Item key={id}>
          <PersonCard
            firstName={firstName}
            id={id}
            lastName={lastName}
            cars={cars}
          />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

export default PeopleList;
