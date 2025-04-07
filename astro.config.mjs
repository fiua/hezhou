// @ts-check
import { defineConfig } from 'astro/config';
// https://astro.build/config
export default defineConfig({
    // integrations: [vue()],
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "/src/style/reset.less";`
                }
            }
        }
    }
});
