import '@testing-library/jest-dom/vitest'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampoBusca from './CampoBusca'

afterEach(() => {
  cleanup()
})

describe('CampoBusca', () => {
  it('exibe o campo vazio com a orientação de busca', () => {
    render(<CampoBusca value="" onChange={vi.fn()} />)

    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Buscar por local ou endereço...',
    )
  })

  it('exibe o valor inicial recebido do componente pai', () => {
    render(<CampoBusca value="Avenida Paulista" onChange={vi.fn()} />)

    expect(screen.getByRole('textbox')).toHaveValue('Avenida Paulista')
  })

  it('atualiza o texto quando o componente pai altera o valor', () => {
    const onChange = vi.fn()
    const { rerender } = render(<CampoBusca value="Museu" onChange={onChange} />)

    rerender(<CampoBusca value="Parque" onChange={onChange} />)

    expect(screen.getByRole('textbox')).toHaveValue('Parque')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('limpa o texto quando o componente pai redefine o valor', () => {
    const onChange = vi.fn()
    const { rerender } = render(<CampoBusca value="Museu" onChange={onChange} />)

    rerender(<CampoBusca value="" onChange={onChange} />)

    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('não solicita uma alteração ao renderizar o valor inicial', () => {
    const onChange = vi.fn()
    render(<CampoBusca value="Museu" onChange={onChange} />)

    expect(onChange).not.toHaveBeenCalled()
  })
})

function renderCampoControlado(initialValue = '') {
  const onChange = vi.fn()

  function CampoControlado() {
    const [value, setValue] = useState(initialValue)

    return (
      <CampoBusca
        value={value}
        onChange={(nextValue) => {
          onChange(nextValue)
          setValue(nextValue)
        }}
      />
    )
  }

  render(<CampoControlado />)

  return {
    user: userEvent.setup(),
    input: screen.getByRole('textbox', { name: 'Buscar por local ou endereço' }),
    onChange,
  }
}

describe('interações e acessibilidade do CampoBusca', () => {
  it('tem um nome acessível independente do placeholder e do valor', () => {
    render(<CampoBusca value="Museu" onChange={vi.fn()} />)

    expect(
      screen.getByRole('textbox', { name: 'Buscar por local ou endereço' }),
    ).toHaveAccessibleName('Buscar por local ou endereço')
  })

  it('comunica cada alteração e exibe o texto digitado', async () => {
    const { user, input, onChange } = renderCampoControlado()

    await user.type(input, 'MASP')

    expect(onChange.mock.calls).toEqual([['M'], ['MA'], ['MAS'], ['MASP']])
    expect(input).toHaveValue('MASP')
  })

  it('envia uma string vazia ao apagar toda a busca', async () => {
    const { user, input, onChange } = renderCampoControlado('Museu')

    await user.clear(input)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('')
    expect(input).toHaveValue('')
  })

  it('preserva acentos, símbolos e espaços no texto colado', async () => {
    const { user, input, onChange } = renderCampoControlado()

    await user.click(input)
    await user.paste('  Praça da Sé, nº 10 / São Paulo  ')

    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      '  Praça da Sé, nº 10 / São Paulo  ',
    )
    expect(input).toHaveValue('  Praça da Sé, nº 10 / São Paulo  ')
  })

  it('permite focar, digitar, apagar e sair do campo pelo teclado', async () => {
    const { user, input, onChange } = renderCampoControlado()

    await user.tab()
    expect(input).toHaveFocus()

    await user.keyboard('Parque')
    expect(input).toHaveValue('Parque')
    expect(onChange).toHaveBeenLastCalledWith('Parque')

    await user.keyboard('{Backspace}')
    expect(input).toHaveValue('Parqu')
    expect(onChange).toHaveBeenLastCalledWith('Parqu')

    await user.tab()
    expect(input).not.toHaveFocus()
  })

  it('aguarda a atualização do componente pai para exibir a alteração', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(<CampoBusca value="A" onChange={onChange} />)
    const input = screen.getByRole('textbox', { name: 'Buscar por local ou endereço' })

    await user.type(input, 'B')

    expect(onChange).toHaveBeenCalledExactlyOnceWith('AB')
    expect(input).toHaveValue('A')

    rerender(<CampoBusca value="AB" onChange={onChange} />)

    expect(input).toHaveValue('AB')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('histórico de buscas no CampoBusca', () => {
  function renderComHistorico(historico = ['Parque', 'Museu']) {
    const props = {
      onChange: vi.fn(),
      onPesquisar: vi.fn(),
      onRemoverHistorico: vi.fn(),
      onLimparHistorico: vi.fn(),
    }
    render(<CampoBusca value="" historico={historico} {...props} />)
    return { user: userEvent.setup(), input: screen.getByRole('textbox'), ...props }
  }

  it('só mostra as buscas recentes ao focar o campo, na ordem recebida', async () => {
    const { user, input } = renderComHistorico()
    expect(screen.queryByRole('region', { name: 'Buscas recentes' })).not.toBeInTheDocument()

    await user.click(input)

    const lista = screen.getByRole('region', { name: 'Buscas recentes' })
    expect(within(lista).getAllByRole('listitem').map(item => item.textContent)).toEqual(['Parque', 'Museu'])
    expect(input).toHaveAttribute('aria-expanded', 'true')
  })

  it('não mostra a lista quando o histórico está vazio', async () => {
    const { user, input } = renderComHistorico([])
    await user.click(input)
    expect(screen.queryByRole('region', { name: 'Buscas recentes' })).not.toBeInTheDocument()
  })

  it('confirma a busca com Enter', async () => {
    const onPesquisar = vi.fn()
    render(<CampoBusca value="Biblioteca" onChange={vi.fn()} onPesquisar={onPesquisar} />)
    await userEvent.setup().type(screen.getByRole('textbox'), '{Enter}')
    expect(onPesquisar).toHaveBeenCalledWith('Biblioteca')
  })

  it('clicar em um termo preenche o campo, dispara a busca e fecha a lista', async () => {
    const { user, input, onChange, onPesquisar } = renderComHistorico()
    await user.click(input)

    await user.click(screen.getByRole('button', { name: 'Buscar novamente por Museu' }))

    expect(onChange).toHaveBeenCalledWith('Museu')
    expect(onPesquisar).toHaveBeenCalledWith('Museu')
    expect(screen.queryByRole('region', { name: 'Buscas recentes' })).not.toBeInTheDocument()
  })

  it('remove um termo e limpa o histórico', async () => {
    const { user, input, onRemoverHistorico, onLimparHistorico } = renderComHistorico()
    await user.click(input)

    await user.click(screen.getByRole('button', { name: 'Remover Parque do histórico' }))
    expect(onRemoverHistorico).toHaveBeenCalledWith('Parque')
    expect(input).toHaveFocus()

    await user.click(screen.getByRole('button', { name: 'Limpar histórico' }))
    expect(onLimparHistorico).toHaveBeenCalledOnce()
  })

  it('fecha a lista com Escape', async () => {
    const { user, input } = renderComHistorico()
    await user.click(input)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('region', { name: 'Buscas recentes' })).not.toBeInTheDocument()
  })
})
