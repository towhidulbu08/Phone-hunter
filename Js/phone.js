const loadData = async (searchText,isShowAll) => {
  const res = await fetch(
`    https://openapi.programming-hero.com/api/phones?search=${searchText}
`  );
  const data = await res.json();
  const phones = data.data;
  //console.log( phones);
  displayPhone(phones,isShowAll);
 
};

const displayPhone = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText='';
  const showAlContainer=document.getElementById('show-all-container');
   if(phones.length>12 && !isShowAll){
       showAlContainer.classList.remove('hidden')
   }
   else{
    showAlContainer.classList.add('hidden')
   }
   console.log(phones.length);
  if(!isShowAll){
    phones=phones.slice(0,12)
  }
  
  phones.forEach((phone) => {
    //console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
           <figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">"${phone.phone_name}"</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
           
           `;
           phoneContainer.appendChild(phoneCard);
          ;
  });
  toggleLoadingSpinner(false);
};

function handleSearchButton(isShowAll){
   //console.log("button");
   toggleLoadingSpinner(true);
   const searchField=document.getElementById('search-field');
   const searchText=searchField.value;
   
   loadData(searchText,isShowAll)
}


function toggleLoadingSpinner(isLoading){
  const loadingSpinner=document.getElementById('loading-spinner')
        if(isLoading){
            loadingSpinner.classList.remove('hidden')
        }
        else{
          loadingSpinner.classList.add('hidden')
        }
}
function handelShowAllButton( ){
    handleSearchButton(true)
}

//;
