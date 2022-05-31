import yargs from 'yargs/yargs';

import GetBlockCommand from './getBlock';
import GetTxCommand from './getTx';
import ReadContractCommand from "./readContract";

(async function () {
  const getBlockCmd = new GetBlockCommand();
  const getTxCmd = new GetTxCommand();
  const readContractCmd = new ReadContractCommand();

  yargs(process.argv.slice(2))
    .scriptName('tanuki')
    .command(getBlockCmd.name, getBlockCmd.describe, getBlockCmd.setOptions, getBlockCmd.execute)
    .command(getTxCmd.name, getTxCmd.describe, getTxCmd.setOptions, getTxCmd.execute)
    .command(readContractCmd.name, readContractCmd.describe, readContractCmd.setOptions, readContractCmd.execute)
    .help().argv;
})();
