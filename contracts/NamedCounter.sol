// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CounterWithLogs} from "Counter/Counter.sol";

contract NamedCounter is CounterWithLogs {
  string public name;

  function setName(string memory _name) public {
    name = _name;
  }
}