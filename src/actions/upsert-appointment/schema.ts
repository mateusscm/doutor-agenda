import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().optional(),
  patientId: z.string().min(1, "Selecione um paciente"),
  doctorId: z.string().min(1, "Selecione um médico"),
  appointmentPriceInCents: z.number().min(1, "Valor da consulta é obrigatório"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  time: z.string().optional(), // Será implementado futuramente
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
