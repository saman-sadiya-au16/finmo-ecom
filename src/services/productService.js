import axios from "axios";

const getProducts = async () => {
    const url = 'https://fakestoreapi.com/products';
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
        responseType: 'json',
        responseEncoding: 'utf8',
        url,
    }
    const result = await axios(options);
    return result;
}

const productService = {
    getProducts,
}

export default productService;