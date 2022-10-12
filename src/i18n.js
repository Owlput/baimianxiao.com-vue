import zhCn from "./assets/i18n/zh.json";
import enUs from "./assets/i18n/en.json";
import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

const i18n = createI18n({
  locale: "zh",
  messages: {
    en: enUs,
    zh: zhCn,
  },
  allowComposition: true,
});

export default i18n;
