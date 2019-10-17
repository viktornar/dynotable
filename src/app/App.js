import React, { PureComponent } from "react";
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
import withCatsFetcher from "../hocs/withCatsFetcher";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortedCats: [],
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
  }

  handleSort(propToSort) {
    return sortDirection => {
      const { sortBy, sortedCats } = this.state;
      const index = sortBy.findIndex(({ prop }) => prop === propToSort);
      const newSortBy = [...sortBy];
      newSortBy[index].direction = sortDirection;
      const newCats = [...sortedCats];
      multipleSort(newCats, newSortBy);
      this.setState({ sortedCats: newCats, sortBy: newSortBy });
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { sortedCats } = prevState;
    const { cats } = this.props;
    if (sortedCats.length !== cats.length) {
      this.setState({ sortedCats: cats });
    }
  }

  render() {
    const { isFetching, error } = this.props;
    const { sortedCats } = this.state;
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
            {isFetching ? (
              <div className="App__loader">Data is fetching...</div>
            ) : (
              <>
                {sortedCats.length > 0 &&
                  sortedCats.map(({ id, name, country, favorite_greeting }) => (
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

export default withCatsFetcher(App, true);
