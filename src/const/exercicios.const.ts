export interface exercicio {
    titulo: string,
    secao: string,
    descricao: string,
    palavras: palavra[],
    ehVariacao: false,
    variacao: string | null,
    proxTarefa: string | null,
    status: string | null
  }

interface palavra {
  palavra: string,
  video: string
}

export interface secao {
  nome: string
  qtdEx: number
}
