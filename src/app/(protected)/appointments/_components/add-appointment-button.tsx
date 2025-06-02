"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
  doctors: (typeof doctorsTable.$inferSelect)[];
  patients: (typeof patientsTable.$inferSelect)[];
}

const AddAppointmentButton = ({
  doctors,
  patients,
}: AddAppointmentButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Novo Agendamento</Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        doctors={doctors}
        patients={patients}
        onSuccess={() => setIsDialogOpen(false)}
      />
    </Dialog>
  );
};

export default AddAppointmentButton;
