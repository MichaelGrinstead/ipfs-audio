// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Audio_NFT is ERC721 {

    uint256 tokenId = 1;

    constructor() ERC721("Audio NFT", "AUDIO") {}

    function mint(address to) public {
        _safeMint(to, tokenId);
        tokenId++;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://personal-project-storage.infura-ipfs.io/ipfs/";
    }

}