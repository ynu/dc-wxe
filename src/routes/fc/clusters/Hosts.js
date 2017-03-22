import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';

const Hosts = (props) => {
  const { hosts } = props;
  return (
    <div>
      <CellsTitle>主机列表({hosts.length})</CellsTitle>
      <Cells>
        {
          hosts.map(({ urn, name, status }) => {
            const result = /sites:(\S+):hosts:(\S+)/.exec(urn);
            const siteUri = result[1];
            const hostUri = result[2];
            return (
              <Cell key={urn} href={`/fc/hosts/${siteUri}/${hostUri}`} access>
                <CellBody>{name}</CellBody>
                <CellFooter>
                  {
                    status === 'normal'
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

export default Hosts;
