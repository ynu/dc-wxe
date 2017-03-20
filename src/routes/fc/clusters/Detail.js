import React, { PropTypes } from 'react';
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

const Detail = (props) => {
  const { totalSizeMHz, totalSizeMB, allocatedSizeMB, allocatedSizeMHz, allocatedVcpus } = props.computerResource;
  return (
    <div>
      <Preview>
        <PreviewHeader>
          <PreviewItem label="CPU使用率" value={`${Math.round(allocatedSizeMHz / totalSizeMHz * 100)}%`} />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="总容量" value={`${Math.round(totalSizeMHz / 1000)} GHz`} />
          <PreviewItem label="已用容量" value={`${Math.round(allocatedSizeMHz / 1000)} GHz`} />
        </PreviewBody>
      </Preview>
      <br />

      <Preview>
        <PreviewHeader>
          <PreviewItem label="内存使用率" value={`${Math.round(allocatedSizeMB / totalSizeMB * 100)}%`} />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="总容量" value={`${Math.round(totalSizeMB / 1000)} GB`} />
          <PreviewItem label="已用容量" value={`${Math.round(allocatedSizeMB / 1000)} GB`} />
        </PreviewBody>
      </Preview>
      <br />
    </div>
  );
};

export default Detail;
