"use client";

import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteAppointment } from "@/actions/delete-appointment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { appointmentsTable } from "@/db/schema";

interface TableActionsProps {
  appointment: typeof appointmentsTable.$inferSelect;
}

const TableActions = ({ appointment }: TableActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { execute: executeDeleteAppointment, isExecuting } = useAction(
    deleteAppointment,
    {
      onSuccess: ({ data }) => {
        toast.success(data?.message);
        setIsDeleteDialogOpen(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Erro ao deletar agendamento");
      },
    },
  );

  const handleDelete = () => {
    executeDeleteAppointment({ id: appointment.id });
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger asChild className="flex">
        <Button variant="outline" size="sm" className="ml-auto">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar este agendamento? Esta ação não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isExecuting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isExecuting ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TableActions;
