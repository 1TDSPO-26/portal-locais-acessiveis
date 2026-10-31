import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { locaisMock } from '../../types/locais'
import { listarLocais } from '../../services/locaisService'
import Locais from './index'

vi.mock('../../services/locaisService', () => ({ listarLocais: vi.fn() }))
vi.mock('../../hooks/useLocais', () => ({ useLocais: () => ({ offline: false }) }))

beforeEach(() => {
  localStorage.clear()
  vi.mocked(listarLocais).mockResolvedValue(structuredClone(locaisMock))
})
afterEach(() => { cleanup(); vi.clearAllMocks() })

async function abrirLista() {
  const user = userEvent.setup()
  render(<MemoryRouter><Locais /></MemoryRouter>)
  await screen.findByText('7 locais encontrados')
  return user
}
const buscar = () => screen.getByRole('textbox', { name: 'Buscar por local ou endereço' })
const nomes = () => screen.queryAllByRole('article').map(card => within(card).getByRole('heading').textContent)

describe('Locais: busca, filtros e paginação — issue 61', () => {
  it.each([
    ['  BIBLIOTECA  ', 'Biblioteca Mário de Andrade'],
    ['Paulista', 'Museu de Arte de São Paulo'],
  ])('busca por "%s" encontra somente %s', async (termo, nome) => {
    const user = await abrirLista()
    await user.type(buscar(), termo)
    expect(nomes()).toEqual([nome])
    expect(screen.getByText('1 local encontrado')).toBeInTheDocument()
  })

  it.each([
    ['Banheiro acessível', ['Biblioteca Mário de Andrade', 'Museu de Arte de São Paulo', 'Parque Ibirapuera', 'Shopping Center Norte']],
    ['Vagas reservadas', ['Museu de Arte de São Paulo', 'Shopping Center Norte']],
    ['Circulação', ['Igreja da Sé', 'Museu de Arte de São Paulo', 'Parque Ibirapuera', 'Shopping Center Norte']],
    ['Elevador', ['Biblioteca Mário de Andrade', 'Estação da Luz', 'Museu de Arte de São Paulo', 'Shopping Center Norte']],
  ])('filtra por %s sem incluir recursos indisponíveis ou não informados', async (rotulo, esperados) => {
    const user = await abrirLista()
    await user.click(screen.getByRole('button', { name: rotulo }))
    expect(nomes()).toEqual(esperados)
    expect(screen.getByText(esperados.length + ' locais encontrados')).toBeInTheDocument()
  })

  it('combina filtros e busca, mostra lista vazia e recupera o resultado ao limpar filtros', async () => {
    const user = await abrirLista()
    await user.click(screen.getByRole('button', { name: 'Banheiro acessível' }))
    await user.click(screen.getByRole('button', { name: 'Elevador' }))
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade', 'Museu de Arte de São Paulo', 'Shopping Center Norte'])
    await user.type(buscar(), 'biblioteca')
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade'])
    await user.click(screen.getByRole('button', { name: 'Vagas reservadas' }))
    expect(nomes()).toEqual([])
    expect(screen.getByRole('heading', { name: 'Nenhum local encontrado' })).toBeInTheDocument()
   
    expect(screen.queryByRole('navigation', { name: 'Paginação da lista de locais' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }))
    expect(buscar()).toHaveValue('biblioteca')
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade'])
    await user.clear(buscar())
    expect(screen.getByText('7 locais encontrados')).toBeInTheDocument()
  })

  it('mostra mensagem para busca inexistente e restaura a lista ao apagar o termo', async () => {
    const user = await abrirLista()
    await user.type(buscar(), 'local-inexistente-qa61')
    expect(nomes()).toEqual([])
    expect(screen.getByText('0 locais encontrados')).toBeInTheDocument()
    
    await user.clear(buscar())
    expect(nomes()).toHaveLength(4)
    expect(screen.getByText('7 locais encontrados')).toBeInTheDocument()
  })

  it('seleciona todos os filtros e restaura os sete locais ao desmarcar', async () => {
    const user = await abrirLista()
    const todos = screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' })
    await user.click(todos)
    expect(todos).toBeChecked()
    expect(nomes()).toEqual(['Museu de Arte de São Paulo', 'Shopping Center Norte'])
    await user.click(todos)
    expect(todos).not.toBeChecked()
    expect(screen.getByText('7 locais encontrados')).toBeInTheDocument()
  })

  it('respeita os limites das páginas e volta à primeira ao buscar ou filtrar', async () => {
    const user = await abrirLista()
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Ir para a próxima página' }))
    expect(nomes()).toEqual(['Parque Ibirapuera', 'Shopping Center Norte', 'Unidade Básica de Saúde Jardim São Luís'])
    expect(screen.getByRole('button', { name: 'Ir para a próxima página' })).toBeDisabled()
    await user.type(buscar(), 'biblioteca')
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade'])
    await user.clear(buscar())
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Ir para a página 2' }))
    await user.click(screen.getByRole('button', { name: 'Entrada com rampa' }))
    expect(screen.getByText('6 locais encontrados')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeDisabled()
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade', 'Estação da Luz', 'Igreja da Sé', 'Museu de Arte de São Paulo'])
  })
})

describe('Locais: histórico das últimas pesquisas — issue 140', () => {
  it('salva a busca ao confirmar, mantém após recarregar e refaz a busca pelo histórico', async () => {
    const user = await abrirLista()
    await user.type(buscar(), 'biblioteca{Enter}')
    await user.clear(buscar())
    await user.type(buscar(), 'Paulista{Enter}')

    expect(JSON.parse(localStorage.getItem('portalLocaisHistoricoBusca') ?? '[]')).toEqual(['Paulista', 'biblioteca'])

    // Simula recarregar a página
    cleanup()
    const user2 = await abrirLista()
    await user2.click(buscar())
    const lista = screen.getByRole('region', { name: 'Buscas recentes' })
    expect(within(lista).getAllByRole('listitem').map(item => item.textContent)).toEqual(['Paulista', 'biblioteca'])

    await user2.click(screen.getByRole('button', { name: 'Buscar novamente por biblioteca' }))
    expect(buscar()).toHaveValue('biblioteca')
    expect(nomes()).toEqual(['Biblioteca Mário de Andrade'])

    // O termo reutilizado volta para o topo
    await user2.click(buscar())
    expect(within(screen.getByRole('region', { name: 'Buscas recentes' })).getAllByRole('listitem').map(item => item.textContent)).toEqual(['biblioteca', 'Paulista'])

    await user2.click(screen.getByRole('button', { name: 'Remover Paulista do histórico' }))
    expect(JSON.parse(localStorage.getItem('portalLocaisHistoricoBusca') ?? '[]')).toEqual(['biblioteca'])
  })
})
