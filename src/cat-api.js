import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_qpk8V4Vn1c6WCSS1XAzec3PAU0YVylKoaZ2hz1gtDr0NNlCiRFWOZT2t3hr1i27t";

export function fetchBreeds() {
     return axios.get('https://api.thecatapi.com/v1/breeds')
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
}








