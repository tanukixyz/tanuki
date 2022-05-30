import yargs from 'yargs/yargs';

import GetBlockCommand from './getBlock';
import GetTxCommand from './getTx';
import ContractCommand from "./contract";

(async function () {
  const getBlockCmd = new GetBlockCommand();
  const getTxCmd = new GetTxCommand();
  const contractCmd = new ContractCommand();

  yargs(process.argv.slice(2))
    .scriptName('tanuki')
    .command(getBlockCmd.name, getBlockCmd.describe, getBlockCmd.setOptions, getBlockCmd.execute)
    .command(getTxCmd.name, getTxCmd.describe, getTxCmd.setOptions, getTxCmd.execute)
    .command(contractCmd.name, contractCmd.describe, contractCmd.setOptions, contractCmd.execute)
    .help().argv;
})();
