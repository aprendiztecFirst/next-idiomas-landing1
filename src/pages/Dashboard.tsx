import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    {
      icon: Users,
      label: "Alunos Ativos",
      value: "248",
      change: "+12 este mês",
      changeType: "positive" as const,
      color: "primary" as const,
    },
    {
      icon: BookOpen,
      label: "Turmas Ativas",
      value: "32",
      change: "4 turmas novas",
      changeType: "positive" as const,
      color: "accent" as const,
    },
    {
      icon: GraduationCap,
      label: "Pré-Matrículas",
      value: "18",
      change: "Aguardando confirmação",
      changeType: "neutral" as const,
      color: "warning" as const,
    },
    {
      icon: TrendingUp,
      label: "Taxa de Renovação",
      value: "87%",
      change: "+5% vs. mês anterior",
      changeType: "positive" as const,
      color: "success" as const,
    },
  ];

  const recentStudents = [
    { name: "Ana Silva", course: "Inglês Avançado", status: "Ativo" },
    { name: "Carlos Santos", course: "Espanhol Básico", status: "Ativo" },
    { name: "Maria Oliveira", course: "Francês Intermediário", status: "Pendente" },
    { name: "João Pereira", course: "Inglês Básico", status: "Ativo" },
  ];

  const upcomingClasses = [
    { time: "08:00", course: "Inglês A1", teacher: "Prof. Julia", room: "Sala 01" },
    { time: "10:00", course: "Espanhol B2", teacher: "Prof. Miguel", room: "Sala 03" },
    { time: "14:00", course: "Francês A2", teacher: "Prof. Marie", room: "Sala 02" },
    { time: "16:00", course: "Inglês B1", teacher: "Prof. John", room: "Sala 04" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Dashboard"
        subtitle="Visão geral do sistema acadêmico"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" className="gap-2" onClick={() => navigate("/dashboard/new-student")}>
                <UserPlus size={18} />
                Novo Aluno
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => navigate("/dashboard/new-class")}>
                <BookOpen size={18} />
                Nova Turma
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => navigate("/dashboard/schedule")}>
                <Calendar size={18} />
                Agendar Aula
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "500ms" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Alunos Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                Ver todos
                <ArrowRight size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {student.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {student.course}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === "Ativo"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                        }`}
                    >
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Classes */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Aulas de Hoje</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                Ver agenda
                <ArrowRight size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                      <Clock size={20} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">
                        {classItem.course}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.teacher} • {classItem.room}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {classItem.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
