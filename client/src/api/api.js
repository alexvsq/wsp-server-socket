import axios from "axios";

const URL = "http://localhost:3000/wsp"

export const getContactos = async () => {
    try {
        const data = await axios.get(URL);
        return data;
    } catch (error) {
        console.log(errror);
    }
};

export const getMessage = async (num) => {
    try {
        const data = await axios.get(URL + `/${num}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}