import { useMoralis, useWeb3Contract } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"
import chatNftAbi from "../constants/ChatNft.json"
import NFTBox from "../components/ChatNFTBox"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const fantomChainId = networkMapping.fantomChainId
    const chatNftAddress = networkMapping.chatNftAddress
    const [collectionList, setCollectionList] = useState([])

    const { runContractFunction: getCollection } = useWeb3Contract({
        abi: chatNftAbi,
        contractAddress: chatNftAddress,
        functionName: "getCollection",
        params: { owner: account },
        onError: (error) => console.log(error),
    })

    async function setupUI() {
        const res = await getCollection()
        setCollectionList(res)
    }

    useEffect(() => {
        if (isWeb3Enabled && chainId == fantomChainId) {
            setupUI()
        }
    }, [account, isWeb3Enabled, chainId])

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">ChatNFT Collection</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    chainId == fantomChainId ? (
                        collectionList && collectionList.length > 0 ? (
                            collectionList.map((nft) => {
                                return (
                                    <NFTBox
                                        nftAddress={nft.nftAddress}
                                        tokenId={nft.tokenId.toString()}
                                        creator={account}
                                        key={`${nft.nftAddress}${nft.tokenId}`}
                                    />
                                )
                            })
                        ) : (
                            <div>Please create ChatNFT first.</div>
                        )
                    ) : (
                        <div>Please switch to Fantom Network.</div>
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
