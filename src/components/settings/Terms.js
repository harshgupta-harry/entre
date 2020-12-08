/* eslint-disable no-param-reassign */
import React from 'react';
import Head from 'next/head';

function Terms() {
  function resizeIFrameToFitContent(iFrame) {
    if (iFrame && iFrame.contentWindow && iFrame.contentWindow.document) {
      iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
      iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    }
  }

  React.useEffect(() => {
    const iFrame = document.getElementById('iFrame1');
    setTimeout(() => {
      resizeIFrameToFitContent(iFrame);
    }, 2000);
  });
  return (
    <>
      <Head>
        <title>Entre: Terms and conditions</title>
      </Head>
      <iframe
        id="iFrame1"
        title="terms and conditions"
        style={{
          border: 0,
          width: '100%',
          overflowY: 'hidden',
          minHeight: '100vh',
        }}
        src="terms.html"
      />
    </>
  );
}

export default Terms;
