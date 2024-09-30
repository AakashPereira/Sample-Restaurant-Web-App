const paymentForm = document.getElementById("payment-form")

const nameInput = document.getElementById("user-name")
const cardInput = document.getElementById("card-number")
const cvvInput = document.getElementById("cvv")

const statusMsgEl = document.getElementById("status-msg")
const summaryContainer = document.getElementById("summary-container")
const paymentModal = document.getElementById("payment-modal")

let errors = []

paymentForm.addEventListener("submit", function(e) {
    e.preventDefault()
    validateData(nameInput.value, cardInput.value, cvvInput.value)
})

function validateData(name, cardNo, cvv) {
    
    errors = []
    statusMsgEl.innerHTML = ''
    statusMsgEl.classList.remove("error-alert")
    
    if (name.length === 0 | cardNo.length === 0 | cvv.length === 0) {
        errors.push('Make sure to fill in the form correctly')
    } else {
        if ((cardNo.length < 15 || cardNo.length > 19) || isNaN(cardNo)) {
            errors.push('Enter a valid debit or credit card number')
        }
        if ((cvv.length < 3 || cvv.length > 4) || isNaN(cvv)) {
            errors.push('Enter a valid card CVV')
        }
    }
    if (errors.length > 0) {
        errors.forEach(function(error) {
            statusMsgEl.innerHTML += `<p class="alert error">${error}</p>`
        })
    } else {
        completePayment(name)
    }
}

function completePayment(name) {
    paymentModal.style.display = "none"
    summaryContainer.innerHTML = `<div class="alert-success" role="status">
                                    Thanks, ${name}! Your order is on its way!
                                </div>`
}