import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import NFTBox from "../components/OriginalNFTBox"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const [collectionList, setCollectionList] = useState([])

    async function setupUI() {
        const response = await fetch("/fetch_wallet_nfts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: account,
            }),
        }).then((res) => res.json())
        if (response) {
            const updateList = []
            response.result.forEach((v, i) => {
                if (v.metadata) {
                    updateList.push(v)
                }
            })
            setCollectionList(updateList)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setupUI()
        }
    }, [account, isWeb3Enabled, chainId])

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Your NFTs in Fantom</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    collectionList && collectionList.length > 0 ? (
                        collectionList.map((nft) => {
                            const nftAddress = nft.token_address
                            const tokenId = nft.token_id
                            const owner = nft.owner_of
                            const metadata = JSON.parse(nft.metadata)
                            const tokenName = metadata.name
                            const tokenDescription = metadata.description
                            const image = metadata.image
                            const symbol = nft.symbol
                            return (
                                <NFTBox
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    owner={owner}
                                    tokenName={tokenName}
                                    tokenDescription={tokenDescription}
                                    image={image}
                                    symbol={symbol}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        })
                    ) : (
                        <div>Please make sure you have NFT in Fantom.</div>
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
