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

const mqlMin = {
    start: matchMedia('(min-width: 320px)'),
    sm: matchMedia('(min-width: 576px)'),
    md: matchMedia('(min-width: 768px)'),
    lg: matchMedia('(min-width: 992px)'),
    xl: matchMedia('(min-width: 1200px)'),
    xxl: matchMedia('(min-width: 1440px)'),
}
const mqlMax = {
    xxl: matchMedia('(max-width: 1439px)'),
    xl: matchMedia('(max-width: 1199px)'),
    lg: matchMedia('(max-width: 991px)'),
    md: matchMedia('(max-width: 767px)'),
    sm: matchMedia('(max-width: 575px)'),
    xs: matchMedia('(max-width: 394px)'),
}

$(function () {
    let body = $('body');
    let toolbar = $('.toolbar');
    let burger = $('.toolbar-menu__switch');

    function bodyLock() {
        if (mqlMax.xxl.matches) {
            $('.menu__list-item').each(function (i, e) {
                let link = $(e).find('.menu__item-link').attr('href');
                let linkText = $(e).find('.menu__item-link').text();

                $('.toolbar-menu__dropdown').append('<a href="' + link + '" class="toolbar-menu__dropdown-link replacement">' + linkText + '</a>');

                if ($(e).find('.menu__dropdown').length) {
                    $(e).find('.menu__dropdown .menu__dropdown-item').each(function (i, e) {
                        let link = $(e).find('.menu__dropdown-link').attr('href');
                        let linkText = $(e).find('.menu__dropdown-link').text();

                        $('.toolbar-menu__dropdown').append('<a href="' + link + '" class="toolbar-menu__dropdown-link sub-link replacement">' + linkText + '</a>');
                    });
                }
            });

            burger.unbind('click');
            burger.on('click', function () {
                body.toggleClass('lock');
                $(this).toggleClass('opened');
                $(this).next().toggleClass('opened');
                toolbar.toggleClass('active');
            });

            if ($('.toolbar-menu__dropdown').hasClass('opened')) {
                body.addClass('lock');
            }
        }
        else {
            burger.unbind('click');
            burger.on('click', function () {
                body.removeClass('lock');
                $(this).toggleClass('opened');
                $(this).next().toggleClass('opened');
                toolbar.toggleClass('active');
            });

            body.removeClass('lock');
        }
    }

    mqlMax.xxl.addListener(bodyLock);
    bodyLock();

    toolbar.on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function (e) {
        e.stopPropagation();
        toolbar.removeClass('active');
        burger.removeClass('opened');
        burger.next().removeClass('opened');
        $('body').removeClass('lock');
    });

    if ($('.faq__toggler').length) {
        $('.faq__toggler').on('click', function () {
            $(this).closest('.faq__box').toggleClass('opened');
            $(this).closest('.faq__box').find('.faq__box-body').stop().slideToggle(300);
        });
    }

    if ($('.blog__toggle-button').length) {
        let defaultHeight = $('.blog.minimized').height();
        $('.blog__toggle-button').on('click', function () {

            $(this).toggleClass('opened');

            if ($(this).hasClass('opened')) {
                $(this).html('Show less <svg><use xlink:href="img/spritemap.svg#sprite-arrow_black"></use></svg>');
                $('.blog.minimized').stop().animate({
                    height: $('.blog.minimized')[0].scrollHeight + 'px',
                }, 300);
            }
            else {
                $(this).html('Show more <svg><use xlink:href="img/spritemap.svg#sprite-arrow_black"></use></svg>');
                $('.blog.minimized').stop().animate({
                    height: defaultHeight + 'px',
                }, 300);
            }
        });
    }

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