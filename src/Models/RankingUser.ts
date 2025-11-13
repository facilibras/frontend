export interface RankingUser {
  nomeOuApelido: string,
  imagemPerfil: string | Blob,
  sinaisPeriodo: number,
  pontos: number,
  totalSinais: number,
  linkPerfil: string
}