import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import petRoutes from "./routes/petRoutes";
import vaccineRoutes from "./routes/vaccineRoutes";
import petVaccineRoutes from "./routes/petVaccineRoutes";
import medicationRoutes from "./routes/medicationRoutes";
import petMedicationRoutes from "./routes/petMedicationRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import attachmentRoutes from "./routes/attachmentRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    "/api",
    userRoutes,
    authRoutes,
    petRoutes,
    vaccineRoutes,
    petVaccineRoutes,
    medicationRoutes,
    petMedicationRoutes,
    reminderRoutes,
    attachmentRoutes,
    roleRoutes
);

export default app;
