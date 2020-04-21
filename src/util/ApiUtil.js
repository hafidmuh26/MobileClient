const axios = require('axios');

const commonAxios = axios.create({
    baseURL: 'http://192.168.1.24:8080/'
});

commonAxios.interceptors.response.use(function (response) {
    const { data } = response;
    
    if (data.code !== 0) {
        const error = new Error(data.messages || 'Oops!, Unknown error.');
        error.data = data.data;
        throw error;
    }
    return data.data;
}, function (error) {
    return Promise.reject(error);
    
    
});

export { commonAxios };