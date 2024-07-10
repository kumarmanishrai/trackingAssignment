const express = require('express');
const { PORT } = require('./configs/dotenvConfig')
const bodyParser = require('body-parser');
const mongo = require('./db/mongo');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET','HEAD', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],   
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

    
app.use(cookieParser())




mongo.on('error', console.error.bind(console, "MongoDB connection error"))
mongo.once('open', ()=>{
	console.log("mongodb connected successfully");
})



app.use('/', userRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})