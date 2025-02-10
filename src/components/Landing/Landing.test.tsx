import {describe, expect, it, vi} from 'vitest'
import Landing from './Landing'
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/vitest'

vi.mock('./Landing.module.css', () => ({
    default: {
        landingContainer: 'landingContainer',
        titleContainer: 'titleContainer',
        surnameContainer: 'surnameContainer',
        subtitleContainer: 'subtitleContainer'
    }
}))

describe('Landing Component', () => {
    it('renders correctly', () => {
        render(<Landing/>)

        expect(screen.getByText('PAOLO')).toBeInTheDocument()
        expect(screen.getByText('GARIBOLDI')).toBeInTheDocument()
        expect(screen.getByText('"I\'ll make things work."')).toBeInTheDocument()
        expect(
            screen.getByText('A results-driven software engineer with 5+ years of experience developing scalable solutions')
        ).toBeInTheDocument()
    })

    it('applies correct CSS classes', () => {
        const {container} = render(<Landing/>)

        expect(container.querySelector('.landingContainer')).toBeInTheDocument()
        expect(container.querySelector('.titleContainer')).toBeInTheDocument()
        expect(container.querySelector('.surnameContainer')).toBeInTheDocument()
        expect(container.querySelector('.subtitleContainer')).toBeInTheDocument()
    })

    it('maintains correct heading hierarchy', () => {
        render(<Landing/>)

        const h1Elements = screen.getAllByRole('heading', {level: 1})
        const h2Elements = screen.getAllByRole('heading', {level: 2})
        const h3Elements = screen.getAllByRole('heading', {level: 3})

        expect(h1Elements).toHaveLength(2)
        expect(h2Elements).toHaveLength(1)
        expect(h3Elements).toHaveLength(1)
    })
})