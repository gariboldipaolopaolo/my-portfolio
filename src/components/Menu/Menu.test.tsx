import {describe, expect, it, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Menu from './Menu'
import {MenuItem} from '@/utils/types'

vi.mock('./Menu.module.css', () => ({
    default: {
        menuContainer: 'menuContainer'
    }
}))

describe('Menu Component', () => {
    const mockMenuItems: MenuItem[] = [
        {href: 'about', title: 'About'},
        {href: 'experience', title: 'Experience'},
        {href: 'technologies', title: 'Technologies'}
    ]

    it('renders all menu items correctly', () => {
        render(<Menu menuItems={mockMenuItems}/>)

        mockMenuItems.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument()
        })
    })

    it('renders nothing when menuItems is empty', () => {
        const {container} = render(<Menu menuItems={[]}/>)
        expect(container.querySelector('.menuContainer')?.children).toHaveLength(0)
    })

    it('applies correct CSS class', () => {
        const {container} = render(<Menu menuItems={mockMenuItems}/>)
        expect(container.firstChild).toHaveClass('menuContainer')
    })

    it('calls scrollIntoView when menu item is clicked', () => {
        const mockScrollIntoView = vi.fn()
        const mockGetElementById = vi.spyOn(document, 'getElementById')
        mockGetElementById.mockReturnValue({
            scrollIntoView: mockScrollIntoView
        } as unknown as HTMLElement)

        render(<Menu menuItems={mockMenuItems}/>)

        fireEvent.click(screen.getByText(mockMenuItems[0].title))

        expect(mockGetElementById).toHaveBeenCalledWith(mockMenuItems[0].href)

        expect(mockScrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start'
        })
    })

    it('handles missing section gracefully', () => {
        const mockGetElementById = vi.spyOn(document, 'getElementById')
        mockGetElementById.mockReturnValue(null)

        render(<Menu menuItems={mockMenuItems}/>)

        fireEvent.click(screen.getByText(mockMenuItems[0].title))

        expect(mockGetElementById).toHaveBeenCalledWith(mockMenuItems[0].href)
    })
})