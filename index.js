//const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
console.log(process.env.MONGO_URL);


const app = express();

const PORT = process.env.PORT;

//const MONGO_URL = "mongodb://localhost";
const  MONGO_URL= process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient( MONGO_URL);
  await client.connect();
  console.log("mongo is connected✌");
  return client;
}
const client = await createConnection();

const flipkart = [
  {
    "id": "100",
    "image":
      "https://www.redwolf.in/image/catalog/mens-t-shirts/full-sleeves/batman-emblem-full-sleeve-t-shirt-india.jpg",
    "tittle": "T-Shirt",
    "rating": 3.9,
    "price": "₹1,299",
    "finalpricewithoffer": "₹199 (84%off)",
  },
  {
    "id": "101",
    "image":
      "https://www.trustedreviews.com/wp-content/uploads/sites/54/2019/10/iphone11promax-1-1.jpeg",
    "tittle": "APPLE iPhone 11 Pro Max (Space Grey, 64 GB)",
    "rating": 4.7,
    "price": "₹1,17,100",
    "finalpricewithoffer": "₹1,12,000",
  },
  {
    "id": "102",
    "image":
      "https://image1.pricedekho.com/p/35/3/13/3419013/27948861-new-fancy-watch-men-and-women-pack-2-analog-watch-for-men-women-by-7star-picture-home.jpg",
    "tittle": "Watch For Men & Women",
    "rating": 3.8,
    "price": "₹6,999",
    "final price with offer": "₹3,099(55% off)",
  },
  {
    "id": "103",
    "image":
      "https://www.photoreview.com.au/wp-content/uploads/images/media/images2018/eos-1500d-back2/2783263-1-eng-GB/eos-1500d-back.jpg",
    "tittle": "Canon EOS 1500D DSLR Camera Body+ 18-55 mm IS II Lens  (Black)",
    "rating": 4.5,
    "price": "₹39,999",
    "finalpricewithoffer": "₹36,499",
  },
  {
    "id": "104",
    "image":
      "https://www.seekdevice.com/news/wp-content/uploads/2021/06/legion-5-pro-1.jpg",
    "tittle": "Lenovo Legion 5 Ryzen 5 Hexa Core 4600H Laptop",
    "rating": 4.5,
    "price": "₹93,690",
    "finalpricewithoffer": "₹63,940 (31% off)",
  }
];

app.use(express.json());
app.use(cors());

app.get("/flipkart", async function (request, response) {
    const data= await client.db("scrap").collection("flipkart").find({}).toArray();
  response.send(data);
});

app.get("/amazon", async function (request, response) {
    const data= await client.db("scrap").collection("amazon").find({}).toArray();
  response.send(data);
});

app.get("/snapdeal", async function (request, response) {
    const data= await client.db("scrap").collection("snapdeal").find({}).toArray();
  response.send(data);
});

app.post("/flipkart" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("flipkart")
    .insertMany(data);
    response.send(result);
})

app.post("/amazon" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("amazon")
    .insertMany(data);
    response.send(result);
})

app.post("/snapdeal" ,async function(request,response){

    const data = request.body;
    console.log(data);
    const result = await client.db("scrap")
    .collection("snapdeal")
    .insertMany(data);
    response.send(result);
})

app.get("/", function (request, response) {
  response.send("Welcome to Scraping App✨😍👌");
});

app.listen(PORT, () => console.log(`server started in ${PORT}`));
