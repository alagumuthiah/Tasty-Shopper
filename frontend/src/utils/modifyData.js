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

export async function modifyRecipeData(uri, payload, method) {
    let token = sessionStorage.getItem('access-token');
    console.log(`${baseUrl}${uri}`);
    console.log(token);
    payload = JSON.stringify(payload);
    try {
        const response = await axios({
            method: method,
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


export async function modifyShoppingList(uri, methodType) {
    let token = sessionStorage.getItem('access-token');
    console.log(`${baseUrl}${uri}`);
    console.log(token);
    try {
        const response = await axios({
            method: methodType,
            headers: { 'access-token': token },
            url: `${baseUrl}${uri}`
        })
        return response;
    }
    catch (err) {
        console.log(err);
        return err.response;
    }
}
