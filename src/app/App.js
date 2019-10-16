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
  useEffect(() => {
    // Implement fetch logic;
  }, []);
  return (
    <div className="App">
      <Table>
        <TableHead>
          <HeadRow>
            <HeadColumn onSortChange={handleSort}>Name</HeadColumn>
            <HeadColumn onSortChange={handleSort}>Age</HeadColumn>
            <HeadColumn onSortChange={handleSort}>Country</HeadColumn>
            <HeadColumn onSortChange={handleSort}>Greeting</HeadColumn>
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

  function handleSort(sortOrder) {
    console.log(sortOrder);
  }
}

export default App;
