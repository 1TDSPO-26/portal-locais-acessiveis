import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { locaisMock, type Local } from '../../types/locais'
import { listarLocais } from '../../services/locaisService'
import { ApiError } from '../../services/api'
import Locais from './index'

vi.mock('../../services/locaisService', () => ({ listarLocais: vi.fn() }))
vi.mock('../../hooks/useLocais', () => ({ useLocais: () => ({ offline: false }) }))

const MENSAGEM_ERRO = 'A API respondeu com erro 500 ao acessar /locais.'
const falha = () => Promise.reject(new ApiError(MENSAGEM_ERRO, 500))
const sucesso = () => Promise.resolve(structuredClone(locaisMock))

// Promessa controlada pelo teste, para verificar o estado durante a nova tentativa
function pendente() {
  let resolver!: (locais: Local[]) => void
  let rejeitar!: (erro: unknown) => void
  const promessa = new Promise<Local[]>((res, rej) => { resolver = res; rejeitar = rej })
  return { promessa, resolver, rejeitar }
}

beforeEach(() => { localStorage.clear() })
afterEach(() => { cleanup(); vi.clearAllMocks() })

function abrir() {
  const user = userEvent.setup()
  render(<MemoryRouter><Locais /></MemoryRouter>)
  return user
}
const botaoRetry = () => screen.getByRole('button', { name: /tent(ar|ando) novamente/i })
const nomes = () => screen.queryAllByRole('article').map(card => within(card).getByRole('heading').textContent)

describe('Locais: tentar novamente após falha na consulta — issue 136', () => {
  it('não exibe o botão de retry quando a consulta funciona', async () => {
    vi.mocked(listarLocais).mockImplementation(sucesso)
    abrir()
    await screen.findByText('7 locais encontrados')
    expect(screen.queryByRole('button', { name: /tentar novamente/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('exibe mensagem e botão quando a consulta falha', async () => {
    vi.mocked(listarLocais).mockImplementation(falha)
    abrir()
    const alerta = await screen.findByRole('alert')
    expect(within(alerta).getByRole('heading', { name: 'Não foi possível carregar os locais' })).toBeInTheDocument()
    expect(within(alerta).getByText(MENSAGEM_ERRO)).toBeInTheDocument()
    expect(botaoRetry()).toBeEnabled()
  })

  it('desabilita o botão e mostra spinner durante a nova tentativa, sem chamadas duplicadas', async () => {
    const retry = pendente()
    vi.mocked(listarLocais).mockImplementationOnce(falha).mockImplementationOnce(() => retry.promessa)
    const user = abrir()
    await screen.findByRole('alert')

    await user.click(botaoRetry())
    expect(botaoRetry()).toBeDisabled()
    expect(botaoRetry()).toHaveAttribute('aria-busy', 'true')
    expect(botaoRetry()).toHaveTextContent('Tentando novamente...')
    expect(screen.getByTestId('spinner-retry')).toBeInTheDocument()

    await user.click(botaoRetry())
    expect(listarLocais).toHaveBeenCalledTimes(2)

    retry.resolver(structuredClone(locaisMock))
    await screen.findByText('7 locais encontrados')
  })

  it('oculta o erro e mostra os locais quando a nova tentativa funciona', async () => {
    vi.mocked(listarLocais).mockImplementationOnce(falha).mockImplementationOnce(sucesso)
    const user = abrir()
    await screen.findByRole('alert')

    await user.click(botaoRetry())
    await screen.findByText('7 locais encontrados')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /tentar novamente/i })).not.toBeInTheDocument()
    expect(nomes()).toHaveLength(4)
  })

  it('mantém o aviso e permite tentar de novo quando a falha persiste', async () => {
    vi.mocked(listarLocais)
      .mockImplementationOnce(falha)
      .mockImplementationOnce(falha)
      .mockImplementationOnce(sucesso)
    const user = abrir()
    await screen.findByRole('alert')

    await user.click(botaoRetry())
    await vi.waitFor(() => expect(botaoRetry()).toBeEnabled())
    expect(screen.getByText(MENSAGEM_ERRO)).toBeInTheDocument()
    expect(botaoRetry()).toHaveTextContent('Tentar novamente')

    await user.click(botaoRetry())
    await screen.findByText('7 locais encontrados')
    expect(listarLocais).toHaveBeenCalledTimes(3)
  })

  it('preserva busca e filtros informados antes da nova tentativa', async () => {
    vi.mocked(listarLocais).mockImplementationOnce(falha).mockImplementationOnce(sucesso)
    const user = abrir()
    await screen.findByRole('alert')

    await user.type(screen.getByRole('textbox', { name: 'Buscar por local ou endereço' }), 'museu')
    await user.click(screen.getByRole('button', { name: 'Elevador' }))
    await user.click(botaoRetry())

    await screen.findByText('1 local encontrado')
    expect(screen.getByRole('textbox', { name: 'Buscar por local ou endereço' })).toHaveValue('museu')
    expect(nomes()).toEqual(['Museu de Arte de São Paulo'])
  })
})