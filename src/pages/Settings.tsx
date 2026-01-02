import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save, Calendar, Bell, Shield } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Configurações"
        subtitle="Parâmetros do sistema e preferências"
      />

      <div className="p-6 max-w-4xl space-y-6">
        {/* Academic Period */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="text-primary" size={20} />
              </div>
              <div>
                <CardTitle>Período Letivo</CardTitle>
                <CardDescription>
                  Configure as datas do período acadêmico atual
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodStart">Início do Período</Label>
              <Input
                id="periodStart"
                type="date"
                defaultValue="2024-02-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodEnd">Fim do Período</Label>
              <Input
                id="periodEnd"
                type="date"
                defaultValue="2024-06-30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentStart">Início das Matrículas</Label>
              <Input
                id="enrollmentStart"
                type="date"
                defaultValue="2024-01-15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentEnd">Fim das Matrículas</Label>
              <Input
                id="enrollmentEnd"
                type="date"
                defaultValue="2024-02-15"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Bell className="text-accent" size={20} />
              </div>
              <div>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Configure as notificações do sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-muted-foreground">
                  Receber atualizações importantes por email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas de Pré-Matrícula</p>
                <p className="text-sm text-muted-foreground">
                  Notificar quando houver novas pré-matrículas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lembretes de Aulas</p>
                <p className="text-sm text-muted-foreground">
                  Enviar lembretes de aulas para alunos
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="text-success" size={20} />
              </div>
              <div>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Configurações de segurança e acesso
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autenticação em Duas Etapas</p>
                <p className="text-sm text-muted-foreground">
                  Adicionar uma camada extra de segurança
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Verificação de Email Obrigatória</p>
                <p className="text-sm text-muted-foreground">
                  Exigir verificação de email para novos usuários
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sessão Expirar Automaticamente</p>
                <p className="text-sm text-muted-foreground">
                  Desconectar após período de inatividade
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            <Save size={18} />
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </div>
    </div>
  );
}
