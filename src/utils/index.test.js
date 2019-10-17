import { multipleSort, sliceByRange } from "./index";

const sortBy = [
  {
    prop: "age",
    direction: 1
  },
  {
    prop: "country",
    direction: 1
  }
];

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

describe("Utility", () => {
  it("multipleSort should sort cats by multiple properties", () => {
    multipleSort(cats, sortBy);
    expect(cats[0].age).toBe(4);
    expect(cats[0].country).toBe("Nicaragua");
    expect(cats[4].age).toBe(15);
    expect(cats[2].country).toBe("Somalia");
    expect(cats[4].age).toBe(15);
  });

  it("sliceByRange should slice data", () => {
    const slicedCats1 = sliceByRange(cats, 1, 1);
    expect(slicedCats1.length).toBe(1);
    const slicedCats2 = sliceByRange(cats, 1, 2);
    expect(slicedCats2.length).toBe(2);
    const slicedCats3 = sliceByRange(cats, 1, 3);
    expect(slicedCats3.length).toBe(3);
  })
});
