import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

export default function Finance() {
    const transactions = [
        { id: 1, student: "Ana Silva", category: "Mensalidade", amount: 450.00, status: "Pago", date: "2024-03-20", type: "income" },
        { id: 2, student: "Carlos Santos", category: "Material Didático", amount: 120.00, status: "Pago", date: "2024-03-18", type: "income" },
        { id: 3, teacher: "Prof. Julia Santos", category: "Pagamento Salário", amount: 2800.00, status: "Programado", date: "2024-04-05", type: "expense" },
        { id: 4, student: "Maria Oliveira", category: "Matrícula", amount: 200.00, status: "Pago", date: "2024-03-15", type: "income" },
        { id: 5, supplier: "Papelaria Central", category: "Material de Escritório", amount: 157.80, status: "Pago", date: "2024-03-12", type: "expense" },
    ];

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Finanças"
                subtitle="Gestão financeira, mensalidades e pagamentos"
            />

            <div className="p-6 space-y-6">
                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="elevated">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Receita Mensal</p>
                                    <p className="text-2xl font-bold text-success">R$ 42.500,00</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-success">
                                <ArrowUpRight size={14} className="mr-1" />
                                <span>8% em relação ao mês anterior</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="elevated">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Despesas Mensais</p>
                                    <p className="text-2xl font-bold text-destructive">R$ 28.340,00</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                                    <TrendingDown size={24} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-destructive">
                                <ArrowDownRight size={14} className="mr-1" />
                                <span>3% em relação ao mês anterior</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="elevated">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Saldo Previsto</p>
                                    <p className="text-2xl font-bold text-primary">R$ 14.160,00</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <Calendar size={14} className="mr-1" />
                                <span>Fechamento em 31/03/2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions List */}
                <Card variant="elevated">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Transações Recentes</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter size={16} />
                                Filtrar
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download size={16} />
                                Exportar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.map((t) => (
                                <div key={t.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                                            }`}>
                                            {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t.student || t.teacher || t.supplier}</p>
                                            <p className="text-sm text-muted-foreground">{t.category} • {t.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${t.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                                            {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                                        </p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${t.status === 'Pago' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                                            }`}>
                                            {t.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
