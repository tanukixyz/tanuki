# Tanuki - Blockchain commandline dev tool

![Node Shield](https://img.shields.io/badge/Node-%5E16.0.0-brightgreen?style=flat-square&logo=JavaScript)
![Typescript Shield](https://img.shields.io/badge/Typescript-%5E4.6.3-blue?style=flat-square&logo=TypeScript)

### Example commands

**Get transaction**
```bash
tanuki gettx \
  --hash 0xa98c1164e8b0d6945d3cfc67ecd9cb20b1d9c08c60532efaf01509c987b8d2fa \
  
# with receipt
tanuki gettx \
  --hash 0xa98c1164e8b0d6945d3cfc67ecd9cb20b1d9c08c60532efaf01509c987b8d2fa \
  --full
```

**Query contract data**

```bash
tanuki readcontract \
  --rpc 'https://rpc.ankr.com/eth' \
  --abi ERC20 \
  --address 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 \
  --method balanceOf \
  --params '["0x0a59649758aa4d66e25f08dd01271e891fe52199"]'

# query data at specify block number
tanuki readcontract \
  --rpc 'https://rpc.ankr.com/eth' \
  --abi ./local/ERC20.json \
  --address 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 \
  --method balanceOf \
  --params '["0x0a59649758aa4d66e25f08dd01271e891fe52199"]' \
  --blockNumber 11872241
```
