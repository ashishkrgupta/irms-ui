export const ENV = "dev";
//export const ENV = "sit";
//export const ENV = "prod";
export const SERVICE_BASE_URL = ENV === "sit" ? "https://cors-anywhere.herokuapp.com/https://irms-service.herokuapp.com/irms-service/" : ENV === "dev" ? "http://localhost:8080/irms-service" : "";

export const STUDENTS_URL = SERVICE_BASE_URL + "students";
