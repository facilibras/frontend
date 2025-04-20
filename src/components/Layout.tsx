import { SidebarProvider, useSidebar } from "./ui/sidebar"
import { AlignJustify } from 'lucide-react'
import { AppSidebar } from "./app-sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
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

