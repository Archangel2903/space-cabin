import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect'
import 'bootstrap';
import 'popper.js';


$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
});

$(function () {
    $('.faq__toggler').on('click', function () {
        $(this).closest('.faq__box').toggleClass('opened');
        $(this).closest('.faq__box').find('.faq__box-body').slideToggle(300);
    });

    let toolbar = $('.toolbar');
    let burger = $('.toolbar-menu__switch');

    burger.on('click', function () {
        toolbar.toggleClass('active');
        $(this).next().toggleClass('opened');
    });
    toolbar.on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function (e) {
        e.stopPropagation();
        toolbar.removeClass('active');
        burger.next().removeClass('opened');
    });

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});