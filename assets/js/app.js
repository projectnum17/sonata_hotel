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
        lastScroll = scrollWay;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
};

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});
