import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:3001/"
})

export const getProducts = (page?:number,limit?:number) => {
    if (page && limit) {
        return instance.get(`product?page=${page}&limit=${limit}`);
    } else {
        return instance.get('product');
    }
}

export const getProductsByCategory = (categoryId:number|string,page?:number,limit?:number) => {
    if (page && limit) {
        return instance.get(`product/category/${categoryId}?page=${page}&limit=${limit}`);
    } else {
        return instance.get(`product/category/${categoryId}`);
    }
}

export const getProductById = (productId:number|string) => {
    return instance.get(`product/${productId}`);
}

export const getCategory = () => {
    return instance.get('category');
}

export const getCategoryById = (categoryId:number|string) => {
    return instance.get(`category/${categoryId}`);
}

export const getImage = (imageUrl:string,width?:number,height?:number) => {
    if (width && height) {
        return instance.get(`image/${imageUrl}?width=${width}&height=${height}`);
    } else {
        return instance.get(`image/${imageUrl}`);
    }
}

export const countProduct = () => {
    return instance.get("/productCount");
};
