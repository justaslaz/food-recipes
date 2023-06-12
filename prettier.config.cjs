/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
