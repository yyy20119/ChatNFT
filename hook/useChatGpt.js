import { addMessage, getHistoryString } from "../utils/chatHistory"
import React, { useEffect } from "react"

export const useChatGpt = (message, chatHistory, tokenName, tokenDescription, tokenImage) => {
    const [data, setData] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [history, setHistory] = React.useState(chatHistory)
    const [isSuccess, setIsSuccess] = React.useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/fetch_gpt_res", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    chatHistory: getHistoryString(chatHistory),
                    tokenName,
                    tokenDescription,
                    tokenImage,
                }),
            }).then((res) => res.json())
            if (response.reply) {
                console.log("Hook api call response", response.reply)
                setData(response.reply)
                setIsSuccess(true)
                setHistory(addMessage(chatHistory, response.reply, "chatNFT"))
            } else {
                setIsError(true)
            }
        } catch (error) {
            setIsError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsError(false)
        setIsSuccess(false)
        if (message) {
            fetchData()
        }
    }, [message])

    useEffect(() => {
        setHistory(chatHistory)
    }, [chatHistory])

    return {
        data,
        isLoading,
        isError,
        history,
        isSuccess,
    }
}
