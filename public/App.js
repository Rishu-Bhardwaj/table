import React, { useMemo ,useEffect,useState} from "react";
import MaterialReactTable from "material-react-table";

import Papa from 'papaparse';

const data = [
  {
    name: "John",
    age: 30
  },
  {
    name: "Sara",
    age: 25
  }
];

export default function App() {
  const [parsedCsvData, setParsedCsvData] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch("./MOCK_DATA.csv");
            const reader = response.body.getReader();
            const result = await reader.read(); // raw array
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value); // the csv text
            const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
            const rows = results.data; // array of objects
            setParsedCsvData(rows);
        }
        getData();
    }, []);


  return (
    <>
      {console.log(parsedCsvData)}
    </>
  );
}
