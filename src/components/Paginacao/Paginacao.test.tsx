import '@testing-library/jest-dom/vitest'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Paginacao from './Paginacao'

afterEach(() => {
  cleanup()
})

function renderPaginacao(props: { paginaAtual?: number; totalPaginas?: number } = {}) {
  const onChange = vi.fn()
  const utils = render(
    <Paginacao paginaAtual={1} totalPaginas={10} onChange={onChange} {...props} />
  )
  return { onChange, ...utils }
}

// só o que aparece na barra: os números e as reticências, na ordem
function paginasVisiveis() {
  return screen.getAllByText(/^(\d+|\.\.\.)$/).map((el) => el.textContent)
}

describe('Paginacao - renderização', () => {
  it('renderiza a navegação com o rótulo da lista de locais', () => {
    renderPaginacao()
    expect(
      screen.getByRole('navigation', { name: 'Paginação da lista de locais' })
    ).toBeInTheDocument()
  })

  it('informa a página atual e o total para leitores de tela', () => {
    renderPaginacao({ paginaAtual: 3, totalPaginas: 10 })
    const aviso = screen.getByText('Página 3 de 10')
    expect(aviso).toHaveClass('sr-only')
    expect(aviso).toHaveAttribute('aria-live', 'polite')
  })

  it('renderiza as setas de anterior e próxima com rótulo acessível', () => {
    renderPaginacao({ paginaAtual: 2, totalPaginas: 5 })
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ir para a próxima página' })).toBeInTheDocument()
  })

  it('marca só a página atual com aria-current', () => {
    const { container } = renderPaginacao({ paginaAtual: 2, totalPaginas: 4 })
    expect(container.querySelectorAll('[aria-current]')).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Ir para a página 2' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('button', { name: 'Ir para a página 3' })).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('mostra todas as páginas quando o total é 5 ou menos', () => {
    renderPaginacao({ paginaAtual: 3, totalPaginas: 5 })
    expect(paginasVisiveis()).toEqual(['1', '2', '3', '4', '5'])
  })

  it.each([
    { paginaAtual: 1, esperado: ['1', '2', '3', '...', '10'] },
    { paginaAtual: 3, esperado: ['1', '2', '3', '4', '5', '...', '10'] },
    { paginaAtual: 5, esperado: ['1', '...', '3', '4', '5', '6', '7', '...', '10'] },
    { paginaAtual: 8, esperado: ['1', '...', '6', '7', '8', '9', '10'] },
    { paginaAtual: 10, esperado: ['1', '...', '8', '9', '10'] },
  ])('na página $paginaAtual de 10 mostra $esperado', ({ paginaAtual, esperado }) => {
    renderPaginacao({ paginaAtual, totalPaginas: 10 })
    expect(paginasVisiveis()).toEqual(esperado)
  })

  it('não mostra reticências quando não falta nenhuma página no meio', () => {
    renderPaginacao({ paginaAtual: 4, totalPaginas: 7 })
    expect(paginasVisiveis()).toEqual(['1', '2', '3', '4', '5', '6', '7'])
    expect(screen.queryByText('...')).not.toBeInTheDocument()
  })

  it('as reticências ficam escondidas de leitores de tela e não são botões', () => {
    renderPaginacao({ paginaAtual: 6, totalPaginas: 12 })
    const reticencias = screen.getAllByText('...')
    expect(reticencias).toHaveLength(2)
    reticencias.forEach((el) => expect(el).toHaveAttribute('aria-hidden', 'true'))

    const textos = screen.getAllByRole('button').map((botao) => botao.textContent)
    expect(textos).not.toContain('...')
  })

  it('os botões têm type="button" para não enviar formulários', () => {
    renderPaginacao({ paginaAtual: 5, totalPaginas: 10 })
    screen.getAllByRole('button').forEach((botao) => {
      expect(botao).toHaveAttribute('type', 'button')
    })
  })
})

