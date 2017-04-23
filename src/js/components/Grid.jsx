import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import TootCard from './TootCard';

class Grid extends Component {
  layout() {
    this.masonry.imagesLoaded();
  }

  render() {
    const masonryOptions = {
      itemSelector: `.ui.cards`,
      isFitWidth: true,
    };

    return (
      <Masonry
        ref={(masonry) => { this.masonry = this.masonry || masonry; }}
        options={masonryOptions}
      >
        {this.props.cards.map(data => <TootCard {...data} />)}
      </Masonry>
    );
  }
}

Grid.defaultProps = {
  cards: [],
};

Grid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(TootCard.propTypes)),
};

export default Grid;
