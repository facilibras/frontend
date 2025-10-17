import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/Landing/Navbar'
import Footer from '../../components/Footer'

import { RankingUser } from '../../Models/RankingUser'
import { useEffect, useState } from 'react'
import { GetRankingBySelectedPeriod } from '../../Services/GetRankingBySelectedPeriod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { RankingList } from '../../components/Ranking/RankingList'

export const Route = createFileRoute('/ranking/')({
  component: RouteComponent,
})

function RouteComponent() {

  const [users, setUsers] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [openTab, setOpenTab] = useState<'today' | 'week' | 'month' | 'alltime'>("today")

  const handleTabChange = async (period: 'hoje' | 'semanal' | 'mensal' | 'all') => {
    setLoading(true)

    const data = await GetRankingBySelectedPeriod({ period })
    if (data) {
      setUsers(data.ranking)
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await GetRankingBySelectedPeriod({ period: 'hoje' })
      if (data) {
        setUsers(data.ranking)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
        <Navbar />
        <main className='container mx-auto px-4 pt-8'>
             <section className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Ranking de Aprendizado</h1>
              <p className="text-gray-600">Veja quem está liderando na aprendizagem de Libras</p>
            </section>
        </main>

         <section className='w-full px-4 pb-8 container mx-auto'>

            <Tabs
            value={openTab}
            onValueChange={(value) => {
              const map: Record<string, 'hoje' | 'semanal' | 'mensal' | 'all'> = {
                today: 'hoje',
                week: 'semanal',
                month: 'mensal',
                alltime: 'all',
              }
              setOpenTab(value as 'today' | 'week' | 'month' | 'alltime')

              handleTabChange(map[value] ?? 'hoje')
            }}
            className="w-full "
          >
              <div className='flex items-center justify-center mb-14 h-full'>
                <TabsList className="bg-gray-100 rounded-lg flex items-center justify-center h-12">
                  <TabsTrigger value="today" className='cursor-pointer font-normal data-[state=active]:text-lg data-[state=active]:text-white data-[state=active]:bg-blue-400 px-6 py-4  rounded-lg' >Hoje</TabsTrigger>
                  <TabsTrigger value="week" className='cursor-pointer font-normal data-[state=active]:text-white data-[state=active]:bg-blue-400 px-6 py-4 rounded-lg'>Esta Semana</TabsTrigger>
                  <TabsTrigger value="month" className='cursor-pointer font-normal data-[state=active]:text-white data-[state=active]:bg-blue-400 px-6 py-4 rounded-lg'>Este Mês</TabsTrigger>
                  <TabsTrigger value="alltime" className='cursor-pointer font-normal data-[state=active]:text-white data-[state=active]:bg-blue-400 px-6 py-4 rounded-lg'>Todo Tempo</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="today" className='block'><RankingList users={users} loading={loading} /></TabsContent>
              <TabsContent value="week" className='block'><RankingList users={users} loading={loading} /></TabsContent>
              <TabsContent value="month" className='block'><RankingList users={users} loading={loading} /></TabsContent>
              <TabsContent value="alltime" className='block'><RankingList users={users} loading={loading} /></TabsContent>
            </Tabs>
        </section>


        <Footer />
    </> 
    )
}
