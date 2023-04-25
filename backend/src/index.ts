import cors from 'cors';
import express, { Request, Response } from 'express';
import { ProductListData } from './data/ProductListData';
const app = express();
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
	})
);

app.get('/api/products', (req: Request, res: Response) => {
	res.json(ProductListData);
});
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
