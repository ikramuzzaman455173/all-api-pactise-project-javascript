// This Function Use For All Id Get In Javascript  😀
function getElementId(getId) {
  const elementId = document.getElementById(getId)
  return elementId
}

//function get data
const getData = (url) => {
    fetch(url).then(response => response.json()).then(data => {
      // console.log(data[0])
      const showCountryData = getElementId("showCountryData")
      data.map(country => {
        // console.log(country)
        const col = document.createElement("div")
        col.className = ".col"
        col.innerHTML =
      `
    <div class="card shadow-sm">
          <img src="${country.flags.svg}" class="m-2 img-fluid img-thumbnail shadow-sm" alt="${country.name.common} flags" >
            <div class="card-body">
              <h3 class="h3 text-capitalize">Name: <span class="text-danger">${country.name.common}</span></h3>
              <p class="h4 text-capitalize">Capital: <span class="text-primary"">${country.capital ? country.capital[0] : "No Capital"}</span></p>
              <p class="h4 text-capitalize">Region: <span class="text-success">${country.region}</span></p>
              <p class="h4 text-capitalize">populations: <span class="text-secondary">${country.population}</span></p>
                  <button type="button" class="my-2 btn btn-sm btn-info text-white">Details</button>
              </div>
            </div>
    `
        showCountryData.appendChild(col)
      })
    }).catch(error=>console.log(`404 page not found ${error}`))
}

getData("https://restcountries.com/v3.1/all")

// show display country data
