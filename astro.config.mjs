// @ts-check
import { defineConfig } from 'astro/config';
export default defineConfig({
    // site: 'https://www.yoursite.com',  // 设置站点 URL
    // output: 'static', // 生成静态站点
    // trailingSlash: 'always', // 设置斜杠
    compressHTML: true,
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "/src/style/reset.less";`
                }
            },
        },


    }
});
