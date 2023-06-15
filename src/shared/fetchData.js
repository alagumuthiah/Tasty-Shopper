import axios from 'axios';

//how to handle the API key for user defined APIs

async function fetchRecipes(url,searchText){
    const response = await axios({
        method:'get',
        url:`${url}?query=${searchText}`,
        headers:{
            'X-Api-Key':'h65Nj06ZBZnnweHiXIrMV3pTu4nBU2kbzRYGIkjz'
        }
    });
    return response.data;
}

export default fetchRecipes;