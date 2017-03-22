import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';

const Vms = (props) => {
  const { vms } = props;
  return (
    <div>
      <CellsTitle>主机列表({vms.length})</CellsTitle>
      <Cells>
        {
          vms.map(({ name, status, description, urn }) => {
            const result = /sites:(\S+):vms:(\S+)/.exec(urn);
            const siteUri = result[1];
            const vmUri = result[2];
            return (
              <Cell key={urn} href={`/fc/vms/${siteUri}/${vmUri}`} access>
                <CellBody>{name}</CellBody>
                <CellFooter>
                  {description}
                  {
                    status === 'running'
                    ? <Icon type="success" />
                    : <Icon type="warn" />
                  }

                </CellFooter>
              </Cell>
            );
          })
        }
      </Cells>
    </div>
  );
};

export default Vms;
