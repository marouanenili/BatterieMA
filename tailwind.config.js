/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,jsx}',
        './src/components/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    light: '#4F9EF1',
                    DEFAULT: '#1E6FD9',
                    dark: '#104CA0',
                },
            },
        },
    },
    plugins: [],
}
