// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/DragonHackedToken.sol";

contract DragonHackedTokenScript is Script {
    function setUp() public {
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DragonHackedToken bbt = new DragonHackedToken("DragonHackedToken", "DangerDragon");

        console.log(bbt.totalSupply());
        vm.stopBroadcast();
    }
}
