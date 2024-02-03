import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL:'https://bus-tracking-server.onrender.com'
});

export default axiosBaseURL