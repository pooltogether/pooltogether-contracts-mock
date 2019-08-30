pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "pooltogether-contracts/contracts/test/CErc20Mock.sol";

contract MoneyMarket is Initializable, CErc20Mock {}
