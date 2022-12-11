import Papa from 'papaparse';
function fetchCsv() {
    return fetch('MOCK_DATA.csv').then(function (response) {

      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }
export default async function getCsvData() {
    let csvData = await fetchCsv();
    let results = Papa.parse(csvData, { header: true })
    return results;

}