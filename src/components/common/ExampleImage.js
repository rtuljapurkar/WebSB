import {PropTypes} from 'prop-types';

let React = require('react');

let PendingPool = {};
let ReadyPool = {};

class ExampleImage extends React.Component{
  getInitialState() {
    return {
      ready: false
    };
  }

  componentWillMount() {
    this._load(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({src: null});
      this._load(nextProps.src);
    }
  }

  _load(/*string*/ src) {
    if (ReadyPool[src]) {
      this.setState({src: src});
      return;
    }

    if (PendingPool[src]) {
      PendingPool[src].push(this._onLoad);
      return;
    }

    PendingPool[src] = [this._onLoad];

    let img = new Image();
    img.onload = () => {
      PendingPool[src].forEach(/*function*/ callback => {
        callback(src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };
    img.src = src;
  }

  _onLoad(/*string*/ src) {
            ReadyPool[src] = true;
            if (this.isMounted() && src === this.props.src) {
              this.setState({
                src: src
              });
          }
    }

  render() {
    let style = this.state.src ?
      { backgroundImage : 'url(' + this.state.src + ')'} :
      undefined;

    return <div className="exampleImage" style={style} />;
  }

}

ExampleImage.propTypes = {
  src: PropTypes.string.isRequired
};

export default ExampleImage;
