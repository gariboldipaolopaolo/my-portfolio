import {beforeEach, describe, expect, it, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import MenuButton from './MenuButton'
import gsap from 'gsap'

vi.mock('gsap', () => ({
    default: {
        fromTo: vi.fn()
    }
}))

vi.mock('./MenuButton.module.css', () => ({
    default: {
        button: 'button'
    }
}))

describe('MenuButton Component', () => {
    const mockProps = {
        isMobileMenuOpen: false,
        handleToggleMobileMenu: vi.fn()
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with initial "MENU" text when closed', () => {
        render(<MenuButton {...mockProps} />)
        expect(screen.getByText('MENU')).toBeInTheDocument()
    })

    it('renders with "CLOSE" text when open', () => {
        render(<MenuButton {...mockProps} isMobileMenuOpen={true}/>)
        expect(screen.getByText('CLOSE')).toBeInTheDocument()
    })

    it('calls handleToggleMobileMenu when clicked', () => {
        render(<MenuButton {...mockProps} />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockProps.handleToggleMobileMenu).toHaveBeenCalledTimes(1)
    })

    it('calls handleToggleMobileMenu on Enter key press', () => {
        render(<MenuButton {...mockProps} />)
        fireEvent.keyDown(screen.getByRole('button'), {key: 'Enter'})
        expect(mockProps.handleToggleMobileMenu).toHaveBeenCalledTimes(1)
    })

    it('calls handleToggleMobileMenu on Space key press', () => {
        render(<MenuButton {...mockProps} />)
        fireEvent.keyDown(screen.getByRole('button'), {key: ' '})
        expect(mockProps.handleToggleMobileMenu).toHaveBeenCalledTimes(1)
    })

    it('does not call handleToggleMobileMenu on other key presses', () => {
        render(<MenuButton {...mockProps} />)
        fireEvent.keyDown(screen.getByRole('button'), {key: 'A'})
        expect(mockProps.handleToggleMobileMenu).not.toHaveBeenCalled()
    })

    it('has correct accessibility attributes', () => {
        render(<MenuButton {...mockProps} />)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('tabIndex', '0')
        expect(button).toHaveAttribute('role', 'button')
    })

    it('applies GSAP animation with correct parameters on mount', () => {
        render(<MenuButton {...mockProps} />)

        expect(gsap.fromTo).toHaveBeenCalledWith(
            expect.any(Object),
            {
                opacity: 0,
                y: -20,
                rotateX: 90
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out'
            }
        )
    })

    it('applies GSAP animation when isMobileMenuOpen changes', () => {
        const {rerender} = render(<MenuButton {...mockProps} />)

        // Reset il contatore delle chiamate dopo il mount
        vi.clearAllMocks()

        // Cambia lo stato del menu
        rerender(<MenuButton {...mockProps} isMobileMenuOpen={true}/>)

        expect(gsap.fromTo).toHaveBeenCalledTimes(1)
        expect(gsap.fromTo).toHaveBeenCalledWith(
            expect.any(Object),
            {
                opacity: 0,
                y: -20,
                rotateX: 90
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out'
            }
        )
    })

    it('applies correct CSS class', () => {
        const {container} = render(<MenuButton {...mockProps} />)
        expect(container.firstChild).toHaveClass('button')
    })

    it('sets up text ref correctly', () => {
        render(<MenuButton {...mockProps} />)
        const textElement = screen.getByText('MENU')
        expect(textElement.tagName.toLowerCase()).toBe('span')
    })
})