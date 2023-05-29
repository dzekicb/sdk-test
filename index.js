import { Tenderly, Network } from '@tenderly/sdk';


const libraryTokenContract =
  '0x554FAe0af99244BE94668611539412AC4c4C43d6'.toLowerCase();

(async () => {
  try {
    const tenderly = new Tenderly({
      accountName: "",
      projectName: "",
      accessKey: "",
      network: Network.SEPOLIA, // Replace with the appropriate network
    });
    const result = await tenderly.contracts.verify(libraryTokenContract, {
      "config": {
        "mode": "public"
      },
      "contractToVerify": "contracts/NamedCounter.sol:NamedCounter",
      "solc": {
        "version": "v0.8.18",
        "sources": {
          "contracts/NamedCounter.sol": {
            "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.18;\n\nimport {CounterWithLogs} from \"Counter/Counter.sol\";\n\ncontract NamedCounter is CounterWithLogs {\n  string public name;\n\n  function setName(string memory _name) public {\n    name = _name;\n  }\n}\n"
          },
          "Counter/Counter.sol": {
            "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.18;\ncontract CounterWithLogs {\n  uint public count;\n  event CounterChanged(\n    string method,\n    uint256 oldNumber,\n    uint256 newNumber,\n    address caller\n  );\n  // Function to get the current count\n  function get() public view returns (uint) {\n    return count;\n  }\n  // Function to increment count by 1\n  function inc() public {\n    emit CounterChanged(\"Increment\", count, count + 1, msg.sender);\n    count += 1;\n  }\n  // Function to decrement count by 1\n  function dec() public {\n    emit CounterChanged(\"Decrement\", count, count - 1, msg.sender);\n    count -= 1;\n  }\n}\n"
          }
        },
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 20000
          },
          //FIXME This is NOT available via the SDK
          // "viaIR": true,
        }
      }
    });
    console.log('Result:', result);
  } catch (error) {
    console.error(error);
  }
})();
