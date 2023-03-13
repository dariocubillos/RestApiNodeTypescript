import { CronJob } from 'cron';
import { DateTime } from 'luxon';


export class Foo {
    cronJob: CronJob;

    constructor(cronJobString: string | Date | DateTime) {
        this.cronJob = new CronJob(cronJobString, async () => {
            try {
                const rndInt = Math.floor(Math.random() * 6) + 1
              await this.bar(rndInt.toString());
            } catch (e) {
              console.error(e);
            }
          });
          // Start job
          if (!this.cronJob.running) {
            this.cronJob.start();
          }
    }

    async bar(taskNum:string): Promise<void> {
        // Do some task
        console.log('execution linux'+taskNum);
        
    }


}