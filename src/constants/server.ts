export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

if (!process.env.REACT_APP_SERVER_URL) {
    throw new Error('REACT_APP_SERVER_URL is missing');
}
