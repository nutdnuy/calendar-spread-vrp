import {normCdf,bsmGreeks,calendarNetGreeks} from './math.mjs';
export const grid=(lo,hi,n=81)=>Array.from({length:n},(_,i)=>lo+(hi-lo)*i/(n-1));
export function callPrice({spot,strike,rate,vol,time}){
 if(time<=0)return Math.max(spot-strike,0);
 if(spot<=0)return 0;
 if(vol<=0)return Math.max(spot-strike*Math.exp(-rate*time),0);
 const scale=vol*Math.sqrt(time),d1=(Math.log(spot/strike)+(rate+.5*vol*vol)*time)/scale;
 const d2=(Math.log(spot/strike)+(rate-.5*vol*vol)*time)/scale;
 return spot*normCdf(d1)-strike*Math.exp(-rate*time)*normCdf(d2);
}
export function spreadValue({spot=100,strike=100,rate=.02,shortVol=.2,longVol=.2,shortDays=30,longDays=180,elapsed=0}){
 if(elapsed<0||elapsed>shortDays||longDays<=shortDays)throw Error('Invalid calendar dates');
 const common={spot,strike,rate};
 const short=callPrice({...common,vol:shortVol,time:(shortDays-elapsed)/365});
 const long=callPrice({...common,vol:longVol,time:(longDays-elapsed)/365});
 return {short,long,net:long-short};
}
export function expiryPnl({spot=100,strike=100,rate=.02,shortDays=30,longDays=180,initialVol=.2,residualVol=.2,terminal=100}){
 const debit=spreadValue({spot,strike,rate,shortDays,longDays,shortVol:initialVol,longVol:initialVol}).net;
 const terminalValue=spreadValue({spot:terminal,strike,rate,shortDays,longDays,shortVol:initialVol,longVol:residualVol,elapsed:shortDays}).net;
 return {debit,terminalValue,pnl:terminalValue-debit*Math.exp(rate*shortDays/365)};
}
export function ivShift({spot=100,strike=100,rate=.02,shortVol=.24,longVol=.21,shortDays=30,longDays=180,shortShift=0,longShift=0}){
 if(shortVol+shortShift<=0||longVol+longShift<=0)throw Error('IV must stay positive');
 const p={spot,strike,rate,shortVol,longVol,shortDays,longDays};
 const short=bsmGreeks({spot,strike,rate,vol:shortVol,time:shortDays/365}).vega;
 const long=bsmGreeks({spot,strike,rate,vol:longVol,time:longDays/365}).vega;
 return {exact:spreadValue({...p,shortVol:shortVol+shortShift,longVol:longVol+longShift}).net-spreadValue(p).net,linear:long*longShift-short*shortShift};
}
export function hedgeCarry({spot=100,strike=100,iv=.2,rv=.2,rate=.02,shortDays=30,longDays=180}){
 const gamma=calendarNetGreeks({spot,strike,rate,shortVol:iv,longVol:iv,shortTime:shortDays/365,longTime:longDays/365}).gamma;
 const carry=-.5*gamma*spot*spot*iv*iv/365,realized=.5*gamma*spot*spot*rv*rv/365;
 return {gamma,carry,realized,total:carry+realized};
}
