import express from 'express';
import rootRouter from './routes/root.js';
import productsRouter from './routes/products.js';

const app = express();
app.use(express.json());


app.use('/', rootRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
