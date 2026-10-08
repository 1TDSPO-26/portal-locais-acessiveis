import '@testing-library/jest-dom/vitest'
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

    await user.tab()
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
})