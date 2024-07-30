import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import PeopleList from "./components/lists/PeopleList";
import "./App.css";
import NewPerson from "./components/forms/NewPerson";
import NewCar from "./components/forms/NewCar";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <NewPerson />
        <NewCar />
        <PeopleList />
      </div>
    </ApolloProvider>
  );
}

export default App;
