const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //User ID
      author: "64f170e9d3938d470f62175c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam animi, voluptates molestias, omnis eius harum qui laboriosam aliquid numquam ad recusandae, in necessitatibus accusantium quos expedita. Excepturi, libero deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dcjmpnvjc/image/upload/v1694321825/yelp-camp/dmfdm3bwsgzvmxeotkrn.jpg",
          filename: "yelp-camp/dmfdm3bwsgzvmxeotkrn",
        },
        {
          url: "https://res.cloudinary.com/dcjmpnvjc/image/upload/v1694244617/yelp-camp/e2iassnplm2lzz439kdw.jpg",
          filename: "yelp-camp/e2iassnplm2lzz439kdw",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
