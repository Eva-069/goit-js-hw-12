import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "49128328-9f71e16c7708b61d93c4a93f1";

export async function fetchImages(query, page = 1) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40, // Загружаем по 40 изображений за раз
        page, // Добавляем поддержку пагинации
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}
