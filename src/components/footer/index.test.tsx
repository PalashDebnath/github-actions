import { render, screen } from '@testing-library/react';

import FooterComponent from './index';

describe('Footer component', () => {
    test('1. Should render "Privacy" text', () => {
        render(<FooterComponent />);
        const text = screen.getByText(/Privacy/);
        expect(text).toBeDefined();
    });
});