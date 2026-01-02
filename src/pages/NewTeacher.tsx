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

export default function NewTeacher() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        specialty: "",
        status: "ativo",
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

        const newTeacher = {
            ...formData,
            id: Math.random().toString(36).substr(2, 9),
        };

        const savedTeachers = localStorage.getItem("next_teachers");
        const teachers = savedTeachers ? JSON.parse(savedTeachers) : [];
        localStorage.setItem("next_teachers", JSON.stringify([...teachers, newTeacher]));

        toast({
            title: "Professor cadastrado!",
            description: "O professor foi adicionado ao sistema com sucesso.",
        });

        setIsLoading(false);
        navigate("/dashboard/teachers");
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Cadastrar Professor"
                subtitle="Adicione um novo professor ao sistema"
            />

            <div className="p-6 max-w-4xl">
                <Button
                    variant="ghost"
                    className="mb-6 gap-2"
                    onClick={() => navigate("/dashboard/teachers")}
                >
                    <ArrowLeft size={18} />
                    Voltar
                </Button>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Data */}
                    <Card variant="elevated">
                        <CardHeader>
                            <CardTitle>Dados Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="name">Nome Completo *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Nome completo do professor"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@exemplo.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone *</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="(00) 00000-0000"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cpf">CPF</Label>
                                <Input
                                    id="cpf"
                                    name="cpf"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialty">Especialidade / Idioma *</Label>
                                <Input
                                    id="specialty"
                                    name="specialty"
                                    placeholder="Ex: Inglês, Espanhol..."
                                    value={formData.specialty}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, status: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ativo">Ativo</SelectItem>
                                        <SelectItem value="inativo">Inativo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/dashboard/teachers")}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save size={18} />
                            {isLoading ? "Salvando..." : "Cadastrar Professor"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
