// from data.js
var tableData = data;

// get handle to the table
var tbody = d3.select("tbody");

function constructTbl(data) {
  //Make table empty
  tbody.html("");
  //Get table rows of data and populate the data values into the created cells
  tableData.forEach((tdataRow) => {
    var row = tbody.append("tr"); //create the table row and append as many rows as needed for data.
    Object.values(tdataRow).forEach((val) => {
      var cell = row.append("td"); //create cells for each data value point in the table data row
        cell.text(val); //populate the cell with this data value
      }
    );
  });
}

function userClicked() {

  // when user clicks get the date for filtering
  var date = d3.select("#datetime").property("value");
  let filteredData = tableData;

  //get data for that date , if this is true, and display the table data
  if (date) {
    filteredData = filteredData.filter(row => row.datetime === date);
  }

//if date is not enetered then unfiltered data is displayed else table is constructed as before.
  constructTbl(filteredData);
}

// Attach the event to the form
d3.selectAll("#filter-btn").on("click", userClicked);

// default table constructor
constructTbl(tableData);
