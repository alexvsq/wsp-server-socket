import { useEffect, useState } from 'react'
import MsgSnd from '../assets/msgSnd.jsx'
import MsgEnv from "../assets/msgEnv.jsx"
import { getMessage } from '../api/api.js'
import { useParams } from "react-router-dom"
import { useDatos } from '../context/context.jsx'

export default function input() {

	const { socket } = useDatos()
	const { numero } = useParams()
	const [message, setMessage] = useState([])

	const [textInput, setTextInput] = useState('')

	useEffect(() => {
		getMessage(numero)
			.then(res => setMessage(res.data))
			.catch(err => console.log(err))
	}, [numero])

	useEffect(() => {
		socket.on("message", (data) => {
			if (numero === data.numeroFrom) {
				console.log(numero, data.numeroFrom);
				setMessage(prev => [...prev, data])
			}
		})
		return () => {
			socket.off("message")
		}
	}, [numero])

	function sendMessage() {
		const senMessage = {
			numeroFrom: "51924165577@c.us",
			numeroTo: numero,
			contenido: textInput,
			send: 1
		}
		socket.emit("message", senMessage)
		setTextInput('')
	}
	console.log(numero);
	return (
		<main className=' w-full px-3'>
			<div className='flex flex-col h-full'>

				<div className=' flex-1  overflow-y-scroll scroll-auto'>
					{
						message.map((msg, index) => (
							msg.send === 1 ?
								<MsgSnd key={index} text={msg.contenido} />
								:
								<MsgEnv key={index} text={msg.contenido} />
						))
					}
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						sendMessage()
					}}
					className=' bg-white rounded-full py-3 px-4 text-sm flex'>
					<input
						type="text" placeholder='Escribe un mensaje'
						className=' w-full ring-offset-0 outline-none'
						onChange={(e) => setTextInput(e.target.value)}
						value={textInput}
					/>
					<button>
						✅
					</button>
				</form>
			</div>


		</main>
	)
}

