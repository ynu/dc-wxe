import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge } from 'react-weui';

const Device = ({ device }) => {
  let { cpus, memory, powers, fans, environment } = device;
  cpus = cpus || [];
  memory = memory || {};
  powers = powers || [];
  fans = fans || [];
  environment = environment || { inflow: {}, outflow: {} };
  return (
    <div>
      <CellsTitle>设备情况</CellsTitle>
      <Cells>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              CPU使用率
          </CellBody>
          <CellFooter>
            {
              cpus.map(cpu => `${cpu.usage.last5m}%`).join(' ,')
            }
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              内存使用率
          </CellBody>
          <CellFooter>
            { Math.round((memory.used * 100) / memory.total)}%
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              电源
          </CellBody>
          <CellFooter>
            {powers.Normal} / {powers.total}
            {
              powers.Normal === powers.total ? <Icon value="success" /> : <Icon value="warn" />
            }
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              风扇
          </CellBody>
          <CellFooter>
            {fans.Normal} / {fans.total}
            {
              fans.Normal === fans.total ? <Icon value="success" /> : <Icon value="warn" />
            }
          </CellFooter>
        </Cell>
        <Cell href={'/tsg-lb/device/cpuUsage'} access>
          <CellBody>
              环境温度
          </CellBody>
          <CellFooter>
            in: {environment.inflow.temperature}℃,
            out: {environment.outflow.temperature}℃
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
};


export default Device;
