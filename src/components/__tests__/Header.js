import React from 'react';
import user from '@testing-library/user-event';
import { render } from 'test/utils';
import Header from '../Header';

const links = [
  { text: 'Dashboard', location: '/' },
  { text: 'Activity', location: '/activity' },
];

const activityContent = 'Activity Content';

describe('<Header />', () => {
  it('renders and takes basic props', () => {
    render(
      <Router>
        <Header links={links} />
        <Switch>
          <Route path="/">
            <p>Dashboard Content</p>
          </Route>
          <Route path="/activity">
            <p>{activityContent}</p>
          </Route>
        </Switch>
      </Router>
    );

    expect(screen.queryByText(activityContent)).not.toBeInTheDocument();
    expect(screen.getByTitle('Trig')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTitle('Notifications')).toBeInTheDocument();
    expect(screen.queryByText('Account Settings')).not.toBeInTheDocument();

    user.click(getByTitle('Account Settings'));

    expect(screen.getByText('Account Settings')).toBeInTheDocument();

    user.click(screen.getByText(links[1].text));

    expect(screen.getByText(activityContent)).toBeInTheDocument();
  });
});
