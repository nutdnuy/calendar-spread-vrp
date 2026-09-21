---
title: Results & Discussion
description: ผลการทดลอง Theta, Gamma และ Net Greeks ตาม VRP regime
inline_math: true
---

# Results & Discussion

<p class="lead">อ่านผลของอายุสัญญา Volatility และ Moneyness ก่อนสรุปว่า Theta หรือ Gamma เด่นในแต่ละระบอบ</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## ผลการทดลองและการอภิปราย (Results and Discussion)

### พฤติกรรมของ $\Theta$ ในกลยุทธ์ Calendar Spread

#### ผลของอายุสัญญาต่อ $\Theta$

รูปที่ 5 แสดงค่า $\Theta$ เทียบกับวันที่เหลือจนถึงวันหมดอายุ ที่อายุสัญญาเริ่มต้น ($T_0$) ต่างกัน แกน $x$ เรียงจากซ้าย (วันซื้อ) ไปสิ้นสุดที่ 0 วัน (วันหมดอายุ) ทางขวา ผลการคำนวณยืนยันว่า $\Theta$ มีค่าสูงสุด (ค่าสัมบูรณ์) เมื่อออปชั่นใกล้หมดอายุ (ด้านขวาของกราฟ) และลดลงเมื่อมีเวลาเหลืออีกนาน นอกจากนี้ ที่จำนวนวันเหลือ เท่ากัน ออปชั่นที่มี $T_0$ สั้นกว่าจะมี $|\Theta|$ สูงกว่าออปชั่นที่มี $T_0$ ยาวกว่าเสมอ ซึ่งเป็นผลโดยตรงจากความสัมพันธ์ $|\Theta| \propto 1/\sqrt{T}$.

<figure class="source-figure" id="fig:theta_T" data-latex-placement="t">
<img src="assets/images/source-figures/fig1_theta_vs_T.png" alt="Theta เทียบกับเวลาคงเหลือและสัดส่วนอายุสัญญาที่ผ่านไป" />
<figcaption> <strong>(a) Days to Expiration:</strong> แต่ละเส้นแทนออปชั่นที่มีอายุสัญญาเริ่มต้น <span class="math inline"><em>T</em><sub>0</sub></span> ต่างกัน เส้นเริ่มจากซ้าย (วันที่ซื้อ) และสิ้นสุดที่ 0 วัน (วันหมดอายุ) ทางขวา เส้นที่สั้นกว่าจึงเริ่มต้นทางขวามากกว่า ทำให้บางส่วนทับซ้อนกันในช่วง วันที่เหลือน้อย (ซึ่งเป็นคุณสมบัติที่ถูกต้องของสูตร BSM ไม่ใช่ข้อผิดพลาด) <strong>(b) Fraction of Life Elapsed:</strong> แกน <span class="math inline"><em>x</em></span> แสดงสัดส่วน <em>อายุที่ผ่านไปแล้ว</em> ของออปชั่นแต่ละตัว นิยามคือ <span class="math inline">FLE = (<em>T</em><sub>0</sub> − <em>T</em><sub>rem</sub>)/<em>T</em><sub>0</sub> ∈ [0%, 100%)</span> โดย 0% คือวันซื้อ และ <span class="math inline">≈</span>100% คือใกล้หมดอายุ การแสดงผลแบบนี้ทำให้ ออปชั่นทุกอายุเริ่มต้นที่ 0% พร้อมกัน เห็นได้ชัดว่า <span class="math inline"><em>T</em><sub>0</sub></span> สั้นกว่า ส่งผลให้ <span class="math inline">|<em>Θ</em>|</span> เพิ่มขึ้นเร็วกว่าตามสัดส่วน (<span class="math inline"><em>σ</em> = 20%</span>, ATM, <span class="math inline"><em>S</em> = <em>K</em> = 100</span>).</figcaption>
</figure>

สำหรับกลยุทธ์ Calendar Spread สัญญาขา SHORT ที่มีวันหมดอายุ 30 วัน จะมี $\Theta$ สูงกว่าขา LONG ที่มีอายุ 180 วันอย่างมีนัยสำคัญ ทำให้ $\Theta_{net}$ ของพอร์ตโฟลิโอเป็นบวก ($\Theta_{\text{net}} > 0$) ซึ่งเป็นข้อได้เปรียบหลักของกลยุทธ์นี้ในสภาวะปกติ.

