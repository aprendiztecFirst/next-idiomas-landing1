import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Plus, MoreHorizontal, Check, X, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPreRegistrations = [
  {
    id: "1",
    name: "Lucas Mendes",
    email: "lucas.mendes@email.com",
    phone: "(11) 99999-0001",
    language: "Inglês",
    level: "Básico",
    status: "Aguardando",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    phone: "(11) 98888-0002",
    language: "Espanhol",
    level: "Intermediário",
    status: "Contatado",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Roberto Alves",
    email: "roberto.alves@email.com",
    phone: "(11) 97777-0003",
    language: "Francês",
    level: "Básico",
    status: "Aguardando",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Patricia Sousa",
    email: "patricia.sousa@email.com",
    phone: "(11) 96666-0004",
    language: "Inglês",
    level: "Avançado",
    status: "Matriculado",
    createdAt: "2024-01-12",
  },
];

const statusStyles: Record<string, string> = {
  Aguardando: "bg-warning/10 text-warning",
  Contatado: "bg-primary/10 text-primary",
  Matriculado: "bg-success/10 text-success",
  Cancelado: "bg-destructive/10 text-destructive",
};

export default function PreRegistration() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRegistrations = mockPreRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (name: string) => {
    toast({
      title: "Pré-matrícula aprovada",
      description: `A pré-matrícula de ${name} foi aprovada com sucesso.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "Pré-matrícula cancelada",
      description: `A pré-matrícula de ${name} foi cancelada.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Pré-Matrículas"
        subtitle="Gerenciamento de interessados em cursos"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: "18", color: "primary" },
            { label: "Aguardando", value: "8", color: "warning" },
            { label: "Contatados", value: "6", color: "accent" },
            { label: "Matriculados", value: "4", color: "success" },
          ].map((stat) => (
            <Card key={stat.label} variant="elevated">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="default" className="gap-2">
            <Plus size={18} />
            Nova Pré-Matrícula
          </Button>
        </div>

        {/* Table */}
        <Card variant="elevated">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interessado</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden lg:table-cell">Curso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{reg.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {reg.createdAt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-muted-foreground" />
                          {reg.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone size={14} />
                          {reg.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div>
                        <p className="font-medium">{reg.language}</p>
                        <p className="text-sm text-muted-foreground">{reg.level}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusStyles[reg.status]}>{reg.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2 text-success"
                            onClick={() => handleApprove(reg.name)}
                          >
                            <Check size={16} />
                            Aprovar Matrícula
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleReject(reg.name)}
                          >
                            <X size={16} />
                            Cancelar
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
