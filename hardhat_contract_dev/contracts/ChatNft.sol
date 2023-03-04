// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error AlreadyCreated(address nftAddress, uint256 tokenId);
error NotOwner();

contract ChatNft {
    struct Collection {
        address nftAddress;
        uint256 tokenId;
    }

    event NftCreated(address indexed owner, address indexed nftAddress, uint256 indexed tokenId);

    mapping(address => mapping(address => mapping(uint256 => bool))) public s_records;
    mapping(address => Collection[]) public s_collections;

    modifier notCreated(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) {
        bool res = checkRecord(nftAddress, tokenId, owner);
        if (res) {
            revert AlreadyCreated(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    function createNft(
        address nftAddress,
        uint256 tokenId
    )
        external
        isOwner(nftAddress, tokenId, msg.sender)
        notCreated(nftAddress, tokenId, msg.sender)
    {
        s_records[msg.sender][nftAddress][tokenId] = true;
        s_collections[msg.sender].push(Collection(nftAddress, tokenId));
        emit NftCreated(msg.sender, nftAddress, tokenId);
    }

    function getCollection(address owner) public view returns (Collection[] memory) {
        return s_collections[owner];
    }

    function checkRecord(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) public view returns (bool) {
        return s_records[owner][nftAddress][tokenId];
    }
}
