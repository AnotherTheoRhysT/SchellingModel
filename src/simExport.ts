let csvStr = ''

export const addRow = (row: string) => {
  csvStr += `${row}\r\n`
}

export const addCell = (cell: string) => {
  csvStr += `${cell},`
}

export const downloadCsv = (filename: string) => {
  csvStr = "data:application/csv," + encodeURIComponent(csvStr);
  var x = document.createElement('a');
  x.setAttribute("href", csvStr );
  x.setAttribute("download",filename);
  document.body.appendChild(x);
  x.click();
}