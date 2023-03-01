const searchField = getElementId('searchField')
const searchBtn = getElementId("searchBtn")
const wrongMsgShow = getElementId("wrongMsgShow")
const showMealData = getElementId("showMealData")
const showAllData = getElementId("showAllData")
const showAllProductsBtn = getElementId("showAllProductsBtn")
const container = getElementId("container")
const search = getElementId("search")
const modalContent = getElementId("modalContent")
// This Function Use For All Id Get In Javascript  😀
function getElementId(getId) {
  const elementId = document.getElementById(getId)
  return elementId
}

// This function use For Call Api
const callMealApi=async(searchText,dataLimit)=>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    try {
      const res = await fetch(url)
      const data =await res.json()
      console.log(data)
      displayData(data.meals,dataLimit)
    } catch (error) {
      console.log(error)
    }
}


// create function all data display
const displayData = (meals,dataLimit) => {
  // search for empity previous datas
  showMealData.innerHTML = ''
  // data not found msh shows
  if (meals === null) {
    wrongMsgShow.classList.remove('d-none')
  } else {
    wrongMsgShow.classList.add('d-none')
    showAllData.classList.add('d-none')
  }
  // specefic data items show functionality
  if (dataLimit&&meals?.length>10) {
    meals = meals.slice(0, 6)
    showAllData.classList.remove('d-none')
  } else {
    showAllData.classList.add('d-none')
  }
  for (let food of meals) {
    const col = document.createElement("div")
    col.className = '.col'
    col.innerHTML = `
      <div class="card shadow-sm">
      <img src="${food.strMealThumb}" class="m-2 top-100 img-fluid img-thumbnail shadow-sm" alt="${food.strMeal} image" >
      <div class="card-body">
      <h3 class="h3 text-capitalize">Name: <span class="text-danger">${food.strMeal}</span></h3>
      <p class="p text-capitalize">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.?</p>
      <button type="button" class="my-2 btn btn-sm btn-info text-white" onclick="showDetalisMeals('${food.idMeal}')" data-bs-toggle="modal" data-bs-target="#mealsModal">Details</button>
      </div>
      </div>
      `
    showMealData.appendChild(col)
  }
}


// function Data Process
const dataProcess = (dataLimit) => {
  const searchFieldValue = searchField.value
  callMealApi(searchFieldValue,dataLimit)
  searchField.value = ''
}
// search btn
searchBtn.addEventListener('click', () => {
  dataProcess(10)
})

//input field show data with keydown enter
searchField.addEventListener('keydown', (e) => {
  e.key==='Enter'?dataProcess(10):''
})

// click show All data
showAllProductsBtn.addEventListener('click', () => {
  dataProcess()
})

// function show detals
const showDetalisMeals =async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.meals[0])
    detailsShowWithModal(data.meals[0])
  } catch (error) {
    console.log(error)
  }
}
// show modalData
const detailsShowWithModal = (meal) => {
  modalContent.innerHTML = `
  <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal} image" class="img-fluid img-thumbnail">
        <h5 class="modal-title h4 text-capitalize" id="mealsModalLabel">Name: <span class="text-danger">${meal.strMeal}</span></h5>
        <p class="text-capitalize h4">area: <span class="text-info">${meal.strArea}</span></p>
        <div class="h6 text-capitalize">Details Source: <span class="text-primary"><a href="${meal.strSource}" target="_blank">${meal.strSource}</a></span></div>
        <div class="h6 text-capitalize">Suggest Youtube Video's: <span class="text-primary"><a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a></span></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
  `
}

// call functiton callMealApi
callMealApi('')
