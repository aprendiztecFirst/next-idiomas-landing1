import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function NewClass() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    language: "",
    level: "",
    teacher: "",
    room: "",
    maxStudents: "",
    startDate: "",
    endDate: "",
    scheduleDays: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Turma cadastrada!",
      description: "A turma foi criada com sucesso.",
    });

    setIsLoading(false);
    navigate("/dashboard/classes");
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Cadastrar Turma"
        subtitle="Crie uma nova turma no sistema"
      />

      <div className="p-6 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/dashboard/classes")}
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="name">Nome da Turma *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Inglês A1 - Turma A"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ingles">Inglês</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Nível *</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a1">Inglês A1</SelectItem>
                    <SelectItem value="a2">Inglês A2</SelectItem>
                    <SelectItem value="b1">Inglês B1</SelectItem>
                    <SelectItem value="b2">Inglês B2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher">Professor *</Label>
                <Select
                  value={formData.teacher}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, teacher: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="julia">Prof. Julia Santos</SelectItem>
                    <SelectItem value="miguel">Prof. Miguel Rodriguez</SelectItem>
                    <SelectItem value="marie">Prof. Marie Dubois</SelectItem>
                    <SelectItem value="john">Prof. John Smith</SelectItem>
                    <SelectItem value="hans">Prof. Hans Müller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Sala</Label>
                <Select
                  value={formData.room}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, room: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a sala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sala-01">Sala 01</SelectItem>
                    <SelectItem value="sala-02">Sala 02</SelectItem>
                    <SelectItem value="sala-03">Sala 03</SelectItem>
                    <SelectItem value="sala-04">Sala 04</SelectItem>
                    <SelectItem value="sala-05">Sala 05</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxStudents">Vagas *</Label>
                <Input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  placeholder="Número máximo de alunos"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Horários</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Término</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleDays">Dias da Semana *</Label>
                <Select
                  value={formData.scheduleDays}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, scheduleDays: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os dias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seg-qua">Segunda e Quarta</SelectItem>
                    <SelectItem value="ter-qui">Terça e Quinta</SelectItem>
                    <SelectItem value="sex">Sexta-feira</SelectItem>
                    <SelectItem value="sab">Sábado</SelectItem>
                    <SelectItem value="seg-qua-sex">Segunda, Quarta e Sexta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Horário de Início *</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Horário de Término *</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/classes")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Save size={18} />
              {isLoading ? "Salvando..." : "Cadastrar Turma"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