#### ผลของความผันผวนต่อ $\Theta$

รูปที่ 6 แสดงผลกระทบของความผันผวน ($\sigma$) ในระดับต่างกันต่อค่า $\Theta$ ที่อายุสัญญา 90 วัน. เมื่อ $\sigma$ สูงขึ้น ค่าสัมบูรณ์ของ $\Theta$ เพิ่มขึ้น สอดคล้องกับสูตร [eq:theta_bsm] ที่มีพจน์ $S\,N'(d_1)\,\sigma$ ซึ่งแปรผันตรงกับ $\sigma$.

<figure class="source-figure" id="fig:theta_vol" data-latex-placement="H">
<img src="assets/images/source-figures/fig2_theta_vs_vol.png" alt="Theta เทียบกับวันคงเหลือที่ระดับความผันผวนต่างกัน" />
<figcaption>Theta (<span class="math inline"><em>Θ</em></span>) เทียบกับวันที่เหลือจนถึงวันหมดอายุ ที่ความผันผวน <span class="math inline"><em>σ</em></span> ต่างกัน (T = 90 วัน, ATM)</figcaption>
</figure>

ข้อสังเกตสำคัญคือช่วงเวลาที่เหมาะสมที่สุดสำหรับการทำกลยุทธ์ Calendar Spread คือช่วงที่ Vol สูงกำลังจะลดลง ($IV$ ลดลงสู่ระดับ $RV$) **ไม่ใช่** ก่อนที่ Vol จะพุ่งสูง เนื่องจากสถานะ $\nu_{net}$ บวก ($\nu_{\text{net}} > 0$) ทำให้กำไรเมื่อ IV ลดลงหลังจากสูงสุดแล้ว.

#### ผลของราคาใช้สิทธิ (Strike Price) ต่อ $\Theta$ (Moneyness Effect)

นอกจากอายุสัญญาและความผันผวนแล้ว ราคาใช้สิทธิ ($K$) หรือระดับ *Moneyness* ยังส่งผลสำคัญต่อค่า $\Theta$ รูปที่ 7 แสดงความสัมพันธ์ระหว่าง $\Theta$ กับ $K$ ที่ $\sigma$ ต่างกัน (อายุสัญญา 90 วัน, $S=100$):

<figure class="source-figure" id="fig:theta_K" data-latex-placement="H">
<img src="assets/images/source-figures/fig10_theta_vs_K.png" alt="Theta เทียบกับราคาใช้สิทธิและระดับ Moneyness" />
<figcaption>Theta (<span class="math inline"><em>Θ</em></span>) เทียบกับ Strike Price (<span class="math inline"><em>K</em></span>) ที่ความผันผวน <span class="math inline"><em>σ</em></span> ต่างกัน (<span class="math inline"><em>T</em> = 90</span> วัน, <span class="math inline"><em>S</em> = 100</span>) พื้นที่แรเงาระบุระดับ Moneyness: Deep ITM, ITM, ATM, OTM, Deep OTM</figcaption>
</figure>

จากรูปพบข้อสังเกตสำคัญสามประการ:

1.  **ค่า $|\Theta|$ สูงสุดที่สถานะ ATM:** เมื่อราคาสินทรัพย์ใกล้ราคาใช้สิทธิ ($S \approx K$) จะได้ $d_1 \approx 0$ ซึ่งทำให้ความหนาแน่น $N'(d_1)$ มีค่าสูงสุด เท่ากับ $1/\sqrt{2\pi}$ ด้วยเหตุนี้ค่าเสื่อมของเวลาจึงรุนแรงที่สุด ที่จุด ATM กล่าวคือ $\arg\max_{K}|\Theta(K)| \approx S$ โดยมีขนาด $$|\Theta|_{\text{ATM}} \approx \frac{S\,\sigma}{2\sqrt{2\pi T}}.$$

2.  **ค่า $|\Theta|$ ลดลงสู่ศูนย์เมื่อออปชั่นอยู่ลึกในสถานะ OTM หรือ ITM:** เมื่อราคาใช้สิทธิห่างจากราคาสินทรัพย์มากขึ้นจน $|\ln(K/S)| \to \infty$ ทั้ง $d_1$ และ $d_2$ จะเบนออกไปสู่ $\pm\infty$ ส่งผลให้ $N'(d_1) \to 0$ มูลค่าเวลา (time value) ของออปชั่นจึงเหลือน้อยและการเสื่อมของเวลาช้าลงจนกระทั่ง $|\Theta| \to 0$.

