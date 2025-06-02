"use client";

import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const getSexLabel = (sex: "male" | "female") => {
    return sex === "male" ? "Masculino" : "Feminino";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {getSexLabel(patient.sex)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3 pt-4">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4" />
          <span>{formatPhoneNumber(patient.phoneNumber)}</span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <User className="mr-1 h-4 w-4" />
              Editar Paciente
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
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
