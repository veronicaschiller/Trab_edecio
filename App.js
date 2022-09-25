import express from "express";
import routes from './routes.js'
const app  = express()
const port = 3000

app.use(routes);

app.get('/', (req,res) =>{
    res.send('lista de doses de insulina')
})
app.listen(port, ()=>{
console.log(`SERVIDOR RODANDO NA PORTA ${port}`);
})