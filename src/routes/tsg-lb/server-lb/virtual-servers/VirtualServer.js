import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, CellsTips } from 'react-weui';

const VirtualServer = (props) => {
  const { name, address, port, lbPolicy, primaryServerFarm, description, state, realServers, serverFarm } = props;
  return (
    <div>
      <CellsTitle>{name}</CellsTitle>
      <Cells>
        <Cell>
          <CellBody>IP</CellBody>
          <CellFooter>{address.v4 || address.v6}</CellFooter>
        </Cell>
        <Cell>
          <CellBody>端口</CellBody>
          <CellFooter>{port}</CellFooter>
        </Cell>
        {
          lbPolicy && (
            <Cell>
              <CellBody>LB策略</CellBody>
              <CellFooter>{lbPolicy}</CellFooter>
            </Cell>
          )
        }
        {
          primaryServerFarm && serverFarm && (
            <Cell>
              <CellBody>实服务组</CellBody>
              <CellFooter>
                {primaryServerFarm}({serverFarm.activeRealServer}/{serverFarm.totalRealServer})
              </CellFooter>
            </Cell>
          )
        }
        {
          primaryServerFarm && (
            <Cell>
              <CellBody>
                  实服务器
              </CellBody>
              <CellFooter>
                <ul>
                  {
                    realServers.map(rs => (
                      <li key={rs.name}>
                        <a href="#">{rs.name}</a>
                        {
                          rs.state === 'Active' ? <Icon value="success" /> : <Icon value="warn" />
                        }
                      </li>
                    ))
                  }
                </ul>
              </CellFooter>
            </Cell>
          )
        }
      </Cells>
      <CellsTips>{description}</CellsTips>
      <br />
    </div>
  );
};

export default VirtualServer;
