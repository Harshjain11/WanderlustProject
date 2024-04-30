const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://harshjain000011112:ODsxZLEu2YdmPGYP@cluster0.lntsnrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


main().then( () => {
    console.log("connected to db");
}).catch( (err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"661a28799d90eb9c3bdcb31a"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};
initDB();