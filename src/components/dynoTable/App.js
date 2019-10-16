import React from "react";
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

function App() {
  return (
    <div className="App">
      <Table>
        <TableHead>
          <HeadRow>
            <HeadColumn>Name</HeadColumn>
            <HeadColumn>Age</HeadColumn>
            <HeadColumn>Country</HeadColumn>
            <HeadColumn>Favourite greeting</HeadColumn>
          </HeadRow>
        </TableHead>
        <TableBody>
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
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
