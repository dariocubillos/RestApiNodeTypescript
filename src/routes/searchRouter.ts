import axios from 'axios';
import { Request, Response, Router } from 'express';
import { environment } from '../environments/environment';
import Search from '../models/Search';
import products from '../models/Products';
import { ProductMercadoLibre } from '../models/product-mercado-libre';
import Reservation from '../models/Reservation';

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
        const { title, slug, productString, frequency , copys, specialty } = req.body;
        const newsearch = new Search({ title, slug, productString, frequency, copys, specialty });
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
        products.deleteMany({productSlug:  req.params.slug}).then(()=>{
            Search.findOneAndDelete({slug: req.params.slug}).then((response)=>{
                res.json({
                    res: response
                });
            });
        });
    }

    async getproducts(req: Request, res: Response) {    
        products.find().then((searches)=>{
            res.json(searches);
        });
    }

    async getReservations(req: Request, res: Response) {    
        Reservation.find().then((searches)=>{
            res.json(searches);
        });
    }

    async updateReservation(req: Request, res: Response) {        
        const { slug } = req.params;
        req.body.updatedAt = Date.now();
        Reservation.findOneAndUpdate({ slug }, req.body, { new: true }).then((search)=>{
            res.json({data: search})
        });
    }

    async createReservation(req: Request, res: Response) {
        console.log(req.body);
        const { name, slug, specialty, email, controlNumber, telephone, productSlug } = req.body;
        const newReservation = new Reservation({ name, slug, specialty, email, controlNumber, telephone, productSlug });
        await newReservation.save();
        res.json({ data: newReservation })
    }

    async deleteReservation(req: Request, res: Response) {
        Reservation.deleteMany({slug:  req.params.slug}).then(()=>{
            Search.findOneAndDelete({slug: req.params.slug}).then((response)=>{
                res.json({
                    res: response
                });
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
        this.router.get('/products',this.getproducts);
        this.router.get('/reservations', this.getReservations)
        this.router.post('/reservation', this.createReservation);
        this.router.patch('/reservation/:slug', this.updatesearch);
        this.router.delete('/reservation/:slug', this.deletesearch);
    }
}

const searchesRouter = new SearchRouter();

export default searchesRouter.router;