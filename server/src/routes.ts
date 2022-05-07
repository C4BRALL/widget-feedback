import express from "express";
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from "./database/prisma/prisma-feedbacks-repository";
import { NodemailerMailPlugin } from "./plugin/nodemailer/nodemailer-mail-plugin";
import { SubmitFeedbackService } from "./services/submit-feedback-service";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailPlugin = new NodemailerMailPlugin();

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailPlugin,
  )

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).send();
})