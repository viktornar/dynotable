import React from "react";
import { shallow } from "enzyme";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  it("should render", () => {
    shallow(<Pagination onPaginationChange={() => {}} />);
  });

  it("on click should increase or decrease page number", () => {
    const wrapped = shallow(<Pagination onPaginationChange={() => {}} count={100} rowsPerPage={10} />);
    wrapped
      .find("button")
      .first()
      .simulate("click");
    
    expect(wrapped.find("div > div").text()).toBe("Page: 1");

    wrapped
      .find("button")
      .last()
      .simulate("click");
    
    expect(wrapped.find("div > div").text()).toBe("Page: 2");

    wrapped
      .find("button")
      .first()
      .simulate("click");

      expect(wrapped.find("div > div").text()).toBe("Page: 1");
  });
});
