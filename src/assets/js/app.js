'use strict';

const initHeader = () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    let lastScroll = 0;
    let scrollWay = 200;

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        header.classList.toggle('is-colored', currentScroll > 50);

        currentScroll > scrollWay && currentScroll > lastScroll
            ? header.classList.add('is-transform')
            : header.classList.remove('is-transform');
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
};

const initFAQ = () => {
    const FAQboxes = document.querySelectorAll('.js-faq-box');
    if (!FAQboxes.length) return;

    FAQboxes.forEach((box) => {
        const toggleActive = box.querySelector('.js-faq-toggle');
        if (toggleActive) {
            toggleActive.addEventListener('click', (e) => {
                e.stopPropagation();

                const isOpen = box.classList.contains('is-open');
                FAQboxes.forEach((el) => el.classList.remove('is-open'));

                isOpen
                    ? box.classList.remove('is-open')
                    : box.classList.add('is-open');
            });
        }
    });
};

const initCenteredSliders = ({ selector, gap }) => {
    if (typeof Swiper === 'undefined') return;

    const sliderBlocks = document.querySelectorAll(`.js-${selector}-slider`);
    if (!sliderBlocks.length) return;

    sliderBlocks.forEach((block) => {
        const sliderEl = block.querySelector('.swiper');

        if (!sliderEl) return;

        const slides = sliderEl.querySelectorAll('.swiper-slide');
        const shouldCenter = slides.length > 2;

        const pagination = block.querySelector('.js-pagination');
        const btnPrev = block.querySelector('.js-control-prev');
        const btnNext = block.querySelector('.js-control-next');

        const swiperConfig = {
            speed: 900,
            grabCursor: true,
            centeredSlides: shouldCenter,
            spaceBetween: gap,
            slidesPerView: 'auto',
        };

        if (btnPrev || btnNext) {
            swiperConfig.navigation = {
                ...(btnPrev && { prevEl: btnPrev }),
                ...(btnNext && { nextEl: btnNext }),
            };
        }

        if (pagination) {
            const paginationType = pagination.classList.contains('is-dots')
                ? 'bullets'
                : pagination.classList.contains('is-progress')
                  ? 'progressbar'
                  : null;

            if (paginationType) {
                swiperConfig.pagination = {
                    el: pagination,
                    type: paginationType,
                };

                if (paginationType === 'bullets') {
                    swiperConfig.pagination.clickable = true;
                }
            }
        }

        new Swiper(sliderEl, swiperConfig);
    });
};

const simpleSlidersConfigs = {
    'js-preview-slider': {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    'js-gallery-slider': {
        slidesPerView: 'auto',
        spaceBetween: 30,
    },
};

const initSimpleSlider = () => {
    if (typeof Swiper === 'undefined') return;

    const sliderBlocks = document.querySelectorAll('.js-simple-slider');
    if (!sliderBlocks.length) return;

    sliderBlocks.forEach((block) => {
        const sliderEl = block.querySelector('.swiper');
        if (!sliderEl) return;

        const configClass = Object.keys(simpleSlidersConfigs).find(
            (className) => block.classList.contains(className),
        );

        const config = configClass ? simpleSlidersConfigs[configClass] : {};

        new Swiper(sliderEl, {
            speed: 900,
            grabCursor: true,
            navigation: {
                prevEl: block.querySelector('.js-control-prev'),
                nextEl: block.querySelector('.js-control-next'),
            },
            ...config,
        });
    });
};

const initResetForms = () => {
    const forms = document.querySelectorAll('form');
    if (!forms.length) return;

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initFAQ();
    initCenteredSliders({
        selector: 'atmosphere',
        gap: 50,
    });
    initCenteredSliders({
        selector: 'conference',
        gap: 50,
    });
    initCenteredSliders({
        selector: 'rooms',
        gap: 80,
    });
    initSimpleSlider();
    initResetForms();
});
