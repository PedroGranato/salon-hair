import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";

import connectDB from "./salao/src/router/db";
import authRoutes from "./salao/src/router/index";

const app = express();
const port = process.env.PORT || 5173;

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Middleware para verificar token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(301).send("Access Denied");
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalid" });
        }

        // Você pode adicionar o usuário decodificado ao `req` se quiser
        // (mas precisa estender o tipo de Request pra isso)
        // req.user = decoded;

        next();
    });
};

app.use("/auth", authRoutes);

app.get("/login", (_req: Request, res: Response) => {
    res.redirect("/login.vue");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
