import { menuArray } from "/data.js"
import { v4 as uuid } from "https://jspm.dev/uuid"

const menuContainerEl = document.getElementById("menu-container")
const orderBtn = document.getElementById("order-btn")
const orderTotalContainer = document.getElementById("order-total-container")

const mainEl = document.getElementById("main-el")
const paymentModal = document.getElementById("payment-modal")
const paymentModalHeading = document.getElementById("payment-modal-heading")
const closeModalBtn = document.getElementById("close-modal-btn")

const toastEl = document.getElementById("toast-el")

let orderArr = []

let menuHtml = ``

menuArray.forEach(function(item) {
    const divEl = document.createElement("div")
    divEl.classList = "item"
    divEl.innerHTML = `<div class="item-img">${item.emoji}</div>
                        <div class="item-info">
                            <h2 class="item-name">${item.name}</h2>
                            <p class="item-ingredients">${item.ingredients.join(", ")}
                            <p class="item-price">$${item.price}
                        </div>`
    const buttonEl = document.createElement("button")
    buttonEl.textContent = "+"
    buttonEl.setAttribute("aria-label", `Add 1 ${item.name} To Basket`)
    buttonEl.classList.add("add-quantity-btn")
    buttonEl.addEventListener("click", function() {
        orderArr.push({id: uuid(),
        item: item.name,
        price: item.price})
        renderOrder()
    })
    divEl.insertAdjacentElement("beforeend", buttonEl)
    menuContainerEl.insertAdjacentElement("beforeend", divEl)
})

orderBtn.addEventListener("click", function() {
    if (orderArr.length > 0) {
        paymentModal.style.display = "block"
        mainEl.setAttribute("inert", "")
        paymentModalHeading.focus()
    } else {
        toastEl.textContent = "Make sure to add some items to your order"
        toastEl.classList.add("error")
        setTimeout(function() {
            toastEl.textContent = ""
            toastEl.classList.remove("error")
        }, 10000)
    }
})

function renderOrder() {
    const orderContainer = document.getElementById("order-container")
    
    summaryContainer.style.display = "block"
    
    orderBtn.style.display = "block"
    orderContainer.innerHTML = '<h2 class="center-txt">Your Order</h2>'
    orderArr.forEach(function(order) {
        const divEl = document.createElement("div")
        divEl.classList.add("order-item")
        divEl.innerHTML = `<h3 class="order-item-name">${order.item}</h3>`
        const removeBtn = document.createElement("button")
        removeBtn.textContent = "remove"
        removeBtn.classList.add("remove-item-btn")
        removeBtn.addEventListener("click", function() {
            removeOrder(order.id)
        })
        divEl.insertAdjacentElement("beforeend", removeBtn)
        divEl.insertAdjacentHTML("beforeend", `<div class="order-item-price">$${order.price}</div>`)
        orderContainer.insertAdjacentElement("beforeend", divEl)
    })
    orderTotalContainer.style.display = "block";
    document.getElementById("order-total").innerText = "$" + orderArr.reduce(function(total, current) {
        return total + Number(current.price)
    }, 0) 
}

function removeOrder(orderId) {
    orderArr = orderArr.filter(function(order) {
        return order.id != orderId
    })
    renderOrder()
    if(orderArr.length === 0) { 
        summaryContainer.style.display = "none"
    }
}

closeModalBtn.addEventListener("click", function() {
    paymentModal.style.display = "none"
    mainEl.removeAttribute("inert")
    orderBtn.focus()
})