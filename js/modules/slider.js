function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const sliders = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          sliderPrev = document.querySelector(prevArrow),
          sliderNext = document.querySelector(nextArrow),
          sliderCount = document.querySelector(currentCounter),
          sliderCountTotal = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex =1;
    let offset = 0;
    function deleteNum (str){
        return +str.replace(/\D/g, '');
    }
    function getSliderCounter(){
        if(slideIndex < 10){
            sliderCount.textContent = `0${slideIndex}`;
        }else{
            sliderCount.textContent = slideIndex;
        }
    }
    if(sliders.length< 10){
        sliderCountTotal.textContent = `0${sliders.length}`;
    }else{
        sliderCountTotal.textContent = sliders.length;
    }
    getSliderCounter();

    slidesField.style.width = 100 * sliders.length + "%";
    sliders.forEach(val => val.style.width = width);
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i =0 ; i< sliders.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if(i==0){
            dot.classList.add('active');
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    function nextSliders(){
        if(offset == deleteNum(width) * (sliders.length -1)){
            offset = 0;
        }else{
            offset += deleteNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == sliders.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }
        getSliderCounter();
        dots.forEach((dot) => {
            if(dot.classList.contains('active')){
                dot.classList.remove('active');
            }
        });
        dots[slideIndex-1].classList.add('active');
        dots.forEach(dot => {
            dot.addEventListener('click', (e)=>{
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = deleteNum(width) * (slideTo -1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                
                getSliderCounter();
                dots.forEach((dot) => {
                    if(dot.classList.contains('active')){
                        dot.classList.remove('active');
                    }
                dots[slideIndex-1].classList.add('active');
                });
            });
        });

    }
    sliderNext.addEventListener('click', nextSliders);
    sliderPrev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = deleteNum(width) * (sliders.length -1);
        }else{
            offset -= deleteNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == 1){
            slideIndex = sliders.length;
        }else{
            slideIndex--;
        }
        getSliderCounter();
    });
    setInterval(nextSliders,5000);
}
export default slider;