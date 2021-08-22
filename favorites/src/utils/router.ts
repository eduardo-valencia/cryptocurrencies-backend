import express, { Router } from "express";

export const createRouter = (): Router => express.Router({ mergeParams: true });
