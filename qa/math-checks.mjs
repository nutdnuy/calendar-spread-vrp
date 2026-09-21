import assert from 'node:assert/strict';
import {bsmGreeks,calendarNetGreeks,normCdf} from '../src/math.mjs';

const close=(actual,expected,tolerance=1e-5)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} != ${expected}`);
close(normCdf(0),0.5,1e-7);
const base=bsmGreeks({spot:100,strike:100,rate:0.02,vol:0.2,time:1});
close(base.delta,0.5792597,2e-5);
close(base.gamma,0.0195521,2e-6);
assert.ok(base.theta<0&&base.vega>0&&base.rho>0);
const net=calendarNetGreeks({spot:100,strike:100,rate:0.02,shortVol:0.24,longVol:0.21,shortTime:30/365,longTime:180/365});
assert.ok(net.theta>0,'ATM calendar should have positive net theta under the stated parameters');
assert.ok(net.gamma<0,'ATM calendar should have negative net gamma under the stated parameters');
assert.ok(net.vega>0,'ATM calendar should have positive net vega under the stated parameters');
for(const value of Object.values(net)) assert.ok(Number.isFinite(value));
console.log('Calendar-spread Greek checks passed.');
