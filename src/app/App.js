import React, { PureComponent } from "react";
import { debounce, take } from "lodash";
import axios from "axios";
import {
  Table,
  TableHead,
  BodyRow,
  BodyColumn,
  TableBody,
  HeadRow,
  HeadColumn
} from "../components/dynoTable";
import "./App.scss";
import { multipleSort } from "../utils";

const CATS_API =
  "https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      cats: [],
      sortBy: [
        {
          prop: "name",
          direction: 0
        },
        {
          prop: "country",
          direction: 0
        },
        {
          prop: "favorite_greeting",
          direction: 0
        }
      ]
    };

    this.handleSort = this.handleSort.bind(this);
    this.fetchCats = this.fetchCats.bind(this);
    this.loadWithDebounce = this.loadWithDebounce.bind(this);
  }

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats() {
    this.setState({ isLoading: true });
    axios
      .get(CATS_API)
      .then(({ data: { cats } }) => {
        this.loadWithDebounce(cats, 0, 100);
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  loadWithDebounce(cats, start, end) {
    this.setState(
      { cats: [...this.state.cats, ...cats.slice(start, end)] },
      () => {
        debounce(() => {
          this.loadWithDebounce(cats, end, end + 100)
        }, 500)();
      }
    );
  }

  handleSort(propToSort) {
    return sortDirection => {
      const { sortBy, cats } = this.state;
      const index = sortBy.findIndex(({ prop }) => prop === propToSort);
      const newSortBy = [...sortBy];
      newSortBy[index].direction = sortDirection;
      const newCats = [...cats];
      multipleSort(newCats, newSortBy);
      this.setState({ cats: newCats, sortBy: newSortBy });
    };
  }

  render() {
    const { isLoading, cats, error } = this.state;
    return (
      <div className="App">
        {error && (
          <div className="App__error">Unexpected error occured: {error}</div>
        )}
        <Table>
          <TableHead>
            <HeadRow>
              <HeadColumn onSortChange={this.handleSort("name")}>
                Name
              </HeadColumn>
              <HeadColumn onSortChange={this.handleSort("country")}>
                Country
              </HeadColumn>
              <HeadColumn onSortChange={this.handleSort("favorite_greeting")}>
                Greeting
              </HeadColumn>
            </HeadRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <div className="App__loader">Data is fetching...</div>
            ) : (
              <>
                {cats.length > 0 &&
                  cats.map(({ id, name, country, favorite_greeting }) => (
                    <BodyRow key={id}>
                      <BodyColumn>{name}</BodyColumn>
                      <BodyColumn>{country}</BodyColumn>
                      <BodyColumn>{favorite_greeting}</BodyColumn>
                    </BodyRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default App;
