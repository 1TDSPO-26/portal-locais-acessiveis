import '@testing-library/jest-dom/vitest'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
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
