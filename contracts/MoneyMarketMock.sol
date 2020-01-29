pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@pooltogether/pooltogether-contracts/contracts/test/CErc20Mock.sol";

contract MoneyMarketMock is Initializable, CErc20Mock {}