3.  **ความผันผวนที่สูงขึ้นทำให้โปรไฟล์ $|\Theta|$ แผ่กว้าง:** ความกว้างของโปรไฟล์ $|\Theta|$ เมื่อพิจารณาเทียบกับ $\ln(K/S)$ แปรผันตาม $\sigma\sqrt{T}$ ดังนั้นแม้ค่ายอดที่ ATM จะเพิ่มขึ้นตาม $\sigma$ ($|\Theta|_{\text{ATM}} \propto \sigma$) แต่ความแตกต่าง ระหว่างสถานะ ATM กับ OTM/ITM กลับแคบลง เพราะมวลความน่าจะเป็น (probability mass) กระจายตัวกว้างขึ้น สะท้อนผ่านอัตราส่วน $|\Theta|_{\text{ATM}}/|\Theta|_{\text{OTM}}$ ที่ลดลงเมื่อ $\sigma$ เพิ่มขึ้น.

สำหรับ Calendar Spread การเลือก $K \approx S$ (ATM) จึงทำให้ $\Theta_{\text{SHORT}} - \Theta_{\text{LONG}}$ มีค่ามากที่สุด ส่งผลให้ $\Theta_{net}$ ของพอร์ตโฟลิโอสูงสุด อย่างไรก็ตาม ที่ ATM ยังเป็นจุดที่ $\Gamma_{net}$ เป็นลบมากที่สุดด้วย ดังนั้นผู้ลงทุนต้องชั่งน้ำหนักระหว่าง $\Theta$-decay กับความเสี่ยงจาก การเคลื่อนไหวของราคาสินทรัพย์.

### พฤติกรรมของ $\Gamma$ ในกลยุทธ์ Calendar Spread

ในกลยุทธ์ Calendar Spread สถานะ $\Gamma_{net}$ เป็นลบ ($\Gamma_{\text{net}} < 0$) เนื่องจาก $\Gamma_{\text{SHORT}} > \Gamma_{\text{LONG}}$ ที่ ATM ตามความสัมพันธ์ [eq:gamma_inv_T]: $\Gamma \propto 1/\sqrt{T}$ ทำให้สัญญาอายุสั้นมี $\Gamma$ สูงกว่าที่ ATM เสมอ ซึ่งหมายความว่าการเคลื่อนไหวของราคาสินทรัพย์อ้างอิงอย่างรวดเร็วจะส่งผลเสียต่อกลยุทธ์นี้.

#### ผลของความผันผวนต่อ $\Gamma$

รูปที่ 8 แสดงว่าเมื่อ $\sigma$ สูงขึ้น กราฟ $\Gamma$ จะราบเรียบขึ้นและค่าสูงสุดที่ ATM ลดลง ในทางตรงกันข้ามเมื่อ $\sigma$ ต่ำ กราฟ $\Gamma$ จะแหลมชันมากยิ่งขึ้น. นัยของเรื่องนี้คือ ในสภาวะที่ IV สูง (กรณี IV $>$ RV) $\Gamma$ ของขา SHORT ที่ ATM ลดลงสัมพัทธ์กับสภาวะ IV ต่ำ ทำให้ $\Gamma_{net}$ มีผลกระทบน้อยลง และ $\Theta$ มีบทบาทมากขึ้น.

<figure class="source-figure" id="fig:gamma_vol" data-latex-placement="H">
<img src="assets/images/source-figures/fig4_gamma_vs_vol.png" alt="Gamma เทียบกับราคาใช้สิทธิที่ระดับความผันผวนต่างกัน" />
<figcaption>รูปแบบ (profile) ของ <span class="math inline"><em>Γ</em></span> เทียบกับราคาใช้สิทธิ (<span class="math inline"><em>K</em></span>): <span class="math inline"><em>σ</em></span> สูงทำให้ peak ที่ ATM ต่ำลงและกว้างขึ้น (T = 90 วัน, S = 100)</figcaption>
</figure>

### การวิเคราะห์ผลรวมของค่ากรีกตามสภาวะ VRP

