import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge } from 'react-weui';

const ServerLb = ({ serverLb }) => {
  let { realServers, serverFarms, virtualServers } = serverLb;
  realServers = realServers || {};
  serverFarms = serverFarms || {};
  virtualServers = virtualServers || {};
  return (
    <div>
      <CellsTitle>服务器负载均衡</CellsTitle>
      <Cells>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              虚服务
          </CellBody>
          <CellFooter>
            {virtualServers.Active} / {virtualServers.total}
            {
              virtualServers.Active === virtualServers.total ? <Icon value="success" /> : <Icon value="warn" />
            }
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              实服务组
          </CellBody>
          <CellFooter>
            {serverFarms.Active} / {serverFarms.total}
            {
              serverFarms.Active === serverFarms.total ? <Icon value="success" /> : <Icon value="warn" />
            }
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              实服务器
          </CellBody>
          <CellFooter>
            {realServers.Active} / {realServers.total}
            {
              realServers.Active === realServers.total ? <Icon value="success" /> : <Icon value="warn" />
            }
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
};

export default ServerLb;
