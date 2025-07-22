"use server";

import path from "path";
import { cwd } from "process";
import { readFileSync } from "fs";
import { fillTemplate } from "../utils";
import nodemailer from "nodemailer";
import ContactSchema from "../schemas/contact-schema";
import { z } from "zod/v4";
import { $ZodIssue } from "zod/v4/core";

type FormSubmission = {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  question: FormDataEntryValue | null;
};

type CustomError = {
  message: string;
  path?: string[];
};

type ActionState = {
  errors?: ($ZodIssue | CustomError)[];
  success?: boolean;
  formData?: FormSubmission;
};

const transporter = nodemailer.createTransport({
  host: "mail.your-server.de",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendConfirmationEmail = async (submission: FormSubmission) => {
  const userTemplatePath = path.join(
    cwd(),
    "src",
    "app",
    "email-templates",
    "email-user.html"
  );
  const userHtmlTemplate = readFileSync(userTemplatePath, "utf8");

  const html = fillTemplate(userHtmlTemplate, {
    firstName: String(submission.firstName),
    website: String(process.env.APP_URL),
  });

  try {
    transporter.sendMail({
      from: "webmaster@ateljenatasabeljin.com",
      to: String(submission.email),
      subject: "Potvrda prijema mejla",
      html,
    });
  } catch {
    return { errors: [{ message: "Failed to send email" }] };
  }
};

const sendQueryEmail = async (submission: FormSubmission) => {
  const adminTemplatePath = path.join(
    cwd(),
    "src",
    "app",
    "email-templates",
    "email-admin.html"
  );
  const adminHtmlTemplate = readFileSync(adminTemplatePath, "utf8");

  const html = fillTemplate(adminHtmlTemplate, {
    firstName: String(submission.firstName),
    lastName: String(submission.lastName),
    email: String(submission.email),
    question: String(submission.question),
    website: String(process.env.APP_URL),
  });

  try {
    transporter.sendMail({
      from: "webmaster@ateljenatasabeljin.com",
      to: String(process.env.ADMIN_EMAIL), // Send to admin
      subject: "Nova poruka sa sajta",
      html,
    });
  } catch {
    return { errors: [{ message: "Failed to send admin email" }] };
  }
};

export async function sendEmail(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const submission = {
    firstName: formData.get("firstName"),
    email: formData.get("email"),
    lastName: formData.get("lastName"),
    question: formData.get("question"),
  };

  try {
    ContactSchema.parse(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: error.issues, formData: submission };
    }
    return { errors: [{ message: "Unknown validation error" }] };
  }

  await sendConfirmationEmail(submission);
  await sendQueryEmail(submission);

  return { success: true };
}
