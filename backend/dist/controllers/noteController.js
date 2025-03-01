"use strict";
// import { Request, Response } from "express";
// import { Note } from "../models/note";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllNotes = exports.editNote = exports.viewNote = exports.deleteNote = exports.createNote = void 0;
const note_1 = require("../models/note");
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    try {
        const user = req.user; // Dynamically access req.user
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const note = new note_1.Note({
            userId: user.id,
            title,
            content,
        });
        yield note.save();
        res.status(201).json({ message: "Note created successfully", note });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating note", error: error instanceof Error ? error.message : error });
    }
});
exports.createNote = createNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = req.user; // Dynamically access req.user
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const note = yield note_1.Note.findOneAndDelete({ _id: id, userId: user.id });
        if (!note) {
            res.status(404).json({ message: "Note not found or you do not have permission to delete it" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error instanceof Error ? error.message : error });
    }
});
exports.deleteNote = deleteNote;
const viewNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = req.user; // Dynamically access req.user
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const note = yield note_1.Note.findOne({ _id: id, userId: user.id });
        if (!note) {
            res.status(404).json({ message: "Note not found or you do not have permission to view it" });
            return;
        }
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Error viewing note", error: error instanceof Error ? error.message : error });
    }
});
exports.viewNote = viewNote;
const editNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const user = req.user; // Dynamically access req.user
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const note = yield note_1.Note.findOneAndUpdate({ _id: id, userId: user.id }, { title, content }, { new: true });
        if (!note) {
            res.status(404).json({ message: "Note not found or you do not have permission to edit it" });
            return;
        }
        res.status(200).json({ message: "Note updated successfully", note });
    }
    catch (error) {
        res.status(500).json({ message: "Error editing note", error: error instanceof Error ? error.message : error });
    }
});
exports.editNote = editNote;
const viewAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; // Dynamically access req.user
        if (!user || !user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const notes = yield note_1.Note.find({ userId: user.id });
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving notes", error: error instanceof Error ? error.message : error });
    }
});
exports.viewAllNotes = viewAllNotes;
