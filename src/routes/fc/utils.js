export const parseUrn = (urn) => {
  const result = /sites:(\S+):(\S+):(\S+)/.exec(urn);
  if (result) {
    return {
      siteUri: result[1],
      clusterUri: result[2] === 'clusters' ? result[3] : null,
      hostUri: result[2] === 'hosts' ? result[3] : null,
      vmUri: result[2] === 'vms' ? result[3] : null,
    };
  }
  return {};
};

export default {
  parseUrn,
};
