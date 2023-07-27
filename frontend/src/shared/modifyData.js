import axios from 'axios';
import { baseUrl } from './baseUrl';

export async function deleteRecipe(uri) {
    let token = sessionStorage.getItem('access-token');
    console.log(`${baseUrl}${uri}`);
    console.log(token);
    try {
        const response = await axios({
            method: 'delete',
            headers: { 'access-token': token },
            url: `${baseUrl}${uri}`
        })
        return response;
    }
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}

export async function updateRecipeData(uri, payload) {
    let token = sessionStorage.getItem('access-token');
    console.log(`${baseUrl}${uri}`);
    console.log(token);
    payload = JSON.stringify(payload);
    try {
        const response = await axios({
            method: 'put',
            headers: { 'access-token': token },
            data: JSON.parse(payload),
            url: `${baseUrl}${uri}`
        })
        return response;
    }
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}

export async function createRecipe(uri, payload) {
    let token = sessionStorage.getItem('access-token');
    console.log(`${baseUrl}${uri}`);
    console.log(token);
    payload = JSON.stringify(payload);
    try {
        const response = await axios({
            method: 'post',
            headers: { 'access-token': token },
            data: JSON.parse(payload),
            url: `${baseUrl}${uri}`
        })
        return response;
    }
    catch (err) {
        console.log(err);
        return err.response.data;
    }
}
