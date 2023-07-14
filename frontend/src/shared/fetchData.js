import axios from 'axios';
import { baseUrl } from './baseUrl';

//how to handle the API key for user defined APIs

export async function fetchRecipes(url, searchText) {
    const response = await axios({
        method: 'get',
        url: `${url}?query=${searchText}`,
        headers: {
            'X-Api-Key': 'h65Nj06ZBZnnweHiXIrMV3pTu4nBU2kbzRYGIkjz'
        }
    });
    return response.data;
}

export async function fetchUser(uri, payload) {
    console.log('Payload', payload);
    try {
        const response = await axios({
            method: 'post',
            url: `${baseUrl}${uri}`,
            data: payload
        })
        console.log(response);

        return response.data;
    }
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}

export async function fetchIngredients(uri) {
    try {
        const response = await axios({
            method: 'get',
            url: `${baseUrl}${uri}`,
        })
        console.log(response);

        return response.data;
    }
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}
