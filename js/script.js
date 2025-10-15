// craete proudect

var producName = document.getElementById("proName");
var proCategory = document.getElementById("proCat");
var proPrice = document.getElementById("proPrice");
var proDescription = document.getElementById("proDesc");
var alertInput = document.getElementById("hambozo");
var productList = [];

if (localStorage.getItem("list") !== null) {
  productList = JSON.parse(localStorage.getItem("list")); // string to json
  display();
}

var addBtn =document.getElementById('addBtn');
addBtn.addEventListener('click',function(){
  if (addBtn.innerHTML=='Add Product'){
    createProduct();
}else{saveUpdateProduct()}
    localStorage.setItem("list", JSON.stringify(productList)); // json to string
    display(); //fuction display 
    clearForm(); //fuction clearForm
})

// fun create
function createProduct() {
  if (validateName() == true) {
    console.log("match");
    var product = {
      pName: proName.value,
      category: proCat.value,
      price: proPrice.value,
      productDesc: proDesc.value,
    };
    productList.push(product);
    console.log(product);
    console.log(productList);
  } else {
    alert("enter avalid input");
  }
}

// fun update
var currentIndex=0;
function updateProduct(index){
  currentIndex = index;
  producName.value=productList[index].pName;
  proCategory.value=productList[index].category;
  proPrice.value=productList[index].price;
  proDescription.value=productList[index].productDesc;
  document.getElementById('addBtn').innerHTML='update product'
}
// fun save update
function saveUpdateProduct(){
  if(validateName() == true){
    var product = {
      pName: proName.value,
      category: proCat.value,
      price: proPrice.value,
      productDesc: proDesc.value,
    };
    productList[currentIndex]=product;
    document.getElementById('addBtn').innerHTML='Add Product';
  }else{alert("enter avalid input");};
}


// fun clear
function clearForm() {
  proName.value = "";
  proCat.value = "";
  proPrice.value = "";
  proDesc.value = "";
}
// fun display
function display() {
  var box = ``;
  for (var i = 0; i < productList.length; i++) {
    box += `
        <tr>
            <td>${i + 1}</td> 
            <td>${productList[i].pName}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].productDesc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `; 
  }
  document.getElementById("tableBody").innerHTML = box; 
}

// fun delete
function deleteProduct(index) {
  console.log(index);
  productList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(productList)); // json to string
  console.log(productList);
  display(); 
}

var searchInput = document.getElementById("searchInput"); 
// fun search

function search() {
  var searchValue = searchInput.value;
  var box = ``;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].pName.includes(searchValue)) {
      if (searchInput.value !== "") {
        box += `
            <tr>
                <td>${i + 1}</td> 
                <td>${productList[i].pName.replace(
                  searchInput.value,
                  `<mark>${searchInput.value}</mark>`
                )}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].productDesc}</td>
                <td><button class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
            `;
      } else {
        box += `
            <tr>
                <td>${i + 1}</td> 
                <td>${productList[i].pName}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].productDesc}</td>
                <td><button class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
            `;
      }
    }
  }
  document.getElementById("tableBody").innerHTML = box; 
}
// fun validation
function validateName() {
  var regexName = /^[A-Z][a-z]{3,10}$/; //rulr (regex)
  if (regexName.test(producName.value) == true) {
    // test => built in method
    alertInput.innerHTML = "match";
    return true;
  } else {
    console.log("no match");
    alertInput.innerHTML = "start with capital the form 3 to 10 small char";
    return false;
  }
}