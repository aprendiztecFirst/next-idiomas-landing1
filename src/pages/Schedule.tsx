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

export default function Schedule() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        class: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        teacher: "",
        topic: "",
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
            title: "Aula agendada!",
            description: "A aula foi agendada com sucesso.",
        });

        setIsLoading(false);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Agendar Aula"
                subtitle="Agende uma nova aula no sistema"
            />

            <div className="p-6 max-w-4xl">
                <Button
                    variant="ghost"
                    className="mb-6 gap-2"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft size={18} />
                    Voltar
                </Button>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <Card variant="elevated">
                        <CardHeader>
                            <CardTitle>Informações da Aula</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="class">Turma *</Label>
                                <Select
                                    value={formData.class}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, class: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a turma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ingles-a1">Inglês A1 - Turma A</SelectItem>
                                        <SelectItem value="ingles-b1">Inglês B1 - Turma B</SelectItem>
                                        <SelectItem value="espanhol-a2">Espanhol A2 - Turma A</SelectItem>
                                        <SelectItem value="frances-b2">Francês B2 - Turma C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Data *</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="room">Sala *</Label>
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

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="topic">Tópico da Aula</Label>
                                <Input
                                    id="topic"
                                    name="topic"
                                    placeholder="Ex: Present Perfect Tense"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save size={18} />
                            {isLoading ? "Salvando..." : "Agendar Aula"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
