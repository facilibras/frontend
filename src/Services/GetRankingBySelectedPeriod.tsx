import { toast } from "react-toastify"
import { backendConnection } from "../utils/axios"
import { GetUserImage } from "./GetUserImage"

interface GetRankingBySelectedPeriodProps {
    period: 'hoje' | 'semanal' | 'mensal' | 'all';
}

export const GetRankingBySelectedPeriod = async ({ period }: GetRankingBySelectedPeriodProps) => {


    try {
        const data = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: '/ranking?period=' + period,
        })

        if (data) {

            const processingPromises = data.ranking.map(async (element: any) => await GetUserImage(element));
            const processedRanking = await Promise.all(processingPromises);

            data.ranking = processedRanking;
        }
        return data

    } catch (error) {
        console.error("Error fetching ranking by selected period:", error);
        toast.error("Erro ao buscar ranking pelo período selecionado.");
    }
}