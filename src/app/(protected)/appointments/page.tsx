import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";

const Appointments = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  const [doctors, patients] = await Promise.all([
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinic.id),
    }),
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddAppointmentButton doctors={doctors} patients={patients} />
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* Conteúdo da listagem de agendamentos será implementado futuramente */}
        <div className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">
            Listagem de agendamentos em desenvolvimento
          </p>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default Appointments;
