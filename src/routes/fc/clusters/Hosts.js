import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';

const Hosts = (props) => {
  const { hosts } = props;
  return (
    <div>
      <CellsTitle>主机列表(2)</CellsTitle>
      <Cells>
        <Cell href={'/fc/siteUri/host/hostUri'} access>
          <CellBody>MCAN01</CellBody>
          <CellFooter />
        </Cell>
        <Cell href={'/fc/siteUri/host/hostUri'} access>
          <CellBody>MCAN02</CellBody>
          <CellFooter />
        </Cell>
      </Cells>
    </div>
  );
};

export default Hosts;
