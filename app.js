const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        //toggle
        nav.classList.toggle('nav-active');
        //animation links
        navLinks.forEach((elementLink, index) => {
            
            if(elementLink.style.animation) {
                elementLink.style.animation = ''
            } else {
                elementLink.style.animation = `
                navLinkFadeOut 1s ease forwards ${index / 6}s`
            }
        });

        //burger animation
        burger.classList.toggle('toggle')
    });
}

navSlide();