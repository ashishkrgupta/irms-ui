import axios from 'axios';

export const IRMS_SERVICE = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://irms-service.herokuapp.com/irms-service",
});

IRMS_SERVICE.defaults.headers = {
  'Content-Type': 'application/json'
}