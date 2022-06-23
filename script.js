const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const tel = document.getElementById('tel')
const country = document.getElementById('country')
const zipcode = document.getElementById('zipcode')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('confirm-password')
const submitBtn = document.getElementById('submit-button')
const terms = document.getElementById('terms')
const mail = document.getElementById('recieve-mail')
const personalInfo = document.getElementById('personal-information')
const radio = document.querySelectorAll('radio')
const form = document.querySelector('form')
const bonzLifeBtn = document.getElementById('bonzalez-lifestyle')
const imgSliderContainer = document.querySelector('.img-slider-container')
const imgSliderClose = document.getElementById('img-slider-close')

form.addEventListener('submit', (e) => {
    validateInput(firstName, 'first name')
    validateInput(lastName, 'last name')
    validateInput(email, 'email address')
    validateInput(tel, 'phone number')
    validateInput(country, 'country')
    validateInput(zipcode, 'Zip code or postal code')
    validateInput(password, 'password')
    validateInput(passwordConfirm, 'password')
    validateRadio()
    const confirmArr = [...document.querySelectorAll('.failure')]
    if (confirmArr.length > 0) {
        e.preventDefault()
        console.log('Error')
    }
})


firstName.addEventListener('input', () => {
    validateInput(firstName, 'first name')
})

lastName.addEventListener('input', () => {
    validateInput(lastName, 'last name')
})

email.addEventListener('input', () => {
    validateInput(email, 'email address')
})

tel.addEventListener('input', () => {
    validateInput(tel, 'phone number')
})

country.addEventListener('input', () => {
    validateInput(country, 'country')
})

zipcode.addEventListener('input', () => {
    validateInput(zipcode, 'Zip code or postal code')
})

password.addEventListener('input', () => {
    validateInput(password, 'password')
})

passwordConfirm.addEventListener('input', () => {
    validateInput(passwordConfirm, 'password')
})

const validateInput = (element, msgText) => {
    let errorDiv = element.parentElement.querySelector('.error-div')
    //Check validity, value, and pattern
    
    if (element.validity.valueMissing) {
        if (element === password || element === passwordConfirm) {
            errorDiv.textContent = 'Please enter a password'
        } else {
            errorDiv.textContent = `Please enter your ${msgText}`
        }
        element.classList.remove('success')
        element.classList.add('failure')
    } else if (element.validity.patternMismatch || element.value === "empty" || element.value == undefined) {
        errorDiv.textContent = `Please input a valid ${msgText}`
        element.classList.remove('success')
        element.classList.add('failure')
    } else if (element.validity.valid) {
        errorDiv.textContent = ''
        element.classList.remove('failure')
        element.classList.add('success')
    }
    //Give password information if input is incorrect
    if ((element === password)){
        let passwordErrorText = element.parentElement.querySelector('.password-error-text')
        if (element.classList.contains('failure')) {
            passwordErrorText.textContent = 'Password must contain: \r\n'
            passwordErrorText.textContent += '  A minimum of eight characters \r\n'
            passwordErrorText.textContent += '  At least one letter \r\n'
            passwordErrorText.textContent += '  At least one number \r\n'
            passwordErrorText.textContent += '  At least one special character [@$!%*#?&]'
        } else if (element.classList.contains('success')) {
            passwordErrorText.textContent = ''
        }
    }
    //Check to make sure passwords match
    if (element === passwordConfirm) {
        if (password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add('failure')
            errorDiv.textContent = 'Does not match password'
        }
    }
    //Check length for inputs with dataset maxlength property
    if (element.dataset.maxlength) {
        if (element.value.length > parseInt(element.dataset.maxlength)) {
            let startText = msgText.charAt(0).toUpperCase() + msgText.slice(1)
            errorDiv.textContent = `${startText} is too long`
            element.classList.remove('success')
            element.classList.add('failure')
        }
    }
    
}

const validateRadio = () => {
    const radioArr = [terms, mail, personalInfo]
    radioArr.forEach(radioBtn => {
        if (radioBtn.checked === true) {
            radioBtn.classList.remove('failure')
            radioBtn.classList.add('success')
        } else {
            radioBtn.classList.remove('success')
            radioBtn.classList.add('failure')
        }
    })
    if (terms.classList.contains('failure')) {
        terms.parentElement.parentElement.querySelector('.error-div').textContent = 'You must agree to the terms and conditions.'
    } else if (terms.classList.contains('success')) {
        terms.parentElement.parentElement.querySelector('.error-div').textContent = ''
    }
    if (mail.classList.contains('failure')) {
        mail.parentElement.parentElement.querySelector('.error-div').textContent = 'What! You\'re not even going to let me send you an email?'
    } else if (mail.classList.contains('success')) {
        mail.parentElement.parentElement.querySelector('.error-div').textContent = ''
    }
    if (personalInfo.classList.contains('failure')) {
        personalInfo.parentElement.parentElement.querySelector('.error-div').textContent = 'You won\'t even let me use your name in the email salutation?'
    } else if (personalInfo.classList.contains('success')) {
        personalInfo.parentElement.parentElement.querySelector('.error-div').textContent = ''
    }

}

bonzLifeBtn.addEventListener('click', () => {
    imgSliderContainer.classList.add('active')
    advanceSlider()
})

imgSliderClose.addEventListener('click', () => {
    imgSliderContainer.classList.remove('active')
})

let timeoutId

function advanceSlider() {
    const slides = document.querySelector('.slides')
    const activeSlide = slides.querySelector('.active')
    let newSlideIndex = [...slides.children].indexOf(activeSlide) + 1
    if (newSlideIndex >= slides.children.length) newSlideIndex = 0

    slides.children[newSlideIndex].classList.add('active');
    activeSlide.classList.remove('active')

    clearTimeout(timeoutId)
    timeoutId = setTimeout(advanceSlider, 5000)
}