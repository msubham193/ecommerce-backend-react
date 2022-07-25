const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const app = express();

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const wishListRoute = require("./routes/wishListRoute");

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors());
dotenv.config({ path: "config/config.env" });
app.use(errorMiddleware);

//Routes
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);
app.use("/api", wishListRoute);

///CLOUDINARY CONNECTIONS

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Handling Uncaught Exception:::::-------------------------
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(
    `shutting down the server due to uncaught exception: ${err.stack}`
  );
  process.exit(1);
});

//MongoDB-Connection:
mongoose
  .connect(
    "mongodb+srv://msubham193:sonu@cluster0.62xyd.mongodb.net/ecommerce-adv?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB !");
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
