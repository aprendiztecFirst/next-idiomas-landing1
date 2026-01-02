import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";

const gradesData = [
    {
        course: "Inglês A1",
        midterm: 8.5,
        final: 9.0,
        attendance: "95%",
        status: "Aprovado",
    },
    {
        course: "Espanhol B2",
        midterm: 7.0,
        final: "-",
        attendance: "88%",
        status: "Em andamento",
    },
];

export default function MyGrades() {
    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Notas e Frequência"
                subtitle="Acompanhe seu desempenho acadêmico"
            />

            <div className="p-6 space-y-6">
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Boletim Escolar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Curso</TableHead>
                                    <TableHead className="text-center">Média Parcial</TableHead>
                                    <TableHead className="text-center">Prova Final</TableHead>
                                    <TableHead className="text-center">Frequência</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {gradesData.map((item) => (
                                    <TableRow key={item.course}>
                                        <TableCell className="font-medium">{item.course}</TableCell>
                                        <TableCell className="text-center">{item.midterm}</TableCell>
                                        <TableCell className="text-center">{item.final}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className={Number(item.attendance.replace('%', '')) >= 75 ? "text-success" : "text-destructive"}>
                                                    {item.attendance}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge
                                                variant={item.status === "Aprovado" ? "success" : "secondary"}
                                            >
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card variant="glass">
                        <CardHeader>
                            <CardTitle className="text-sm">Média Geral</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">8.75</div>
                            <p className="text-xs text-muted-foreground mt-1">+0.5 em relação ao mês anterior</p>
                        </CardContent>
                    </Card>
                    <Card variant="glass">
                        <CardHeader>
                            <CardTitle className="text-sm">Frequência Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">92%</div>
                            <p className="text-xs text-muted-foreground mt-1">Acima do mínimo de 75%</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
