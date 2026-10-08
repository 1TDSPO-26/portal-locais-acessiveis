import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Cadastro from './index'
import userEvent from '@testing-library/user-event'

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

async function preencherCadastro(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole('textbox', { name: 'Nome do local' }), 'Biblioteca do bairro')
  await user.selectOptions(screen.getByRole('combobox', { name: 'Tipo de local' }), 'outro')
  await user.type(screen.getByRole('textbox', { name: 'Endereço' }), 'Rua das Flores, 10, São Paulo, SP')
  await user.click(screen.getByRole('checkbox', { name: 'Banheiro acessível' }))
  await user.click(screen.getByRole('checkbox', { name: 'Entrada com rampa ou acesso em nível' }))
  await user.type(screen.getByRole('textbox', { name: 'Observações' }), 'Entrada pela rua lateral')
}

function verificarDadosPreenchidos() {
  expect(screen.getByRole('textbox', { name: 'Nome do local' })).toHaveValue('Biblioteca do bairro')
  expect(screen.getByRole('combobox', { name: 'Tipo de local' })).toHaveValue('outro')
  expect(screen.getByRole('textbox', { name: 'Endereço' })).toHaveValue('Rua das Flores, 10, São Paulo, SP')
  expect(screen.getByRole('textbox', { name: 'Observações' })).toHaveValue('Entrada pela rua lateral')
  expect(screen.getByRole('checkbox', { name: 'Banheiro acessível' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Entrada com rampa ou acesso em nível' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Vaga reservada' })).not.toBeChecked()
}

describe('Cadastro: cancelar e confirmar', () => {
  it('CAD-T05: Cancelar fecha o modal e mantém os dados preenchidos', async () => {
    const user = userEvent.setup()
    const envio = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<Cadastro />)
    expect(screen.queryByRole('button', { name: 'Confirmar' })).not.toBeInTheDocument()
    await preencherCadastro(user)
    await user.click(screen.getByRole('button', { name: 'Enviar informações' }))
    expect(screen.getByRole('heading', { name: 'Confirmar envio das informações?' })).toBeInTheDocument()
    expect(screen.getByText('Revise os dados antes de continuar. Após a confirmação, as informações do local serão enviadas.')).toBeInTheDocument()
    expect(envio).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(screen.queryByRole('button', { name: 'Confirmar' })).not.toBeInTheDocument()
    verificarDadosPreenchidos()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(envio).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Enviar informações' }))
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument()
  })

  it('CAD-T06: Confirmar limpa o formulário e mostra a mensagem de sucesso', async () => {
    const user = userEvent.setup()
    const envio = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<Cadastro />)
    await preencherCadastro(user)
    await user.click(screen.getByRole('button', { name: 'Enviar informações' }))
    await user.click(screen.getByRole('button', { name: 'Confirmar' }))
    expect(envio).toHaveBeenCalledTimes(1)
    expect(envio).toHaveBeenCalledWith('Dados enviados:', {
      nome: 'Biblioteca do bairro', tipo: 'outro',
      endereco: 'Rua das Flores, 10, São Paulo, SP',
      recursos: ['banheiro', 'rampa'], observacoes: 'Entrada pela rua lateral',
    })
    expect(screen.queryByRole('button', { name: 'Confirmar' })).not.toBeInTheDocument()
    for (const campo of screen.getAllByRole('textbox')) expect(campo).toHaveValue('')
    expect(screen.getByRole('combobox', { name: 'Tipo de local' })).toHaveValue('')
    for (const recurso of screen.getAllByRole('checkbox')) expect(recurso).not.toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('Informações enviadas com sucesso!')
    await user.click(screen.getByRole('button', { name: 'Fechar mensagem' }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
