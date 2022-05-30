import BigNumber from 'bignumber.js';
import { expect } from 'chai';
import { describe } from 'mocha';

import { EvmChainProvider } from '../providers/blockchain';
import EnvProvider from '../providers/env';

const envConfig = new EnvProvider();

describe('EvmChainProvider', async function () {
  it('getBlock', async function () {
    const blockToTests: Array<any> = [
      {
        chain: 'ethereum',
        blockNumber: 14871537,
        blockHash: '0x6a39749ed3159ec7dfce62b62d94f55b44ec5837d6b4e3ba3af8b7c3eb2e73c1',
        transactionCount: 107,
      },
      {
        chain: 'polygon',
        blockNumber: 28946750,
        blockHash: '0x0ca792a08c38febc3346df9e6c550963d48fcb671a1eab1086d776ed96cfc6e1',
        transactionCount: 95,
      },
      {
        chain: 'avalanche',
        blockNumber: 15367450,
        blockHash: '0x8482857f6e8e87922fc710d80879dca146e5a516eeb5b6749aef67db60064d1a',
        transactionCount: 10,
      },
      {
        chain: 'bsc',
        blockNumber: 18248188,
        blockHash: '0x5be33e96587604f55a4af6707f9ef8045327de374fdbf13c5129b912c5030404',
        transactionCount: 219,
      },
      {
        chain: 'fantom',
        blockNumber: 39384366,
        blockHash: '0x0001cc5700000209f11da8c1248b0b3594c38568881ceaff250e826d99c47dad',
        transactionCount: 47,
      },
    ];

    for (let i = 0; i < blockToTests.length; i++) {
      const provider = new EvmChainProvider(
        envConfig.getChainConfig({
          name: blockToTests[i].chain,
          network: 'mainnet',
        }).nodeRpc
      );
      let block: any = await provider.getBlock({
        number: blockToTests[i].blockNumber,
        hash: '',
      });
      expect(Number(block.number)).equal(blockToTests[i].blockNumber);
      expect(block.hash).equal(blockToTests[i].blockHash);
      expect(block.transactions.length).equal(blockToTests[i].transactionCount);

      block = await provider.getBlock({
        number: 0,
        hash: blockToTests[i].blockHash,
      });
      expect(Number(block.number)).equal(blockToTests[i].blockNumber);
      expect(block.hash).equal(blockToTests[i].blockHash);
      expect(block.transactions.length).equal(blockToTests[i].transactionCount);
    }
  });

  it('getTransaction', async function () {
    const transactionToTests: Array<any> = [
      {
        chain: 'ethereum',
        hash: '0x07176667c74c1a4e96c47f22bf2ddcddea48c608f9cc459857366973586d14cc',
        from: '0x839d4641f97153b0ff26ab837860c479e2bd0242',
        to: '0x1111111254fb6c44bac0bed2854e76f90643097d',
        value: 1.35073,
        receipt: {
          gasUsed: 180521,
        },
      },
      {
        chain: 'polygon',
        hash: '0x89b1f3b3874b1f3e41fce137547e34045879499a0bdb8ca52ee5fa2160f45617',
        from: '0x42a1ef8ae523231d66ecb23feb766bd9d2be9ac3',
        to: '0x2d477f9d18505ba6666f0921ea64988e2103cac2',
        value: 0.02,
        receipt: {
          gasUsed: 21000,
        },
      },
      {
        chain: 'avalanche',
        hash: '0x331dd0303ad90f41c57c8e382db7b8ca03fc2eeec8d3310e4ff69350348755bf',
        from: '0x09f9af8021769924cd7d2873ab85dec010af9af5',
        to: '0xc6da1a75e6bdb82f707110bdf9026e77d60983bc',
        value: 0.512361778789553449,
        receipt: {
          gasUsed: 33587,
        },
      },
      {
        chain: 'fantom',
        hash: '0xa844238daa2d4c1505b00a47e30d6cf69330498be4cf0feb8a5c5395ecabc796',
        from: '0x70ef271e741aa071018a57b6e121fe981409a16d',
        to: '0x7c7ec9d8672dfead60d6a533c3c5610dd8916c48',
        value: 7.160067256515001,
        receipt: {
          gasUsed: 850956,
        },
      },
      {
        chain: 'bsc',
        hash: '0x67d6dab393d2caf54909d7fab572f0cc288255822b5cbefdfd2acbedf9ef6695',
        from: '0x09eb3f596938aac60de49b5ff5c1348a93590d23',
        to: '0x7f764c056d913f46aac9d0352f85305d635f2781',
        value: 0.008947175,
        receipt: {
          gasUsed: 21000,
        },
      },
    ];

    for (let i = 0; i < transactionToTests.length; i++) {
      const provider = new EvmChainProvider(
        envConfig.getChainConfig({
          name: transactionToTests[i].chain,
          network: 'mainnet',
        }).nodeRpc
      );
      let transaction: any = await provider.getTransaction({
        hash: transactionToTests[i].hash,
      });
      expect(transaction.hash).equal(transactionToTests[i].hash);
      expect(transaction.from.toLowerCase()).equal(transactionToTests[i].from);
      expect(transaction.to.toLowerCase()).equal(transactionToTests[i].to);
      expect(new BigNumber(transaction.value.toString()).dividedBy(1e18).toNumber()).equal(transactionToTests[i].value);

      transaction = await provider.getTransaction({
        hash: transactionToTests[i].hash,
        includeReceipt: true,
      });
      expect(Number(transaction.receipt.gasUsed)).equal(transactionToTests[i].receipt.gasUsed);
    }
  });
});
