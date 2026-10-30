import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  CHAVE_HISTORICO_BUSCA,
  LIMITE_HISTORICO_BUSCA,
  adicionarAoHistorico,
  useHistoricoBusca,
} from './useHistoricoBusca'

beforeEach(() => {
  localStorage.clear()
})

const salvo = () => JSON.parse(localStorage.getItem(CHAVE_HISTORICO_BUSCA) ?? '[]')

describe('adicionarAoHistorico', () => {
  it('coloca o termo mais recente no topo', () => {
    expect(adicionarAoHistorico(['Parque'], 'Museu')).toEqual(['Museu', 'Parque'])
  })

  it('remove espaços extras e ignora termos curtos ou vazios', () => {
    expect(adicionarAoHistorico([], '  Praça   da Sé  ')).toEqual(['Praça da Sé'])
    expect(adicionarAoHistorico(['Museu'], '   ')).toEqual(['Museu'])
    expect(adicionarAoHistorico(['Museu'], 'a')).toEqual(['Museu'])
  })

  it('não duplica termos e sobe o repetido para o topo', () => {
    expect(adicionarAoHistorico(['Parque', 'Museu', 'Biblioteca'], 'museu')).toEqual([
      'museu',
      'Parque',
      'Biblioteca',
    ])
  })

  it(`guarda no máximo ${LIMITE_HISTORICO_BUSCA} termos`, () => {
    let historico: string[] = []
    for (const termo of ['um', 'dois', 'três', 'quatro', 'cinco', 'seis']) {
      historico = adicionarAoHistorico(historico, termo)
    }
    expect(historico).toEqual(['seis', 'cinco', 'quatro', 'três', 'dois'])
  })
})

describe('useHistoricoBusca', () => {
  it('salva as buscas no localStorage', () => {
    const { result } = renderHook(() => useHistoricoBusca())

    act(() => result.current.salvarBusca('Museu'))
    act(() => result.current.salvarBusca('Parque'))

    expect(result.current.historico).toEqual(['Parque', 'Museu'])
    expect(salvo()).toEqual(['Parque', 'Museu'])
  })

  it('recupera o histórico salvo ao montar de novo (recarregar a página)', () => {
    localStorage.setItem(CHAVE_HISTORICO_BUSCA, JSON.stringify(['Biblioteca', 'Sé']))

    const { result } = renderHook(() => useHistoricoBusca())

    expect(result.current.historico).toEqual(['Biblioteca', 'Sé'])
  })

  it('remove um termo e limpa o histórico inteiro', () => {
    const { result } = renderHook(() => useHistoricoBusca())

    act(() => result.current.salvarBusca('Museu'))
    act(() => result.current.salvarBusca('Parque'))
    act(() => result.current.removerBusca('Museu'))
    expect(result.current.historico).toEqual(['Parque'])
    expect(salvo()).toEqual(['Parque'])

    act(() => result.current.limparHistorico())
    expect(result.current.historico).toEqual([])
    expect(salvo()).toEqual([])
  })

  it('ignora um valor corrompido no localStorage', () => {
    localStorage.setItem(CHAVE_HISTORICO_BUSCA, '{isso não é json')

    const { result } = renderHook(() => useHistoricoBusca())

    expect(result.current.historico).toEqual([])
  })
})
