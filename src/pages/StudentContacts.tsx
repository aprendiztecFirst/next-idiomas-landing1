import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Phone, Mail, MapPin, Download } from "lucide-react";
import { useState } from "react";

export default function StudentContacts() {
    const [searchTerm, setSearchTerm] = useState("");

    const students = [
        {
            name: "Ana Silva",
            email: "ana.silva@email.com",
            phone: "(11) 98765-4321",
            address: "Rua das Flores, 123 - São Paulo, SP",
            class: "Inglês A1 - Turma A",
        },
        {
            name: "Carlos Santos",
            email: "carlos.santos@email.com",
            phone: "(11) 97654-3210",
            address: "Av. Paulista, 456 - São Paulo, SP",
            class: "Inglês A2 - Turma A",
        },
        {
            name: "Maria Oliveira",
            email: "maria.oliveira@email.com",
            phone: "(11) 96543-2109",
            address: "Rua Augusta, 789 - São Paulo, SP",
            class: "Inglês B2 - Turma A",
        },
        {
            name: "João Pereira",
            email: "joao.pereira@email.com",
            phone: "(11) 95432-1098",
            address: "Rua Oscar Freire, 321 - São Paulo, SP",
            class: "Inglês B1 - Turma A",
        },
    ];

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const header = "Nome,Email,Telefone,Turma,Endereco\n";
        const csvContent = students.map(s =>
            `"${s.name}","${s.email}","${s.phone}","${s.class}","${s.address}"`
        ).join("\n");

        const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "contatos_alunos.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Contatos dos Alunos"
                subtitle="Lista completa de contatos de todos os alunos"
            />

            <div className="p-6 space-y-6">
                {/* Search and Actions */}
                <Card variant="elevated">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    placeholder="Buscar por nome, email ou turma..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" className="gap-2" onClick={handleExport}>
                                <Download size={18} />
                                Exportar Lista
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Students List */}
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Alunos ({filteredStudents.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredStudents.map((student, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {student.name.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <h3 className="font-semibold text-foreground">{student.name}</h3>
                                                <p className="text-sm text-muted-foreground">{student.class}</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail size={16} />
                                                    <span>{student.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Phone size={16} />
                                                    <span>{student.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground md:col-span-2">
                                                    <MapPin size={16} />
                                                    <span>{student.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
