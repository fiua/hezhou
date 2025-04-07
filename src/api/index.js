const baseUrl = "https://astro.usemock.com"
let get = async (url) => {
    try {
        const response = await fetch(baseUrl + url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;  // 返回数据
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
// header数据
export let getHeader = async () => {
    return await get('/api/header')
}
//select数据
export let getSelect = async () => {
    return await get('/api/select')
}
//air8000对比表
export let getAir8000Models = async () => {
    return await get('/api/air8000_models')
}
//air8000所有数据
export let getProducts8000 = async () => {
    return await get('/api/products8000')
}
//4G-产品型号
export let getProductModel = async () => {
    return await get('/api/productModel')
}
// 4G-产品对比
export let getProductcomparison = async () => {
    return await get('/api/Productcomparison')
}
//功耗分析仪
export let getMeter = async () => {
    return await get('/api/meter')
}
// 云服务
export let getCloud = async () => {
    return await get('/api/cloud')
}
//联系我们
export let getConnect = async () => {
    return await get('/api/connect')
}


