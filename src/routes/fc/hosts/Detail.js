import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';

const Detail = (props) => {
  const { ip, cpuResource, memResource, clusterName, clusterUrn } = props;
  const clusterUrnResult = /sites:(\S+):clusters:(\S+)/.exec(clusterUrn);
  let clusterUrl;
  if (clusterUrnResult) {
    const siteUri = clusterUrnResult[1];
    const clusterUri = clusterUrnResult[2];
    clusterUrl = `/fc/cluster/${siteUri}/${clusterUri}`;
  }

  return (
    <div>
      <CellsTitle>主机信息</CellsTitle>
      <Cells>
        <Cell>
          <CellBody>IP</CellBody>
          <CellFooter>{ip}
          </CellFooter>
        </Cell>
        <Cell href={clusterUrl} access>
          <CellBody>所在集群</CellBody>
          <CellFooter>{clusterName}
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>CPU容量</CellBody>
          <CellFooter>
            已分配: {cpuResource.allocatedSizeMHz / 1000} GHz / {cpuResource.totalSizeMHz / 1000} GHz
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>内存容量</CellBody>
          <CellFooter>
            已使用: {Math.round(memResource.allocatedSizeMB / 1000)} GB / {Math.round(memResource.totalSizeMB / 1000)} GB
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
};

export default Detail;
