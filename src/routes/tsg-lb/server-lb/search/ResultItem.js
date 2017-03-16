import React, { PropTypes } from 'react';
import { Icon, Preview, PreviewHeader, PreviewBody, PreviewItem } from 'react-weui';

const ResultItem = (props) => {
  const { policy, cls, realServers, virtualServers, action, serverFarm } = props;
  return (
    <div>
      {
        virtualServers.map(({ name, address }) => (
          <div>
            <Preview key={name}>
              <PreviewHeader>
                <PreviewItem label="虚服务IP" value={address.v4 || address.v6} />
              </PreviewHeader>
              <PreviewBody>
                <PreviewItem label="虚服务IP" value={name} />
                <PreviewItem label="LB 策略" value={policy.name} />
                <PreviewItem label="流分类器" value={cls.name} />
                <PreviewItem label="LB 动作" value={action.name} />
                <PreviewItem label="实服务组" value={serverFarm.name} />
                {
                  realServers && (
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
              </PreviewBody>
            </Preview>
            <br />
          </div>
        ))
      }

    </div>
  );
};

export default ResultItem;
