import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

export default function SecretaryContact() {
    const whatsappNumber = "5591991924252";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Contato com a Secretaria"
                subtitle="Entre em contato conosco para tirar dúvidas ou resolver pendências"
            />

            <div className="p-6 max-w-2xl mx-auto">
                <Card variant="elevated" className="overflow-hidden border-t-4 border-t-primary">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <MessageCircle size={32} className="text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Atendimento via WhatsApp</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-center text-muted-foreground">
                            Nossa equipe está disponível para ajudar você da melhor forma possível. Clique no botão abaixo para iniciar uma conversa direto no seu WhatsApp.
                        </p>

                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                        >
                            <Button size="lg" className="w-full gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white border-none h-16 text-lg font-bold shadow-lg transition-transform hover:scale-[1.02]">
                                <MessageCircle size={24} />
                                Falar no WhatsApp
                                <span className="text-sm font-normal opacity-90">(91) 99192-4252</span>
                            </Button>
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Clock size={18} className="text-primary" />
                                <div>
                                    <div className="font-semibold text-foreground">Horário de Atendimento</div>
                                    <div>Segunda a Sexta: 08h às 18h</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone size={18} className="text-primary" />
                                <div>
                                    <div className="font-semibold text-foreground">Telefone Fixo</div>
                                    <div>(91) 3212-0000</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
