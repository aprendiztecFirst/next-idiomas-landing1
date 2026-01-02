import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, Clock, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockClasses = [
  {
    id: "1",
    name: "Inglês A1 - Turma A",
    language: "Inglês",
    level: "Básico",
    teacher: "Prof. Julia Santos",
    schedule: "Seg/Qua 08:00-09:30",
    students: 12,
    maxStudents: 15,
    room: "Sala 01",
  },
  {
    id: "2",
    name: "Inglês A2 - Turma A",
    language: "Inglês",
    level: "Básico",
    teacher: "Prof. John Smith",
    schedule: "Ter/Qui 10:00-11:30",
    students: 10,
    maxStudents: 15,
    room: "Sala 02",
  },
  {
    id: "3",
    name: "Inglês B1 - Turma A",
    language: "Inglês",
    level: "Intermediário",
    teacher: "Prof. Marie Dubois",
    schedule: "Seg/Qua 14:00-15:30",
    students: 14,
    maxStudents: 15,
    room: "Sala 03",
  },
  {
    id: "4",
    name: "Inglês B2 - Turma A",
    language: "Inglês",
    level: "Intermediário",
    teacher: "Prof. Miguel Rodriguez",
    schedule: "Ter/Qui 16:00-17:30",
    students: 8,
    maxStudents: 15,
    room: "Sala 04",
  },
];

const languageColors: Record<string, string> = {
  Inglês: "bg-primary/10 text-primary",
};

export default function Classes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClasses = mockClasses.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Turmas"
        subtitle="Visualização e gestão de turmas ativas"
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar turma, professor ou idioma..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            className="gap-2"
            onClick={() => navigate("/dashboard/new-class")}
          >
            <Plus size={18} />
            Nova Turma
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((classItem, index) => (
            <Card
              key={classItem.id}
              variant="interactive"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge
                      className={`${languageColors[classItem.language]} mb-2`}
                    >
                      {classItem.language}
                    </Badge>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen size={16} />
                    <span>{classItem.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    <span>
                      {classItem.students}/{classItem.maxStudents} alunos
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: `${(classItem.students / classItem.maxStudents) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {classItem.maxStudents - classItem.students} vagas disponíveis
                  </p>
                </div>

                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
