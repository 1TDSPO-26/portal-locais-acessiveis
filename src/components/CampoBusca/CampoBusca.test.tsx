import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
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

