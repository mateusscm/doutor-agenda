import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z.string().min(1, "Selecione um paciente"),
  doctorId: z.string().min(1, "Selecione um médico"),
  appointmentPriceInCents: z.number().min(1, "Valor da consulta é obrigatório"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  time: z.string().min(1, {
    message: "Horário é obrigatório.",
  }),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
