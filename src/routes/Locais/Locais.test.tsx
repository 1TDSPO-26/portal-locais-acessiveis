import '@testing-library/jest-dom/vitest'
import { afterEach, describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import Locais from './index'

afterEach(() => {
  cleanup()
})

function renderLocais(initialEntry = '/locais') {
  const router = createMemoryRouter(
    [{ path: '/locais', element: <Locais /> }],
    { initialEntries: [initialEntry] }
  )
  const utils = render(<RouterProvider router={router} />)
  return { router, ...utils }
}

describe('Locais - sincronização de filtros com a URL', () => {
  it('lê busca e filtros iniciais a partir dos parâmetros da URL', () => {
    renderLocais('/locais?busca=Ibirapuera&filtros=entrada')

    const campoBusca = screen.getByPlaceholderText(
      'Buscar por local ou endereço...'
    ) as HTMLInputElement

    expect(campoBusca.value).toBe('Ibirapuera')
    expect(screen.getByText('Parque Ibirapuera')).toBeInTheDocument()
  })

  it('atualiza a URL ao digitar no campo de busca', async () => {
    const user = userEvent.setup()
    const { router } = renderLocais('/locais')

    const campoBusca = screen.getByPlaceholderText(
      'Buscar por local ou endereço...'
    )
    await user.type(campoBusca, 'Museu')

    expect(router.state.location.search).toContain('busca=Museu')
  })

  it('atualiza a URL ao selecionar um filtro de categoria', async () => {
    const user = userEvent.setup()
    const { router } = renderLocais('/locais')

    await user.click(screen.getByRole('button', { name: 'Entrada com rampa' }))

    expect(router.state.location.search).toContain('filtros=entrada')
  })

  it('reseta a página para 1 na URL ao alterar os filtros', async () => {
    const user = userEvent.setup()
    const { router } = renderLocais('/locais?pagina=2')

    expect(router.state.location.search).toContain('pagina=2')

    await user.click(screen.getByRole('button', { name: 'Entrada com rampa' }))

    expect(router.state.location.search).not.toContain('pagina=')
  })

  it('remove o parâmetro de página da URL ao voltar para a primeira página', async () => {
    const user = userEvent.setup()
    const { router } = renderLocais('/locais?pagina=2')

    await user.click(screen.getByRole('button', { name: '1' }))

    expect(router.state.location.search).not.toContain('pagina=')
  })
})
