import { EvmChainProvider } from '../providers/blockchain';
import { BasicCommand } from './basic';
import { ConsoleReporterArgv, Reporter } from './reporter';

class GetTxCommand extends BasicCommand {
  public readonly name: string = 'gettx';
  public readonly describe: string = 'Get transaction data from blockchain by hash';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const provider = new EvmChainProvider(super.getRpcEndpoint(argv));
    const transaction = await provider.getTransaction({
      hash: argv.hash ? argv.hash : '',
      includeReceipt: argv.full ? argv.full : false,
    });

    Reporter.console(
      {
        json: argv.json ? argv.json : false,
      },
      transaction
    );
  }

  public setOptions(yargs: any) {
    return yargs.option({
      ...super.chainArgv(),
      hash: {
        type: 'string',
        default: 'latest',
        describe: 'The transaction hash to query',
      },
      full: {
        type: 'boolean',
        default: false,
        describe: 'Return transaction receipt',
      },
      ...ConsoleReporterArgv,
    });
  }
}

export default GetTxCommand;
