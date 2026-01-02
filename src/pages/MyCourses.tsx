import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, Users, MessageSquare, Play, Video } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const myCourses = [
    {
        id: "1",
        name: "iLearn 01",
        language: "Inglês",
        level: "Intro",
        teacher: "Prof. Julia Santos",
        schedule: "Segunda e Quarta, 08:00 - 09:30",
        progress: 100,
    },
    {
        id: "2",
        name: "iLearn 02",
        language: "Inglês",
        level: "Intro",
        teacher: "Prof. Miguel Rodriguez",
        schedule: "Terça e Quinta, 10:00 - 11:30",
        progress: 85,
    },
    {
        id: "3",
        name: "iLearn 03",
        language: "Inglês",
        level: "Intro",
        teacher: "Prof. Marie Dubois",
        schedule: "Segunda e Quarta, 14:00 - 15:30",
        progress: 60,
    },
    {
        id: "4",
        name: "Fundamentals A",
        language: "Inglês",
        level: "Básico",
        teacher: "Prof. John Smith",
        schedule: "Terça e Quinta, 16:00 - 17:30",
        progress: 40,
    },
    {
        id: "5",
        name: "Fundamentals B",
        language: "Inglês",
        level: "Básico",
        teacher: "Prof. Julia Santos",
        schedule: "Sábado, 09:00 - 12:00",
        progress: 15,
    },
    {
        id: "6",
        name: "Top Notch 1A",
        language: "Inglês",
        level: "Intermediário I",
        teacher: "Prof. Miguel Rodriguez",
        schedule: "Segunda e Quarta, 19:00 - 20:30",
        progress: 0,
    },
    {
        id: "7",
        name: "Top Notch 1B",
        language: "Inglês",
        level: "Intermediário I",
        teacher: "Prof. Marie Dubois",
        schedule: "Terça e Quinta, 19:00 - 20:30",
        progress: 0,
    },
    {
        id: "8",
        name: "Top Notch 2A",
        language: "Inglês",
        level: "Intermediário II",
        teacher: "Prof. John Smith",
        schedule: "Segunda e Quarta, 20:30 - 22:00",
        progress: 0,
    },
    {
        id: "9",
        name: "Top Notch 2B",
        language: "Inglês",
        level: "Intermediário II",
        teacher: "Prof. Julia Santos",
        schedule: "Terça e Quinta, 20:30 - 22:00",
        progress: 0,
    },
    {
        id: "10",
        name: "Top Notch 3A",
        language: "Inglês",
        level: "Avançado",
        teacher: "Prof. Miguel Rodriguez",
        schedule: "Sábado, 13:00 - 16:00",
        progress: 0,
    },
    {
        id: "11",
        name: "Top Notch 3B",
        language: "Inglês",
        level: "Avançado",
        teacher: "Prof. Marie Dubois",
        schedule: "Sexta, 18:00 - 21:00",
        progress: 0,
    },
];

export default function MyCourses() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "courses";
    const { toast } = useToast();

    const handleSendMessage = (teacherName: string) => {
        toast({
            title: "Mensagem enviada!",
            description: `Sua solicitação de contato com ${teacherName} foi enviada. O professor responderá em breve.`,
        });
    };

    const teachers = [
        { id: "1", name: "Prof. Julia Santos", specialty: "Inglês A1-B2", image: "JS" },
        { id: "2", name: "Prof. Miguel Rodriguez", specialty: "Espanhol / Inglês", image: "MR" },
        { id: "3", name: "Prof. Marie Dubois", specialty: "Francês / Preparatórios", image: "MD" },
        { id: "4", name: "Prof. John Smith", specialty: "Conversação Avançada", image: "JS" },
    ];

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Meus Cursos"
                subtitle="Gerencie seus cursos e acompanhe seu progresso"
            />

            <div className="p-6">
                <Tabs value={activeTab} onValueChange={(v) => setSearchParams({ tab: v })} className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="courses" className="gap-2">
                            <BookOpen size={16} />
                            Cursos Ativos
                        </TabsTrigger>
                        <TabsTrigger value="teacher" className="gap-2">
                            <MessageSquare size={16} />
                            Falar com o Professor
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="courses">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map((course) => (
                                <Card
                                    key={course.id}
                                    variant="interactive"
                                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all flex flex-col"
                                >
                                    <div className="h-32 bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center relative">
                                        <Video className="text-primary/20 size-12" />
                                        <Badge
                                            variant={course.progress === 100 ? "success" : "secondary"}
                                            className="absolute top-3 right-3"
                                        >
                                            {course.progress === 100 ? "Concluído" : "Em andamento"}
                                        </Badge>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Badge variant="outline" className="mb-2 text-[10px] uppercase font-bold tracking-wider">{course.level}</Badge>
                                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{course.name}</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4 flex-1">
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Users size={16} />
                                                <span>{course.teacher}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                <span>{course.schedule}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span>Progresso</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-500"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-4 pt-0">
                                        <Button
                                            className="w-full gap-2 font-bold group-hover:bg-primary"
                                            onClick={() => navigate(`/dashboard/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                        >
                                            <Play size={16} fill="currentColor" />
                                            Acessar Curso
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="teacher">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teachers.map((teacher) => (
                                <Card key={teacher.id} variant="elevated" className="text-center p-6 space-y-4 group">
                                    <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary font-bold text-3xl group-hover:scale-105 transition-transform">
                                        {teacher.image}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{teacher.name}</h3>
                                        <p className="text-sm text-muted-foreground">{teacher.specialty}</p>
                                    </div>
                                    <Button
                                        className="w-full gap-2"
                                        variant="outline"
                                        onClick={() => handleSendMessage(teacher.name)}
                                    >
                                        <MessageSquare size={16} />
                                        Mandar Mensagem
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
