import * as fs from 'fs';

import { EvmChainProvider } from '../providers/blockchain';
import { BasicCommand } from './basic';
import { Reporter } from './reporter';
import ERC20 from '../core/abi/ERC20.json';

class ReadContractCommand extends BasicCommand {
  public readonly name: string = 'readcontract';
  public readonly describe: string = 'Read contract data';

  constructor() {
    super();
  }

  private static readAbi(abiPath: string): any {
    if (abiPath === 'ERC20') {
      return ERC20;
    } else {
      if (!fs.existsSync(abiPath)) {
        console.info('Can not read contract ABI file');
        process.exit(0);
      }
      return JSON.parse(fs.readFileSync(abiPath).toString());
    }
  }

  public async execute(argv: any) {
    const provider = new EvmChainProvider(super.getRpcEndpoint(argv));
    if (argv.address === '') {
      console.info('Invalid contract address');
      process.exit(0);
    }

    const abi = ReadContractCommand.readAbi(argv.abi);
    const contract = provider.getContractAt(abi, argv.address);

    if (argv.blockNumber > 0) {
      const result = await contract.methods[argv.method](...JSON.parse(argv.params)).call(argv.blockNumber);
      Reporter.console({ json: false }, result);
    } else {
      const result = await contract.methods[argv.method](...JSON.parse(argv.params)).call();
      Reporter.console({ json: false }, result);
    }
  }

  public setOptions(yargs: any) {
    return yargs.option({
      ...super.chainArgv(),
      address: {
        type: 'string',
        default: '',
        describe: 'Contract address to query',
      },
      abi: {
        type: 'string',
        default: '',
        describe: 'Contract ABI file path',
      },
      method: {
        type: 'string',
        default: '',
        describe: 'Contract method to call',
      },
      params: {
        type: 'string',
        default: '',
        describe: 'Contract method parameters in JSON format',
      },
      blockNumber: {
        type: 'number',
        default: 0,
        describe: 'Query data at specify block state',
      },
    });
  }
}

export default ReadContractCommand;