รูปที่ 9 แสดง $\nu_{net}$ และ $\Theta_{net}$ ของ Calendar Spread ตามราคาใช้สิทธิต่าง ๆ โดย $\Theta_{net}$ เป็นบวกและพุ่งสูงสุดแหลมที่ ATM ส่วน $\nu_{net}$ เป็นบวกตลอดทุกราคาใช้สิทธิเช่นกัน ยืนยันว่ากลยุทธ์ได้ประโยชน์ทั้งจากค่าเสื่อมเวลา (time decay) และการเพิ่มขึ้นของ IV อย่างไรก็ตาม รูปร่างของ $\nu_{net}$ มีลักษณะเฉพาะที่ต่างจาก $\Theta_{net}$ อย่างชัดเจน ดังอภิปรายต่อไปนี้.

<figure class="source-figure" id="fig:net_greek" data-latex-placement="t">
<img src="assets/images/source-figures/fig7_calendar_net.png" alt="Net Vega และ Net Theta ของ Calendar Spread เทียบกับราคาใช้สิทธิ" />
<figcaption><span class="math inline"><em>ν</em><sub><em>n</em><em>e</em><em>t</em></sub></span> และ <span class="math inline"><em>Θ</em><sub><em>n</em><em>e</em><em>t</em></sub></span> (<span class="math inline"> = LONG − SHORT</span>) ของ Calendar Spread เทียบกับราคาใช้สิทธิ (T<sub>SHORT</sub> = 30 วัน, T<sub>LONG</sub> = 180 วัน, <span class="math inline"><em>σ</em> = 20%</span>, S = 100)</figcaption>
</figure>

#### เหตุใด $\nu_{net}$ จึงมีรอยบุ๋มที่ ATM และยอดเยื้องไปฝั่ง OTM

Vega ของออปชั่นขาเดียว $\nu = S\sqrt{T}\,N'(d_1)$ เป็นเส้นโค้งระฆัง (bell curve) ในแกน $\ln(S/K)$ ซึ่งมีทั้งความสูงของยอด $\propto\sqrt{T}$ และความกว้าง $\propto\sigma\sqrt{T}$ ดังนั้นขา LONG ($T_L=180$ วัน) จึงให้ระฆังที่ทั้ง *สูงและกว้าง* ขณะที่ขา SHORT ($T_S=30$ วัน) ให้ระฆังที่ *เตี้ยและแคบ* กระจุกตัวที่ ATM เมื่อนำมาหักลบเป็น $\nu_{net}=\nu_{\text{LONG}}-\nu_{\text{SHORT}}$ จึงเกิดลักษณะสำคัญสามประการ ซึ่งเห็นได้จากค่าตัวเลขในตารางที่ 9:

1.  $\nu_{net}>0$ ทุกราคาใช้สิทธิ เนื่องจาก $\sqrt{T_L/T_S}=\sqrt{6}\approx2.45$ ทำให้ขา LONG ครอบงำขา SHORT เสมอ จึงเป็นที่มาของสถานะ “long volatility”.

2.  เกิด*รอยบุ๋ม* (notch) ที่ ATM เพราะระฆังแคบของขา SHORT มียอดสูงสุด ตรง ATM พอดี การหักลบจึงเซาะยอดของ $\nu_{net}$ ลง สังเกตว่าที่ $K=100$ ค่า $\nu_{net}=16.32$ ต่ำกว่าค่าที่ $K=95$ และ $K=105$ เล็กน้อย.

3.  ยอดสูงสุดจริงเยื้องไปฝั่ง OTM ($K\approx110$) เพราะ ณ จุดนั้นระฆังแคบ ของขา SHORT ดับไปแล้ว แต่ระฆังกว้างของขา LONG ยังสูงอยู่ ประกอบกับยอด vega ของแต่ละขาตั้งอยู่ที่ $K=S\,e^{(r+\frac{1}{2}\sigma^2)T}>S$ โปรไฟล์จึงเอียงไปทางราคาใช้สิทธิสูง.

ลักษณะนี้ตรงข้ามกับ $\Theta_{net}$ ที่พุ่งสูงสุดแหลมที่ ATM ดังนั้นการเลือก $K\approx S$ จึงให้ Theta สูงสุดแต่ Vega กลับย่อลงเล็กน้อย ซึ่งเป็นข้อพิจารณา สำคัญในการเลือกราคาใช้สิทธิให้เหมาะกับเป้าหมายว่าต้องการเน้น time decay หรือ vega exposure.

