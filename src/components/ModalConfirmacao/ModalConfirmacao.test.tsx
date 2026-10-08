import '@testing-library/jest-dom/vitest'
import { useState } from 'react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalConfirmacao from './ModalConfirmacao'

afterEach(() => {
  cleanup()
})

function renderModal(props = {}) {
  const onClose = vi.fn()
  const onConfirm = vi.fn()
  const utils = render(
    <ModalConfirmacao isOpen={true} onClose={onClose} onConfirm={onConfirm} {...props} />
  )
  return { onClose, onConfirm, ...utils }
}

function ComGatilho() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir modal
      </button>
      <ModalConfirmacao isOpen={open} onClose={() => setOpen(false)} onConfirm={() => { }} />
    </>
  )
}

describe('ModalConfirmacao', () => {
  it('não renderiza nada quando isOpen é false', () => {
    const { container } = renderModal({ isOpen: false })
    expect(container).toBeEmptyDOMElement()
  })

  it('exibe título e mensagem padrão quando aberto', () => {
    renderModal()
    expect(screen.getByRole('heading', { name: 'Confirmar Envio' })).toBeInTheDocument()
    expect(
      screen.getByText('Tem certeza de que deseja enviar estas informações?')
    ).toBeInTheDocument()
  })

  it('exibe título e mensagem personalizados', () => {
    renderModal({ title: 'Excluir local', message: 'Essa ação não pode ser desfeita.' })
    expect(screen.getByRole('heading', { name: 'Excluir local' })).toBeInTheDocument()
    expect(screen.getByText('Essa ação não pode ser desfeita.')).toBeInTheDocument()
  })

  it('chama onConfirm ao clicar em Confirmar', async () => {
    const user = userEvent.setup()
    const { onConfirm, onClose } = renderModal()
    await user.click(screen.getByRole('button', { name: 'Confirmar' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('chama onClose ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    const { onConfirm, onClose } = renderModal()
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('chama onClose ao clicar no fundo escurecido', async () => {
    const user = userEvent.setup()
    const { onClose, container } = renderModal()
    await user.click(container.firstChild as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('não fecha ao clicar dentro do conteúdo do modal', async () => {
    const user = userEvent.setup()
    const { onClose } = renderModal()
    await user.click(screen.getByRole('heading', { name: 'Confirmar Envio' }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('permite navegar e acionar os botões pelo teclado', async () => {
    const user = userEvent.setup()
    const { onConfirm, onClose } = renderModal()

    // o foco já nasce em Cancelar, pois o modal move o foco ao abrir
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onClose).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Confirmar' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('os botões têm type="button" para não enviar formulários', () => {
    renderModal()
    expect(screen.getByRole('button', { name: 'Confirmar' })).toHaveAttribute('type', 'button')
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveAttribute('type', 'button')
  })

  it('aparece e some quando isOpen muda', () => {
    const { rerender } = renderModal({ isOpen: false })
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()

    rerender(<ModalConfirmacao isOpen={true} onClose={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.getByRole('heading', { name: 'Confirmar Envio' })).toBeInTheDocument()

    rerender(<ModalConfirmacao isOpen={false} onClose={vi.fn()} onConfirm={vi.fn()} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  // ---- gerenciamento de foco e acessibilidade (issue #77) ----

  it('expõe role="dialog" com aria-modal e nome acessível', () => {
    renderModal()
    const dialog = screen.getByRole('dialog', { name: 'Confirmar Envio' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('move o foco para dentro do modal ao abrir', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)
  })

  it('mantém o foco preso no modal com Tab e Shift+Tab', async () => {
    const user = userEvent.setup()
    renderModal()
    const cancelar = screen.getByRole('button', { name: 'Cancelar' })
    const confirmar = screen.getByRole('button', { name: 'Confirmar' })

    expect(cancelar).toHaveFocus()
    await user.tab({ shift: true })
    expect(confirmar).toHaveFocus()
    await user.tab()
    expect(cancelar).toHaveFocus()
  })

  it('chama onClose ao pressionar Esc', async () => {
    const user = userEvent.setup()
    const { onClose } = renderModal()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('devolve o foco ao botão que abriu o modal ao fechar', async () => {
    const user = userEvent.setup()
    render(<ComGatilho />)
    const gatilho = screen.getByRole('button', { name: 'Abrir modal' })

    await user.click(gatilho)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(gatilho).toHaveFocus()
  })
})