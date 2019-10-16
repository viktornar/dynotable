import React, { PureComponent } from "react";
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

const CATS_API = "https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json";

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
      .get(
        CATS_API
      )
      .then(({ data: { cats } }) => {
        this.setState({ cats });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  handleSort(sortOrder) {
    // TODO: Implement sorting that can sort a big amount of data
  }

  render() {
    const { isLoading, cats } = this.state;
    return (
      <div className="App">
        <Table>
          <TableHead>
            <HeadRow>
              <HeadColumn onSortChange={this.handleSort}>Name</HeadColumn>
              <HeadColumn onSortChange={this.handleSort}>Age</HeadColumn>
              <HeadColumn onSortChange={this.handleSort}>Country</HeadColumn>
              <HeadColumn onSortChange={this.handleSort}>Greeting</HeadColumn>
            </HeadRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <div className="App__loader">Loading...</div>
            ) : (
              <>
                <TableRow>
                  <TableColumn>Test1</TableColumn>
                  <TableColumn>Test2</TableColumn>
                  <TableColumn>Test2</TableColumn>
                  <TableColumn>Test2</TableColumn>
                </TableRow>
                <TableRow>
                  <TableColumn>Test1</TableColumn>
                  <TableColumn>Test2</TableColumn>
                  <TableColumn>Test2</TableColumn>
                  <TableColumn>Test2</TableColumn>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default App;
