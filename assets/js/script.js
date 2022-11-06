$("document").ready(function(){
    // Mobile Menu
    $(".mobile-icon").click(function(){
        $(".primary-menu").addClass("open");
        $(this).hide();
        $(".crose-icon").show();
    })
    $(".crose-icon").click(function(){
        $(".primary-menu").removeClass("open");
        $(this).hide();
        $(".mobile-icon").show();
    })
    // Progress Bar 
    $('#bar1').barfiller();
    $('#bar2').barfiller();
    // Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    // Case Study Area
    $('.case-project-slider').owlCarousel({
        center:true,
        autoplay:true,
        loop:true,
        margin:10,
        nav:false,
        dots:true,
        responsive:{
            0:{
                items:1,
                center:false,
            },
            576:{
                items:1,
                center:false,
            },
            768:{
                items:2,
                center:false,
            },
            992:{
                items:2
            }
        }
    })
    //Project Item Slider
    $('.project-slider').owlCarousel({
        loop:true,
        autoplay:true,
        margin:10,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
       // Testimonial slick slider
       $('.testimonials-right').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        centerPadding: '220px',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                centerMode: false,
                centerPadding: '0',
              }
            }
        ]
    });
    // Client All Slider
    $('.client-all').owlCarousel({
        loop:true,
        autoplay:true,
        margin:10,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
     // Mixitup
     var gallary = document.querySelector('.project-mixi');
     var mixer = mixitup(gallary, {
       load: {
          filter: 'all'
      }
     });

});
 // Range Slider Pricing Count
 $('.range-slider input.min').on('input', function(){
    var inputVal ='$'+ Math.floor($(this).val());
    $('.show-min-price').text(inputVal) ;
});
$('.range-slider input.max').on('input', function(){
    var inputVal ='$'+ Math.floor($(this).val());
    $('.show-max-price').text(inputVal);
});

var thumbsize = 14;

function draw(slider,splitvalue) {

    /* set function vars */
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var lower = slider.querySelector('.lower');
    var upper = slider.querySelector('.upper');
    var legend = slider.querySelector('.legend');
    var thumbsize = parseInt(slider.getAttribute('data-thumbsize'));
    var rangewidth = parseInt(slider.getAttribute('data-rangewidth'));
    var rangemin = parseInt(slider.getAttribute('data-rangemin'));
    var rangemax = parseInt(slider.getAttribute('data-rangemax'));

    /* set min and max attributes */
    min.setAttribute('max',splitvalue);
    max.setAttribute('min',splitvalue);

    /* set css */
    min.style.width = parseInt(thumbsize + ((splitvalue - rangemin)/(rangemax - rangemin))*(rangewidth - (2*thumbsize)))+'px';
    max.style.width = parseInt(thumbsize + ((rangemax - splitvalue)/(rangemax - rangemin))*(rangewidth - (2*thumbsize)))+'px';
    min.style.left = '0px';
    max.style.left = parseInt(min.style.width)+'px';
    min.style.top = lower.offsetHeight+'px';
    max.style.top = lower.offsetHeight+'px';
    legend.style.marginTop = min.offsetHeight+'px';
    slider.style.height = (lower.offsetHeight + min.offsetHeight + legend.offsetHeight)+'px';
    
    /* correct for 1 off at the end */
    if(max.value>(rangemax - 1)) max.setAttribute('data-value',rangemax);

    /* write value and labels */
    max.value = max.getAttribute('data-value') ; 
    min.value = min.getAttribute('data-value') ;
    lower.innerHTML = min.getAttribute('data-value') + ".00";
    upper.innerHTML = max.getAttribute('data-value') + ".00";

}

function init(slider) {
    /* set function vars */
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var rangemin = parseInt(min.getAttribute('min'));
    var rangemax = parseInt(max.getAttribute('max'));
    var avgvalue = (rangemin + rangemax)/2;
    var legendnum = slider.getAttribute('data-legendnum');

    /* set data-values */
    min.setAttribute('data-value',rangemin);
    max.setAttribute('data-value',rangemax);
    
    /* set data vars */
    slider.setAttribute('data-rangemin',rangemin); 
    slider.setAttribute('data-rangemax',rangemax); 
    slider.setAttribute('data-thumbsize',thumbsize); 
    slider.setAttribute('data-rangewidth',slider.offsetWidth);

    /* write labels */
    var lower = document.createElement('span');
    var upper = document.createElement('span');
    lower.classList.add('lower','value');
    upper.classList.add('upper','value');
    lower.appendChild(document.createTextNode(rangemin));
    upper.appendChild(document.createTextNode(rangemax));
    slider.insertBefore(lower,min.previousElementSibling);
    slider.insertBefore(upper,min.previousElementSibling);
    
    /* write legend */
    var legend = document.createElement('div');
    legend.classList.add('legend');
    var legendvalues = [];
    for (var i = 0; i < legendnum; i++) {
        legendvalues[i] = document.createElement('div');
        var val = Math.round(rangemin+(i/(legendnum-1))*(rangemax - rangemin));
        legendvalues[i].appendChild(document.createTextNode(val));
        legend.appendChild(legendvalues[i]);

    } 
    slider.appendChild(legend);

    /* draw */
    draw(slider,avgvalue);

    /* events */
    min.addEventListener("input", function() {update(min);});
    max.addEventListener("input", function() {update(max);});
}

function update(el){
    /* set function vars */
    var slider = el.parentElement;
    var min = slider.querySelector('#min');
    var max = slider.querySelector('#max');
    var minvalue = Math.floor(min.value);
    var maxvalue = Math.floor(max.value);
    
    /* set inactive values before draw */
    min.setAttribute('data-value',minvalue);
    max.setAttribute('data-value',maxvalue);

    var avgvalue = (minvalue + maxvalue)/2;

    /* draw */
    draw(slider,avgvalue);
}

var sliders = document.querySelectorAll('.min-max-slider');
sliders.forEach( function(slider) {
    init(slider);
});

//  Product gallary 
var mainImg = document.getElementById('bigImg');
var smallImg = document.getElementsByClassName('small-img');

smallImg[0].onclick = function(){
   mainImg.src = smallImg[0].src;
}
smallImg[1].onclick = function(){
   mainImg.src = smallImg[1].src;
}
smallImg[2].onclick = function(){
   mainImg.src = smallImg[2].src;
}
smallImg[3].onclick = function(){
   mainImg.src = smallImg[3].src;
}

