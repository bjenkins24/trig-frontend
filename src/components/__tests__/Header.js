import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../test/utils';
import Header from '../Header';

const links = [
  { text: 'Dashboard', onClick: () => null },
  { text: 'Activity', onClick: () => null },
];

jest.mock('../../context/authContext', () => {
  return {
    useAuth: () => {
      return {
        logout: () => null,
      };
    },
  };
});
jest.spyOn(console, 'error').mockImplementation();

describe('<Header />', () => {
  it('renders and takes basic props', () => {
    render(<Header links={links} />);

    expect(screen.getByTitle('Trig')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toHaveTextContent(
      'Type anywhere to search'
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Account Settings')).not.toBeInTheDocument();

    user.click(screen.getByTitle('Profile'));

    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Dark will throw a console error let's make sure there's only one
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
