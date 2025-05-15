import { render, screen } from '@testing-library/react';
import GreetingCard from './GreetingCard';

describe('GreetingCard', () => {
  it('renders name correctly', () => {
    render(<GreetingCard name="Bartek" />);
    expect(screen.getByText(/Cześć, Bartek!/i)).toBeInTheDocument();
  });

  it('renders age if provided', () => {
    render(<GreetingCard name="Anna" age={22} />);
    expect(screen.getByText(/Masz 22 lat/i)).toBeInTheDocument();
  });

  it('renders birthday message if isBirthday is true', () => {
    render(<GreetingCard name="Kasia" isBirthday />);
    expect(
      screen.getByText(/Wszystkiego najlepszego z okazji urodzin!/i)
    ).toBeInTheDocument();
  });

  it('does not render age or birthday if not provided', () => {
    render(<GreetingCard name="Zosia" />);
    expect(screen.queryByText(/Masz/i)).toBeNull();
    expect(screen.queryByText(/urodzin/i)).toBeNull();
  });
});
