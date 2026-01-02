import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, UserCog, Shield, Mail } from "lucide-react";

const mockUsers = [
    { id: "1", name: "Admin Geral", email: "admin@next.com", role: "Administrador", status: "Ativo" },
    { id: "2", name: "Ana Maria", email: "ana.secretaria@next.com", role: "Secretaria", status: "Ativo" },
    { id: "3", name: "Prof. Julia Santos", email: "julia.teacher@next.com", role: "Professor", status: "Ativo" },
    { id: "4", name: "Carlos Silva", email: "carlos.student@next.com", role: "Aluno", status: "Inativo" },
];

export default function Users() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Gestão de Usuários"
                subtitle="Gerencie as contas e permissões do sistema"
            />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome, email ou perfil..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button className="gap-2">
                        <Plus size={18} />
                        Novo Usuário
                    </Button>
                </div>

                <Card variant="elevated">
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuário</TableHead>
                                    <TableHead>Perfil</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Shield size={14} className="text-primary" />
                                                <span className="text-sm">{user.role}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === "Ativo" ? "success" : "secondary"}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="gap-2">
                                                <UserCog size={16} />
                                                Editar
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
