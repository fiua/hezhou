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
export let getNavgation = async () => {
    return await get('/api/navigation')
}

export let getCardA = async () => {
    return await get('/api/cardA')
}
export let getFooter = async () => {
    return await get('/api/footer')
}




