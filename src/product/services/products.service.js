import http from "@/shared/services/http-common";
// Función para obtener el atributo 'image' de un usuario por su ID
async function getProductListLike(like, limit = 3, categoryId = ignoreThisPart, subcategoryId = ignoreThisPart, franchiseId = ignoreThisPart) {
    let queryInfo = "";
    if(categoryId !== ignoreThisPart) queryInfo = `&category=${categoryId}`
    if(subcategoryId !== ignoreThisPart) queryInfo += `&subcategory=${subcategoryId}`
    if(franchiseId !== ignoreThisPart) queryInfo += `&franchise=${franchiseId}`
    try {
        const response = await http.get(`/products?name_like=${like}&_limit=${limit}${queryInfo}`);
        const products = response.data;
        if(products){
            return products;
        }
        else{
            return undefined;
        }
    } catch (error) {
        console.error("Error al solicitar datos de los productos en products.service.js", error);
        throw error;
    }
}
const ignoreThisPart = -1;
async function getProductList(limit, categoryId = ignoreThisPart, subcategoryId = ignoreThisPart, franchiseId = ignoreThisPart) {
    let queryInfo = "";
    if(categoryId !== ignoreThisPart) queryInfo = `&category=${categoryId}`
    if(subcategoryId !== ignoreThisPart) queryInfo += `&subcategory=${subcategoryId}`
    if(franchiseId !== ignoreThisPart) queryInfo += `&franchise=${franchiseId}`
    try {
        const response = await http.get(`/products?_limit=${limit}${queryInfo}`);
        const products = response.data;
        if(products){
            return products;
        }
        else{
            return [];
        }
    } catch (error) {
        console.error("Error al solicitar datos de los productos en products.service.js", error);
        throw error;
    }
}
async function getProductByID(id){
    try {
        const response = await http.get(`/products/${id}`);
        const product = response.data;
        if(product){
            return product;
        }
        else{
            return {};
        }
    } catch (error) {
        console.error(`Error al solicitar datos del producto #${id} en products.service.js`, error);
        throw error;
    }
}

export {getProductListLike, getProductList, getProductByID, ignoreThisPart}