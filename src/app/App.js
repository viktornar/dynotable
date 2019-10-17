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
      sortedData: [],
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
      const { sortBy, sortedData } = this.state;
      const index = sortBy.findIndex(({ prop }) => prop === propToSort);
      const newSortBy = [...sortBy];
      newSortBy[index].direction = sortDirection;
      const newCats = [...sortedData];
      multipleSort(newCats, newSortBy);
      this.setState({ sortedData: newCats, sortBy: newSortBy });
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { sortedData } = prevState;
    const { data } = this.props;
    if (sortedData.length !== data.length) {
      this.setState({ sortedData: data });
    }
  }

  render() {
    const { isFetching, error } = this.props;
    const { sortedData } = this.state;
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
                {sortedData.length > 0 &&
                  sortedData.map(({ id, name, country, favorite_greeting }) => (
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
