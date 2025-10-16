export interface usuario {
  nomeOuApelido: string,
  imagemFundo: string,
  imagemPerfil: string,
  aprendendoDesde: string,
  progresso: {
    qtdSinaisAprendidos: number,
    nivel: number,
    pontosTotal: number,
    pontosNivel: number,
    pontosParaSubir: number,
    msgProgresso: string
  },
  atividadeRecente: atividadeRes[],
  conquistas: conquistasProsps[]
}

interface atividadeRes {
    atividade:string,
    data:string
}
interface conquistasProsps{
    id: number,
    nome: string,
    descricao: string
}