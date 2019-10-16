import React, { PureComponent } from "react";
import { take } from "lodash";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableColumn,
  TableBody,
  HeadRow,
  HeadColumn
} from "../components/dynoTable";
import "./App.scss";

const CATS_API =
  "https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      cats: []
    };

    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(CATS_API)
      .then(({ data: { cats } }) => {
        this.setState({ cats });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  handleSort(propToSort) {
    return sortOrder => {
      console.log(propToSort, sortOrder);
    };
  }

  render() {
    const { isLoading, cats } = this.state;
    const catsToShow = take(cats, 10);
    return (
      <div className="App">
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
              <div className="App__loader">Loading...</div>
            ) : (
              <>
                {catsToShow.length > 0 &&
                  catsToShow.map(({ id, name, country, favourite_greeting }) => (
                    <TableRow key={id}>
                      <TableColumn>{name}</TableColumn>
                      <TableColumn>{country}</TableColumn>
                      <TableColumn>{favourite_greeting}</TableColumn>
                    </TableRow>
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
