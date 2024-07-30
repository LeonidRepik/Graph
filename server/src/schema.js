import find from "lodash.find";
import remove from "lodash.remove";

const people = [
  { id: "1", firstName: "Bill", lastName: "Gates" },
  { id: "2", firstName: "Steve", lastName: "Jobs" },
  { id: "3", firstName: "Linux", lastName: "Torvalds" },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
  type Person {
    id: String!
    firstName: String
    lastName: String
    cars: [Car]
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }

  type Query {
    person(id: String!): Person 
    people: [Person]
    car(id: String!): Car
    cars: [Car]
  } 

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    deletePerson(id: String!): Person
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    deleteCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => {
      return people.map((person) => ({
        ...person,
        cars: cars.filter((car) => car.personId === person.id) || [],
      }));
    },
    person: (root, args) => {
      const person = find(people, { id: args.id });
      if (person) {
        person.cars = cars.filter((car) => car.personId === person.id) || [];
      }
      return person;
    },
    cars: () => cars,
    car: (root, args) => find(cars, { id: args.id }),
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
        cars: [],
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error("Person not found");
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    deletePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error("Person not found");
      remove(people, (p) => p.id === person.id);
      return person;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error("Car not found");
      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    deleteCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error("Car not found");
      remove(cars, (c) => c.id === car.id);
      return car;
    },
  },
};

export { typeDefs, resolvers };