describe('Paginacao - interações', () => {
  it('chama onChange com o número da página clicada', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })
    await user.click(screen.getByRole('button', { name: 'Ir para a página 4' }))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('avança e volta uma página pelas setas', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPaginacao({ paginaAtual: 3, totalPaginas: 8 })

    await user.click(screen.getByRole('button', { name: 'Ir para a próxima página' }))
    expect(onChange).toHaveBeenLastCalledWith(4)

    await user.click(screen.getByRole('button', { name: 'Ir para a página anterior' }))
    expect(onChange).toHaveBeenLastCalledWith(2)
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('desabilita a seta anterior na primeira página', () => {
    renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Ir para a próxima página' })).toBeEnabled()
  })

  it('desabilita a seta próxima na última página', () => {
    renderPaginacao({ paginaAtual: 5, totalPaginas: 5 })
    expect(screen.getByRole('button', { name: 'Ir para a próxima página' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeEnabled()
  })

  it('não chama onChange ao clicar numa seta desabilitada', async () => {
    const user = userEvent.setup()
    const { onChange, rerender } = renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })
    await user.click(screen.getByRole('button', { name: 'Ir para a página anterior' }))

    rerender(<Paginacao paginaAtual={5} totalPaginas={5} onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Ir para a próxima página' }))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('com uma única página mostra só ela e desabilita as duas setas', () => {
    renderPaginacao({ paginaAtual: 1, totalPaginas: 1 })
    expect(paginasVisiveis()).toEqual(['1'])
    expect(screen.getByRole('button', { name: 'Ir para a página anterior' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Ir para a próxima página' })).toBeDisabled()
  })

  it('só troca a página atual quando as props mudam', async () => {
    const user = userEvent.setup()
    const { onChange, rerender } = renderPaginacao({ paginaAtual: 1, totalPaginas: 10 })

    await user.click(screen.getByRole('button', { name: 'Ir para a página 2' }))
    expect(onChange).toHaveBeenCalledWith(2)
    expect(screen.getByRole('button', { name: 'Ir para a página 1' })).toHaveAttribute(
      'aria-current',
      'page'
    )

    rerender(<Paginacao paginaAtual={2} totalPaginas={10} onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Ir para a página 2' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('button', { name: 'Ir para a página 1' })).not.toHaveAttribute(
      'aria-current'
    )
    expect(screen.getByText('Página 2 de 10')).toBeInTheDocument()
  })

  it('recalcula as páginas visíveis quando a página atual avança', () => {
    const { rerender, onChange } = renderPaginacao({ paginaAtual: 1, totalPaginas: 10 })
    expect(paginasVisiveis()).toEqual(['1', '2', '3', '...', '10'])

    rerender(<Paginacao paginaAtual={8} totalPaginas={10} onChange={onChange} />)
    expect(paginasVisiveis()).toEqual(['1', '...', '6', '7', '8', '9', '10'])
  })

  it('a seta anterior desabilitada fica fora da ordem do Tab', async () => {
    const user = userEvent.setup()
    renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })
    await user.tab()
    expect(screen.getByRole('button', { name: 'Ir para a página 1' })).toHaveFocus()
  })

  it('percorre setas e páginas com Tab, pulando as reticências', async () => {
    const user = userEvent.setup()
    renderPaginacao({ paginaAtual: 5, totalPaginas: 10 })

    const ordem = [
      'Ir para a página anterior',
      'Ir para a página 1',
      'Ir para a página 3',
      'Ir para a página 4',
      'Ir para a página 5',
      'Ir para a página 6',
      'Ir para a página 7',
      'Ir para a página 10',
      'Ir para a próxima página',
    ]

    for (const nome of ordem) {
      await user.tab()
      expect(screen.getByRole('button', { name: nome })).toHaveFocus()
    }
  })

  it('aciona a página em foco com Enter', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })

    await user.tab()
    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Ir para a página 3' })).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('aciona a página em foco com a barra de espaço', async () => {
    const user = userEvent.setup()
    const { onChange } = renderPaginacao({ paginaAtual: 1, totalPaginas: 5 })

    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Ir para a página 2' })).toHaveFocus()

    await user.keyboard(' ')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
