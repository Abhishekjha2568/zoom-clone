// // import express from "express";
// // import { createServer } from "node:http";

// // import { Server } from "socket.io";

// // import mongoose from "mongoose";
// // import { connectToSocket } from "./controllers/socketManager.js";

// // import cors from "cors";
// // import userRoutes from "./routes/users.routes.js";

// // const app = express();
// // const server = createServer(app);
// // const io = connectToSocket(server);


// // app.set("port", (process.env.PORT || 8000))
// // app.use(cors());
// // app.use(express.json({ limit: "40kb" }));
// // app.use(express.urlencoded({ limit: "40kb", extended: true }));

// // app.use("/api/v1/users", userRoutes);

// // const start = async () => {
// //     app.set("mongo_user")
// //     const connectionDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/")

// //     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
// //     server.listen(app.get("port"), () => {
// //         console.log("LISTENIN ON PORT 8000")
// //     });



// // }



// // start();


// import express from "express";
// import { createServer } from "node:http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import { connectToSocket } from "./controllers/socketManager.js";

// import userRoutes from "./routes/users.routes.js";

// dotenv.config(); 

// const app = express();
// const server = createServer(app);
// const io = new Server(server);


// connectToSocket(server);


// app.set("port", process.env.PORT || 8000);
// app.use(cors());
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));


// app.use("/api/v1/users", userRoutes);


// const start = async () => {
//   try {
  
//     const connectionDb = await mongoose.connect(process.env.MONGO_URL);

//     console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

//     server.listen(app.get("port"), () => {
//       console.log(`LISTEN ON PORT ${app.get("port")}`);
//     });

//   } catch (error) {
//     console.log("DB Error:", error);
//   }
// };

// start();


import express from "express";
import { createServer } from "node:http";
// import { Server } from "socket.io"; // Iski zaroorat yahan nahi hai agar socketManager handle kar raha hai
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config(); 

const app = express();
const server = createServer(app);

// SocketManager ko server pass karein, wo khud io create karega
connectToSocket(server); 

app.set("port", process.env.PORT || 8000);

// CORS configuration
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Health Check route (Cron-job ke liye best hai)
app.get("/", (req, res) => {
    res.send("WebRTC Backend is Running!");
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    // Environment variable MONGO_URL ka use
    const connectionDb = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`LISTEN ON PORT ${app.get("port")}`);
    });

  } catch (error) {
    console.log("DB Error:", error);
  }
};

start();