import { createContext, useContext, useEffect, useState } from "react";
import { getContactos } from "../api/api.js";
import io from "socket.io-client"


const socket = io("/")

export const DatosContext = createContext();

export const useDatos = () => {
    const context = useContext(DatosContext);
    return context
}

export const DatosProvider = ({ children }) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
            const data = await getContactos();
            const contacts = data.data;
            setContacts(contacts)
        }
        fetchContacts();
    }, [])

    useEffect(() => {
        socket.on("contact", (data) => {
            console.log(data);

            setContacts(prev => [...prev, data])
        })
    }, [])

    return (
        <DatosContext.Provider value={{ contacts, socket }}>
            {children}
        </DatosContext.Provider>
    )
}