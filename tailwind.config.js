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
                'success': '#09A837',
                'warning': '#FBC42D',
                'error': '#ff0000'
            }
        },
    },
    plugins: [],
}
