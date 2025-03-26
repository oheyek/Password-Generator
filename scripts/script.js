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


const passwordLengthSlider = document.getElementById('charLenght');
const sliderValue = document.querySelector('.slider-container .label-container span');

passwordLengthSlider.addEventListener('input', function () {
    sliderValue.textContent = this.value;
    sliderValue.classList.add('pop');

    setTimeout(() => {
        sliderValue.classList.remove('pop');
    }, 200);
});
