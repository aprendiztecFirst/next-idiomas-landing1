import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import NewStudent from "./pages/NewStudent";
import NewClass from "./pages/NewClass";
import PreRegistration from "./pages/PreRegistration";
import InactiveStudents from "./pages/InactiveStudents";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";
import Documents from "./pages/Documents";
import StudentContacts from "./pages/StudentContacts";
import TeachersClasses from "./pages/TeachersClasses";
import Teachers from "./pages/Teachers";
import NewTeacher from "./pages/NewTeacher";
import Finance from "./pages/Finance";
import MyCourses from "./pages/MyCourses";
import MyGrades from "./pages/MyGrades";
import MySchedule from "./pages/MySchedule";
import SecretaryContact from "./pages/SecretaryContact";
import Attendance from "./pages/Attendance";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import DeniedAccess from "./pages/DeniedAccess";
import CourseContent from "./pages/CourseContent";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="denied" element={<DeniedAccess />} />

            {/* Student Only or Shared with Admin */}
            <Route element={<ProtectedRoute allowedRoles={["/student", "/admin"]} />}>
              <Route path="courses" element={<MyCourses />} />
              <Route path="courses/:id" element={<CourseContent />} />
              <Route path="grades" element={<MyGrades />} />
              <Route path="my-schedule" element={<MySchedule />} />
              <Route path="secretary-contact" element={<SecretaryContact />} />
            </Route>

            {/* Teacher Only or Shared with Admin */}
            <Route element={<ProtectedRoute allowedRoles={["/teacher", "/admin"]} />}>
              <Route path="classes" element={<Classes />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="attendance" element={<Attendance />} />
            </Route>

            {/* Secretary Only or Shared with Admin */}
            <Route element={<ProtectedRoute allowedRoles={["/secretary", "/admin"]} />}>
              <Route path="students" element={<Students />} />
              <Route path="new-student" element={<NewStudent />} />
              <Route path="pre-registration" element={<PreRegistration />} />
              <Route path="inactive-students" element={<InactiveStudents />} />
              <Route path="documents" element={<Documents />} />
              <Route path="student-contacts" element={<StudentContacts />} />
              <Route path="teachers-classes" element={<TeachersClasses />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="new-teacher" element={<NewTeacher />} />
              <Route path="finance" element={<Finance />} />
              <Route path="new-class" element={<NewClass />} />
            </Route>

            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["/admin"]} />}>
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
