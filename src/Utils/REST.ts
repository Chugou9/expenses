/**
 * Реализация POST метода REST API.
 *
 * @param {string} path Путь для запроса.
 * @param {any} params Доп параметры.
 */
export const POST = (path: string, params?: any) => {
    return fetch(path, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(params)
    }).then(response => response.json());
};

/**
 * Реализация GET метода REST API.
 *
 * @param {string} path Путь для запроса.
 */
export const GET = (path: string) => {
    return fetch(path, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }).then(response => response.json());
};
