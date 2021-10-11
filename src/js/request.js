import axios from 'axios';
import config from '../config.json';
import { getDataFromServer } from '../index';

export function getUrl(searchQueryText, pagePagination) {
  const searchParams = new URLSearchParams({
    key: config.key,
    q: searchQueryText,
    image_type: config.image_type,
    orientation: config.orientation,
    safesearch: config.safesearch,
    page: pagePagination,
    per_page: config.per_page
  });
    
  const url = `${config.baseUrl}?${searchParams}`;

  getDataFromServer(url);
}

export async function getRequest(url) {
  try {
    const response = await axios.get(url);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw response;

  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}