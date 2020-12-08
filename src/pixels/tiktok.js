/* eslint-disable react/no-danger */

import React from 'react';

export default () => (
  <>
    <script dangerouslySetInnerHTML={{
      __html: `(function() {
                var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
                ta.src = 'https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=BTMFSHORQH54JI5R8DPG';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ta, s);
              })();`,
    }}
    />
    {/* <noscript dangerouslySetInnerHTML={{
      __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXXX&ev=PageView&noscript=1" />`,
    }}
    /> */}
  </>
);
