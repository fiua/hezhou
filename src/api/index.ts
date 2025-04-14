const baseUrl = import.meta.env.VITE_BASE_URL;

const DEFAULT_TIMEOUT = 5000;

// 封装 fetch，支持超时
const fetchWithTimeout = (url: string, options?: RequestInit, timeout = DEFAULT_TIMEOUT): Promise<Response> => {
    return Promise.race([
        fetch(url, options),
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("请求超时")), timeout)
        )
    ]) as Promise<Response>;
};

// 通用请求函数（支持 GET、POST 等）
const request = async <T>(
    url: string,
    options?: RequestInit,
    timeout?: number
): Promise<T> => {
    try {
        const response = await fetchWithTimeout(baseUrl + url, options, timeout);
        if (!response.ok) {
            throw new Error(`HTTP 错误: ${response.status}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error("请求失败:", error);
        throw error;
    }
};

// 封装 GET 请求
const get = <T>(url: string, timeout?: number) =>
    request<T>(url, { method: "GET" }, timeout);

// 封装 POST 请求
const post = <T>(url: string, body: any, timeout?: number) =>
    request<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    }, timeout);

// 接口集合统一导出
export const api = {
    getHeader: () => get<any>("/api/header"),
    getSelect: () => get<any>("/api/select"),
    getAir8000Models: () => get<any>("/api/air8000_models"),
    getProducts8000: () => get<any>("/api/products8000"),
    
    getProductModel: () => get<any>("/api/productModel"),
    getProductComparison: () => get<any>("/api/Productcomparison"),
    getMeter: () => get<any>("/api/meter"),
    getCloud: () => get<any>("/api/cloud"),
    getConnect: () => get<any>("/api/connect"),

    // 示例 POST 接口（如需使用）
    postExample: (data: { name: string }) => post<any>("/api/example", data),
};
