const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  ;
  const phones = data.data;
  
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // step-01. get the container where to add html
  console.log(phones, phones.length);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAlContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAlContainer.classList.remove("hidden");
  } else {
    showAlContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // step-02.create a element
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-5 bg-base-100 shadow-xl`;
    // step-03: set inner html
    phoneCard.innerHTML = ` 
    <figure>
      <img 
        src="${phone.image}"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div> `;
    // step-04: append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
  
};

//
const handleShowDetails=(id)=>{
  console.log('click show details',id);
}


const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //console.log(searchText);
  loadPhones(searchText, isShowAll);
};
//  handle search recap
//  const handleSearch2=()=>{
//   toggleLoadingSpinner(true);
//     const searchField2=document.getElementById('search-field2');
//     const searchText=searchField2.value;
//    // console.log(searchText);
//     loadPhones(searchText)
//  }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//handle show all
const handleShowAll = () => {
  handleSearch(true);
};
