import React, { PropTypes } from 'react';
import { CellsTitle, Cells, CellFooter, CellBody, Cell } from 'react-weui';

const Interface = ({ interfaces, inboundCounter, outboundCounter }) => {
  let { ge, xge } = interfaces;
  ge = ge || [];
  xge = xge || {};
  return (
    <div>
      <CellsTitle>网络接口</CellsTitle>
      <Cells>
        <Cell>
          <CellBody>
              GE
          </CellBody>
          <CellFooter>
            UP: {ge.UP}; DOWN: {ge.DOWN}
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>
              XGE
          </CellBody>
          <CellFooter>
            UP: {xge.UP}; DOWN: {xge.DOWN}
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>
              入流量
          </CellBody>
          <CellFooter>
            {Math.round(inboundCounter / 1024 / 1024 / 1024)} Gpkts
          </CellFooter>
        </Cell>
        <Cell>
          <CellBody>
              出流量
          </CellBody>
          <CellFooter>
            {Math.round(outboundCounter / 1024 / 1024 / 1024)} Gpkts
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
};

export default Interface;
