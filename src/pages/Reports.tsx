import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign, PieChart } from "lucide-react";

export default function Reports() {
    const stats = [
        { title: "Matrículas Ativas", value: "124", change: "+12%", icon: Users, color: "text-blue-500" },
        { title: "Faturamento Mensal", value: "R$ 45.200", change: "+8%", icon: DollarSign, color: "text-green-500" },
        { title: "Taxa de Retenção", value: "94%", change: "+2%", icon: TrendingUp, color: "text-purple-500" },
        { title: "Inadimplência", value: "3.2%", change: "-1.5%", icon: BarChart3, color: "text-red-500" },
    ];

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Relatórios Estratégicos"
                subtitle="Analise o desempenho e crescimento da escola"
            />

            <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <Card key={index} variant="glass">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon size={18} className={stat.color} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                                    {stat.change} em relação ao mês anterior
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card variant="elevated">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart size={20} className="text-primary" />
                                Matrículas por Idioma
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-secondary/10">
                            <div className="text-center text-muted-foreground">
                                <BarChart3 size={48} className="mx-auto mb-2 opacity-20" />
                                Gráfico de Matrículas (Simulação)
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="elevated">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp size={20} className="text-primary" />
                                Crescimento Mensal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-secondary/10">
                            <div className="text-center text-muted-foreground">
                                <TrendingUp size={48} className="mx-auto mb-2 opacity-20" />
                                Gráfico de Crescimento (Simulação)
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
