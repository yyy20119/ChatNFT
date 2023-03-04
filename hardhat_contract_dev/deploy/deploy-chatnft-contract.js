const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(deployer)
    const waitBlockConfirmations = 2
    log("----------------------------------------------------")
    const arguments = []
    const chatNft = await deploy("ChatNft", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    await verify(chatNft.address, arguments)
}

module.exports.tags = ["all"]
