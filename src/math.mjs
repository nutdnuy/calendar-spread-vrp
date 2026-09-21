export const normPdf=x=>Math.exp(-0.5*x*x)/Math.sqrt(2*Math.PI);

export function normCdf(x){
  const sign=x<0?-1:1;
  const z=Math.abs(x)/Math.sqrt(2),t=1/(1+0.3275911*z);
  const erf=1-(((((1.061405429*t-1.453152027)*t+1.421413741)*t-0.284496736)*t+0.254829592)*t)*Math.exp(-z*z);
  return 0.5*(1+sign*erf);
}

export function bsmGreeks({spot,strike,rate,vol,time}){
  if(spot<=0||strike<=0||vol<=0||time<=0) return {delta:spot>strike?1:0,gamma:0,theta:0,vega:0,rho:0};
  const root=Math.sqrt(time);
  const d1=(Math.log(spot/strike)+(rate+0.5*vol*vol)*time)/(vol*root);
  const d2=d1-vol*root;
  const pdf=normPdf(d1),discount=Math.exp(-rate*time);
  return {
    delta:normCdf(d1),
    gamma:pdf/(spot*vol*root),
    theta:-spot*pdf*vol/(2*root)-rate*strike*discount*normCdf(d2),
    vega:spot*pdf*root,
    rho:strike*time*discount*normCdf(d2),
  };
}

export function calendarNetGreeks({spot,strike,rate,shortVol,longVol,shortTime,longTime}){
  const short=bsmGreeks({spot,strike,rate,vol:shortVol,time:shortTime});
  const long=bsmGreeks({spot,strike,rate,vol:longVol,time:longTime});
  return Object.fromEntries(Object.keys(long).map(key=>[key,long[key]-short[key]]));
}
