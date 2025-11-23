"use server"

import { neon } from '@neondatabase/serverless';
import { Result } from '../types';
import { Resend } from 'resend';
import { contactSchema } from '../validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(data: FormData): Promise<Result<null>> {
  
  const name = data.get('name') as string | null;
  const email = data.get('email') as string | null;
  const message = data.get('message') as string | null;

  const parseResult = contactSchema.safeParse({ name, email, message });
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0];
    return { success: false, error: firstError.message };
  }

  const sql = neon(`${process.env.DATABASE_URL}`);

  await sql`INSERT INTO contact (name, email, message) VALUES (${name}, ${email}, ${message});`;

  try {
    const emailResponse = await resend.emails.send({
    from: 'Physics Stars <no-reply@physicsstars.com>',
    to: [process.env.ADMIN_EMAIL as string],
    subject: "Nou missatge del formulari de contacte",
    html: `
      <p>Hola Administrador,</p>
      <p>Has rebut un nou missatge a través del formulari de contacte:</p>
      <ul>
        <li><strong>Nom:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Missatge:</strong> ${message}</li>
      </ul>
      <p>Atentament,<br/>El teu equip de Physics Stars</p>
    `,
  });

  if (emailResponse.error) {
    return { success: false, error: "No s'ha pogut enviar el correu electrònic" };
  }

  return { success: true, data: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : typeof error === 'string' ? error : 'Error desconegut en enviar el correu electrònic';
    return { success: false, error: message };
  }
}