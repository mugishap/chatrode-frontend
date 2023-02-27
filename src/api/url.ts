const apiUrl: string = import.meta.env.DEV
    ? "http://localhost:5000/api/v1"
    : "https://chatrode-backend.up.railway.app/api/v1";

const socketUrl = import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://chat-rode-backend-production.up.railway.app";

export {
    socketUrl,
    apiUrl
}