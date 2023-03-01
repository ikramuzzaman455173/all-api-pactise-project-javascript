const searchField = getElementId('searchField')
const searchBtn = getElementId("searchBtn")
const wrongMsgShow = getElementId("wrongMsgShow")
const showPhoneData = getElementId("showPhoneData")
const showAllData = getElementId("showAllData")
const showAllProductsBtn = getElementId("showAllProductsBtn")
// console.log(showAllProductsBtn)
const modalContent = getElementId("modalContent")
// This Function Use For All Id Get In Javascript  😀
function getElementId(getId) {
  const elementId = document.getElementById(getId)
  return elementId
}

// Create Function api calls
const phoneHunerApiCall =async (searchText,dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data,dataLimit)
    displayPhones(data.data,dataLimit)
  } catch (error) {
    console.log(error)
  }
}


// function displayPhone
const displayPhones = (phones,dataLimit) => {
  // console.log(phones[0])
  // showPhoneData previous item blank
  showPhoneData.innerHTML = ''
  // limited items shows
  if (dataLimit&&phones?.length > 10) {
    phones = phones.slice(0,10)
    showAllData.classList.remove('d-none')
  } else {
    showAllData.classList.add('d-none')
  }
  // data not found error message shows
  if (phones.length === 0) {
    wrongMsgShow.classList.remove('d-none')
  } else {
    wrongMsgShow.classList.add('d-none')
  }
  // loop through the all phones
  for (let phone of phones) {
    const col = document.createElement("div")
    col.className = "col"
    col.innerHTML = `
      <div class="card shadow-sm">
          <img src="${phone.image}" class="m-2 top-100 img-fluid img-thumbnail shadow-sm" alt="${phone.phone_name} image" >
            <div class="card-body shadow-sm">
              <h3 class="h3 text-capitalize">Brand: <span class="text-danger">${phone.brand}</span></h3>
              <h3 class="h3 text-capitalize">Name: <span class="text-info">${phone.phone_name}</span></h3>
              <p class="p text-capitalize">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.?</p>
                  <button type="button" class="my-2  btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#phoneModal" onclick="phoneDetails('${phone.slug}')">Details</button>
              </div>
          </div>
    `
    showPhoneData.appendChild(col)
  }
}

// search any find the data
//processSearch
const searchProcess = (dataLimit) => {
  const searchFieldValue = searchField.value
  phoneHunerApiCall(searchFieldValue,dataLimit)
  // searchField.value=''
}
// searchBtn
searchBtn.addEventListener('click', () => {
  searchProcess(10)
})
// create function Click Button to showAll Data
showAllProductsBtn.addEventListener('click', () => {
  searchProcess()
})
// enter key to click product shows
searchField.addEventListener('keydown', (e) => {
  e.key === "Enter" ? searchProcess(10) : ''
})

// function show phone details modal click
const phoneDetails =async (getId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${getId}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data)
    displayPhoneDetails(data.data)
  } catch (error) {
    console.log(error);
  }
}

// function display phone details
const displayPhoneDetails = (phone) => {
  modalContent.innerHTML = `
  <div class="modal-header">
        <h1 class="modal-title fs-5 text-capitalize" id="phoneModalLabel">Name : <span class="text-danger">${phone.name?phone.name:'Phone Name Not Found'}</span> </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="h4 text-capitalize">Release Date: <span class="fw-bold">${phone.releaseDate ? phone.releaseDate : 'No ReleaseDae Found !'}</span></div>
      <div className="h4 text-capitalize">Stroage: <span class="fw-bold">${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Stroage Found !'}</span></div>
      <div className="h4 text-capitalize">Others: <span class="fw-bold">${phone.others.Bluetooth ? phone.others.Bluetooth : 'No Bluetooth Found !'}</span></div>



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
  `
  // console.log(phone.name)
}

// call the main Function showDetailsPhone
phoneHunerApiCall('iphone')


