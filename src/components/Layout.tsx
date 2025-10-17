import { SidebarProvider } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import DefaultNavBar from '../components/DefaultNavBar'
import Footer from "./Footer"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen">
        <DefaultNavBar />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  )
}

