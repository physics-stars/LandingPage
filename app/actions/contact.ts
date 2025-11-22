"use server"

import { neon } from '@neondatabase/serverless';
import { Result } from '../types';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(data: FormData): Promise<Result<null>> {
  
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const message = data.get('message') as string;

  const sql = neon(`${process.env.DATABASE_URL}`);

  await sql`INSERT INTO contact (name, email, message) VALUES (${name}, ${email}, ${message});`;


  try {
    const emailResponse = await resend.emails.send({
    from: 'Physics Stars <no-reply@physicsstars.com>',
    to: ["info@physicsstars.com"],
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
  } catch (error: any) {
    return { success: false, error: error.message || 'Error desconegut en enviar el correu electrònic' };
  }
}