'use client';
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button 
        variant="ghost" 
        className="text-muted-foreground hover:text-foreground"
        type="submit"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </form>
  );
}