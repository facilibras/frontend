import { SidebarProvider } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import DefaultNavBar from '../components/DefaultNavBar'
import Footer from "./Footer"
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="min-h-screen dark:bg-gray-900 highcontrast:bg-black transition-colors duration-300">
          <main className="w-full">
            <DefaultNavBar />
            {children}
            {/* <Footer /> */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

