import axios from 'axios';

export const IRMS_SERVICE = axios.create();
IRMS_SERVICE.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://irms-service.herokuapp.com/irms-service";