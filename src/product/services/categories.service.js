import http from "@/shared/services/http-common";
let categoriesData = [];
const cantCategories = 3;
async function getCategoriesFullData(){
    if(categoriesData.length === 0){
        try {
            const response = await http.get(`/category`);
            categoriesData = response.data;
            if(categoriesData){
                return categoriesData;
            }
            else{
                return [];
            }
        } catch (error) {
            console.error("Error al solicitar datos de las categorias en products.service.js", error);
            throw error;
        }
    }
    else return categoriesData;
}



export {
    getCategoriesFullData,
    cantCategories,
}