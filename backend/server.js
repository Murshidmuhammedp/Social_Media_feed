import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter)

mongoose.connect(process.env.DB)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err, "Error Found in Database Connection"))

const PORT = process.env.PORT || 8520

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
