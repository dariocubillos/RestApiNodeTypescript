import axios from 'axios';
import { Request, Response, Router } from 'express';
import { environment } from '../environments/environment';
import Search from '../models/Search';
import { ProductMercadoLibre } from '../models/product-mercado-libre';

class SearchRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getsearches(req: Request, res: Response) {    
        Search.find().then((searches)=>{
            res.json(searches);
        });
    }

    async getsearch(req: Request, res: Response) {        
        Search.findOne({slug: req.params.slug}).then((search)=>{
            res.json(search)
        });
    }

    async createSearch(req: Request, res: Response) {        
        const { title, slug, productString, frequency } = req.body;
        const newsearch = new Search({ title, slug, productString, frequency });
        await newsearch.save();
        res.json({ data: newsearch })
    }

    async executeSearch(req: Request, res: Response){
        // TODO: pending to add system of stop by databases search check if need to stop
        const { productQuery} = req.body;           
        axios.get<ProductMercadoLibre>(`${environment.mercadoLibreAPI}/sites/${environment.mercadoLibreSite}/search?q=${productQuery}`, { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${environment.access_token}`
        }}).then((response)=>{
            res.json(response.data);
        });
    } 

    async updatesearch(req: Request, res: Response) {
        const { slug } = req.params;
        req.body.updatedAt = Date.now();
        Search.findOneAndUpdate({ slug }, req.body, { new: true }).then((search)=>{
            res.json({data: search})
        });
    }

    async deletesearch(req: Request, res: Response) {
        Search.findOneAndDelete({slug: req.params.slug}).then((response)=>{
            res.json({
                res: response
            });
        });
    }

    routes() {
        this.router.post('/createSearch', this.createSearch);
        this.router.get('/searches', this.getsearches);
        this.router.get('/search/:slug', this.getsearch);
        this.router.patch('/search/:slug', this.updatesearch);
        this.router.delete('/search/:slug', this.deletesearch);
        this.router.get('/getProductsML',this.executeSearch);
    }
}

const searchesRouter = new SearchRouter();

export default searchesRouter.router;