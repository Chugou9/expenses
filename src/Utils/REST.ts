import isEmpty from 'lodash.isempty';
import axios from 'axios';

/**
 * Реализация POST метода REST API.
 *
 * @param {string} path Путь для запроса.
 * @param {any} params Доп параметры.
 */
export const POST = <T>(path: string, params?: any) => {
    const url = new URL(path);
    return axios.post<T>(url.toString(), params)
        .then(response => response?.data);
};

/**
 * Реализация PUT метода REST API.
 *
 * @param {string} path Путь для запроса.
 * @param {any} params Доп параметры.
 */
export const PUT = <T>(path: string, params?: any) => {
    return axios.put<T>(path, params).then(response => response.data);
};

/**
 * Реализация GET метода REST API.
 *
 * @param {string} path Путь для запроса.
 */
export const GET = <T>(path: string, options?: any) => {
    const url = new URL(path);

    if (!isEmpty(options)) {
        Object.keys(options).forEach((key) => url.searchParams.append(key, options[key]));
    }

    return axios.get<T>(url.toString()).then(response => response.data);
};

/**
 * Реализация DELETE метода REST API.
 *
 * @param {string} path Путь для запроса.
 */
export const DELETE = (path: string) => {
    return fetch(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'text/plain',
        }
    }).then(response => console.log(response));
};

// Create the XHR object.
function createCORSRequest(method: string, url: string) {
    let xhr: XMLHttpRequest | null = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else {
      // CORS not supported.
      xhr = null;
    }

    return xhr;
  }
  
  // Helper method to parse the title tag from the response.
  function getTitle(text: any) {
    return text.match('<title>(.*)?</title>')[1];
  }
  
/**
 * Запрос на получение записи с использованием CORS.
 *
 * @param {string} url Ссылка на ресурс. 
 */
export function DELETE_CORS(url: string) {
    const xhr = createCORSRequest('DELETE', url);

    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    xhr.setRequestHeader('Content-Type', 'text/plain');

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var title = getTitle(text);
        console.log('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function() {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}