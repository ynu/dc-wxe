import React, { PropTypes } from 'react';
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

const Detail = (props) => {
  const { cluster } = props;
  return (
    <div>
      <Preview>
        <PreviewHeader>
          <PreviewItem label="CPU使用率" value="11%" />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="总容量" value="180 GHz" />
          <PreviewItem label="已用容量" value="20 GHz" />
        </PreviewBody>
      </Preview>
      <br />

      <Preview>
        <PreviewHeader>
          <PreviewItem label="内存使用率" value="21%" />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="总容量" value="709 GB" />
          <PreviewItem label="已用容量" value="152 GB" />
        </PreviewBody>
      </Preview>
      <br />
    </div>
  );
};

export default Detail;
