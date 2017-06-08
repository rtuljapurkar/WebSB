import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="blackBg">
        <h1>About</h1>
        <p >
           <span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span>
           <span style={{"color":"yellow"}}>Bee</span></p>
      </div>
    );
  }
}

export default AboutPage;
