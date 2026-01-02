import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  ClipboardList, 
  Users, 
  Settings,
  LogIn
} from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  const roles = [
    {
      icon: GraduationCap,
      title: "Portal do Aluno",
      description: "Acesse suas notas, horários e materiais de estudo",
      color: "accent" as const,
      route: "/student",
    },
    {
      icon: ClipboardList,
      title: "Área da Secretaria",
      description: "Gestão de matrículas, alunos e turmas",
      color: "primary" as const,
      route: "/secretary",
    },
    {
      icon: Users,
      title: "Área dos Professores",
      description: "Gerenciar aulas, frequência e avaliações",
      color: "success" as const,
      route: "/teacher",
    },
    {
      icon: Settings,
      title: "Administração",
      description: "Configurações e relatórios do sistema",
      color: "secondary" as const,
      route: "/admin",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <Logo variant="light" size="md" />
            <Button 
              variant="hero-outline" 
              onClick={() => navigate("/auth")}
              className="gap-2"
            >
              <LogIn size={18} />
              Entrar
            </Button>
          </header>

          {/* Hero Content */}
          <div className="text-center pb-20 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 animate-fade-in">
              Bem-vindo ao
              <span className="block mt-2 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                Next Idiomas
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Sua plataforma completa para gestão acadêmica e administrativa da escola de idiomas
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </div>

      {/* Role Cards Section */}
      <main className="container mx-auto px-4 -mt-8 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            Selecione seu portal de acesso
          </h2>
          
          <div className="grid gap-4">
            {roles.map((role, index) => (
              <RoleCard
                key={role.title}
                icon={role.icon}
                title={role.title}
                description={role.description}
                color={role.color}
                onClick={() => navigate("/auth", { state: { role: role.route } })}
                delay={300 + index * 100}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Next Idiomas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
