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
import Settings from "../components/settings/Settings";

const ROWS_PER_PAGE = 10;

export class App extends PureComponent {
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
      ],
      isPagination: true,
      currentPage: 1
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { sortedData } = prevState;
    const { data } = this.props;
    if (sortedData.length !== data.length) {
      this.setState({ sortedData: data });
    }
  }

  handleSort(propToSort) {
    return sortDirection => {
      const { sortBy, sortedData } = this.state;
      const index = sortBy.findIndex(({ prop }) => prop === propToSort);
      const newSortBy = [...sortBy];
      newSortBy[index].direction = sortDirection;
      const newData = [...sortedData];
      multipleSort(newData, newSortBy);
      this.setState({
        sortedData: newData,
        sortBy: newSortBy
      });
    };
  }

  handleSettingsChange({ isPagination }) {
    this.setState({ isPagination });
  }

  handlePaginationChange(currentPage) {
    this.setState({ currentPage });
  }

  getSlicedData(sortedData, currentPage, isPagination) {
    return isPagination
      ? sortedData.slice(
          (currentPage - 1) * ROWS_PER_PAGE,
          currentPage * ROWS_PER_PAGE
        )
      : sortedData;
  }

  render() {
    const { isFetching, error } = this.props;
    const { isPagination, sortedData, currentPage } = this.state;
    const data = this.getSlicedData(sortedData, currentPage, isPagination);

    return (
      <div className="App">
        {error && (
          <div className="App__error">Unexpected error occured: {error}</div>
        )}
        <Settings onSettingsChange={(this.handleSettingsChange)} defaultPagination={isPagination} />
        <Table
          isPagination={isPagination}
          count={sortedData.length}
          rowsPerPage={ROWS_PER_PAGE}
          onPaginationChange={this.handlePaginationChange}
        >
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
                {data.length > 0 &&
                  data.map(({ name, country, favorite_greeting }, idx) => (
                    <BodyRow key={idx}>
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
