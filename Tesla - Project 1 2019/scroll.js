
document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener('scroll', () => {
    const direction = window.pageYOffset > document.lastScrollPosition ? 'down' : 'up';
    const sections = [...document.querySelectorAll('section')];

    if (document.onWayTo === null) {
        const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;
        if (destIndex >= 0 && destIndex < sections.length) {
            console.log({ destIndex, direction });
            document.onWayTo = destIndex;
            window.scrollTo(0, sections[destIndex].offsetTop);
        }
    }

    sections.forEach((section, index) => {
        if (window.pageYOffset >= section.offsetTop && window.pageYOffset < section.offsetTop + section.offsetHeight) {
            document.lastCentered = index;
            section.classList.add('active');
            if (document.onWayTo === index) {
                document.onWayTo = null;
            }
        } else {
            section.classList.remove('active');
        }
    });

  
    if (direction === 'down' && document.lastCentered < sections.length - 1) {
        const nextSectionTitle = sections[document.lastCentered + 1].querySelector('h1');
        if (nextSectionTitle) {
            nextSectionTitle.style.visibility = 'visible';
        }
    }

    document.lastScrollPosition = window.pageYOffset;
});
