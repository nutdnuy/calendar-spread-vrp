import React from 'react';
import {format} from './ui.jsx';
import {useParams,Shell,Stats,Plot} from './viz-ui.jsx';
import {grid,spreadValue,expiryPnl,ivShift,hedgeCarry} from './viz-math.mjs';
export function ExpiryLab(){
 const [p,R,set,reset]=useParams({strike:100,shortDays:30,longDays:180,initialVol:20,residualVol:20,terminal:100});
 const args={...p,initialVol:p.initialVol/100,residualVol:p.residualVol/100},xs=grid(40,160),at=terminal=>expiryPnl({...args,terminal}),selected=at(p.terminal);
 return <Shell title="Calendar P&L at near expiry" question="เมื่อขาสั้นหมดอายุ ราคาหุ้นและ IV ที่เหลือทำให้กำไรขาดทุนเปลี่ยนอย่างไร?" reset={reset} note="Long far Call − Short near Call; เริ่ม S₀=100, r=2% ต่อปี ไม่มีปันผล European cash settlement; P&L หัก net debit พร้อมดอกเบี้ยถึงวันหมดอายุขาสั้น แต่ไม่รวม transaction costs เส้น terminal value ยังไม่หักทุน และไม่ใช่ payoff เมื่อทั้งสองขาหมดอายุ">
 <div className="controls two"><div>{R('strike','Calendar strike',70,130)}{R('shortDays','Near expiry',7,90,1,' days')}{R('longDays','Far expiry',120,365,5,' days')}</div><div>{R('initialVol','Entry IV (both legs)',10,50,1,'%')}{R('residualVol','Residual far-leg IV',5,60,1,'%')}{R('terminal','Price at near expiry',40,160)}</div></div>
 <Stats items={[["Initial net debit",selected.debit,"ต่อหน่วย"],["Terminal spread value",selected.terminalValue,"มูลค่าหลังขาสั้นหมดอายุ"],["Financed P&L",selected.pnl,"หลังหักทุนและดอกเบี้ย"]]}/><Plot title="Calendar terminal value and financed P&L" xLabel="Spot at near expiry" yLabel="Price units" series={[{name:'P&L · เส้นทึบ',values:xs.map(s=>[s,at(s).pnl])},{name:'Terminal value · เส้นประ',values:xs.map(s=>[s,at(s).terminalValue])}]} markers={[{x:p.terminal,y:selected.pnl}]}/></Shell>;
}
export function IVShiftLab(){
 const [p,R,set,reset]=useParams({spot:100,nearShift:0,farShift:0});
 const args={spot:p.spot,shortShift:p.nearShift/100,longShift:p.farShift/100},selected=ivShift(args),xs=grid(-10,10),at=x=>ivShift({...args,longShift:x/100});
 return <Shell title="Two-leg IV shock explorer" question="ถ้า IV ขาใกล้กับขาไกลเปลี่ยนไม่เท่ากัน Net Vega ตัวเดียวพอหรือไม่?" reset={reset} note="Call calendar: K=100, 30/180 วัน, r=2%, เริ่ม near IV=24%, far IV=21% ช็อก IV ทันทีโดย Spot และเวลาคงที่ ΔV แบบเส้นตรง = Vega_long × ΔIV_long − Vega_short × ΔIV_short; exact คือส่วนต่างราคา BSM ก่อน/หลังช็อก ไม่ใช่ราคาตลาด">
 <div className="controls two"><div>{R('spot','IV-shock spot',80,120)}{R('nearShift','Near IV change',-10,10,.5,' pp')}</div><div>{R('farShift','Far IV change',-10,10,.5,' pp')}<p>IV หลังช็อก: near {format(24+p.nearShift,1)}% · far {format(21+p.farShift,1)}%</p></div></div>
 <Stats items={[["Exact Δ value",selected.exact,"คำนวณราคาใหม่"],["Vega estimate",selected.linear,"ประมาณอันดับหนึ่ง"],["Nonlinear difference",selected.exact-selected.linear,"Exact − Vega estimate"]]}/><Plot title="Exact repricing vs linear Vega" xLabel="Far IV change (pp)" yLabel="Change in value" series={[{name:'Exact BSM · เส้นทึบ',values:xs.map(x=>[x,at(x).exact])},{name:'Vega estimate · เส้นประ',values:xs.map(x=>[x,at(x).linear])}]} markers={[{x:p.farShift,y:selected.exact}]}/></Shell>;
}
export function CarryLab(){
 const [p,R,set,reset]=useParams({spot:100,iv:20,rv:20});
 const args={spot:p.spot,iv:p.iv/100,rv:p.rv/100},selected=hedgeCarry(args),xs=grid(5,60),at=x=>hedgeCarry({...args,rv:x/100});
 return <Shell title="Theta–Gamma & volatility spread" question="หลัง Delta hedge แล้ว IV−RV สัมพันธ์กับกำไรขาดทุนเฉพาะจุดอย่างไร?" reset={reset} note="K=100, 30/180 วัน, r=2%; IV ของทั้งสองขาเท่ากันและคงที่ ใช้ ½Γ_net S²(RV²−IV²)/365 โดยถือ Gamma คงที่เฉพาะหนึ่งวัน รวม financing ภายใต้ continuous Delta hedge ไม่มีต้นทุน/การกระโดดของราคา/IV shock ไม่ใช่ backtest และไม่ควรคูณต่อเป็นผลตอบแทนระยะยาว">
 <div className="controls two"><div>{R('spot','Hedged spot',80,120)}{R('iv','Pricing IV',5,60,1,'%')}</div><div>{R('rv','Scenario RV',5,60,1,'%')}<p>ลองเลื่อน Spot ออกจาก ATM เพื่อดูว่าเครื่องหมาย Net Gamma เปลี่ยนหรือไม่</p></div></div>
 <Stats items={[["Net Gamma",format(selected.gamma,5),"ต่อราคา²"],["IV carry",selected.carry,"หลัง financing · ต่อวัน"],["RV contribution",selected.realized,"พจน์ Gamma · ต่อวัน"],["Total local P&L",selected.total,"ค่าประมาณต่อวัน"]]}/><Plot title="One-day local delta-hedged P&L" xLabel="Scenario RV (%)" yLabel="Price units / day" digits={3} series={[{name:'Local P&L · เส้นทึบ',values:xs.map(x=>[x,at(x).total])},{name:'Zero · เส้นประ',values:xs.map(x=>[x,0])}]} markers={[{x:p.rv,y:selected.total}]}/></Shell>;
}
export function DecayLab(){
 const [p,R,set,reset]=useParams({spot:100,nearIV:20,farIV:20,elapsed:0});
 const args={spot:p.spot,shortVol:p.nearIV/100,longVol:p.farIV/100},xs=grid(0,30,61),at=t=>spreadValue({...args,elapsed:t}),initial=at(0).net,selected=at(p.elapsed),profit=selected.net-initial*Math.exp(.02*p.elapsed/365);
 return <Shell title="Watch time decay" question="ถ้าราคาและ IV หยุดนิ่ง ขาไหนเสื่อมเร็วกว่า และมูลค่าสุทธิเปลี่ยนอย่างไร?" reset={reset} note="K=100, เริ่ม 30/180 วัน, r=2%; Long far Call − Short near Call ไม่มีปันผล ทุกจุดตรึง Spot และ IV ของแต่ละขาไว้ จึงเป็นสถานการณ์แบบ all else equal ไม่ใช่เส้นทางราคาหรือค่าคาดหวังในอนาคต สิ้นสุดที่ขาสั้นหมดอายุ; P&L หักดอกเบี้ยของทุนเริ่มต้น ไม่รวมค่าธรรมเนียม">
 <div className="controls two"><div>{R('spot','Frozen spot',80,120)}{R('elapsed','Elapsed days',0,30,1,' days')}</div><div>{R('nearIV','Frozen near IV',5,50,1,'%')}{R('farIV','Frozen far IV',5,50,1,'%')}</div></div>
 <Stats items={[["Remaining days",`${30-p.elapsed} / ${180-p.elapsed}`,"near / far"],["Net value",selected.net,"Long − Short"],["Financed P&L",profit,"เทียบทุน ณ วันเริ่มต้น"]]}/><Plot title="Option values through time at frozen spot and IV" xLabel="Elapsed days" yLabel="Option value" series={[{name:'Far Call · เส้นทึบ',values:xs.map(t=>[t,at(t).long])},{name:'Near Call · เส้นประ',values:xs.map(t=>[t,at(t).short])},{name:'Net spread · เส้นจุด',values:xs.map(t=>[t,at(t).net])}]} markers={[{x:p.elapsed,y:selected.net}]}/></Shell>;
}
