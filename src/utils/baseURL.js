const getBaseUrl = () => {
    // Check if we're running in production (on Vercel) or development
    if (import.meta.env.PROD) {
        // Return your deployed backend URL
        return 'https://book-store-app-frontend-6v9q.vercel.app/'; // Replace with your actual deployed backend URL
    } else {
        // For local development
        return 'http://localhost:5000';
    }
}

export default getBaseUrl;