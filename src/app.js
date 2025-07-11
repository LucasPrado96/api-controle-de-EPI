import express from 'express'
import routes from './routes.js';
import cors from 'cors'

import './database/index.js'

class App {
    constructor(){
        this.app = express()
       
        this.middlewares();
        this.routes();
    }


    middlewares(){
        this.app.use(express.json())
        this.app.use(cors({
            origin: 'http://localhost:5173'
        }))
    }

    routes(){
        this.app.use(routes)
        
    }
}

export default new App().app