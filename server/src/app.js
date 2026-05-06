import express, {} from "express";
import { authRouter } from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/login', authRouter);
//app.use('/api/application', application.routes);
//app.use('api/jobs', jobs.routes);
app.use((req, res) => {
    res.status(404).send("Error 404! Page not found.");
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error from server side.");
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "localhost", (error) => {
    if (error)
        throw error;
    console.log(`Express app is listening on port ${PORT}.`);
});
//# sourceMappingURL=app.js.map