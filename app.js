const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const allowOrigins = ['http://localhost:3000', /** other domains if any */ ]
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (allowOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
const port = process.env.PORT || 5001;


mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("db Connected"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});

 