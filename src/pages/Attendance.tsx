import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Save, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockStudents = [
    { id: "1", name: "Ana Silva", status: "present" },
    { id: "2", name: "Carlos Santos", status: "present" },
    { id: "3", name: "Maria Oliveira", status: "absent" },
    { id: "4", name: "João Pereira", status: "present" },
    { id: "5", name: "Bruna Costa", status: "present" },
];

export default function Attendance() {
    const { toast } = useToast();
    const [selectedClass, setSelectedClass] = useState("");
    const [students, setStudents] = useState(mockStudents);
    const [isLoading, setIsLoading] = useState(false);

    const toggleStatus = (id: string) => {
        setStudents(prev => prev.map(student =>
            student.id === id
                ? { ...student, status: student.status === "present" ? "absent" : "present" }
                : student
        ));
    };

    const handleSave = async () => {
        if (!selectedClass) {
            toast({
                title: "Erro",
                description: "Por favor, selecione uma turma primeiro.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
            title: "Frequência lançada!",
            description: "A lista de presença foi salva com sucesso.",
        });
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Lançar Frequência"
                subtitle="Registre a presença dos alunos de sua turma hoje"
            />

            <div className="p-6 space-y-6">
                {/* Class Selection */}
                <Card variant="elevated">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">Selecione a Turma</label>
                                <Select value={selectedClass} onValueChange={setSelectedClass}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Escolha uma turma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ingles-a1">Inglês A1 - Turma A</SelectItem>
                                        <SelectItem value="ingles-a2">Inglês A2 - Turma A</SelectItem>
                                        <SelectItem value="ingles-b1">Inglês B1 - Turma A</SelectItem>
                                        <SelectItem value="ingles-b2">Inglês B2 - Turma A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">Data</label>
                                <div className="h-10 px-3 py-2 border rounded-md bg-secondary/20 flex items-center text-sm">
                                    {new Date().toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Students List */}
                {selectedClass && (
                    <Card variant="elevated" className="animate-scale-in">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users size={20} className="text-primary" />
                                Alunos da Turma
                            </CardTitle>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                    Presentes: {students.filter(s => s.status === "present").length}
                                </Badge>
                                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                    Ausentes: {students.filter(s => s.status === "absent").length}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome do Aluno</TableHead>
                                        <TableHead className="text-center w-[200px]">Status</TableHead>
                                        <TableHead className="text-right w-[100px]">Presença</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={student.status === "present" ? "success" : "destructive"}
                                                >
                                                    {student.status === "present" ? "Presente" : "Ausente"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant={student.status === "present" ? "destructive" : "success"}
                                                    className="size-8 p-0 rounded-full"
                                                    onClick={() => toggleStatus(student.id)}
                                                >
                                                    {student.status === "present" ? <X size={16} /> : <Check size={16} />}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    size="lg"
                                    className="gap-2 px-8"
                                    onClick={handleSave}
                                    disabled={isLoading}
                                >
                                    <Save size={18} />
                                    {isLoading ? "Salvando..." : "Salvar Frequência"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
