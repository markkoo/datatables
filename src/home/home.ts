
// import '../shared/a.scss';
// import '../shared/b.scss';
import './home.scss';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'intl-tel-input/build/css/intlTelInput.min.css';
// import { a } from '../shared/a';
// import { b } from '../shared/b';
// console.log(a + 'da');
// console.log(b + 'ta');

import * as $ from 'jquery';
import '@fancyapps/fancybox';
import 'owl.carousel/dist/owl.carousel';
import * as Isotope from 'isotope-layout';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-scroller';
import 'datatables.net-select';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import { ajaxForm } from '../modules/form';
import { setupPixel } from '../modules/facebookPixel';
import { setupGA } from '../modules/googleAnalytics';
import { setupAddThis } from '../modules/addThis';
import { setupLiveChat } from '../modules/zopimLiveChat';
import { appConfig } from '../appConfig';
import { setupGoogleMap } from '../modules/googleMap';
import { setupFacebookPage } from '../modules/facebookPage';
import { scrollToTop } from '../modules/dom';

// function animation(duration : number = 300, task : (progress : number, last : boolean) => void ) { 
//     let method = (timestamp: number) => {
//         let progress = timestamp / duration;                
//         if (progress >= 1) {
//             task(progress, true);
//         }
//         else { 
//             task(progress, false);
//             requestAnimationFrame(method);
//         }        
//     }
//     requestAnimationFrame(method);
// }

// animation(300, (progress) => {
//      console.log('here', progress);
//     // document.getElementById('').style.height = percent * 300 + 'px';
// });


function animation(duration: number, action: (progress: number, isLast: boolean) => void) {
    let start: number | null = null;
    const animation = (timeStamp: number) => {
        if (!start) start = timeStamp;
        let runtime = timeStamp - start;
        let progress = runtime / duration;
        if (progress >= 1) {
            action(progress, true);
        }
        else {
            action(progress, false);
            window.requestAnimationFrame(animation);
        }
    }
    window.requestAnimationFrame(animation);
}

function slideDown(element: HTMLElement) {
    element.style.display = 'block';
    const height = element.clientHeight;
    element.style.height = '0';
    animation(300, (progress, isLast) => {
        if (isLast) {
            element.style.height = height + 'px';
        }
        else {
            element.style.height = (height * progress) + 'px';
        }
    });
}

function slideUp(element: HTMLElement) {
    const height = element.clientHeight;
    animation(300, (progress, isLast) => {
        if (isLast) {
            element.style.removeProperty('height');
            element.style.removeProperty('display');
        }
        else {
            element.style.height = (height * (1 - progress)) + 'px';
        }
    });
}

function slideToggle(element: HTMLElement){
    let isOpen = window.getComputedStyle(element).display == 'block';
    if (isOpen) {
        slideUp(element);
    }
    else {
        slideDown(element);
    }
}

document.getElementById('slideDown').addEventListener('click', () => {
    slideDown(document.getElementById('box'))
});
document.getElementById('slideUp').addEventListener('click', () => {
    slideUp(document.getElementById('box'))    
});
document.getElementById('slideToggle').addEventListener('click', () => {
    slideToggle(document.getElementById('box'));
});


// setTimeout(()=>{
//     slideToggle(document.getElementById('slideToggle'));
// },1000)
// setTimeout(()=>{
//     slideToggle(document.getElementById('slideToggle'));
// },4000)

// setupGA(appConfig.googleAnalyticsId);

// var input = document.getElementById('phone') as HTMLInputElement;
// intlTelInput(input,{
//     preferredCountries: ['sg', 'my', 'id'],
//     customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
//         console.log(selectedCountryData)
//         return `+${selectedCountryData.dialCode} ${selectedCountryPlaceholder}`;
//     }
// });



// setupPixel(appConfig.facebookPixelId);
// setupGA(appConfig.googleAnalyticsId);
// setupAddThis(appConfig.addThisId);
// setupLiveChat(appConfig.zopimLiveChatId);
// setupGoogleMap(appConfig.googleMapSetting);
// setupFacebookPage(appConfig.facebookAppId);

// let step1Form = JSON.parse(localStorage.get('step1'));

// ajaxForm({
//     elementId: 'enquiryForm',
//     beforeSend: () => {
//         //TODO
//         console.log('beforeSend');
//     },
//     error: (errorText) => {
//         //TODO
//         console.log(errorText);
//     },
//     processing: () => {
//         //upload percentage
//     },
//     success: () => {
//         //TODO
//     },
//     finally: () => {
//         //TODO : finish all job
//     }
// })

// $('[data-fancybox]').fancybox();

// $('#owl-carousel').owlCarousel({
//     items: 1,
//     loop: true,
//     center: true,
//     dots: true,
//     dotsData: true,
//     autoplay: true,
//     autoplayTimeout: 4000,
//     autoplayHoverPause: true,
//     animateOut: 'fadeOut'
// });

// new Isotope('#masonry', {
//     itemSelector: '.masonry-item',
//     layoutMode: 'masonry'
// });

// let table = $('#table').DataTable({
//     scrollY: '100px',
//     responsive: true,
//     scroller: true,
//     select: true
// });
// setTimeout(() => {
//     table.row(10).scrollTo();
// }, 1000);








