import React, { PropTypes } from 'react';
import { Icon, Preview, PreviewHeader, PreviewBody, PreviewItem } from 'react-weui';

const VirtualServer = (props) => {
  const { name, address, port, lbPolicy, primaryServerFarm, description, state, realServers, serverFarm } = props;
  return (
    <div>
      <Preview>
        <PreviewHeader>
          <PreviewItem label="名称" value={name} />
        </PreviewHeader>
        <PreviewBody>
          <PreviewItem label="IP" value={address.v4 || address.v6} />
          <PreviewItem label="端口" value={port} />
          {
            lbPolicy && <PreviewItem label="LB 策略" value={lbPolicy} />
          }
          {
            primaryServerFarm && serverFarm && (
              <PreviewItem label="实服务组" value={`${serverFarm.activeRealServer}/${serverFarm.totalRealServer}`} />
            )
          }
          {
            primaryServerFarm && realServers && (
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">实服务器</label>
                {
                  <ul>
                    {
                      realServers.map(rs => (
                        <li key={rs.name}>
                          <a href="#">
                            <em className="weui-form-preview__value">
                              {rs.address.v4 || rs.address.v6}:{rs.port}
                              {
                                rs.state === 'Active' ? <Icon value="success" /> : <Icon value="warn" />
                              }
                            </em>
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                }
              </div>
            )
          }
          <PreviewItem label="描述" value={description} />
        </PreviewBody>
      </Preview>
      <br />
    </div>
  );
};

export default VirtualServer;
