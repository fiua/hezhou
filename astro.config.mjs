// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({

    vite: { // 配置 Vite
        resolve: { // 解析模块路径
            alias: { //设置路径别名
                bootstrap: 'bootstrap/dist/css/bootstrap.min.css',
            },
        },
    },
});
