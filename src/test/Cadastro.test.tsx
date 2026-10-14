import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cadastro from '../routes/Cadastro/index'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
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

describe('Cadastro - acessibilidade', () => {
  it('oferece nomes acessíveis para os controles do formulário', () => {
    render(<Cadastro />)

    expect(
      screen.getByRole('textbox', { name: 'Nome do local' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', { name: 'Tipo de local' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', { name: 'Endereço' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('group', { name: 'Recursos de acessibilidade' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('checkbox', {
        name: 'Entrada com rampa ou acesso em nível',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', { name: 'Observações' }),
    ).toBeInTheDocument()
  })

  it('permite navegar pelos primeiros campos usando Tab', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)

    const nome = screen.getByRole('textbox', { name: 'Nome do local' })
    const tipo = screen.getByRole('combobox', { name: 'Tipo de local' })
    const endereco = screen.getByRole('textbox', { name: 'Endereço' })

    await user.tab()
    expect(nome).toHaveFocus()

    await user.tab()
    expect(tipo).toHaveFocus()

    await user.tab()
    expect(endereco).toHaveFocus()
  })
})
