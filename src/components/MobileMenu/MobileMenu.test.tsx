import {describe, expect, it, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import MobileMenu from './MobileMenu'
import {MenuItem} from '@/utils/types'

vi.mock('@/components/MobileMenu/MenuButton/MenuButton', () => ({
    default: vi.fn(({handleToggleMobileMenu, isMobileMenuOpen}) => (
        <button
            onClick={handleToggleMobileMenu}
            data-testid="menu-button"
            data-is-open={isMobileMenuOpen}
        >
            Menu Button
        </button>
    ))
}))

vi.mock('@/components/MobileMenu/MenuPortal/MenuPortal', () => ({
    default: vi.fn(({menuItems, handleToggleMobileMenu, isMobileMenuOpen}) => (
        <div
            data-testid="menu-portal"
            data-is-open={isMobileMenuOpen}
        >
            Menu Portal
        </div>
    ))
}))

describe('MobileMenu Component', () => {
    const mockMenuItems: MenuItem[] = [
        {href: 'about', title: 'About'},
        {href: 'experience', title: 'Experience'}
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('does not render MenuPortal initially', () => {
        render(<MobileMenu menuItems={mockMenuItems}/>)

        expect(screen.queryByTestId('menu-portal')).not.toBeInTheDocument()
    })

    it('toggles MenuPortal visibility when MenuButton is clicked', () => {
        render(<MobileMenu menuItems={mockMenuItems}/>)

        expect(screen.queryByTestId('menu-portal')).not.toBeInTheDocument()

        // open
        fireEvent.click(screen.getByTestId('menu-button'))
        expect(screen.getByTestId('menu-portal')).toBeInTheDocument()
        expect(screen.getByTestId('menu-portal')).toHaveAttribute('data-is-open', 'true')

        // close
        fireEvent.click(screen.getByTestId('menu-button'))
        expect(screen.queryByTestId('menu-portal')).not.toBeInTheDocument()
    })

    it('manages state correctly through multiple toggles', () => {
        render(<MobileMenu menuItems={mockMenuItems}/>)
        const button = screen.getByTestId('menu-button')

        // open
        fireEvent.click(button)
        expect(screen.getByTestId('menu-portal')).toBeInTheDocument()
        expect(button).toHaveAttribute('data-is-open', 'true')

        // close
        fireEvent.click(button)
        expect(screen.queryByTestId('menu-portal')).not.toBeInTheDocument()
        expect(button).toHaveAttribute('data-is-open', 'false')

        // reopen
        fireEvent.click(button)
        expect(screen.getByTestId('menu-portal')).toBeInTheDocument()
        expect(button).toHaveAttribute('data-is-open', 'true')
    })
})