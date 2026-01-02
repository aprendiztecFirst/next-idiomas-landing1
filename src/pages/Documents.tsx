import { useState, useRef } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const documents = [
        { name: "Contrato de Matrícula - Modelo", type: "PDF", date: "2024-01-15", size: "245 KB" },
        { name: "Termo de Responsabilidade", type: "PDF", date: "2024-01-10", size: "180 KB" },
        { name: "Declaração de Frequência", type: "DOCX", date: "2024-01-08", size: "95 KB" },
        { name: "Certificado de Conclusão - Modelo", type: "PDF", date: "2024-01-05", size: "320 KB" },
    ];

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast({
            title: "Upload concluído!",
            description: `O arquivo "${file.name}" foi enviado com sucesso.`,
        });

        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Documentos"
                subtitle="Gerencie documentos e modelos da secretaria"
            />

            <div className="p-6 space-y-6">
                {/* Upload Section */}
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Upload de Documentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:bg-secondary/20 transition-colors cursor-pointer"
                            onClick={handleUploadClick}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {isUploading ? (
                                <div className="space-y-4">
                                    <Loader2 className="mx-auto animate-spin text-primary" size={48} />
                                    <p className="text-sm font-medium">Enviando arquivo...</p>
                                </div>
                            ) : (
                                <>
                                    <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Clique aqui para selecionar ou arraste arquivos para esta área
                                    </p>
                                    <Button variant="outline" type="button">Selecionar Arquivos</Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Documents List */}
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Documentos Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {documents.map((doc, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                                            <FileText className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{doc.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {doc.type} • {doc.size} • {doc.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" className="gap-2">
                                            <Eye size={16} />
                                            Visualizar
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Download size={16} />
                                            Baixar
                                        </Button>
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
