const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");


const MongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then((res) => {
    console.log("Data Base Connected");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MongoUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"6ab65fdcaa2b170d53fd075c"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();