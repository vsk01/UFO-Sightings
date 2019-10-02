//Declare Variables
var fButton = d3.select("#filter-btn");//filter table Button
var DateField = d3.select("#datetime");//field foe entering date
var cityField = d3.select("#city");//field for entering city
var tableBody = d3.select("tbody");//the whole table body
var resetbtn = d3.select("#reset-btn"); //
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"] //columns from data.js

//the variable function to populate the table based on the passed dataInput.
var populate = (dataInput) => {

  dataInput.forEach(ufo_sightings => {
    var row = tableBody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

//Populate table
populate(data); //populate the table on HTML page with data.js -- The starting point before data search.

// Filter by attribute
fButton.on("click", () => {
  d3.event.preventDefault(); //prevents the default action
  var DateInput = DateField.property("value").trim(); //collect trimmed data value for filtering
  var CityInput = cityField.property("value").toLowerCase().trim(); //collect trimmed value for city
  // Filter by field matching input value
  var filterDate = data.filter(data => data.datetime === DateInput); //filter data based on date
  console.log(filterDate) // if needed debug is ready
  var filterCity = data.filter(data => data.city === CityInput); //filter data based on city
  console.log(filterCity)
  var filterData = data.filter(data => data.datetime === DateInput && data.city === CityInput); //filter data based on date and city
  console.log(filterData)

  // Add filtered sighting to table
  tableBody.html("");
//get reponse to be populated
  let response = {
    filterData, filterCity, filterDate
  }

  if (response.filterData.length !== 0) {//if city and date selected
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){//if city or date are selected
      populate(filterCity) || populate(filterDate);

    }
    else {
      tableBody.append("tr").append("td").text("No results found!"); //let user know no data is found
    }
})
//clear all filters and reset the table to original data
resetbtn.on("click", () => {
  tableBody.html("");
  populate(data)
  console.log("Table reset")
})
