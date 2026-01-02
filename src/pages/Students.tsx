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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Eye, Edit, UserX, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const mockStudents = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-1234",
    course: "Inglês Avançado",
    status: "Ativo",
    enrollment: "2024001",
  },
  {
    id: "2",
    name: "Carlos Eduardo Santos",
    email: "carlos.santos@email.com",
    phone: "(11) 98888-5678",
    course: "Espanhol Básico",
    status: "Ativo",
    enrollment: "2024002",
  },
  {
    id: "3",
    name: "Maria Fernanda Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 97777-9012",
    course: "Francês Intermediário",
    status: "Ativo",
    enrollment: "2024003",
  },
  {
    id: "4",
    name: "João Pedro Pereira",
    email: "joao.pereira@email.com",
    phone: "(11) 96666-3456",
    course: "Inglês Básico",
    status: "Ativo",
    enrollment: "2024004",
  },
  {
    id: "5",
    name: "Beatriz Almeida Costa",
    email: "beatriz.costa@email.com",
    phone: "(11) 95555-7890",
    course: "Alemão Básico",
    status: "Ativo",
    enrollment: "2024005",
  },
];

export default function Students() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("next_students");
    return saved ? JSON.parse(saved) : mockStudents;
  });

  useEffect(() => {
    localStorage.setItem("next_students", JSON.stringify(students));
  }, [students]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollment.includes(searchQuery)
  );

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    toast({
      title: "Aluno excluído",
      description: "O aluno foi removido do sistema com sucesso.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Alunos"
        subtitle="Gerenciamento de alunos matriculados"
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou matrícula..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            className="gap-2"
            onClick={() => navigate("/dashboard/new-student")}
          >
            <Plus size={18} />
            Novo Aluno
          </Button>
        </div>

        {/* Students Table */}
        <Card variant="elevated">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden lg:table-cell">Curso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
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
                            Mat: {student.enrollment}
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
                      <span className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                        {student.course}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye size={16} />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit size={16} />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(student.id)}>
                            <UserMinus size={16} />
                            Excluir
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-muted-foreground focus:text-muted-foreground">
                            <UserX size={16} />
                            Inativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
