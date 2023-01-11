let ProductName = document.getElementById("ProductName");
let ProductPrice = document.getElementById("ProductPrice");
let ProductCategory = document.getElementById("ProductCategory");
let ProductDesc = document.getElementById("ProductDesc");
let updateBtn = document.getElementById("update");
let addBtn = document.getElementById("add");
let num = document.getElementById("number");

let maxNum = 100;
let input = ProductDesc.value.length;
// console.log(input);

let tempelete;
let dataProducts;
let alert = document.getElementById("alert");

// container of products
let productContainer = [];

if (localStorage.getItem("product") != null) {
  productContainer = JSON.parse(localStorage.getItem("product"));
  displayDate(productContainer);
} else {
  productContainer = [];
}

function addProduct() {
  if (
    ProductName.value === "" &&
    ProductPrice.value === "" &&
    ProductCategory.value === "" &&
    ProductDesc.value === ""
  ) {
    let products = {
      name: ProductName.value,
      price: ProductPrice.value,
      category: ProductCategory.value,
      desc: ProductDesc.value,
    };
    alert.classList.add("d-none");
    productContainer.push(products);
    console.log(productContainer);
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayDate(productContainer);
    clearForm();
  } else {
    alert.classList.remove("d-none");
  }
}
if (ProductName.value.length > 0) {
  alert.classList.add("d-none");
}
// localStorage.getItem(JSON.parse("myTable"));
function displayDate(list) {
  let temp = ``;
  for (let i = 0; i < list.length; i++) {
    temp += ` <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button onclick="updateElement(${i})" class="btn btn-outline-warning">update</button></td>
    <td><button onclick="deleteElement(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
  }
  document.getElementById("myTable").innerHTML = temp;
}
function clearForm() {
  ProductName.value = "";
  ProductPrice.value = "";
  ProductCategory.value = "";
  ProductDesc.value = "";
  alert.classList.add("d-none");
  ProductName.classList.remove("is-valid");
  ProductPrice.classList.remove("is-valid");
  ProductCategory.classList.remove("is-valid");
  ProductDesc.classList.remove("is-valid");
}

function deleteElement(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productContainer));
  displayDate(productContainer);
}

function updateElement(index) {
  ProductName.value = productContainer[index].name;
  ProductPrice.value = productContainer[index].price;
  ProductCategory.value = productContainer[index].category;
  ProductDesc.value = productContainer[index].desc;
  updateBtn.classList.replace("d-none", "d-inline");
  addBtn.classList.add("d-none");
  tempelete = index;
  scroll({ top: 0, behavior: "smooth" });
}

function editElement() {
  productContainer[tempelete].name = ProductName.value;
  productContainer[tempelete].price = ProductPrice.value;
  productContainer[tempelete].category = ProductCategory.value;
  productContainer[tempelete].desc = ProductDesc.value;
  // productContainer[tempelete] = dataProducts;
  // productContainer.push(dataProducts);
  localStorage.setItem("product", JSON.stringify(productContainer));
  displayDate(productContainer);
  updateBtn.classList.replace("d-inline", "d-none");
  addBtn.classList.remove("d-none");
  clearForm();
}

function searching(term) {
  let searchingTerm = [];
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
        true ||
      productContainer[i].category.toLowerCase().includes(term.toLowerCase()) ==
        true
    ) {
      searchingTerm.push(productContainer[i]);
    }
  }
  displayDate(searchingTerm);
}

// function validation() {
//   let regexName = /^[A-Z][a-z]{1,8}$/;
//   if (regexName.test(ProductName.value) == true) {
//     console.log(true);
//     ProductName.classList.add("is-valid");
//     if (ProductName.classList.contains("is-invalid")) {
//       ProductName.classList.replace("is-invalid", "is-valid");
//     }
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log(false);
//     alert.classList.remove("d-none");
//     ProductName.classList.add("is-invalid");
//     return false;
//   }
// }

// function validatNum() {
//   let regexNum = /^([1-9][0-9]{3,4}|20000)$/;
//   if (regexNum.test(ProductPrice.value) == true) {
//     console.log("ok");
//     ProductPrice.classList.add("is-valid");
//     if (ProductPrice.classList.contains("is-invalid")) {
//       ProductPrice.classList.replace("is-invalid", "is-valid");
//     }
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("not ok");
//     alert.classList.remove("d-none");
//     ProductPrice.classList.add("is-invalid");
//     return false;
//   }
// }

// function validatCat() {
//   let regexCat = /^(mobile|tv|laptop)$/;
//   if (regexCat.test(ProductCategory.value) == true) {
//     ProductCategory.classList.add("is-valid");
//     if (ProductCategory.classList.contains("is-invalid")) {
//       ProductCategory.classList.replace("is-invalid", "is-valid");
//     }
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     alert.classList.remove("d-none");
//     ProductCategory.classList.add("is-invalid");
//     return false;
//   }
// }

// function validatDes() {
//   let regexDesc = /^[a-z]{2,500}$/;
//   if (regexDesc.test(ProductDesc.value) == true) {
//     ProductDesc.classList.add("is-valid");
//     if (ProductDesc.classList.contains("is-invalid")) {
//       ProductDesc.classList.replace("is-invalid", "is-valid");
//     }
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     alert.classList.remove("d-none");
//     ProductDesc.classList.add("is-invalid");
//     return false;
//   }
// }

ProductDesc.addEventListener("keydown", function (e) {
  let inputLength = e.target.value.length;
  // console.log(e.target.value.length);
  num.innerHTML = maxNum - inputLength;
});
// console.log(num);
