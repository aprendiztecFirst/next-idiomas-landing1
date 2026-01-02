import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeniedAccess() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-6">
            <div className="bg-destructive/10 p-6 rounded-full animate-pulse">
                <ShieldAlert size={80} className="text-destructive" />
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">ACESSO NEGADO</h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                    Desculpe, você não tem permissão para visualizar esta área do sistema.
                </p>
            </div>

            <Button
                onClick={() => navigate("/dashboard")}
                variant="default"
                size="lg"
                className="gap-2"
            >
                <ArrowLeft size={20} />
                Voltar para o Início
            </Button>
        </div>
    );
}
