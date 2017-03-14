import React, { PropTypes } from 'react';
import { Preview, PreviewHeader, PreviewFooter,
  PreviewBody, PreviewButton, Toast } from 'react-weui';
import PreviewItem from '../../../../components/WeChat/weui/PreviewItem';

const ServerFarm = (props) => {
  const { name, activeRealServer, totalRealServer, description } = props;
  return (
    <div>
      <a id={name} />
      <Preview>
        <PreviewHeader>
          <PreviewItem label="名称" value={name} />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="实服务器" href="#" value={`${activeRealServer} / ${totalRealServer}`} />
          {
            description && <PreviewItem label="描述" value={description} />
          }

        </PreviewBody>
        <PreviewFooter>
          <PreviewButton primary>详情</PreviewButton>
        </PreviewFooter>
      </Preview>
      <br />
    </div>
  );
};

export default ServerFarm;