<table>
<caption>ค่า Vega ของแต่ละขาและ <span class="math inline"><em>ν</em><sub><em>n</em><em>e</em><em>t</em></sub></span> ของ Calendar Spread เทียบกับ ราคาใช้สิทธิ (<span class="math inline"><em>S</em> = 100</span>, <span class="math inline"><em>σ</em> = 20%</span>, <span class="math inline"><em>r</em> = 2%</span>, <span class="math inline"><em>T</em><sub><em>S</em></sub> = 30</span> วัน, <span class="math inline"><em>T</em><sub><em>L</em></sub> = 180</span> วัน) คำนวณด้วยโค้ดในภาคผนวก 7</caption>
<thead>
<tr>
<th style="text-align: right;"><span class="math inline"><em>K</em></span></th>
<th style="text-align: right;"><span class="math inline"><em>ν</em><sub>LONG</sub></span></th>
<th style="text-align: right;"><span class="math inline"><em>ν</em><sub>SHORT</sub></span></th>
<th style="text-align: right;"><span class="math inline"><em>ν</em><sub><em>n</em><em>e</em><em>t</em></sub></span></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: right;">80</td>
<td style="text-align: right;">6.28</td>
<td style="text-align: right;">0.00</td>
<td style="text-align: right;">6.28</td>
</tr>
<tr>
<td style="text-align: right;">85</td>
<td style="text-align: right;">12.07</td>
<td style="text-align: right;">0.17</td>
<td style="text-align: right;">11.90</td>
</tr>
<tr>
<td style="text-align: right;">90</td>
<td style="text-align: right;">18.84</td>
<td style="text-align: right;">1.90</td>
<td style="text-align: right;">16.94</td>
</tr>
<tr>
<td style="text-align: right;">95</td>
<td style="text-align: right;">24.65</td>
<td style="text-align: right;">7.27</td>
<td style="text-align: right;">17.38</td>
</tr>
<tr>
<td style="text-align: right;">100 (ATM)</td>
<td style="text-align: right;">27.74</td>
<td style="text-align: right;">11.42</td>
<td style="text-align: right;"><strong>16.32</strong></td>
</tr>
<tr>
<td style="text-align: right;">105</td>
<td style="text-align: right;">27.42</td>
<td style="text-align: right;">8.35</td>
<td style="text-align: right;">19.07</td>
</tr>
<tr>
<td style="text-align: right;">110</td>
<td style="text-align: right;">24.24</td>
<td style="text-align: right;">3.16</td>
<td style="text-align: right;"><strong>21.08</strong></td>
</tr>
<tr>
<td style="text-align: right;">115</td>
<td style="text-align: right;">19.44</td>
<td style="text-align: right;">0.67</td>
<td style="text-align: right;">18.77</td>
</tr>
<tr>
<td style="text-align: right;">120</td>
<td style="text-align: right;">14.33</td>
<td style="text-align: right;">0.09</td>
<td style="text-align: right;">14.25</td>
</tr>
</tbody>
</table>

ตารางที่ [tab:vrp_summary] สรุปผลของค่ากรีกในกลยุทธ์ Calendar Spread ภายใต้สภาวะ VRP ทั้งสองกรณี:

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>VRP</strong></th>
<th style="text-align: left;"><strong>leg</strong></th>
<th colspan="2" style="text-align: center;"><span class="math inline"><strong>Δ</strong></span></th>
<th colspan="2" style="text-align: center;"><span class="math inline"><strong>Γ</strong></span></th>
<th colspan="2" style="text-align: center;"><span class="math inline"><strong>Θ</strong></span></th>
<th colspan="2" style="text-align: center;"><span class="math inline"><strong>ν</strong></span> (Vega)</th>
<th style="text-align: left;"><strong>Net</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;"><span>3-4</span>(lr)<span>5-6</span>(lr)<span>7-8</span>(lr)<span>9-10</span></td>
<td style="text-align: left;"></td>
<td style="text-align: center;">Sign</td>
<td style="text-align: center;">Effect</td>
<td style="text-align: center;">Sign</td>
<td style="text-align: center;">Effect</td>
<td style="text-align: center;">Sign</td>
<td style="text-align: center;">Effect</td>
<td style="text-align: center;">Sign</td>
<td style="text-align: center;">Effect</td>
<td style="text-align: left;"></td>
</tr>
<tr>
<td rowspan="2" style="text-align: left;"><span class="math inline"><em>I</em><em>V</em> &gt; <em>R</em><em>V</em></span></td>
<td style="text-align: left;">SHORT</td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(±)</span></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"><span class="math inline">(+ + +)</span></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td rowspan="2" style="text-align: left;"><strong><span class="math inline">(+ + +) <em>Θ</em></span> (D)</strong></td>
</tr>
<tr>
<td style="text-align: left;">LONG</td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td rowspan="2" style="text-align: left;"><span class="math inline"><em>I</em><em>V</em> &lt; <em>R</em><em>V</em></span></td>
<td style="text-align: left;">SHORT</td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(±)</span></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(− − −)</span></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"><span class="math inline">(− − −)</span></td>
<td rowspan="2" style="text-align: left;"><strong><span class="math inline">(− − −) <em>Γ</em></span> (D), <span class="math inline"><em>ν</em>(+ + +)</span></strong></td>
</tr>
<tr>
<td style="text-align: left;">LONG</td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(−)</span></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"><span class="math inline">(+)</span></td>
<td style="text-align: center;"></td>
</tr>
</tbody>
</table>

