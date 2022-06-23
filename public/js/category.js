const categoryData = [
"Soups",
"Salads",
"Beverages",
"Tandori",
"Snacks",
"Rolls",
"Breakfast",
"Main Course Veg",
"Main Course Non-Veg",
"Appetizers",
"Ice Cream",
"Shakes",
"Pulao",
"Pao Bhaji",
"Extra / Addons",
"Dips",
"Indian",
"Sizzler",
"Platters",
"Quick Bites",
"Pantry",
"Momos",
"Bunnies",
"Chutney",
"Cookies",
"Deserts",
"Parathas",
"Lassi",
"Chai",
"Coffee",
"Soda",
"Maska",
"Namkeen",
"Sweets",
"Farsan"
]

const cuisineDataHolder = document.querySelector('.cuisine-data-holder');

categoryData.forEach(elem =>{
    let htmlData = `<div class="input-con">
        <input type="radio" name="cuisineType" value="${elem}">
         <label for="">${elem}</label>
    </div> `

    cuisineDataHolder.insertAdjacentHTML('beforeend', htmlData);
})

