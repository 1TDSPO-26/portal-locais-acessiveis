import '@testing-library/jest-dom/vitest'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FiltrosCategoria from './FiltrosCategoria'

const todosOsIds = ['entrada', 'banheiro', 'vagas', 'circulacao', 'elevador']

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

  describe('Selecionar todos', () => {
    it('fica desmarcado quando nem todos os filtros estão selecionados', () => {
      renderFiltros(['entrada', 'banheiro'])
      expect(
        screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' })
      ).not.toBeChecked()
    })

    it('fica marcado quando todos os filtros estão selecionados', () => {
      renderFiltros(todosOsIds)
      expect(
        screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' })
      ).toBeChecked()
    })

    it('seleciona todos os filtros ao ser marcado', async () => {
      const user = userEvent.setup()
      const { onChange } = renderFiltros(['vagas'])
      await user.click(screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' }))
      expect(onChange).toHaveBeenCalledWith(todosOsIds)
    })

    it('limpa a seleção ao ser desmarcado com todos selecionados', async () => {
      const user = userEvent.setup()
      const { onChange } = renderFiltros(todosOsIds)
      await user.click(screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' }))
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('também funciona ao clicar no texto do rótulo', async () => {
      const user = userEvent.setup()
      const { onChange } = renderFiltros()
      await user.click(screen.getByText('Selecionar todos'))
      expect(onChange).toHaveBeenCalledWith(todosOsIds)
    })
  })

  describe('navegação por teclado', () => {
    it('segue a ordem de foco: selecionar todos, limpar e filtros', async () => {
      const user = userEvent.setup()
      renderFiltros(['entrada'])

      await user.tab()
      expect(screen.getByRole('checkbox', { name: 'Selecionar todos os filtros' })).toHaveFocus()
      await user.tab()
      expect(screen.getByRole('button', { name: 'Limpar filtros' })).toHaveFocus()

      for (const rotulo of rotulos) {
        await user.tab()
        expect(screen.getByRole('button', { name: rotulo })).toHaveFocus()
      }
    })

    it('pula "Limpar filtros" no Tab quando ele está desabilitado', async () => {
      const user = userEvent.setup()
      renderFiltros()

      await user.tab()
      await user.tab()
      expect(screen.getByRole('button', { name: 'Entrada com rampa' })).toHaveFocus()
    })

    it('alterna "Selecionar todos" com Enter e com Espaço', async () => {
      const user = userEvent.setup()
      const { onChange } = renderFiltros()

      await user.tab()
      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenLastCalledWith(todosOsIds)

      await user.keyboard(' ')
      expect(onChange).toHaveBeenLastCalledWith(todosOsIds)
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('aciona um filtro com Enter e com Espaço', async () => {
      const user = userEvent.setup()
      const { onChange } = renderFiltros()

      screen.getByRole('button', { name: 'Banheiro acessível' }).focus()
      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenLastCalledWith(['banheiro'])

      await user.keyboard(' ')
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('aciona "Limpar filtros" com Enter', async () => {
      const user = userEvent.setup()
      const { onClear } = renderFiltros(['elevador'])

      screen.getByRole('button', { name: 'Limpar filtros' }).focus()
      await user.keyboard('{Enter}')
      expect(onClear).toHaveBeenCalledTimes(1)
    })
  })
})
