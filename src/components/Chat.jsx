import { useParams } from "react-router-dom"; 
import { useState , useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux"; 

const Chat = () => {

    const {targetUserId} = useParams() ; 
    // console.log(targetUserId) ; 
    const [messages , setMessages] = useState([[{text: "Hello World"}]]) ; 
    const [newMessage , setNewMessage] = useState("") ; 
    const user = useSelector((store) => store.user.data) ; 
    const userId = user?._id ;
    const firstName = user.firstName ; 
    console.log("!$%! ",targetUserId , userId) ;  
    const sendMessage = () => {
        const socket = createSocketConnection() ; 
        socket.emit("sendMessage" , {firstName , userId , targetUserId , text: newMessage}) ; 
        setNewMessage("") ; 
    }
    useEffect(() => {

        const socket = createSocketConnection() ;
        socket.emit("joinChat" , {targetUserId , userId}) ; 

        socket.on("messageReceived" , ({firstName , text}) => {
            console.log(firstName + " : "  + text) ; 
            setMessages(messages => [...messages , {firstName , text}]) ; 
        })
        //whenever the component unmounts
        return () => {
            socket.disconnect() ; 
        }
    } ,[userId , targetUserId]) ; 

    return (
        <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                { messages.map((msg , index) => {
                    return (
                        <div key = {index} className="chat chat-start" >
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                }) }
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border border-gray-500 text-white rounded p-2" />
                <button onClick={sendMessage} className="btn btn-secondary">Send</button>

            </div>
        </div>
    )
} ; 

export default Chat ; 