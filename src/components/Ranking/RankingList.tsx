import { RankingUser } from "../../Models/RankingUser"
import { RankingInfoUser } from "./RankingInfoUser"
import { RankingPodio } from "./RankingPodio"

interface RankingListProps {
  users: RankingUser[]
  loading?: boolean
}

export const RankingList = ({ users, loading }: RankingListProps) => {
    return (
        <>
            {loading && (
                <div className="space-y-6">
                    {/* Podio skeleton */}
                    <div className="flex items-start space-x-6">
                            <div className="h-[320px] bg-gray-200 rounded w-1/3 animate-pulse scale-[1.05] z-[5]" />
                            <div className="h-[320px] bg-gray-200 rounded w-1/3 animate-pulse scale-[1.1] z-10" />
                            <div className="h-[320px] bg-gray-200 rounded w-1/3 animate-pulse scale-[1.02] z-[3]" />
                    </div>

                    {/* Full list skeleton */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="h-6 bg-gray-200 rounded w-[420px] mb-4 animate-pulse" />
                        <div className="space-y-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!loading && (
                <>
                    <RankingPodio users={users.slice(0, 3)} />

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Classificação Completa</h3>
                        <div className="space-y-4">
                            {users.slice(3).map((user, index) => (
                                <RankingInfoUser key={user.nomeOuApelido} user={user} ranking={index + 4} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}