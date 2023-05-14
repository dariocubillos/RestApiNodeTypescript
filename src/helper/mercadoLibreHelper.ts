import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";
import { ProductMercadoLibre } from "../models/product-mercado-libre";

export class mercadoLibreHelper {

    constructor(){}
    
    async getProducts(searchQuery:string):Promise<AxiosResponse<any, ProductMercadoLibre>> {
        const https = require('https');

        return axios.get<any>(`${environment.mercadoLibreAPI}/sites/${environment.mercadoLibreSite}/search?q=${searchQuery}`, { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${environment.access_token}`
        },
        responseType: 'json',
        httpsAgent: new https.Agent({ rejectUnauthorized: false })});
    }

}