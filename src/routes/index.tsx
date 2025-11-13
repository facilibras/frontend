import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Landing/Navbar'
import { HeroSection } from '../components/Landing/HeroSection'
import { HowItWorksSection } from '../components/Landing/HotItWorksSection'
import { DemoSection } from '../components/Landing/DemoSection'
import { ExerciseSection } from '../components/Landing/ExercisesSection'
import { ReadyToStart } from '../components/Landing/ReadyToStart'
import Footer from '../components/Footer'


export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
    <>
        <Navbar />
        <main className='container mx-auto px-4 py-8'>
            <HeroSection />

            <HowItWorksSection />

            <DemoSection />

            <ExerciseSection />

            <ReadyToStart />
        </main>

        <Footer />
    </> 
    )
}