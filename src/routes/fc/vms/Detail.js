import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';
import { parseUrn } from '../utils';

const Detail = (props) => {
  const { clusterUrn, hostUrn, clusterName, hostName, vmConfig } = props;
  const siteUri = parseUrn(clusterUrn).siteUri;
  const clusterUri = parseUrn(clusterUrn).clusterUri;
  const hostUri = parseUrn(hostUrn).hostUrn;

  return (
    <div>
      <CellsTitle>基本信息</CellsTitle>
      <Cells>
        <Cell href={`/fc/cluster/${siteUri}/${clusterUri}`} access>
          <CellBody>所在集群</CellBody>
          <CellFooter>{clusterName}
          </CellFooter>
        </Cell>
        <Cell href={`/fc/cluster/${siteUri}/${hostUri}`} access>
          <CellBody>所在主机</CellBody>
          <CellFooter>{hostName}
          </CellFooter>
        </Cell>
      </Cells>

      <CellsTitle>硬件</CellsTitle>
      <Cells>
        <Cell>
          <CellBody>CPU</CellBody>
          <CellFooter>{vmConfig.cpu.quantity} 核
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>内存</CellBody>
          <CellFooter>{Math.round(vmConfig.memory.quantityMB / 1024)} GB
          </CellFooter>
        </Cell>
        {
          vmConfig.disks.map(({ pciType, sequenceNum, quantityGB, volumeUrn }) => (
            <Cell key={volumeUrn}>
              <CellBody>硬盘({pciType}{sequenceNum})</CellBody>
              <CellFooter>{quantityGB} GB
              </CellFooter>
            </Cell>
          ))
        }
        {
          vmConfig.nics.map(({ ip, urn, portGroupName }) => (
            <Cell key={urn}>
              <CellBody>网卡({portGroupName})</CellBody>
              <CellFooter>{ip}
              </CellFooter>
            </Cell>
          ))
        }
      </Cells>
    </div>
  );
};

export default Detail;
