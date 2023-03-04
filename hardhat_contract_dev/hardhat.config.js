require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        fantomtest: {
            url: "https://rpc.testnet.fantom.network",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 4002,
            saveDeployments: true,
        },
        fantom: {
            url: "https://rpcapi.fantom.network",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 250,
            saveDeployments: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: {
            opera: process.env.API_KEY,
            ftmTestnet: process.env.API_KEY,
        },
    },
}
