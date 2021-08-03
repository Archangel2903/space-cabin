import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import 'select2';

const body = $('body');

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

$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        body.addClass('ios');
    } else {
        body.addClass('web');
    }

    body.removeClass('loaded');
});

const toolbar = $('.toolbar');
const burger = $('.toolbar-menu__switch');

function bodyLock() {
    if (mqlMax.xxl.matches) {
        if ($('.toolbar-menu__dropdown-link.replacement').length <= 0) {
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
        }

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
bodyLock();

$(function () {
    const switcherWrap = $('.product-custom__switcher-wrap'),
        switcher = $('.product-custom__switcher'),
        switcherExterior = $('.product-custom__switcher-input[name="exterior-toggle"]').next(),
        switcherInterior = $('.product-custom__switcher-input[name="interior-toggle"]').next();

    if (switcherWrap.length) {
        switcher.each(function (i, e) {
            let button = $(e).find('.product-custom__switcher-btn'),
                input = $(e).prev('.product-custom__switcher-input'),
                color = String(input.data('color')).toLowerCase(),
                imgSrc = input[0].dataset.img,
                imgExterior = $('#exterior'),
                imgInterior = $('#interior');

            button.css('background', color);

            if (input[0].checked) {

                $(e).css('background', color);

                switch (input.attr('name')) {
                    case 'exterior-toggle':
                        imgExterior.attr('src', imgSrc);
                        break;

                    case 'interior-toggle':
                        imgInterior.attr('src', imgSrc);
                        break;
                }
            }

            if (color === '#ffffff') {
                button.css({
                    'border': '1px solid rgba(0, 0, 0, .75)'
                });
            }
        });

        switcher.on('click', function () {
            let btn = $(this).find('.product-custom__switcher-btn'),
                input = $(this).prev(),
                color = String(input.data('color')).toLowerCase(),
                imgSrc = input.data('img'),
                imgExterior = $('#exterior'),
                imgInterior = $('#interior');

            switch (input.attr('name')) {
                case 'exterior-toggle':
                    imgExterior.attr('src', imgSrc);
                    switcherExterior.css('background', '#ffffff');
                    break;

                case 'interior-toggle':
                    imgInterior.attr('src', imgSrc);
                    switcherInterior.css('background', '#ffffff');
                    break;

                default:
                    let otherSwitcher = $('.product-custom__switcher-input[name="' + input.attr('name') + '"]').next();
                    otherSwitcher.css('background', '#ffffff');
                    break;
            }

            if (color !== '#ffffff') {
                $(this).css('background', color);
                btn.css('background', color);
            }
            else {
                $(this).css('background', 'rgba(0, 0, 0, 1)');
                btn.css('background', color);
            }
        });
    }

    mqlMax.xxl.addListener(bodyLock);

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

    let faqToggler = $('.faq__toggler');
    if (faqToggler.length) {
        faqToggler.on('click', function () {
            $(this).closest('.faq__box').toggleClass('opened');
            $(this).closest('.faq__box').find('.faq__box-body').stop().slideToggle(300);
        });
    }

    if ($('.blog__toggle-button').length) {
        let defaultHeight = $('.blog.minimized').height();

        $('.blog__toggle-button').on('click', function () {
            $(this).toggleClass('opened');

            if ($(this).hasClass('opened')) {
                $('.blog.minimized').stop().animate({
                    height: $('.blog.minimized')[0].scrollHeight + 'px',
                }, 300);
            }
            else {
                $('.blog.minimized').stop().animate({
                    height: defaultHeight + 'px',
                }, 300);
            }
        });
    }

    /*
    let select = $('.select-styler');
    if (select.length) {
        select.select2({
            minimumResultsForSearch: Infinity,
        });
    }
    */

    /* To top button */
    const scrollTop = $('#to_top');
    scrollTop.on('click', () => {
        $('html, body').stop().animate({
            scrollTop: 0,
        }, 750);
    });

    $(window).on('scroll', () => {
        if (window.pageYOffset > 800) {
            scrollTop.addClass('show');
        }
        else {
            scrollTop.removeClass('show');
        }
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

/*
$(function () {
    let select = $('.select-styler');
    if (select.length) {
        select.select2({
            minimumResultsForSearch: Infinity,
        });
    }

    select.on('change', function () {
        let region = $('#region');
        let regionValue = region.val();
        let country = $('#country');
        let countryValue = country.val();
        let partnerBlock = $('.wrap-partner');

        if ($(this).attr('id') === 'region') {
            partnerBlock.each(function (i, e) {
                console.log(regionValue);

                if (regionValue === 'show-all') {
                    $(e).css('display', 'block');
                }
                else if ($(e).data('region') !== regionValue) {
                    $(e).css('display', 'none');
                }
                else {
                    $(e).css('display', 'block');
                }
            });
        }
        else if ($(this).attr('id') === 'country') {
            console.log(countryValue);

            partnerBlock.each(function (i, e) {
                if (countryValue === 'show-all') {
                    if (regionValue === 'show-all') {
                        $(e).css('display', 'block');
                    }
                    else if ($(e).data('region') !== regionValue) {
                        $(e).css('display', 'none');
                    }
                    else {
                        $(e).css('display', 'block');
                    }
                }
                else if ($(e).data('country') !== countryValue) {
                    $(e).css('display', 'none');
                }
                else {
                    if (regionValue === 'show-all') {
                        $(e).css('display', 'block');
                    }
                    else if ($(e).data('region') !== regionValue) {
                        $(e).css('display', 'none');
                    }
                    else {
                        $(e).css('display', 'block');
                    }
                }
            });
        }
    });
});
*/