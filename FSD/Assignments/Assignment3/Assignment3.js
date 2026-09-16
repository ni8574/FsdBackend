import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "Assignment3.html"));
});
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("New Contact Message:");
    console.log({ name, email, message });

    res.send("Message received successfully!");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});