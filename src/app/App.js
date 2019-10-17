import React, { PureComponent } from "react";
import clsx from "classnames";
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
import { multipleSort, sliceByRange } from "../utils";
import withCatsFetcher from "../hocs/withCatsFetcher";
import Settings from "../components/settings/Settings";

const ROWS_PER_PAGE = 10;

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
      currentPage: 1,
      selectedItemId: ""
    };

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.data.length !== this.props.data.length) {
      this.setState({ data: this.props.data });
    }
  }

  handleSortChange(propToSort) {
    return sortDirection => {
      const { sortBy } = this.state;
      const index = sortBy.findIndex(({ prop }) => prop === propToSort);
      const newSortBy = [...sortBy];
      newSortBy[index].direction = sortDirection;
      this.setState({
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

  handleRowClick(selectedItemId) {
    this.setState({selectedItemId})
  }

  render() {
    const { isFetching, error } = this.props;
    const { isPagination, data, currentPage, sortBy, selectedItemId } = this.state;
    multipleSort(data, sortBy);
    const dataToShow = isPagination ? sliceByRange(data, currentPage, ROWS_PER_PAGE) : data;

    return (
      <div className="App">
        {error && (
          <div className="App__error">Unexpected error occured: {error}</div>
        )}
        <Settings onSettingsChange={(this.handleSettingsChange)} defaultPagination={isPagination} />
        <Table
          isPagination={isPagination}
          count={data.length}
          rowsPerPage={ROWS_PER_PAGE}
          onPaginationChange={this.handlePaginationChange}
        >
          <TableHead>
            <HeadRow>
              <HeadColumn onSortChange={this.handleSortChange("name")}>
                Name
              </HeadColumn>
              <HeadColumn onSortChange={this.handleSortChange("country")}>
                Country
              </HeadColumn>
              <HeadColumn onSortChange={this.handleSortChange("favorite_greeting")}>
                Greeting
              </HeadColumn>
            </HeadRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <div className="App__loader">Data is fetching...</div>
            ) : (
              <>
                {dataToShow.length > 0 &&
                  dataToShow.map(({ id, name, country, favorite_greeting }) => { 
                    const selectedClassName = clsx({
                      "App__table-row--selected": selectedItemId === id
                    });
                    return (
                    <BodyRow key={id} itemId={id} onRowClick={this.handleRowClick}>
                      <BodyColumn className={selectedClassName}>{name}</BodyColumn>
                      <BodyColumn className={selectedClassName}>{country}</BodyColumn>
                      <BodyColumn className={selectedClassName}>{favorite_greeting}</BodyColumn>
                    </BodyRow>
                  )})}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withCatsFetcher(App, true);
