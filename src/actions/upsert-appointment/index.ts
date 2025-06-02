"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertAppointmentSchema } from "./schema";

export const upsertAppointment = actionClient
  .schema(upsertAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    if (parsedInput.id) {
      // Update existing appointment
      await db
        .update(appointmentsTable)
        .set({
          patientId: parsedInput.patientId,
          doctorId: parsedInput.doctorId,
          date: parsedInput.date,
          appointmentPriceInCents: parsedInput.appointmentPriceInCents,
          clinicId: session.user.clinic.id,
        })
        .where(eq(appointmentsTable.id, parsedInput.id));
    } else {
      // Create new appointment
      await db.insert(appointmentsTable).values({
        patientId: parsedInput.patientId,
        doctorId: parsedInput.doctorId,
        date: parsedInput.date,
        appointmentPriceInCents: parsedInput.appointmentPriceInCents,
        clinicId: session.user.clinic.id,
      });
    }

    revalidatePath("/appointments");

    return {
      message: parsedInput.id
        ? "Agendamento atualizado com sucesso!"
        : "Agendamento criado com sucesso!",
    };
  });
