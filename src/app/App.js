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
import { multipleSort, sliceByRange, sliceAndAddByRange } from "../utils";
import withCatsFetcher from "../hocs/withCatsFetcher";
import Settings from "../components/settings/Settings";
import Modal from "../components/modal/Modal";

const ROWS_PER_PAGE = 10;
const ROWS_PER_SCROLL = 100;

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
      currentScroll: 1,
      selectedItemId: "",
      showModal: false,
      selectedItem: {}
    };

    this.ticking = false;
    this.lastKnownScrollPosition = 0;
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.handleLazyLoadOnScroll = this.handleLazyLoadOnScroll.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.data.length !== this.props.data.length) {
      this.setState({ data: this.props.data });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleLazyLoadOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleLazyLoadOnScroll);
  }

  handleLazyLoadOnScroll() {
    this.lastKnownScrollPosition = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const pageHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight
        );
        const scrollDistanceFromBottom =
          pageHeight - (window.pageYOffset + window.innerHeight);

        if (scrollDistanceFromBottom < 150) {
          this.setState({ currentScroll: this.state.currentScroll + 1 });
          window.scrollTo = this.lastKnownScrollPosition - 200;
        }

        this.ticking = false;
      });

      this.ticking = true;
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

  handleRowClick(selectedItem) {
    return _evt => {
      this.setState({
        selectedItemId: selectedItem.id,
        showModal: true,
        selectedItem
      });
    };
  }

  handleModalButtonClick() {
    this.setState({ showModal: false });
  }

  render() {
    const { isFetching, error } = this.props;
    const {
      isPagination,
      data,
      currentPage,
      currentScroll,
      sortBy,
      selectedItemId,
      selectedItem,
      showModal
    } = this.state;
    multipleSort(data, sortBy);
    const dataToShow = isPagination
      ? sliceByRange(data, currentPage, ROWS_PER_PAGE)
      : sliceAndAddByRange(data, currentScroll, ROWS_PER_SCROLL);

    return (
      <div className="App">
        {error && (
          <div className="App__error">
            Unexpected error occured: {error.message}
          </div>
        )}
        <Settings
          onSettingsChange={this.handleSettingsChange}
          defaultPagination={isPagination}
        />
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
              <HeadColumn
                onSortChange={this.handleSortChange("favorite_greeting")}
              >
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
                  dataToShow.map(
                    ({ id, name, country, favorite_greeting }, idx) => {
                      const selectedClassName = clsx({
                        "App__table-row--selected": selectedItemId === id
                      });

                      return (
                        <BodyRow
                          key={id}
                          onRowClick={this.handleRowClick({
                            id,
                            name,
                            country,
                            favorite_greeting
                          })}
                        >
                          <BodyColumn className={selectedClassName}>
                            {name}
                          </BodyColumn>
                          <BodyColumn className={selectedClassName}>
                            {country}
                          </BodyColumn>
                          <BodyColumn className={selectedClassName}>
                            {favorite_greeting}
                          </BodyColumn>
                        </BodyRow>
                      );
                    }
                  )}
              </>
            )}
          </TableBody>
        </Table>
        {showModal && (
          <Modal>
            <div className="flexContainer">
              <div className="flexChild rowParent">
                <div className="flexChild columnParent">
                  <BodyRow>
                    <div className="flexChild columnParent App__modal-table-head">
                      <BodyColumn>Name</BodyColumn>
                      <BodyColumn>Country</BodyColumn>
                      <BodyColumn>Greeting</BodyColumn>
                    </div>
                    <div className="flexChild columnParent">
                      <BodyColumn>{selectedItem.name}</BodyColumn>
                      <BodyColumn>{selectedItem.country}</BodyColumn>
                      <BodyColumn>{selectedItem.favorite_greeting}</BodyColumn>
                    </div>
                  </BodyRow>
                  <button onClick={this.handleModalButtonClick}>Close</button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default withCatsFetcher(App);
