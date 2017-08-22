import React, { PropTypes } from 'react';
import ImmutablePropTypes from "react-immutable-proptypes";
import uuid from 'uuid';
import { truncateMiddle } from '../../lib/textHelper';
import AssetProxy from '../../valueObjects/AssetProxy';
import styles from './FileControl.css';

const MAX_DISPLAY_LENGTH = 50;

export default class MediaControl extends React.Component {
  constructor(props) {
    super(props);
    this.controlID = uuid.v4();
  }

  componentWillReceiveProps(nextProps) {
    const { mediaPaths, value } = nextProps;
    const mediaPath = mediaPaths.get(this.controlID);
    if (mediaPath && mediaPath !== value) {
      this.props.onChange(mediaPath);
    }
  }

  handleClick = (e) => {
    const { field, onOpenMediaLibrary } = this.props;
    return onOpenMediaLibrary(this.controlID);
  };

  renderImageName = () => {
    const { value } = this.props;
    return value ? truncateMiddle(value, MAX_DISPLAY_LENGTH) : null;
  };

  render() {
    const imageName = this.renderImageName();
    return (
      <div className={styles.imageUpload}>
        <span className={styles.message} onClick={this.handleClick}>
          {imageName ? imageName : 'Click here to select an image from the media library'}
        </span>
      </div>
    );
  }
}

MediaControl.propTypes = {
  field: PropTypes.object.isRequired,
  mediaPaths: ImmutablePropTypes.map.isRequired,
  onAddAsset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
  onOpenMediaLibrary: PropTypes.func.isRequired,
  value: PropTypes.node,
};
