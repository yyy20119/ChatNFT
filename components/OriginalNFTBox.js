import { useWeb3Contract, useMoralis } from "react-moralis"
import chatNftAbi from "../constants/ChatNft.json"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import networkMapping from "../constants/networkMapping.json"
import { getAccordionDetailsUtilityClass } from "@mui/material"

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    const seperatorLength = separator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

export default function NFTBox({
    nftAddress,
    tokenId,
    owner,
    tokenName,
    tokenDescription,
    image,
    symbol,
}) {
    const { isWeb3Enabled, account } = useMoralis()
    const dispatch = useNotification()
    const imageURI = image.replace("ipfs://", "https://ipfs.io/ipfs/")
    const chatNftAddress = networkMapping.chatNftAddress

    const { runContractFunction: createNft } = useWeb3Contract({
        abi: chatNftAbi,
        contractAddress: chatNftAddress,
        functionName: "createNft",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    const isOwnedByUser = owner === account || owner === undefined
    const formattedOwnerAddress = isOwnedByUser ? "you" : truncateStr(owner || "", 15)

    const handleCardClick = () => {
        createNft({
            onError: handleCreateNftError,
            onSuccess: handleCreateNftSuccess,
        })
    }

    const { runContractFunction: checkRecord } = useWeb3Contract({
        abi: chatNftAbi,
        contractAddress: chatNftAddress,
        functionName: "checkRecord",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            owner: account,
        },
        onError: (error) => console.log(error),
    })

    const handleCreateNftError = async (tx) => {
        const res = await checkRecord()
        if (res) {
            dispatch({
                type: "success",
                message:
                    'Already created! Please check your collection in "Talk to ChatNFT" page.',
                title: "Already created",
                position: "topR",
            })
        }
    }

    const handleCreateNftSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: 'ChatNft created! Please check your collection in "Talk to ChatNFT" page.',
            title: "Confirmed",
            position: "topR",
        })
    }

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <Card description="Create ChatNFT" onClick={handleCardClick}>
                            <div className="p-2">
                                <div className="flex flex-col items-end gap-2">
                                    <div>
                                        {symbol} #{tokenId}
                                    </div>
                                    <div className="italic text-sm">
                                        Owned by {formattedOwnerAddress}
                                    </div>
                                    <Image
                                        style={{
                                            height: "200px",
                                            width: "200px",
                                            objectFit: "contain",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            borderRadius: "initial",
                                        }}
                                        loader={() => imageURI}
                                        src={imageURI}
                                        height="200"
                                        width="200"
                                        alt={symbol}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
