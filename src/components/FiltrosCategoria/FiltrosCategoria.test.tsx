import '@testing-library/jest-dom/vitest'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FiltrosCategoria from './FiltrosCategoria'

const rotulos = [
  'Entrada com rampa',
  'Banheiro acessível',
  'Vagas reservadas',
  'Circulação',
  'Elevador',
]

afterEach(() => {
  cleanup()
})

function renderFiltros(selecionados: string[] = []) {
  const onChange = vi.fn()
  const onClear = vi.fn()
  const utils = render(
    <FiltrosCategoria selecionados={selecionados} onChange={onChange} onClear={onClear} />
  )
  return { onChange, onClear, ...utils }
}

describe('FiltrosCategoria', () => {
  it('renderiza todos os filtros de acessibilidade', () => {
    renderFiltros()
    rotulos.forEach((rotulo) => {
      expect(screen.getByRole('button', { name: rotulo })).toBeInTheDocument()
    })
  })

  it('adiciona o filtro ao clicar em um filtro não selecionado', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFiltros(['entrada'])
    await user.click(screen.getByRole('button', { name: 'Elevador' }))
    expect(onChange).toHaveBeenCalledWith(['entrada', 'elevador'])
  })

  it('remove o filtro ao clicar em um filtro já selecionado', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFiltros(['entrada', 'banheiro'])
    await user.click(screen.getByRole('button', { name: 'Entrada com rampa' }))
    expect(onChange).toHaveBeenCalledWith(['banheiro'])
  })

  it('destaca visualmente apenas os filtros selecionados', () => {
    renderFiltros(['vagas'])
    expect(screen.getByRole('button', { name: 'Vagas reservadas' })).toHaveClass('bg-blue-600')
    expect(screen.getByRole('button', { name: 'Elevador' })).not.toHaveClass('bg-blue-600')
  })

  it('desabilita "Limpar filtros" quando nenhum filtro está selecionado', () => {
    renderFiltros()
    expect(screen.getByRole('button', { name: 'Limpar filtros' })).toBeDisabled()
  })

  it('chama onClear ao clicar em "Limpar filtros" com filtros selecionados', async () => {
    const user = userEvent.setup()
    const { onClear, onChange } = renderFiltros(['circulacao'])
    const limpar = screen.getByRole('button', { name: 'Limpar filtros' })
    expect(limpar).toBeEnabled()
    await user.click(limpar)
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('todos os botões têm type="button" para não enviar formulários', () => {
    renderFiltros()
    screen.getAllByRole('button').forEach((botao) => {
      expect(botao).toHaveAttribute('type', 'button')
    })
  })
})
