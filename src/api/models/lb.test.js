/* eslint-env mocha */
import 'babel-polyfill';
import { expect } from 'chai';
import * as model from './lb';

describe('LB API', function () {
  this.timeout(600000);
  describe('Device', () => {
    it('cpu-usage', async () => {
      const result = await model.cpuUsage();
      expect(result.cpus.length).above(0);
    });

    it('memory', async () => {
      const result = await model.memory();
      expect(result.memory.total).above(32000);
    });

    it('power', async () => {
      const result = await model.power();
      expect(result.powers.length).above(0);
    });

    it('fan', async () => {
      const result = await model.fan();
      expect(result.fans.length).above(0);
    });

    it('environment', async () => {
      const result = await model.environment();
      expect(result.inflow.temperature).above(0);
      expect(result.outflow.temperature).above(0);
    });
  });
});
