import { EvmChainProvider } from '../providers/blockchain';
import { BasicCommand } from './basic';
import { ConsoleReporterArgv, Reporter } from './reporter';

class GetBlockCommand extends BasicCommand {
  public readonly name: string = 'getblock';
  public readonly describe: string = 'Get block data from blockchain by number';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const provider = new EvmChainProvider(super.getRpcEndpoint(argv));
    const blockInfo = await provider.getBlock({
      number: argv.blockNumber === 'latest' ? argv.blockNumber : Number(argv.blockNumber),
      hash: argv.blockHash ? argv.blockHash : '',
      includeTransactionsObject: argv.full ? argv.full : false,
    });

    Reporter.console(
      {
        json: argv.json ? argv.json : false,
      },
      blockInfo
    );
  }

  public setOptions(yargs: any) {
    return yargs.option({
      ...super.chainArgv(),
      blockNumber: {
        type: 'string',
        default: 'latest',
        describe: 'The block number to query',
      },
      blockHash: {
        type: 'string',
        default: '',
        describe: 'The block hash to query',
      },
      full: {
        type: 'boolean',
        default: false,
        describe: 'Return transactions objects',
      },
      ...ConsoleReporterArgv,
    });
  }
}

export default GetBlockCommand;
