import { useChatGpt } from "../hook/useChatGpt"
import { addMessage } from "../utils/chatHistory"
import { Button, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { ChatHistoryFrame } from "./ChatHistoryFrame"

export const ChatContainer = ({ tokenName, tokenDescription, tokenImage }) => {
    const [pendingMessage, setPendingMessage] = React.useState("")
    const [message, setMessage] = React.useState("")
    const [chatHistory, setChatHistory] = React.useState([])
    const { isLoading, history, isSuccess, isError } = useChatGpt(
        message,
        chatHistory,
        tokenName,
        tokenDescription,
        tokenImage
    )

    useEffect(() => {
        if (isSuccess || isError) {
            setMessage("")
        }
    }, [isSuccess, isError])

    return (
        <div id="chat-container">
            <h1>{tokenName}</h1>
            <ChatHistoryFrame chatHistory={chatHistory} isLoading={isLoading} />
            <div id="chat-input">
                <TextField
                    id="message"
                    type="text"
                    onChange={(e) => {
                        setPendingMessage(e.target.value)
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            setMessage(pendingMessage)
                            setChatHistory(addMessage(history || [], pendingMessage, "owner"))
                            document.getElementById("message").value = ""
                        }
                    }}
                />
                <Button
                    style={{
                        backgroundColor: "black",
                        width: "80px",
                    }}
                    variant="contained"
                    onClick={() => {
                        setMessage(pendingMessage)
                        setChatHistory(addMessage(history || [], pendingMessage, "owner"))
                        document.getElementById("message").value = ""
                    }}
                >
                    Send
                </Button>
                <Button
                    style={{
                        color: "black",
                        width: "80px",
                        borderColor: "black",
                    }}
                    variant="outlined"
                    onClick={() => {
                        setMessage("")
                        setChatHistory([])
                        document.getElementById("message").value = ""
                    }}
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}
