import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

let lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

export function clearGallery() {
    gallery.innerHTML = "";
}

export function renderImages(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <li class="gallery-item">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p><b>Likes:</b> ${likes}</p>
                    <p><b>Views:</b> ${views}</p>
                    <p><b>Comments:</b> ${comments}</p>
                    <p><b>Downloads:</b> ${downloads}</p>
                </div>
            </li>
        `;
    }).join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

// Показываем/скрываем индикатор загрузки
export function showLoader() {
    document.querySelector(".loader").classList.remove("hidden");
}

export function hideLoader() {
    document.querySelector(".loader").classList.add("hidden");
}

// Плавная прокрутка вниз после загрузки новых изображений
export function smoothScroll() {
    const { height } = document.querySelector(".gallery-item").getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
}
