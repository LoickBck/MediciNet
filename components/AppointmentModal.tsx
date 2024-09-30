import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
  

const AppointmentModal = ({type}: {
    type: 'programmer' | 'annuler'
}) => {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" className={`capitalize ${type === 'programmer' && 'text-green-500'}`}>
                {type}
            </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">{type} rendez-vous</DialogTitle>
            <DialogDescription>
                Veuillez remplir les informations suivantes pour {type} un rendez-vous
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>

  )
}

export default AppointmentModal