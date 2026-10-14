import '@testing-library/jest-dom/vitest'
import { useState } from 'react'
import { afterEach, describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useModalFocus } from './useModalFocus'

afterEach(() => {
    cleanup()
})

function Harness() {
    const [open, setOpen] = useState(false)
    const ref = useModalFocus<HTMLDivElement>({
        isOpen: open,
        onClose: () => setOpen(false),
    })
    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>Abrir</button>
            {open && (
                <div ref={ref} role="dialog" aria-modal="true" tabIndex={-1}>
                    <button type="button">Primeiro</button>
                    <button type="button">Último</button>
                </div>
            )}
        </>
    )
}

describe('useModalFocus', () => {
    it('move o foco para dentro ao abrir', async () => {
        const user = userEvent.setup()
        render(<Harness />)
        await user.click(screen.getByText('Abrir'))
        expect(screen.getByText('Primeiro')).toHaveFocus()
    })

    it('mantém o foco preso com Tab e Shift+Tab', async () => {
        const user = userEvent.setup()
        render(<Harness />)
        await user.click(screen.getByText('Abrir'))
        await user.tab()
        expect(screen.getByText('Último')).toHaveFocus()
        await user.tab()
        expect(screen.getByText('Primeiro')).toHaveFocus()
        await user.tab({ shift: true })
        expect(screen.getByText('Último')).toHaveFocus()
    })

    it('fecha com Esc e devolve o foco ao gatilho', async () => {
        const user = userEvent.setup()
        render(<Harness />)
        const gatilho = screen.getByText('Abrir')
        await user.click(gatilho)
        await user.keyboard('{Escape}')
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        expect(gatilho).toHaveFocus()
    })
})