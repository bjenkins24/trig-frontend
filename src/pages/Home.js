import React from 'react';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import Cards from '../components/Cards';

const HomeProps = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const Home = ({ setIsCreateLinkOpen }) => {
  return (
    <div>
      <Head title="Dashboard" />
      <Cards setIsCreateLinkOpen={setIsCreateLinkOpen} />
    </div>
  );
};

Home.propTypes = HomeProps;

export default Home;
