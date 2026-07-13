/*
* Mahadev Interior Exterior - Gallery & Lightbox JavaScript
* Author: Gemini Code Assist
* Version: 1.0.0
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- GALLERY FILTER ---
    const filterContainer = document.querySelector('.project-filters');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Active button
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (item.dataset.category === filterValue || filterValue === 'all') {
                        item.style.display = 'block';
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            }
        });
    }

    // --- LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const galleryImg = item.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = galleryImg.src;
            lightboxImg.alt = galleryImg.alt;
            lightboxCaption.innerHTML = item.querySelector('h3').innerHTML;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});