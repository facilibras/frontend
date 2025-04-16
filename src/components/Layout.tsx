import { SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar"
import { AlignJustify } from 'lucide-react'
import { AppSidebar } from "./app-sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <CustomTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button onClick={toggleSidebar}>
    <AlignJustify color="white" />
  </button>
}

