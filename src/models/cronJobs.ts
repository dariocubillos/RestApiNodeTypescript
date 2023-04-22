import { CronJob } from 'cron';
import { DateTime } from 'luxon';
import Search from './Search';
import Products from './Products';
import { mercadoLibreHelper } from '../helper/mercadoLibreHelper';
import moment from 'moment';
import { ProductMercadoLibre } from './product-mercado-libre';

export class QueryListDb {
    cronJobMain: CronJob;
    mercadoLibre: mercadoLibreHelper;

  constructor(cronJobString: string | Date | DateTime) {
    this.mercadoLibre = new mercadoLibreHelper();
    this.cronJobMain = new CronJob(cronJobString, async () => { // Main job for each minute check db and query the API
        try {
          await this.searchAllSearches(); // search in the table searches for aviable search strings
        } catch (e) {
          console.error(e);
        }
      });
      // Start job
    if (!this.cronJobMain.running) {
      this.cronJobMain.start();
    }
  }

  async searchAllSearches(): Promise<void> {
      // Search all Searches
      Search.find().then((searches)=>{
        this.programTimeToSearch(searches);
    });
  }

  async programTimeToSearch(searches: any[]): Promise<void> {
    searches.forEach(search => {
      const searchSlug = search.slug;
      if (search.active) {
        let searchDataBolean = false;
        const cronJobProduct = new CronJob(moment().add(search.frequency, 'minutes').toDate(), async () => {
          try {
            await this.mercadoLibre.getProducts(search.productString).then((search)=>{
              this.saveOrUpdateSearch(search.data, searchSlug);
            }).finally(()=> {
              // check wen the job stop 1 times
              searchDataBolean = true;
              if (searchDataBolean) {
                cronJobProduct.stop();
              } 
            });
          } catch (e) {
            console.error(e);
          }
        });
        if (!cronJobProduct.running) { // execue the job 1 times
          cronJobProduct.start();
        }
      }
    });
  }

  saveOrUpdateSearch(foundProducts: ProductMercadoLibre, parentSearch: string):void {
    console.log(foundProducts.site_id);
    foundProducts.results.forEach(async product => {
      const query = {idML: product.id };
      const update = { title: product.title , idML: product.id, productSlug: parentSearch,
        condition: product.condition, permalink: product.permalink, price: product.price, 
        thumbnail: product.thumbnail, updatedAt: new Date() };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      let model = await Products.findOneAndUpdate(query, update, options);
      console.log(model);
    });
  }

}