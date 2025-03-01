import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearGallery, showLoader, hideLoader, smoothScroll } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".search-form");
const input = form.querySelector("input");
const loadMoreBtn = document.querySelector(".load-more");

let currentPage = 1;
let currentQuery = "";
let totalPages = 1;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentQuery = input.value.trim();
    currentPage = 1;

    if (currentQuery === "") {
        iziToast.error({ message: "Please enter a search term!" });
        return;
    }

    clearGallery();
    loadMoreBtn.style.display = "none"; // Скрываем кнопку при новом поиске

    showLoader();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        if (data.hits.length === 0) {
            iziToast.warning({ message: "Sorry, no images found. Try another query!" });
        } else {
            renderImages(data.hits);
            totalPages = Math.ceil(data.totalHits / 40);

            if (currentPage < totalPages) {
                loadMoreBtn.style.display = "block"; // Показываем кнопку только если есть ещё страницы
            }
        }
    } catch (error) {
        iziToast.error({ message: "Something went wrong. Please try again." });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener("click", async () => {
    currentPage += 1;
    showLoader();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        renderImages(data.hits);

        if (currentPage >= totalPages) {
            loadMoreBtn.style.display = "none";
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }

        smoothScroll(); // Плавная прокрутка вниз
    } catch (error) {
        iziToast.error({ message: "Something went wrong. Please try again." });
    } finally {
        hideLoader();
    }
});
