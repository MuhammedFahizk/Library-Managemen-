import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";


router.use("/user", userRoutes);
router.use("/book", bookRoutes);


export default router;