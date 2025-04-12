console.log("localStorage content:", localStorage.getItem("reserved"));

const images = [
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",

];
 


//*********************ARRAY IMAGES****************************
let reserved = JSON.parse(localStorage.getItem("reserved")) || [];
let cartCount = reserved.length;

function updateCartCount() {
    document.getElementById("cart-count").textContent = cartCount;
}

function saveToLocalStorage() {
    localStorage.setItem("reserved", JSON.stringify(reserved));
}

function isReserved(index) {
    return reserved.includes(index);
}

function renderImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images.forEach((src, index) => {
        console.log(`Rendering image ${index} with src: ${src}`);

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex flex-column";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `image-${index}`;
        img.className = "img-box";

        const btnWrapper = document.createElement("div");
        btnWrapper.className = "card-buttons";

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn btn-success";
        btnAdd.textContent = "Reservation";
        btnAdd.onclick = () => {
            console.log("Add button clicked for image index:", index);
            if (!isReserved(index)) {
                reserved.push(index);
                cartCount++;
                saveToLocalStorage();
                updateCartCount();
                renderImages();
            }
        };
        //////BUTTONS*********************************************************
        const btnRest = document.createElement("button");
        btnRest.className = "btn btn-danger";
        btnRest.textContent = "Rest";
        btnRest.onclick = () => {
            console.log("Rest button clicked for image index:", index);
            if (isReserved(index)) {
                reserved = reserved.filter(i => i !== index);
                cartCount--;
                saveToLocalStorage();
                updateCartCount();
                renderImages();
            }
        };

        if (isReserved(index)) {
            btnAdd.disabled = true;
            btnRest.disabled = false;
        } else {
            btnAdd.disabled = false;
            btnRest.disabled = true;
        }

        btnWrapper.append(btnAdd, btnRest);
        col.append(img, btnWrapper);
        gallery.appendChild(col);
    });
}


updateCartCount();
renderImages();



