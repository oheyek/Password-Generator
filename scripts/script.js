let switches = document.querySelectorAll('.switch');

switches.forEach(switchEl => {
    if (switchEl.querySelector('input').checked) {
        switchEl.classList.add('active');
    }
});

for (var i = 0; i < switches.length; i++) {
    switches[i].addEventListener('click', function (event) {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.querySelector('input').checked = false;
        } else {
            this.classList.add('active');
            this.querySelector('input').checked = true;
        }
    })
}


const passwordLengthSlider = document.getElementById('charLength');
const sliderValue = document.querySelector('.slider-container .label-container span');

passwordLengthSlider.addEventListener('input', function () {
    sliderValue.textContent = this.value;
    sliderValue.classList.add('pop');

    setTimeout(() => {
        sliderValue.classList.remove('pop');
    }, 200);
});

const password_el = document.querySelector('#generatedPassword');
const length_el = document.querySelector('#charLength');
const uppercase_el = document.querySelector('#uppercase');
const lowercase_el = document.querySelector('#lowercase');
const numbers_el = document.querySelector('#number');
const symbols_el = document.querySelector('#symbols');

const generate_btn = document.querySelector('#generate');
generate_btn.addEventListener('click', generatePassword);
const copy_btn = document.querySelector('#copy');
copy_btn.addEventListener('click', copyPassword);

const uppercase_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase_letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

function generatePassword(e) {
    e.preventDefault();
    let password = '';
    let length = length_el.value;
    let chars = '';

    chars += uppercase_el.checked ? uppercase_letters : '';
    chars += lowercase_el.checked ? lowercase_letters : '';
    chars += numbers_el.checked ? numbers : '';
    chars += symbols_el.checked ? symbols : '';

    if (chars === '') {
        updateStrengthIndicator(0);
        password_el.value = 'At least one option required';
        return;
    }

    for (let i = 0; i < length; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        password += chars.substring(rand, rand + 1);
    }

    password_el.value = password;
    password_el.classList.add('pop');

    const strength = checkPasswordStrength(password);
    updateStrengthIndicator(strength);

    setTimeout(() => {
        password_el.classList.remove('pop');
    }, 200);
}

function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
}

function updateStrengthIndicator(strength) {
    const strengthContainer = document.getElementById('password-strength-container');
    const strengthText = document.getElementById('strength-text');

    strengthContainer.classList.remove('strength-weak', 'strength-medium', 'strength-strong', 'strength-very-strong');

    if (strength === 0) {
        strengthText.textContent = '-';
    } else if (strength < 3) {
        strengthText.textContent = 'Weak';
        strengthContainer.classList.add('strength-weak');
    } else if (strength < 5) {
        strengthText.textContent = 'Medium';
        strengthContainer.classList.add('strength-medium');
    } else if (strength < 7) {
        strengthText.textContent = 'Strong';
        strengthContainer.classList.add('strength-strong');
    } else {
        strengthText.textContent = 'Very Strong';
        strengthContainer.classList.add('strength-very-strong');
    }
}
async function copyPassword() {
    const errorMessage = 'Atleast one option required';
    if (password_el.value === errorMessage || password_el.value === '') {
        alert('Please generate a valid password first');
        return;
    }

    if (navigator.clipboard) {
        await navigator.clipboard.writeText(password_el.value);
        alert('Password copied to clipboard');
    } else {
        alert('Clipboard not supported');
    }
}