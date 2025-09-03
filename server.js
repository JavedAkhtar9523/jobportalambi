const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
// const jobRoutes = require('./routes/jobs');
// const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jobportalfrontend-delta.vercel.app",
      "https://jobportalfrontend-delta.vercel.app/", // trailing slash ke saath bhi
      /\.vercel\.app$/, // All vercel domains
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    family: 4,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/auth", authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
