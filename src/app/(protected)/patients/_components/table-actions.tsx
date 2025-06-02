import { Edit } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface TableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

const TableActions = ({ patient }: TableActionsProps) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
      <DialogTrigger asChild className="flex">
        <Button variant="outline" size="sm" className="ml-auto">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <UpsertPatientForm
        patient={{
          id: patient.id,
          name: patient.name,
          email: patient.email,
          phoneNumber: patient.phoneNumber,
          sex: patient.sex,
        }}
        onSuccess={() => setIsOpenEdit(false)}
      />
    </Dialog>
  );
};

export default TableActions;
