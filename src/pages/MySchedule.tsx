import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const scheduleItems = [
    {
        id: "1",
        day: "Segunda-feira",
        time: "08:00 - 09:30",
        course: "Inglês A1",
        room: "Sala 01",
        teacher: "Prof. Julia Santos",
    },
    {
        id: "2",
        day: "Quarta-feira",
        time: "08:00 - 09:30",
        course: "Inglês A1",
        room: "Sala 01",
        teacher: "Prof. Julia Santos",
    },
    {
        id: "3",
        day: "Terça-feira",
        time: "10:00 - 11:30",
        course: "Inglês A2",
        room: "Sala 02",
        teacher: "Prof. John Smith",
    },
    {
        id: "4",
        day: "Quinta-feira",
        time: "10:00 - 11:30",
        course: "Inglês A2",
        room: "Sala 02",
        teacher: "Prof. John Smith",
    },
];

export default function MySchedule() {
    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Meus Horários"
                subtitle="Confira sua agenda de aulas semanal"
            />

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((day) => (
                        <div key={day} className="space-y-4">
                            <h3 className="font-bold text-lg border-b pb-2">{day}</h3>
                            {scheduleItems
                                .filter((item) => item.day.startsWith(day))
                                .map((item) => (
                                    <Card key={item.id} variant="elevated" className="border-l-4 border-l-primary">
                                        <CardContent className="p-4 space-y-2">
                                            <div className="font-semibold text-primary">{item.course}</div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock size={14} />
                                                <span>{item.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <MapPin size={14} />
                                                <span>{item.room}</span>
                                            </div>
                                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                                                {item.teacher}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
