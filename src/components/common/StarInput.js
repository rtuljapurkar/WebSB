import React, {PropTypes} from 'react';
import ReactStars from 'react-stars';

const StarInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
          <ReactStars
                 name={name}
                 count={5}
                 className="form-control"
                 onChange={onChange}
                 size={24}
                 value={value}
                 color2={'#ffd700'} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

StarInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string
};

export default StarInput;
