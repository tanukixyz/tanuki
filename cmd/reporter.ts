export const ConsoleReporterArgv = {
  json: {
    type: 'boolean',
    default: false,
    describe: 'Show data in JSON raw string format',
  },
};

export interface ConsoleReportProps {
  json: boolean;
}

export class Reporter {
  public static console(props: ConsoleReportProps, data: any) {
    if (props.json) {
      console.info(JSON.stringify(data));
    } else {
      console.info(data);
    }
  }
}
