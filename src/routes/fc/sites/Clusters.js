import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';

const Clusters = ({ clusters }) => (
  <div>
    <CellsTitle>集群列表({clusters.length})</CellsTitle>
    <Cells>
      {
          clusters.map(({ name, uri }) => {
            const [, siteUri, clusterUri] = /sites\/(\S*)\/clusters\/(\S+)/.exec(uri);
            return (
              <Cell key={uri} href={`/fc/cluster/${siteUri}/${clusterUri}`} access>
                <CellBody>{name}</CellBody>
                <CellFooter />
              </Cell>
            );
          })
        }
    </Cells>
  </div>
  );

export default Clusters;
