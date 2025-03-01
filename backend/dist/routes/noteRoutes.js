"use strict";
// import express from "express";
// import { createNote, deleteNote } from "../controllers/noteController";
// import { authenticate } from "../middleware/authMiddleware";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post("/", authenticate, createNote);
// router.delete("/:id", authenticate, deleteNote);
// export default router;
// import express from "express";
// import { createNote, deleteNote } from "../controllers/noteController";
// import { authenticate } from "../middleware/authMiddleware";
// const router = express.Router();
// router.post("/", authenticate, createNote); // Works because `authenticate` and `createNote` return void/Promise<void>
// router.delete("/:id", authenticate, deleteNote);
// export default router;
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticate, noteController_1.createNote);
router.delete("/:id", authMiddleware_1.authenticate, noteController_1.deleteNote);
router.get("/:id", authMiddleware_1.authenticate, noteController_1.viewNote); // Add route for viewing a note
router.put("/:id", authMiddleware_1.authenticate, noteController_1.editNote); // Add route for editing a note
router.get("/", authMiddleware_1.authenticate, noteController_1.viewAllNotes); // Add route for viewing all notes
exports.default = router;
