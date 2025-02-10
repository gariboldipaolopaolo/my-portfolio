import {describe, expect, it, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import MenuPortal from './MenuPortal'
import {MenuItem} from '@/utils/types'

vi.mock('@/components/MobileMenu/MenuButton/MenuButton', () => ({
    default: vi.fn(() => <div data-testid="menu-button">Menu Button</div>)
}))

vi.mock('@/components/Navbar/EmailButton/EmailButton', () => ({
    default: vi.fn(() => <div data-testid="email-button">Email Button</div>)
}))

vi.mock('@/components/Navbar/SwitchModeButton/SwitchModeButton', () => ({
    default: vi.fn(() => <div data-testid="switch-mode-button">Switch Mode Button</div>)
}))

vi.mock('./MenuPortal.module.css', () => ({
    default: {
        menuContainer: 'menuContainer',
        topBarContainer: 'topBarContainer',
        menuItemsContainer: 'menuItemsContainer',
        menuItem: 'menuItem',
        bottomBarContainer: 'bottomBarContainer'
    }
}))

describe('MenuPortal Component', () => {
    const mockMenuItems: MenuItem[] = [
        {href: 'about', title: 'About'},
        {href: 'experience', title: 'Experience'},
        {href: 'projects', title: 'Projects'}
    ]

    const mockProps = {
        menuItems: mockMenuItems,
        isMobileMenuOpen: true,
        handleToggleMobileMenu: vi.fn(),
        contentRef: {current: null}
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders all menu items correctly', () => {
        render(<MenuPortal {...mockProps} />)

        mockMenuItems.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument()
        })
    })

    it('applies correct CSS classes to menu items', () => {
        const {container} = render(<MenuPortal {...mockProps} />)

        const menuItems = container.getElementsByClassName('menuItem')
        expect(menuItems).toHaveLength(mockMenuItems.length)
    })

    it('renders all required child components', () => {
        render(<MenuPortal {...mockProps} />)

        expect(screen.getByTestId('menu-button')).toBeInTheDocument()
        expect(screen.getByTestId('email-button')).toBeInTheDocument()
        expect(screen.getByTestId('switch-mode-button')).toBeInTheDocument()
    })

    it('applies contentRef to the correct div', () => {
        const mockRef = {current: null}
        render(<MenuPortal {...mockProps} contentRef={mockRef}/>)

        const contentContainer = screen.getByText(mockMenuItems[0].title).parentElement?.parentElement
        expect(contentContainer).toBeInTheDocument()
    })

    it('handles empty menuItems array gracefully', () => {
        const propsWithEmptyMenu = {
            ...mockProps,
            menuItems: []
        }

        const {container} = render(<MenuPortal {...propsWithEmptyMenu} />)
        const menuItemsContainer = container.getElementsByClassName('menuItemsContainer')[0]
        expect(menuItemsContainer.children).toHaveLength(0)
    })

    it('renders with correct structure and containers', () => {
        const {container} = render(<MenuPortal {...mockProps} />)

        expect(container.getElementsByClassName('menuContainer')).toHaveLength(1)
        expect(container.getElementsByClassName('topBarContainer')).toHaveLength(1)
        expect(container.getElementsByClassName('menuItemsContainer')).toHaveLength(1)
        expect(container.getElementsByClassName('bottomBarContainer')).toHaveLength(1)
    })

    it('applies correct CSS classes to containers', () => {
        const {container} = render(<MenuPortal {...mockProps} />)

        expect(container.firstChild).toHaveClass('menuContainer')
        expect(container.getElementsByClassName('topBarContainer')[0]).toBeInTheDocument()
        expect(container.getElementsByClassName('menuItemsContainer')[0]).toBeInTheDocument()
        expect(container.getElementsByClassName('bottomBarContainer')[0]).toBeInTheDocument()
    })
})