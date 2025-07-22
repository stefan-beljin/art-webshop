import { z } from "zod/v4";

const ContactSchema = z.object({
  firstName: z
    .string({ error: "Ime je obavezno" })
    .min(1, { error: "Ime je obavezno" }),
  lastName: z
    .string({ error: "Prezime je obavezno" })
    .min(1, { error: "Prezime je obavezno" }),
  email: z
    .email({ error: "E-mail je nije ispravan" })
    .min(1, { error: "E-mail je obavezan" }),
  question: z
    .string({ error: "Pitanje je obavezno" })
    .min(1, { error: "Pitanje je obavezno" }),
});

export default ContactSchema;
