import { useState, useEffect } from "react";
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

const mockTeachers = [
    {
        id: "1",
        name: "Prof. Julia Santos",
        email: "julia.santos@nextidiomas.com",
        phone: "(11) 98765-1111",
        specialty: "Inglês",
        status: "Ativo",
    },
    {
        id: "2",
        name: "Prof. Miguel Rodriguez",
        email: "miguel.rodriguez@nextidiomas.com",
        phone: "(11) 98765-2222",
        specialty: "Espanhol",
        status: "Ativo",
    },
    {
        id: "3",
        name: "Prof. Marie Dubois",
        email: "marie.dubois@nextidiomas.com",
        phone: "(11) 98765-3333",
        specialty: "Francês",
        status: "Ativo",
    },
    {
        id: "4",
        name: "Prof. John Smith",
        email: "john.smith@nextidiomas.com",
        phone: "(11) 98765-4444",
        specialty: "Inglês",
        status: "Ativo",
    },
];

export default function Teachers() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [teachers, setTeachers] = useState(() => {
        const saved = localStorage.getItem("next_teachers");
        return saved ? JSON.parse(saved) : mockTeachers;
    });

    useEffect(() => {
        localStorage.setItem("next_teachers", JSON.stringify(teachers));
    }, [teachers]);

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setTeachers(teachers.filter(t => t.id !== id));
        toast({
            title: "Professor excluído",
            description: "O professor foi removido do sistema.",
            variant: "destructive",
        });
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Professores"
                subtitle="Gerenciamento de professores da instituição"
            />

            <div className="p-6 space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome ou especialidade..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="default"
                        className="gap-2"
                        onClick={() => navigate("/dashboard/new-teacher")}
                    >
                        <Plus size={18} />
                        Novo Professor
                    </Button>
                </div>

                {/* Teachers Table */}
                <Card variant="elevated">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Professor</TableHead>
                                    <TableHead className="hidden md:table-cell">Contato</TableHead>
                                    <TableHead className="hidden lg:table-cell">Especialidade</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTeachers.map((teacher) => (
                                    <TableRow key={teacher.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                        {teacher.name
                                                            .split(" ")
                                                            .filter(n => !n.includes("."))
                                                            .map((n) => n[0])
                                                            .slice(0, 2)
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-foreground">
                                                        {teacher.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div>
                                                <p className="text-sm">{teacher.email}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {teacher.phone}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                                                {teacher.specialty}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                                                {teacher.status}
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
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive focus:text-destructive"
                                                        onClick={() => handleDelete(teacher.id)}
                                                    >
                                                        <UserMinus size={16} />
                                                        Excluir
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
