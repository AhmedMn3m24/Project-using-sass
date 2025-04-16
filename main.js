
const images = [
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://www.kabbanifurniture.com/cdn/shop/files/6F4A3553_6caa2cb7-ee9a-4cb4-8f00-0ff3e59848d6_1800x1800.jpg?v=1732704348",
    "https://venushome.ca/wp-content/uploads/2025/03/PERLA-3-1-700x700.jpg",
    "https://venushome.ca/wp-content/uploads/2025/03/PERLA-3-700x700.jpg",
    "https://www.kabbanifurniture.com/cdn/shop/files/LM-78765-CH_WT_1800x1800.jpg?v=1742198923",
    "https://venushome.ca/wp-content/uploads/2024/08/Untitled-design-100-1-700x700.jpg",
    "https://venushome.ca/wp-content/uploads/2025/03/LORENZO-103-700x700.jpg",
    "https://venushome.ca/wp-content/uploads/2025/03/LORENZO-103-700x700.jpg"
];

const imageColors = [
    ["red", "blue"],
    ["green", "yellow"],
    ["black", "white"],
    ["teal", "brown"],
    ["burlywood", "salmon"],
    ["olive", "rebeccapurple"],
    ["orange", "powderblue"],
    ["orchid", "orangered"],
    ["powderblue", "purple"],
    ["beige", "turquoise"],
    ["yellow", "gold"],
    ["aqua", "indianred"],

];


const prices = [100, 200, 150, 120, 180, 250, 90, 110, 140, 220, 210, 170];

// تحميل البيانات من localStorage
let reserved = JSON.parse(localStorage.getItem("reserved")) || [];
let counters = JSON.parse(localStorage.getItem("counters")) || {};

function calculateCartCount() {
    return reserved.reduce((total, index) => total + (counters[index] || 0), 0);
}

// تحديث العربة
function updateCartCount() {
    document.getElementById("cart-count").textContent = calculateCartCount();
}

// حفظ البيانات في localStorage
function saveToLocalStorage() {
    localStorage.setItem("reserved", JSON.stringify(reserved));
    localStorage.setItem("counters", JSON.stringify(counters));
}

// التحقق إذا كانت الصورة محجوزة
function isReserved(index) {
    return reserved.includes(index);
}

// عرض الصور في الجاليري
function renderImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images.forEach((src, index) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex flex-column";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `image-${index}`;
        img.className = "img-box";

        const btnWrapper = document.createElement("div");
        btnWrapper.className = "card-buttons d-flex gap-2 mt-2";

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn btn-success";
        btnAdd.textContent = "Reservation";
        btnAdd.onclick = () => {
            if (!isReserved(index)) {
                reserved.push(index);
                counters[index] = 1;
                saveToLocalStorage();
                updateCartCount();
                renderImages();
            }
        };

        const btnRest = document.createElement("button");
        btnRest.className = "btn btn-danger";
        btnRest.textContent = "Rest";
        btnRest.onclick = () => {
            if (isReserved(index)) {
                reserved = reserved.filter(i => i !== index);
                delete counters[index];
                saveToLocalStorage();
                updateCartCount();
                renderImages();
            }
        };

        const btnDetails = document.createElement("button");
        btnDetails.className = "btn btn-primary";
        btnDetails.textContent = "Details";
        btnDetails.onclick = () => {
            showSidebar(index);
        };

        // إضافة السعر بجانب الصورة
        const priceTag = document.createElement("p");
        priceTag.className = "price-tag";
        priceTag.textContent = `$${prices[index]}`;

        btnAdd.disabled = isReserved(index);
        btnRest.disabled = !isReserved(index);

        btnWrapper.append(btnAdd, btnRest, btnDetails);
        col.append(img, priceTag, btnWrapper);
        gallery.appendChild(col);
    });
}

// عرض التفاصيل في الـ Sidebar
function showSidebar(index) {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("sidebar-content");

    const colors = imageColors[index];
    const colorsHTML = colors.map(color => `
        <span class="color-box" style="background-color: ${color};" title="${color}"></span>
    `).join("");

    let counter = counters[index] || 0;
    const price = prices[index]; // جلب السعر من المصفوفة

    content.innerHTML = `
        <span id="closeSidebar" class="close-btn">&times;</span>
        <h4>Available Colors</h4>
        <div class="colors-container mb-3">${colorsHTML}</div>

        <p>You have reserved <strong id="reserved-count">${calculateCartCount()}</strong> item(s).</p>
        <p><strong>Selected Image Number:</strong> ${index + 1}</p>

        <p><strong>Price:</strong> $${price}</p> <!-- عرض السعر هنا -->

        <div class="mt-3">
            <p><strong>Counter for this image:</strong></p>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-secondary" onclick="decreaseCounter(${index})">-</button>
                <span id="sidebar-counter">${counter}</span>
                <button class="btn btn-secondary" onclick="increaseCounter(${index})">+</button>
            </div>
        </div>
    `;

    sidebar.classList.add("active");

    // Event للـ Close
    document.getElementById("closeSidebar").onclick = closeSidebar;
}

// إغلاق الـ Sidebar
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}

// تقليل العد
function decreaseCounter(index) {
    if (!counters[index]) counters[index] = 0;
    if (counters[index] > 1) {
        counters[index]--;
        document.getElementById("sidebar-counter").textContent = counters[index];
        document.getElementById("reserved-count").textContent = calculateCartCount();
        saveToLocalStorage();
        updateCartCount();  // تأكد من تحديث العربة
    } else if (counters[index] === 1) {
        reserved = reserved.filter(i => i !== index);
        delete counters[index];
        closeSidebar();
        saveToLocalStorage();
        updateCartCount();
        renderImages();
    }
}

// زيادة العد
function increaseCounter(index) {
    if (!counters[index]) counters[index] = 0;
    if (counters[index] < 6) {
        counters[index]++;
        if (!isReserved(index)) {
            reserved.push(index);
        }
        document.getElementById("sidebar-counter").textContent = counters[index];
        document.getElementById("reserved-count").textContent = calculateCartCount();
        saveToLocalStorage();
        updateCartCount();  // تأكد من تحديث العربة
    }
    if (counters[index] === 6) {
        alert("You have reached the maximum count of 6!");
    }
}

updateCartCount();
renderImages();



