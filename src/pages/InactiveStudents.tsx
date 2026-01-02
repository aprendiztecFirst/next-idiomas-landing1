import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, UserCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockInactiveStudents = [
  {
    id: "1",
    name: "Ricardo Ferreira",
    email: "ricardo.ferreira@email.com",
    phone: "(11) 99999-5555",
    lastCourse: "Inglês Intermediário",
    inactiveSince: "2023-12-01",
    reason: "Mudança de cidade",
  },
  {
    id: "2",
    name: "Camila Torres",
    email: "camila.torres@email.com",
    phone: "(11) 98888-6666",
    lastCourse: "Espanhol Básico",
    inactiveSince: "2023-11-15",
    reason: "Problemas financeiros",
  },
  {
    id: "3",
    name: "Eduardo Martins",
    email: "eduardo.martins@email.com",
    phone: "(11) 97777-7777",
    lastCourse: "Francês Avançado",
    inactiveSince: "2023-10-20",
    reason: "Conclusão do curso",
  },
];

export default function InactiveStudents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockInactiveStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReactivate = (name: string) => {
    toast({
      title: "Aluno reativado",
      description: `${name} foi reativado com sucesso.`,
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Alunos Inativos"
        subtitle="Gerenciamento de alunos inativos"
      />

      <div className="p-6 space-y-6">
        {/* Alert */}
        <Card variant="elevated" className="border-warning/30 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-warning/10">
              <AlertCircle className="text-warning" size={24} />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {mockInactiveStudents.length} alunos inativos
              </p>
              <p className="text-sm text-muted-foreground">
                Estes alunos podem ser reativados a qualquer momento
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar aluno inativo..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <Card variant="elevated">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden lg:table-cell">Último Curso</TableHead>
                  <TableHead className="hidden lg:table-cell">Motivo</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">
                            {student.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Inativo desde: {student.inactiveSince}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <p className="text-sm">{student.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm">{student.lastCourse}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {student.reason}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleReactivate(student.name)}
                      >
                        <UserCheck size={16} />
                        Reativar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
