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
const isFullUrl = (url: string) => /^https?:\/\//.test(url);

const request = async <T>(
  url: string,
  options?: RequestInit,
  timeout?: number
): Promise<T> => {
  try {
    const fullUrl = isFullUrl(url) ? url : baseUrl + url;
    const response = await fetchWithTimeout(fullUrl, options, timeout);

    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status}`);
    }

    // 增加 content-type 判断，确保是 JSON 才解析
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json() as T;
    } else {
      const text = await response.text();
      console.log("响应内容：", text);
      
      console.warn("收到非 JSON 响应：", text);
      throw new Error("服务器返回的不是 JSON");
    }
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
    // air8000Luat 系列数据
    getAir8000Luat: () => get<any>("/api/Air8000luatOS"),
    //air780 系列数据
    getAir780: () => get<any>("/api/Air780"),//air780 系列数据
    getAir780luat: () => get<any>("/api/Air780luatOS"),//air780luat 系列数据
    getAir780suggest: () => get<any>("/api/Air780suggest"),//air780 推荐数据
    getAir8000pic: () => get<any>("/api/Air8000pic"),//air8000图片规格 
    getAir780pic: () => get<any>("/api/Air780pic"),//air780图片规格

    // POST 接口
    // AiChat: (data: { content: string }) => post<any>("https://www.d3inf.com/m/ds/getQuestion", data),
};
