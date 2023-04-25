import express, { Request, Response } from 'express';
import { ProductListData } from './data/ProductListData';
const app = express();
app.get('/api/products', (req: Request, res: Response) => {
	res.json(ProductListData);
});
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
