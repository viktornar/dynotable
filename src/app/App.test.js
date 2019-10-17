import React, { Component } from "react";
import { mount } from "enzyme";
import { App } from "./App";

const cats = [
  {
    id: "4e3f919c-50d5-53c3-9e95-b8c625656c48",
    age: 12,
    country: "Guam",
    favorite_greeting: "feed me",
    name: "pitxi"
  },
  {
    id: "94749af1-f551-56c3-9de6-26ee2635174b",
    age: 10,
    country: "Somalia",
    favorite_greeting: "feed she and me",
    name: "pitxi"
  },
  {
    id: "ddd20373-2db8-56dd-abc7-4d22d0f9bbbb",
    age: 10,
    country: "Morocco",
    favorite_greeting: "feed you and me",
    name: "pitxi"
  },
  {
    id: "684ced36-004f-5487-972e-979f315fe8b0",
    age: 15,
    country: "Belize",
    favorite_greeting: "feed you and me",
    name: "kitty"
  },
  {
    id: "bc88619b-05ae-52f8-8908-6d17baea77d8",
    age: 4,
    country: "Nicaragua",
    favorite_greeting: "feed he and me",
    name: "pitxi"
  }
];

function withCatsFetcherMock(WrappedComponent) {
  return class CatsFetcherMock extends Component {
    render() {
      return (
        <WrappedComponent
          data={cats}
          isFetching={false}
          error={null}
          {...this.props}
        />
      );
    }
  };
}

describe("App component", () => {
  it("renders without crashing", async () => {
    const WithCatsFetcherApp = withCatsFetcherMock(App);
    mount(<WithCatsFetcherApp />);
  });
});
