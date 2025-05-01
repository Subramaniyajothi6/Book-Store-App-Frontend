const getBaseUrl = () => {
    return import.meta.env.VITE_BASE_URL || "https://book-store-app-backend-livid.vercel.app"; 
}

export default getBaseUrl;
