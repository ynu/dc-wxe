/* eslint-env mocha */
import 'babel-polyfill';
import { expect } from 'chai';
import * as model from './fc';

const siteUri = '3F7B07E2';
const clusterUri = '79';
describe('FC API', function () {
  this.timeout(600000);
  describe('Site', () => {
    it('sites', async () => {
      const result = await model.sites();
      expect(result.length).above(0);
    });
  });
  describe('Alarm', () => {
    it('activeAlarm', async () => {
      const result = await model.activeAlarm(siteUri);
      expect(result.total).above(0);
    });

    it('events', async () => {
      const result = await model.events(siteUri);
      expect(result.total).above(0);
    });

    it('historyAlarm', async () => {
      const result = await model.historyAlarm(siteUri);
      expect(result.total).above(0);
    });
  });

  describe('Cluster', () => {
    it('clusters', async () => {
      const result = await model.clusters(siteUri);
      expect(result.length).above(0);
    });

    it('cluster', async () => {
      const result = await model.cluster(siteUri, clusterUri);
      expect(result.uri).is.ok;
    });

    it('computerResource', async () => {
      const result = await model.computerResource(siteUri, clusterUri);
      expect(result.totalSizeMHz).is.ok;
    });
  });
});