*หมายเหตุ:* $(\pm)$ = ผลกระทบน้อย (Net $\Delta \approx 0$ เนื่องจาก ATM ทั้งสองขา); $(+)/(-)$ = ผลเล็กน้อยบวก/ลบ; $(+\!+\!+)/(-\!-\!-)$ = ผลมีนัยสำคัญบวก/ลบต่อกลยุทธ์.
*หลักการ:* IV$>$RV $\Rightarrow$ RV ต่ำ $\Rightarrow$ การเคลื่อนไหวจริงน้อย $\Rightarrow$ Short $\Gamma$ มีผลลบน้อย $(+)$; IV สูง $\Rightarrow$ $\Theta$ สูง $(+\!+\!+)$; Net $\nu>0$ แต่ IV อาจย่อตัว $(-)$.
IV$<$RV $\Rightarrow$ RV สูง $\Rightarrow$ การเคลื่อนไหวจริงมาก $\Rightarrow$ Short $\Gamma$ เสียหายหนัก $(-\!-\!-)$; IV ต่ำแต่ $\Theta>0$ ยังเล็กน้อย $(+)$; Net $\nu>0$ และ IV อาจฟื้น $(+\!+\!+)$.

#### กรณี $IV > RV$: $\Theta$ มีบทบาทโดดเด่น (Dominant)

เมื่อ IV สูงกว่า RV สมการ [eq:gamma_pnl] ให้ $d\Pi > 0$ ทันที เนื่องจาก $\sigma_{\mathrm{RV}}^2 - \sigma_{\mathrm{IV}}^2 < 0$ คูณกับ $\Gamma_{\text{net}} < 0$ ตัวแปรที่มีบทบาทหลักจึงเป็น $\Theta$ โดยมีรายละเอียดดังนี้:

1.  **$\Theta_{net}$ เป็นบวก**: ขา SHORT มี $\Theta$ สูงสุดในสัมบูรณ์ค่า เนื่องจาก IV สูงทำให้ time value ของออปชั่นอายุสั้นสูง และเสื่อมลงอย่างรวดเร็ว.

2.  **$\nu_{net}$ เป็นบวก**: แม้ว่า IV สูงกว่า RV แต่ขา LONG มี $\nu$ สูงกว่าขา SHORT เสมอ ($\nu_{\text{LONG}} > \nu_{\text{SHORT}}$) เมื่อ IV ลดลงหลังจากสูงสุด $\nu_{net}$ ที่เป็นบวกทำให้กลยุทธ์ได้กำไร.

3.  ผู้ลงทุนควรทำกลยุทธ์นี้ **ขณะที่** IV สูงและกำลังจะลดลง ไม่ใช่ก่อนที่ IV จะพุ่งขึ้น เพราะ $\Gamma_{net}$ ที่เป็นลบจะสร้างความเสียหาย ในช่วงที่ตลาดผันผวนสูง.

#### กรณี $RV > IV$: $\Gamma$ มีบทบาทโดดเด่น (Dominant)

เมื่อ RV สูงกว่า IV (ตลาดเคลื่อนไหวมากกว่าที่ IV บ่งชี้) สมการ [eq:gamma_pnl] กลับเครื่องหมายเป็น $d\Pi < 0$ เพราะ $\sigma_{\mathrm{RV}}^2 - \sigma_{\mathrm{IV}}^2 > 0$ ตัวแปรหลักจึงเป็น $\Gamma$:

