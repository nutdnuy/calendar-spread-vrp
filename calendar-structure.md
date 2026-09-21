---
title: Calendar & VRP
description: โครงสร้าง Calendar Spread และ Volatility Risk Premium
inline_math: true
---

# Calendar & VRP

<p class="lead">ประกอบ Long option อายุไกลกับ Short option อายุใกล้ แล้วติดตาม Net Greeks และส่วนต่าง IV − RV</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

### กลยุทธ์ Calendar Spread

กลยุทธ์ Calendar Spread ศึกษาอย่างกว้างขวางในงานวิจัยออปชั่นโดย Natenberg (Natenberg 1994) ชี้ว่ากลยุทธ์นี้ได้ประโยชน์สูงสุด เมื่อตำแหน่ง ATM (at-the-money) และ IV กำลังลดลงหลังจากสูงขึ้น. Cahill (Cahill 2020) แสดงให้เห็นว่าเมื่อใช้ Rolling Calendar Spread ที่ขาสั้นอายุ 30 วัน และขายาวอายุ 6 เดือน สามารถให้ผลตอบแทนที่สม่ำเสมอ ภายใต้สภาวะตลาดปกติ.

### Volatility Risk Premium

Carr and Wu (Carr and Wu 2009) ศึกษา VRP และพบว่า IV เฉลี่ยสูงกว่า RV ประมาณ 3–5% สำหรับออปชั่น S&P 500 ซึ่งเป็นแหล่งกำไรสำหรับกลยุทธ์ Short Volatility. อย่างไรก็ตาม ในช่วงวิกฤตตลาด เช่น VIX spike VRP อาจกลับทิศทางชั่วคราว ทำให้กลยุทธ์ Long Volatility มีข้อได้เปรียบ.

รูปที่ 1 แสดงพฤติกรรมของ IV, RV และ VRP ที่จำลองด้วย Geometric Brownian Motion (GBM) สังเกตว่าโดยทั่วไป IV ลู่เข้า (converge) หา RV เป็นส่วนใหญ่ แต่จะลู่ออก (diverge) ชั่วคราวเมื่อเกิด event risk ที่ทำให้ IV พุ่งสูง ซึ่งเป็นโอกาสสำหรับกลยุทธ์ Calendar Spread.

<figure class="source-figure" id="fig:vrp_sim" data-latex-placement="H">
<img src="assets/images/source-figures/fig9_vrp_simulation.png" alt="การจำลอง IV, RV และ Volatility Risk Premium ตลอดสองปี" />
<figcaption>การจำลอง Implied Volatility (IV), Realized Volatility (RV) และ Volatility Risk Premium (VRP = IV <span class="math inline">−</span> RV) ด้วย Geometric Brownian Motion บนช่วงเวลา 2 ปี พื้นที่แรเงาสีเข้ม = VRP<span class="math inline">&gt;</span>0 (IV<span class="math inline">&gt;</span>RV), สีอ่อน = VRP<span class="math inline">&lt;</span>0 (RV<span class="math inline">&gt;</span>IV). <em>หมายเหตุ: เป็นข้อมูลจำลอง ไม่ใช่ข้อมูลตลาดจริง.</em></figcaption>
</figure>

### โครงสร้างกลยุทธ์ Calendar Spread

กลยุทธ์ Calendar Spread มีโครงสร้างพื้นฐานดังนี้:

- **SHORT**: ขายออปชั่น Call/Put อายุสั้น (near-term expiration)

- **LONG**: ซื้อออปชั่น Call/Put อายุยาว (far-term expiration)

- ราคาใช้สิทธิ (strike price) ของทั้งสองขาต้องเท่ากัน

#### Payoff ของกลยุทธ์ ณ วันหมดอายุของขาสั้น

เมื่อขา SHORT หมดอายุที่เวลา $T_S$ กำไร-ขาดทุน (P&L) ของกลยุทธ์คือ: $$\begin{equation}
  \begin{split}
    \text{P\&L}(S_{T_S}) &= \underbrace{C\!\left(S_{T_S},K,T_L - T_S,r,\sigma\right)}_{\text{มูลค่าขา LONG ที่เหลือ}} \\
    &\quad - \underbrace{\max(S_{T_S}-K,\,0)}_{\text{ขาดทุนจากขา SHORT}} - \underbrace{C_0}_{\text{ต้นทุนเริ่มต้น}},
  \end{split}
  \label{eq:payoff}
\end{equation}$$ โดยที่ $C_0 = C(S_0,K,T_L,r,\sigma) - C(S_0,K,T_S,r,\sigma)$ คือ net debit ที่จ่ายเมื่อเข้าสถานะ. รูปที่ 4 แสดง Payoff ของ Calendar Spread ซึ่งมีลักษณะ “hump” บวกที่ ATM และลดลงเมื่อ $S_{T_S}$ ห่างจาก $K$.

<figure class="source-figure" id="fig:payoff" data-latex-placement="H">
<img src="assets/images/source-figures/fig8_payoff.png" alt="Payoff ของ Calendar Spread ณ วันหมดอายุขาสั้น" />
<figcaption>Payoff ของ Calendar Spread ณ วันหมดอายุของขา SHORT (<span class="math inline"><em>T</em><sub><em>S</em></sub> = 30</span> วัน, <span class="math inline"><em>T</em><sub><em>L</em></sub> = 180</span> วัน, <span class="math inline"><em>K</em> = 100</span>, <span class="math inline"><em>σ</em><sub>0</sub> = 20%</span>) ที่ระดับ Residual Volatility (<span class="math inline"><em>σ</em><sub>rem</sub></span>) ต่างกัน. Payoff สูงสุดที่ ATM และลดลงเมื่อราคาออกห่างจาก <span class="math inline"><em>K</em></span>.</figcaption>
</figure>

ผลของค่ากรีกรวม (Net Greek) ของกลยุทธ์: $$\begin{align}
  \Delta_{\text{net}} &= \Delta_{\text{LONG}} - \Delta_{\text{SHORT}} \approx 0
    \quad \text{(ใกล้ศูนย์ที่ ATM)}, \\
  \Gamma_{\text{net}} &= \Gamma_{\text{LONG}} - \Gamma_{\text{SHORT}} < 0, \\
  \Theta_{\text{net}} &= \Theta_{\text{LONG}} - \Theta_{\text{SHORT}} > 0, \\
  \nu_{\text{net}}    &= \nu_{\text{LONG}}    - \nu_{\text{SHORT}}    > 0.
\end{align}$$
