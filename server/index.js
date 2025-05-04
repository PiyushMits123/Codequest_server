import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());


app.use('/uploads', express.static('uploads')) // ✅ allow access to images


app.use("/user", userroutes);
app.use('/questions', questionroutes)
app.use('/answer',answerroutes)
app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 5000
const database_url = 'mongodb+srv://piyush123:QdF4Q72sQK9iRqUd@cluster0.bjn6f.mongodb.net/codequest?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))