import { useNavigate, useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    PlayCircle,
    FileText,
    CheckCircle2,
    Lock,
    MessageSquare
} from "lucide-react";

const modules = [
    {
        title: "Módulo 1: Introdução e Greetings",
        lessons: [
            { id: "1", title: "Aula 01: Hello and Welcome", type: "video", completed: true },
            { id: "2", title: "Aula 02: Basic Greetings", type: "video", completed: true },
            { id: "3", title: "Aula 03: The Alphabet", type: "video", completed: false },
            { id: "4", title: "Material de Apoio: PDF de Vocabulário", type: "pdf", completed: false },
        ]
    },
    {
        title: "Módulo 2: Verbo To Be e Pronomes",
        lessons: [
            { id: "5", title: "Aula 04: Subject Pronouns", type: "video", completed: false, locked: true },
            { id: "6", title: "Aula 05: Verb To Be (Present)", type: "video", completed: false, locked: true },
            { id: "7", title: "Exercícios de Fixação", type: "pdf", completed: false, locked: true },
        ]
    }
];

export default function CourseContent() {
    const navigate = useNavigate();
    const { id } = useParams();

    // In a real app, we would fetch course details using the ID
    const courseTitle = id?.replace("-", " ").toUpperCase() || "CARREGANDO...";

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title={courseTitle}
                subtitle="Portal do Aluno - Conteúdo do Curso"
            />

            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <Button
                    variant="ghost"
                    className="mb-2 gap-2"
                    onClick={() => navigate("/dashboard/courses")}
                >
                    <ArrowLeft size={18} />
                    Voltar para Meus Cursos
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area (Lessons) */}
                    <div className="lg:col-span-2 space-y-4">
                        {modules.map((module, idx) => (
                            <Card key={idx} variant="elevated">
                                <CardHeader className="bg-secondary/20 pb-4">
                                    <CardTitle className="text-lg">{module.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border">
                                        {module.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className={`p-4 flex items-center justify-between group hover:bg-secondary/10 transition-colors ${lesson.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {lesson.locked ? (
                                                        <Lock size={20} className="text-muted-foreground" />
                                                    ) : lesson.type === 'video' ? (
                                                        <PlayCircle size={20} className="text-primary" />
                                                    ) : (
                                                        <FileText size={20} className="text-primary" />
                                                    )}
                                                    <div>
                                                        <p className="font-medium">{lesson.title}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {lesson.type === 'video' ? 'Videoaula' : 'Documento PDF'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {lesson.completed && (
                                                    <CheckCircle2 size={20} className="text-success" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar Area (Progresso e Teacher) */}
                    <div className="space-y-6">
                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle className="text-lg">Seu Progresso</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-primary transition-all duration-500"
                                        style={{ width: '28%' }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>2 de 7 aulas concluídas</span>
                                    <span className="font-bold">28%</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle className="text-lg">Professor</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-4">
                                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary font-bold text-2xl">
                                    JS
                                </div>
                                <div>
                                    <p className="font-bold">Prof. Julia Santos</p>
                                    <p className="text-sm text-muted-foreground">Especialista em Inglês</p>
                                </div>
                                <Button variant="outline" className="w-full gap-2">
                                    <MessageSquare size={16} />
                                    Falar com o Professor
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
