
import z from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'El nom ha de tenir almenys 2 caràcters').max(100, 'El nom no pot tenir més de 100 caràcters'),
  email: z.email({ message: "Correu electrònic no vàlid" }).max(255, "El correu electrònic no pot tenir més de 255 caràcters"),
  message: z.string("El missatge té un format incorrecte").min(10, 'El missatge ha de tenir almenys 10 caràcters').max(3000, 'El missatge no pot tenir més de 1000 caràcters'),
});