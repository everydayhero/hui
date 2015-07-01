"use strict";

var React      = require('react');
var Footer     = require('../../../layout/Footer');
var Highlight  = require('react-highlight');

module.exports = React.createClass({
  displayName: 'TopBarExample',

  render: function() {
    return (
    <div>
      <h3 className="DemoPage__h3">Footer</h3>
      <p className="DemoPage__p">The footer should be consistent across all applications.</p>
      <h4 className="DemoPage__h4">Footer propTypes</h4>
      <ul className="DemoPage__ul">
        <li className="DemoPage__li">
          <span className="DemoPage__bold">beneficiary:</span> The beneficiary information to display in the footer.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">domain:</span> The domain for the footer links.
        </li>
        <li className="DemoPage__li">
          <span className="DemoPage__bold">region:</span> The region the user is in.
        </li>
      </ul>
      <div className="DemoPage__example">
        <Footer/>
      </div>

      <h4 className="DemoPage__h4">React Example</h4>
      <Highlight className='html'>
        { '<Footer/>\n' }
      </Highlight>

      <h4 className="DemoPage__h4">HTML Example</h4>
      <Highlight className='html'>
      { '<div class="hui-Footer">\n' }
      { ' <div class="hui-Row hui-Footer primary desktop">\n' }
      { '   <div class="hui-Footer__siteLinks">\n' }
      { '     <div class="hui-Footer__siteLinksLeft">\n' }
      { '       <a href="http://www.everydayhero.com/au/about/" class="hui-A hui-Footer__siteLink">About</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/jobs/" class="hui-A hui-Footer__siteLink">Jobs</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/blog/" class="hui-A hui-Footer__siteLink">Wonderwall</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/contact/" class="hui-A hui-Footer__siteLink">Contact</a>\n' }
      { '     </div>\n' }
      { '     <a href="http://www.everydayhero.com/au/">\n' }
      { '       <img class="hui-Footer__logo" src="images/hui_edh_mark@x2.gif">\n' }
      { '     </a>\n' }
      { '     <div class="hui-Footer__siteLinksRight">\n' }
      { '       <a href="http://www.everydayhero.com/au/press/" class="hui-A hui-Footer__siteLink">Press</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/events/" class="hui-A hui-Footer__siteLink">Events</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/nonprofits/" class="hui-A hui-Footer__siteLink">Nonprofits</a>\n' }
      { '       <a href="http://www.everydayhero.com/au/developers-giving-ecosystem/" class="hui-A hui-Footer__siteLink">Developers</a>\n' }
      { '     </div>\n' }
      { '   </div>\n' }
      { '   <div class="hui-Footer__legalLinks">\n' }
      { '     <a href="http://www.everydayhero.com/au/terms/privacy" class="hui-A hui-Footer__legalLink">Privacy Policy</a>\n' }
      { '     <a href="http://www.everydayhero.com/au/terms/" class="hui-A hui-Footer__legalLink">Terms of Service</a>\n' }
      { '     <a href="http://www.everydayhero.com/au/terms/cookies" class="hui-A hui-Footer__legalLink">Cookie Policy</a>\n' }
      { '     <a href="https://www.blackbaud.com/" class="hui-A hui-Footer__legalLink">everydayhero is a Blackbaud service</a>\n' }
      { '     <span class="hui-Footer__legalLink">\n' }
      { '       <span>©</span>\n' }
      { '       <span>2015</span>\n' }
      { '       <span> </span>\n' }
      { '       <span>All Rights Reserved</span>\n' }
      { '     </span>\n' }
      { '   </div>\n' }
      { '   <div class="hui-SocialMediaLinks hui-Footer__socialMedia">\n' }
      { '     <a href="https://www.facebook.com/everydayhero">\n' }
      { '       <span class="hui-IconWrapper hui-SocialMediaLinks__link facebook ">\n' }
      { '         <i class="hui-Icon fa fa-facebook"></i>\n' }
      { '       </span>\n' }
      { '     </a>\n' } 
      { '     <a href="https://twitter.com/everydayhero">\n' }
      { '       <span class="hui-IconWrapper hui-SocialMediaLinks__link twitter ">\n' }
      { '         <i class="hui-Icon fa fa-twitter"></i>\n' }
      { '       </span>\n' }
      { '     </a>\n' }
      { '     <a href="http://gplus.to/everydayhero">\n' }
      { '       <span class="hui-IconWrapper hui-SocialMediaLinks__link google-plus ">\n' }
      { '         <i class="hui-Icon fa fa-google-plus"></i>\n' }
      { '       </span>\n' }
      { '     </a>\n' }
      { '     <a href="https://instagram.com/everydayhero">\n' }
      { '       <span class="hui-IconWrapper hui-SocialMediaLinks__link instagram ">\n' }
      { '         <i class="hui-Icon fa fa-instagram"></i>\n' }
      { '       </span>\n' }
      { '     </a>\n' }
      { '     <a href="https://www.pinterest.com/everydayhero">\n' }
      { '       <span class="hui-IconWrapper hui-SocialMediaLinks__link pinterest ">\n' }
      { '         <i class="hui-Icon fa fa-pinterest"></i>\n' }
      { '       </span>\n' }
      { '     </a>\n' }
      { '   </div>\n' }
      { ' </div>\n' }
      { '</div>\n' }
      </Highlight>
    </div>
    );
  }
});
