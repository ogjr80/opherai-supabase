import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SummaryStep = () => {
  const router = useRouter();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6 text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Profile Setup Complete!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Thank you for completing your profile. You can now access your dashboard
          to view and manage your professional information.
        </p>

        <Button 
          size="lg" 
          className="w-full sm:w-auto"
          onClick={() => router.push('/dashboard/candidate')}
        >
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default SummaryStep;