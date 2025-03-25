let switches = document.querySelectorAll('.switch');

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


const passwordLengthSlider = document.getElementById('passwordLength');
const sliderContainer = document.querySelector('.slider');

const valueDisplay = document.createElement('div');
valueDisplay.className = 'slider-value';
valueDisplay.textContent = `Length: ${passwordLengthSlider.value} characters`;
sliderContainer.appendChild(valueDisplay);

passwordLengthSlider.addEventListener('input', function () {
    valueDisplay.textContent = `Length: ${this.value} characters`;
});