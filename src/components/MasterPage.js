import React from 'react';
import { Link } from 'react-router';
import FavoritesPage from './Favorites/FavoritesPage';
import ScoresPage from './Scores/ScoresPage';
import Header from './common/Header';

class MasterPage extends React.Component {
  render() {
    return (
      // <div className='MasterPage'>
      //   <Header />
      //   { this.props.children }
      // </div>
 <div>
        <div>
          <Header/>
      </div>
       <div>
          <section id="body" >
              <section className="col-md-2" >
                  <ScoresPage/>
                  <div style={{"marginTop":"35px"}}>
                      <img src= {require('../images/AdSample.png')}
                      className="img-thumbnail" width="250" alt="Ad"/>
                  </div>
              {/* <h2>Sidebar</h2>
              <p>It increases the chances of conception. Would it be possible for me to get my twenty grand in cash? I gotta check this with my accountant of course. JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! Forget it, Donny. You're out of your element. I have no choice but to tell these bums that they should do whatever is necessary to recover their money from you, Jeffrey Lebowski.</p>
             <p>I got a nice quiet beach community here, and I aim to keep it nice and quiet. I like your style, Dude. Nice marmot. Sir, this is a mortuary, not a rental house. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.</p> */}
              </section>
                <section className="col-md-7" >
                    {this.props.children}
                </section>
                <section id="sidebar" className="col-md-3">
                    <FavoritesPage/>
                    {/* <h2>Sidebar</h2>
                      <p>It increases the chances of conception. Would it be possible for me to get my twenty grand in cash? I gotta check this with my accountant of course. JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! Forget it, Donny. You're out of your element. I have no choice but to tell these bums that they should do whatever is necessary to recover their money from you, Jeffrey Lebowski.</p> */}
                     <div style={{"marginTop":"35px"}}>
                          <img src= {require('../images/AdSample.png')}
                          className="img-thumbnail" width="250" alt="Ad"/>
                    </div>
                     {/* <p>I got a nice quiet beach community here, and I aim to keep it nice and quiet. I like your style, Dude. Nice marmot. Sir, this is a mortuary, not a rental house. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.</p> */}
                 </section>
            </section>
        </div>
 <div>
            <nav className="navbar navbar-inverse navbar-fixed-bottom">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Home</a></li>
                      <li><a href="#">Page 1</a></li>
                      <li><a href="#">Page 2</a></li>
                      <li><a href="#">Page 3</a></li>
                    </ul>
                  </div>
                </nav>
              {/* <p>Text placeholders courtesy of <a href="http://www.lebowskiipsum.com/">Lebowski Ipsum</a>.</p> */}
 </div>
        </div>
    );
  }
}

MasterPage.propTypes = {
    children: React.PropTypes.object.isRequired
};

export default MasterPage;
