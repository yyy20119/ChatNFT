import { Roboto } from "@next/font/google"
import { ChatContainer } from "../components/ChatContainer"
import { Message_data } from "../context/context"
import { useContext } from "react"

const roboto = Roboto({ weight: "400", subsets: ["latin"] })

export default function Home() {
    const { message } = useContext(Message_data)
    if (message) {
        console.log(message.tokenName, message.tokenDescription, message.tokenImage)
        return (
            <>
                <div className={roboto.className}>
                    <ChatContainer
                        tokenName={message.tokenName}
                        tokenDescription={message.tokenDescription}
                        tokenImage={message.tokenImage}
                    />
                </div>
            </>
        )
    }
    return <div>Please choose a card from "Talk to ChatNFT" page.</div>
}