1.  **$\Gamma_{net}$ เป็นลบ**: ขา SHORT มี $\Gamma$ สูงที่ ATM ทำให้ $\Gamma_{net}$ ติดลบ เมื่อ RV สูง (ราคาเคลื่อนไหวมาก) ผลของ Negative Gamma ทำให้กลยุทธ์ขาดทุน.

2.  **$\nu_{net}$ เป็นบวก**: ในกรณี $RV > IV$ มักเป็นสัญญาณว่า IV ยังต่ำอยู่และอาจจะปรับขึ้น ซึ่ง $\nu_{net}$ ที่เป็นบวกจะสร้างกำไรได้ หาก IV ปรับตัวสูงขึ้นในภายหลัง.

3.  ในสภาวะนี้ Positive Gamma ของขา LONG ช่วยบรรเทาผลเสียได้บ้าง เนื่องจาก $\Gamma_{\text{LONG}} > 0$ แม้จะมีค่าน้อยกว่า $\Gamma_{\text{SHORT}}$ ก็ตาม.

### การพิจารณา $\rho$ สำหรับ Rolling Calendar Spread

สำหรับ Rolling Calendar Spread ที่ขาสั้นอายุ 1 เดือน และขายาวอายุ 6 เดือน ผล Rho มีนัยสำคัญมากขึ้นเนื่องจาก $\rho \propto T$: $$\begin{equation}
\begin{split}
  \rho_{\text{net}} &= \rho_{\text{LONG}} - \rho_{\text{SHORT}} \\
  &= K\bigl(T_L\,e^{-rT_L}N(d_{2,L})
     - T_S\,e^{-rT_S}N(d_{2,S})\bigr),
\end{split}
\end{equation}$$ โดยที่ $T_L$ และ $T_S$ คืออายุสัญญาของขา LONG และ SHORT ตามลำดับ สังเกตว่าแต่ละขาถูกคิดลด (discount) ด้วยตัวประกอบ $e^{-rT}$ ของอายุสัญญา ตนเอง ไม่ใช่ตัวประกอบร่วมตัวเดียว เนื่องจาก $T_L \neq T_S$. เมื่ออัตราดอกเบี้ยสูงขึ้น $\rho_{net}$ ที่เป็นบวกจะเพิ่มมูลค่าให้กับ Calendar Spread ของออปชั่น Call แต่ลดมูลค่าในกรณีออปชั่น Put.

## สรุป

บทความนี้วิเคราะห์บทบาทของค่ากรีกในกลยุทธ์ Calendar Spread ภายใต้สภาวะ VRP ที่แตกต่างกัน ผลการศึกษาแสดงว่า:

1.  เมื่อ $IV > RV$: $\Theta$ เป็นค่าที่มีบทบาทโดดเด่น (Dominant) ทำให้ $\Theta_{net}$ เชิงบวกของ Calendar Spread เป็นข้อได้เปรียบหลัก ผู้ลงทุนควรทำกลยุทธ์ ในช่วงที่ IV สูงและเริ่มลดลง

2.  เมื่อ $RV > IV$: $\Gamma$ เป็นพจน์ที่ส่งผลโดดเด่น (Dominant) ทำให้ $\Gamma_{net}$ เชิงลบ เป็นความเสี่ยงหลักที่ต้องระวัง แต่ $\nu_{net}$ เชิงบวก อาจให้ผลตอบแทนในภายหลังหาก IV ปรับสูงขึ้น

3.  ความสัมพันธ์ $\nu_{\text{LONG}} > \nu_{\text{SHORT}}$ และ $|\Theta_{\text{SHORT}}| > |\Theta_{\text{LONG}}|$ ที่ ATM เป็นรากฐานสำคัญที่ทำให้กลยุทธ์ Calendar Spread มีประสิทธิภาพ

4.  $\rho$ มีบทบาทสำคัญในกรณี Rolling Calendar Spread ที่ขายาวมีอายุสัญญา 6 เดือนขึ้นไปหรือในสภาวะดอกเบี้ยผันผวนสูง.

งานวิจัยในอนาคตควรศึกษาผลกระทบของ Volatility Surface (พื้นผิวความผันผวน) และ Implied Volatility Smile ต่อการปรับสมมติฐานของแบบจำลองแบล็ก-โชลส์ในการประเมินค่ากรีกของกลยุทธ์ Calendar Spread เพิ่มเติม.
