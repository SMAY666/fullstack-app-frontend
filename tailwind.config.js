/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{jsx,tsx}'
    ],
    theme: {
        extend: {
            container: {
                center: true
            },
            colors: {
                'info': '#999999',
                'success': '#00FF00',
                'warning': '#FFFF00',
                'error': '#ff0000'
            }
        },
    },
    plugins: [],
}
