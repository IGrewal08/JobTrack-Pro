import express, { type Application, type Request, type Response, type ErrorRequestHandler, type NextFunction } from "express";
import { authRouter } from "./routes/auth.routes.js";
import { applicationRouter } from "./routes/application.routes.js";
import { jobsRouter } from "./routes/jobs.routes.js";
import { verifyToken } from "./middleware/auth.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/login', authRouter);
app.use(verifyToken);
app.use('/api/application', applicationRouter);
app.use('api/jobs', jobsRouter);

app.use((req: Request, res: Response) => {
    res.status(404).send("Error 404! Page not found.");
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Error from server side.");
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "localhost", (error) => {
    if (error) throw error;
    console.log(`Express app is listening on port ${PORT}.`);
});

