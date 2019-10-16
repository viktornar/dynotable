import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableColumn,
  TableBody
} from "../components/dynoTable";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Table>
        <TableHead>
          <TableRow>
            <TableColumn>Test1</TableColumn>
            <TableColumn>Test2</TableColumn>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableColumn>Test1</TableColumn>
            <TableColumn>Test2</TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Test1</TableColumn>
            <TableColumn>Test2</TableColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
