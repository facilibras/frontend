export interface exercicio {
    titulo: string,
    secao: string,
    descricao: string,
    palavras: palavra[]
    prox_tarefa: string | null,
    status: null
}

interface palavra {
  palavra: string,
  video: string
}

export interface secao {
  nome: string
  qtd_ex: number
}
