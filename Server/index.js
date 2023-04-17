const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const kpiRoutes = require("./routes/kpi.js")
const KPI = require("./models/KPI.js")
const  kpis  = require("./data/data.js")

// CONFIGURATIONS
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes)
const PORT = process.env.PORT || 1337

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("db connected")
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis)
}).catch((error) => console.log(`${error} did not connect`))
