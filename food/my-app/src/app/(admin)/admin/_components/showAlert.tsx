import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
export const ShowAlert=()=>{
    return(
         <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      Dish successfully deleted.
    </AlertDescription>
  </Alert>
    )
}