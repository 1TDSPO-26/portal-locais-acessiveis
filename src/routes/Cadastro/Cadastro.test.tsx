import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Cadastro from './index'

afterEach(() => {
  cleanup()
})

describe('Cadastro - renderização inicial', () => {
  it('exibe o título e o botão de envio', () => {
    render(<Cadastro />)

    expect(
      screen.getByRole('heading', {
        name: 'Adicionar informações de um local',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Enviar informações',
      }),
    ).toBeInTheDocument()
  })

  it('exibe os campos necessários do formulário', () => {
    render(<Cadastro />)

    expect(screen.getByLabelText('Nome do local')).toBeInTheDocument()
    expect(screen.getByLabelText('Tipo de local')).toBeInTheDocument()
    expect(screen.getByLabelText('Endereço')).toBeInTheDocument()
    expect(screen.getByLabelText('Observações')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(5)
  })

  it('inicia sem o modal e sem a mensagem de sucesso', () => {
    render(<Cadastro />)

    expect(
      screen.queryByText('Confirmar envio das informações?'),
    ).not.toBeInTheDocument()

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})