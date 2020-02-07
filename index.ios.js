import { StatusBar } from 'react-native';

let requestCount = 0;
const updateActivityIndicator = (increment = false) => {
    increment ? requestCount++ : requestCount--;

    if (requestCount <= 0) {
        requestCount = 0;
    }

    StatusBar.setNetworkActivityIndicatorVisible(requestCount != 0);
};

export default {
    RegisterToAxiosInstance(axiosInstance) {
        if (axiosInstance
            && axiosInstance.interceptors
            && axiosInstance.interceptors.request
            && axiosInstance.interceptors.response) {
                axiosInstance.interceptors.request.use(function(config) {
                    updateActivityIndicator(true);
                    return config;
                }, function(error) {
                    updateActivityIndicator();
                    return Promise.reject(error);
                });

                axiosInstance.interceptors.response.use(function(response) {
                    updateActivityIndicator();
                    return response;
                }, function(error) {
                    updateActivityIndicator();
                    return Promise.reject(error);
                });
        }
    }
}
