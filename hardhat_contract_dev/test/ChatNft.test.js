const { assert, expect } = require("chai")

beforeEach(async () => {
    BasicNft = await ethers.getContractFactory("BasicNft")
    basicNftContract = await BasicNft.deploy()
    await basicNftContract.mintNft()
    ChatNft = await ethers.getContractFactory("ChatNft")
    chatNftContract = await ChatNft.deploy()
    accounts = await ethers.getSigners()
})

describe("ChatNft Test", function () {
    it("emits an event after createNft", async function () {
        expect(await chatNftContract.createNft(basicNftContract.address, 0)).to.emit("NftCreated")
    })

    it("assert collection after createNft", async function () {
        await chatNftContract.createNft(basicNftContract.address, 0)
        const collection = await chatNftContract.getCollection(accounts[0].address)
        assert(collection[0][0] == basicNftContract.address)
        assert(collection[0][1] == 0)
    })

    it("revert if not already created", async function () {
        await chatNftContract.createNft(basicNftContract.address, 0)
        const error = "AlreadyCreated"
        await expect(chatNftContract.createNft(basicNftContract.address, 0)).to.be.revertedWith(
            error
        )
    })

    it("revert if not owner", async function () {
        const error = "NotOwner"
        chatNftContract = chatNftContract.connect(accounts[1])
        await expect(chatNftContract.createNft(basicNftContract.address, 0)).to.be.revertedWith(
            error
        )
    })
})
