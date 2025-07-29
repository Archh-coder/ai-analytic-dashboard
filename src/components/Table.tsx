import React from "react";
import DataTable from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Person = {
  name: string;
  age: number;
  city: string;
};

const data: Person[] = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
  { name: "Charlie", age: 22, city: "Paris" },
  { name: "David", age: 28, city: "Berlin" },
  { name: "Eva", age: 35, city: "Tokyo" },
];

const columns: ColumnDef<Person, any>[] = [
  { accessorKey: "name", header: "Name", cell: info => info.getValue() },
  { accessorKey: "age", header: "Age", cell: info => info.getValue() },
  { accessorKey: "city", header: "City", cell: info => info.getValue() },
];

export default function ExampleTable() {
  return <DataTable columns={columns} data={data} />;
}