import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  ClipboardList,
  GraduationCap,
  BookOpen,
  UserPlus,
  UserX,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Calendar,
  MessageCircle,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: NavItem[];
}

const getNavigationItems = (role: string): NavItem[] => {
  const commonItems: NavItem[] = [
    {
      icon: Home,
      label: "Início",
      path: "/dashboard",
    },
  ];

  switch (role) {
    case "/secretary":
      return [
        ...commonItems,
        {
          icon: ClipboardList,
          label: "Secretaria",
          children: [
            { icon: ClipboardList, label: "Documentos", path: "/dashboard/documents" },
            { icon: Users, label: "Contato de todos os alunos", path: "/dashboard/student-contacts" },
            { icon: UserPlus, label: "Cadastrar Professores", path: "/dashboard/teachers" },
            { icon: GraduationCap, label: "Professores com suas Turmas", path: "/dashboard/teachers-classes" },
            { icon: UserPlus, label: "Cadastrar Alunos", path: "/dashboard/students" },
            { icon: BookOpen, label: "Finanças", path: "/dashboard/finance" },
          ],
        },
      ];
    case "/student":
      return [
        ...commonItems,
        { icon: BookOpen, label: "Meus Cursos", path: "/dashboard/courses" },
        { icon: MessageCircle, label: "Falar com o Professor", path: "/dashboard/courses?tab=teacher" },
        { icon: Calendar, label: "Meus Horários", path: "/dashboard/my-schedule" },
        { icon: GraduationCap, label: "Notas e Frequência", path: "/dashboard/grades" },
        { icon: MessageCircle, label: "Contato com a secretaria", path: "/dashboard/secretary-contact" },
      ];
    case "/teacher":
      return [
        ...commonItems,
        { icon: Users, label: "Minhas Turmas", path: "/dashboard/classes" },
        { icon: Calendar, label: "Agenda de Aulas", path: "/dashboard/schedule" },
        { icon: ClipboardList, label: "Lançar Frequência", path: "/dashboard/attendance" },
      ];
    case "/admin":
      return [
        ...commonItems,
        { icon: Users, label: "Gestão de Usuários", path: "/dashboard/users" },
        { icon: Settings, label: "Configurações Globais", path: "/dashboard/settings" },
        { icon: BookOpen, label: "Relatórios Estratégicos", path: "/dashboard/reports" },
      ];
    default:
      return commonItems;
  }
};

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "/secretary";
  const navigationItems = getNavigationItems(userRole);

  const [expandedItems, setExpandedItems] = useState<string[]>(["Secretaria"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
      setIsMobileOpen(false);
    }
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.path);

    return (
      <div key={item.label}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.label);
            } else {
              handleNavigation(item.path);
            }
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            depth === 0 ? "text-sidebar-foreground" : "text-sidebar-foreground/80",
            active
              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
              : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            depth > 0 && "ml-4 text-sm"
          )}
        >
          <item.icon size={depth === 0 ? 20 : 18} />
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <span className="transition-transform duration-200">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 animate-accordion-down">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Logo variant="light" size="sm" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => {
            localStorage.removeItem("userRole");
            navigate("/");
          }}
        >
          <LogOut size={20} />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-sidebar z-40 transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
