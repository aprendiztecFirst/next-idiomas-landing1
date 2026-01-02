import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen } from "lucide-react";

export default function TeachersClasses() {
    const teachers = [
        {
            name: "Prof. Julia Santos",
            email: "julia.santos@nextidiomas.com",
            phone: "(11) 98765-1111",
            classes: [
                { name: "Inglês A1 - Turma A", students: 15, schedule: "Seg/Qua 08:00-10:00" },
                { name: "Inglês B1 - Turma B", students: 12, schedule: "Ter/Qui 14:00-16:00" },
            ],
        },
        {
            name: "Prof. Miguel Rodriguez",
            email: "miguel.rodriguez@nextidiomas.com",
            phone: "(11) 98765-2222",
            classes: [
                { name: "Espanhol A2 - Turma A", students: 18, schedule: "Seg/Qua 10:00-12:00" },
                { name: "Espanhol B2 - Turma B", students: 14, schedule: "Ter/Qui 16:00-18:00" },
            ],
        },
        {
            name: "Prof. Marie Dubois",
            email: "marie.dubois@nextidiomas.com",
            phone: "(11) 98765-3333",
            classes: [
                { name: "Francês A2 - Turma C", students: 10, schedule: "Qua/Sex 14:00-16:00" },
                { name: "Francês B1 - Turma D", students: 8, schedule: "Ter/Qui 10:00-12:00" },
            ],
        },
        {
            name: "Prof. John Smith",
            email: "john.smith@nextidiomas.com",
            phone: "(11) 98765-4444",
            classes: [
                { name: "Inglês B2 - Turma C", students: 16, schedule: "Seg/Qua 16:00-18:00" },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Professores e Turmas"
                subtitle="Visualize os professores e suas respectivas turmas"
            />

            <div className="p-6 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card variant="elevated">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                                    <Users className="text-primary" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total de Professores</p>
                                    <p className="text-2xl font-bold text-foreground">{teachers.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card variant="elevated">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                                    <BookOpen className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total de Turmas</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {teachers.reduce((acc, teacher) => acc + teacher.classes.length, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Teachers List */}
                <div className="space-y-4">
                    {teachers.map((teacher, index) => (
                        <Card key={index} variant="elevated">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-14 h-14">
                                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                                            {teacher.name.split(" ").slice(1).map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                                            <span>{teacher.email}</span>
                                            <span>•</span>
                                            <span>{teacher.phone}</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">
                                        {teacher.classes.length} {teacher.classes.length === 1 ? "turma" : "turmas"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {teacher.classes.map((classItem, classIndex) => (
                                        <div
                                            key={classIndex}
                                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                                                    <BookOpen className="text-accent" size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{classItem.name}</p>
                                                    <p className="text-sm text-muted-foreground">{classItem.schedule}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {classItem.students} alunos
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
