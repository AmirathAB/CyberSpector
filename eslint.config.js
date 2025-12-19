import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
    // 🔹 Fichiers à ignorer
    {
        ignores: ["node_modules/**", "dist/**"],
    },

    // 🔹 Config JS recommandée
    js.configs.recommended,

    // 🔹 Config Vue 3
    ...vue.configs["flat/essential"],

    // 🔹 Prettier (désactive les règles conflictuelles)
    prettier,

    // 🔹 Règles personnalisées
    {
        files: ["**/*.js", "**/*.vue"],
        rules: {
            "vue/multi-word-component-names": "off",
            "no-console": "off",
            "no-debugger": "off",

        },
    },
];
