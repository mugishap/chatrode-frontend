const apiUrl: string = import.meta.env.DEV
    ? "http://localhost:5001/api/v1"
    : "https://chatrode-backend.onrender.com/api/v1";

const socketUrl = import.meta.env.DEV
    ? "http://localhost:5001"
    : "https://chatrode-backend.onrender.com";

export {
    socketUrl,
    apiUrl
}