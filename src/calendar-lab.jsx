import React,{useMemo,useState} from 'react';
import {Chart,LabTitle,Range,format} from './ui.jsx';
import {calendarNetGreeks} from './math.mjs';

const greekMeta={
  delta:{label:'Net Delta',unit:'Δ',scale:1},
  gamma:{label:'Net Gamma',unit:'Γ',scale:1},
  theta:{label:'Net Theta / day',unit:'ราคา/วัน',scale:1/365},
  vega:{label:'Net Vega / vol point',unit:'ราคา/1 vol pt',scale:0.01},
  rho:{label:'Net Rho / 1%',unit:'ราคา/1%',scale:0.01},
};

export function CalendarGreeksLab(){
  const [spot,setSpot]=useState(100),[strike,setStrike]=useState(100),[rate,setRate]=useState(2),[shortDays,setShortDays]=useState(30),[longDays,setLongDays]=useState(180),[shortIV,setShortIV]=useState(24),[longIV,setLongIV]=useState(21),[rv,setRv]=useState(18),[greek,setGreek]=useState('theta');
  const changeShortDays=days=>{setShortDays(days);setLongDays(value=>Math.max(value,days+1));};
  const params={spot,strike,rate:rate/100,shortVol:shortIV/100,longVol:longIV/100,shortTime:shortDays/365,longTime:longDays/365};
  const net=calendarNetGreeks(params);
  const spots=useMemo(()=>Array.from({length:61},(_,i)=>Math.max(1,spot*0.7+i*spot*0.01)),[spot]);
  const values=spots.map(s=>[s,calendarNetGreeks({...params,spot:s})[greek]*greekMeta[greek].scale]);
  let min=Math.min(...values.map(([,v])=>v)),max=Math.max(...values.map(([,v])=>v));
  const pad=Math.max((max-min)*0.12,Math.abs(max||min)*0.08,0.001);min-=pad;max+=pad;
  const metric=(key,digits=3)=>format(net[key]*greekMeta[key].scale,digits);
  const shortVrp=shortIV-rv;
  return <section className="lab" aria-label="ห้องทดลองค่ากรีกสุทธิของ Calendar Spread">
    <LabTitle number="02" title="Calendar Greek explorer">คำนวณ Long far-dated Call − Short near-dated Call ด้วยสูตร Black–Scholes แล้วดู Net Greek ตามราคา Spot</LabTitle>
    <div className="controls two"><div>
      <Range label="Spot" value={spot} onChange={setSpot} min={60} max={140}/><Range label="Strike" value={strike} onChange={setStrike} min={60} max={140}/><Range label="Short maturity" value={shortDays} onChange={changeShortDays} min={7} max={120} suffix=" days"/><Range key={`long-maturity-${Math.max(60,shortDays+1)}`} label="Long maturity" value={longDays} onChange={setLongDays} min={Math.max(60,shortDays+1)} max={365} suffix=" days"/>
    </div><div>
      <Range label="Short-leg IV" value={shortIV} onChange={setShortIV} min={5} max={80} suffix="%"/><Range label="Long-leg IV" value={longIV} onChange={setLongIV} min={5} max={80} suffix="%"/><Range label="Realized volatility" value={rv} onChange={setRv} min={5} max={80} suffix="%"/><Range label="Risk-free rate" value={rate} onChange={setRate} min={0} max={10} step={0.25} suffix="%"/>
    </div></div>
    <div className="results greek-results"><div><span>Net Delta</span><strong>{metric('delta')}</strong><p>Long − Short</p></div><div><span>Net Gamma</span><strong>{metric('gamma',5)}</strong><p>ต่อราคา²</p></div><div><span>Net Theta</span><strong>{metric('theta')}</strong><p>ต่อวัน</p></div><div><span>Net Vega</span><strong>{metric('vega')}</strong><p>ต่อ 1 vol point</p></div><div><span>Near-leg VRP</span><strong>{shortVrp>0?'+':''}{format(shortVrp,1)} pp</strong><p>{shortVrp>=0?'IV สูงกว่า RV':'RV สูงกว่า IV'}</p></div></div>
    <label className="select-label" htmlFor="greek-view">Greek shown in chart</label><select id="greek-view" value={greek} onChange={e=>setGreek(e.target.value)}>{Object.entries(greekMeta).map(([key,item])=><option key={key} value={key}>{item.label}</option>)}</select>
    <Chart title={`${greekMeta[greek].label} by spot`} description="ค่ากรีกสุทธิของ Calendar Spread ที่พารามิเตอร์ปัจจุบัน" xDomain={[spots[0],spots.at(-1)]} yDomain={[min,max]} xLabel="Spot" yLabel={greekMeta[greek].unit} lines={[{values}]} xFormat={v=>format(v,0)} yFormat={v=>format(v,3)}/>
    <p className="lab-note">ค่ากรีกเป็นความไวเฉพาะจุดภายใต้ Black–Scholes และไม่ได้รวม transaction costs, volatility smile, discrete hedging หรือ model error การเปรียบเทียบ IV กับ RV เป็นบริบทของสมมติฐาน ไม่ใช่การรับประกันผลตอบแทน</p>
  </section>;
}
