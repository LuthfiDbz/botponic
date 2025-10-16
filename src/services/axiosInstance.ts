import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Set the AUTH token (put from localStorage) for any request
axiosInstance.interceptors.request.use((config) => {
  // const { auth } = store.getState();
  // config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response)
    //   if (error.response.status === 401) {

    //     window.location = "/login";
    //   } else if (error.response.status === 503) {
    //     const pathname = window.location.pathname
    //     if(!pathname.includes('maintenance')) {
    //       window.location = "/maintenance";
    //     }
    //   }
    throw error;
  }
);

export default axiosInstance;
