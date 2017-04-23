import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import instances from '../instances.yml';

function Header(props) {
  const values = instances.map((url, index) => ({
    key: url,
    text: url,
    value: index,
  }));

  return (
    <header>
      <Dropdown
        placeholder="Select Mastodon instance"
        search selection
        options={values}
        onChange={(e, data) => props.onInstanceChange(data.value)}
        defaultValue={0}
      />
      <h1>Compare mastodon instances</h1>
    </header>
  );
}

Header.propTypes = {
  onInstanceChange: PropTypes.func.isRequired,
};

export default Header;
