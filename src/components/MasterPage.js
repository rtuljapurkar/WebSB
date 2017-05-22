import React from 'react';
import { Link } from 'react-router';

import Header from './common/Header';

class MasterPage extends React.Component {
  render() {
    return (
      // <div className='MasterPage'>
      //   <Header />
      //   { this.props.children }
      // </div>

        <div className='MasterPage' >
          <Header/>
          <section id="body" >

          <section className="col-md-2" >
          <h2>Sidebar</h2>
          <p>It increases the chances of conception. Would it be possible for me to get my twenty grand in cash? I gotta check this with my accountant of course. JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! Forget it, Donny. You're out of your element. I have no choice but to tell these bums that they should do whatever is necessary to recover their money from you, Jeffrey Lebowski.</p>
          <img src="images/lebowski-2.jpg" alt="Rules"
               class="img-thumbnail" />


          <p>I got a nice quiet beach community here, and I aim to keep it nice and quiet. I like your style, Dude. Nice marmot. Sir, this is a mortuary, not a rental house. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.</p>

          </section>

                <section className="col-md-8" >
                    { this.props.children }
                </section>
                <section id="sidebar" className="col-md-2">
                     <h2>Sidebar</h2>
                     <p>It increases the chances of conception. Would it be possible for me to get my twenty grand in cash? I gotta check this with my accountant of course. JUST BECAUSE WE'RE BEREAVED DOESN'T MEAN WE'RE SAPS! Forget it, Donny. You're out of your element. I have no choice but to tell these bums that they should do whatever is necessary to recover their money from you, Jeffrey Lebowski.</p>
                     <img src="images/lebowski-2.jpg" alt="Rules"
                          class="img-thumbnail" />


                     <p>I got a nice quiet beach community here, and I aim to keep it nice and quiet. I like your style, Dude. Nice marmot. Sir, this is a mortuary, not a rental house. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.</p>
             </section>
            </section>

            <footer className="container">
              <p>Text placeholders courtesy of <a href="http://www.lebowskiipsum.com/">Lebowski Ipsum</a>.</p>
            </footer>
        </div>
    );
  }
}

export default MasterPage;
