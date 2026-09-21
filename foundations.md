---
title: BSM & Risk-neutral
description: Black-Scholes-Merton, PDE, Martingale และ Risk-neutral valuation
inline_math: true
---

# BSM & Risk-neutral

<p class="lead">วางฐานการกำหนดราคาออปชันก่อนใช้ค่ากรีกวิเคราะห์ Calendar Spread</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## บทนำ (Introduction)

ตลาดอนุพันธ์ (derivatives market) เป็นตลาดที่มีความซับซ้อนสูงซึ่งผู้เข้าร่วมตลาดจำเป็นต้องทำความเข้าใจปัจจัยที่ส่งผลต่อราคาออปชั่น (option pricing) อย่างครบถ้วน กลยุทธ์ Calendar Spread เป็นหนึ่งในกลยุทธ์ที่ได้รับความนิยมในหมู่นักลงทุนมืออาชีพ เนื่องจากสามารถสร้างผลตอบแทนที่สม่ำเสมอจากการเสื่อมของมูลค่าเวลา (time value) และความแตกต่างของความผันผวนแฝง (implied volatility) หรือเรียกว่าไอวี (IV) ระหว่างสัญญาออปชั่นที่มีวันหมดอายุต่างกัน (Natenberg 1994).

ปัจจัยสำคัญที่นักลงทุนใช้ในการบริหารความเสี่ยงและประเมินสภาวะของพอร์ตโฟลิโอคือค่ากรีกซึ่งใช้วัดความไวของราคาออปชั่นต่อการเปลี่ยนแปลงของตัวแปรต่าง ๆ ได้แก่ ราคาสินทรัพย์อ้างอิง (underlying price) ความผันผวน (volatility) เวลาที่เหลือถึงวันหมดอายุ (time to expiration) และอัตราดอกเบี้ย (interest rate) การเข้าใจค่ากรีกช่วยให้ผู้ลงทุนสามารถเลือกช่วงเวลาการทำกลยุทธ์ได้อย่างเหมาะสม (Hull 2018).

เบี้ยความเสี่ยงความผันผวน Volatility Risk Premium (VRP) หมายถึงส่วนต่างระหว่าง IV และความผันผวนที่เกิดขึ้นจริง (realized volatility, RV) โดยทั่วไป IV มักสูงกว่า RV อย่างเป็นระบบ เพราะผู้ซื้อออปชั่นยินดีจ่ายเบี้ยส่วนเพิ่มเพื่อประกันความเสี่ยงจากความไม่แน่นอนของตลาด (Carr and Wu 2009). กระนั้นในช่วงที่เกิดเหตุการณ์ที่ตลาดไม่ได้คาดการณ์ไว้ระดับ IV อาจพุ่งสูงผิดปกติจนส่วนต่างนี้กลับทิศและเปิดโอกาสทำกำไรให้แก่กลยุทธ์ที่วางตำแหน่งไว้อย่างเหมาะสม.

บทความนี้มีวัตถุประสงค์เพื่อ (1) อธิบายนิยามและคุณสมบัติทางคณิตศาสตร์ของค่ากรีกแต่ละตัว (2) วิเคราะห์ปฏิสัมพันธ์ระหว่างค่ากรีกในกลยุทธ์ Calendar Spread และ (3) ระบุตัวแปรที่มีบทบาทหลักภายใต้สภาวะ VRP ที่แตกต่างกัน.

## งานวิจัยที่เกี่ยวข้อง (Related Work)

### แบบจำลองแบล็ก-โชลส์-เมอร์ตัน (Black-Scholes-Merton)

แบบจำลอง Black-Scholes-Merton (BSM) พัฒนาโดยแบล็ก-โชลส์ (Black and Scholes 1973) และเมอร์ตัน (Merton 1973) เป็นพื้นฐานของการกำหนดราคาออปชั่น (option pricing) สูตรราคาออปชั่น Call แบบ European มีรูปแบบดังนี้: $$\begin{equation}
  C = S\,N(d_1) - K e^{-rT} N(d_2),
  \label{eq:bsm_call}
\end{equation}$$ โดยที่ $$\begin{align}
  d_1 &= \frac{\ln(S/K) + \bigl(r + \tfrac{1}{2}\sigma^2\bigr)T}
              {\sigma\sqrt{T}}, \label{eq:d1} \\
  d_2 &= d_1 - \sigma\sqrt{T}, \label{eq:d2}
\end{align}$$ และ $N(\cdot)$ คือฟังก์ชันการแจกแจงสะสมของการแจกแจงปกติมาตรฐาน (standard normal CDF), $S$ คือราคาสินทรัพย์อ้างอิง, $K$ คือราคาใช้สิทธิ, $T$ คือระยะเวลาถึงวันหมดอายุ (ปี), $r$ คืออัตราดอกเบี้ยปลอดความเสี่ยง และ $\sigma$ คือความผันผวนของสินทรัพย์อ้างอิง.

รากฐานของแบบจำลองนี้คือสมมติฐานที่ว่าราคาสินทรัพย์อ้างอิงเคลื่อนที่ตาม กระบวนการ Geometric Brownian Motion (GBM) ซึ่งภายใต้มาตรวัดความเสี่ยงเป็นกลาง (risk-neutral measure $\mathbb{Q}$) เขียนเป็นสมการเชิงอนุพันธ์สโตแคสติก (stochastic differential equation, SDE) ได้ว่า: $$\begin{equation}
  dS_t = r\,S_t\,dt + \sigma\,S_t\,dW_t^{\mathbb{Q}},
  \label{eq:gbm_sde}
\end{equation}$$ โดยที่ $W_t^{\mathbb{Q}}$ คือ Brownian motion มาตรฐานภายใต้ $\mathbb{Q}$. กระบวนการนี้กำหนดให้ผลตอบแทนแบบลอการิทึม (log-return) มีการแจกแจงปกติ และเป็นที่มาของพจน์ $\tfrac{1}{2}\sigma^2 S^2$ ในสมการเชิงอนุพันธ์ย่อยแบล็ก-โชลส์ที่จะกล่าวถึงต่อไป.

#### สมการเชิงอนุพันธ์ย่อยแบล็ก-โชลส์ (Black-Scholes Equation)

ราคา $V(S,t)$ ของออปชั่นใด ๆ ที่ไม่จ่ายเงินปันผลต้องเป็นผลเฉลยของ สมการเชิงอนุพันธ์ย่อยแบล็ก-โชลส์: $$\begin{equation}
  \frac{\partial V}{\partial t}
  + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}
  + r S \frac{\partial V}{\partial S}
  - r V = 0.
  \label{eq:bs_pde}
\end{equation}$$ เมื่อแทนนิยามของค่ากรีกลงใน [eq:bs_pde] จะได้ความสัมพันธ์จากค่ากรีกดังนี้: $$\begin{equation}
  \Theta + \tfrac{1}{2}\sigma^2 S^2\,\Gamma + rS\,\Delta - rV = 0,
  \label{eq:pde_greek}
\end{equation}$$ หรือจัดรูปเพื่อแสดงความสัมพันธ์ระหว่าง $\Theta$ และ $\Gamma$: $$\begin{equation}
  \Theta = rV - rS\,\Delta - \tfrac{1}{2}\sigma^2 S^2\,\Gamma.
  \label{eq:theta_gamma_rel}
\end{equation}$$ สมการ [eq:theta_gamma_rel] เป็นความสัมพันธ์พื้นฐานที่แสดงให้เห็นว่าสำหรับพอร์ตที่ Delta-neutral ($\Delta \approx 0$) พจน์ $\Theta$ และ $\Gamma$ มีแนวโน้มมีเครื่องหมายตรงข้ามกัน โดยเฉพาะอย่างยิ่งเมื่อพจน์ $rV$ มีค่าน้อย (อัตราดอกเบี้ยต่ำหรือมูลค่าออปชั่นไม่สูง): $$\begin{equation}
  \Theta \approx rV - \tfrac{1}{2}\sigma^2 S^2\,\Gamma,
  \quad \text{(Delta-neutral portfolio)}.
  \label{eq:theta_gamma_dneutral}
\end{equation}$$ นัยสำคัญคือการถือ Positive Gamma จะมาพร้อมกับ Negative Theta เสมอ และในทางกลับกัน ความสัมพันธ์นี้เป็นรากฐานของการแลกเปลี่ยน (trade-off) ในกลยุทธ์ Calendar Spread.

#### สูตรกระจายแบบครบถ้วนในรูปของค่ากรีก

เมื่อกระจายสูตรแบล็ก-โชลส์แล้วจัดรูปสำหรับ Call Option ได้: $$\begin{align}
  \Delta_{\text{call}} &= N(d_1), \label{eq:delta_full} \\[4pt]
  \Gamma               &= \frac{N'(d_1)}{S\sigma\sqrt{T}}, \label{eq:gamma_full} \\[4pt]
  \Theta_{\text{call}} &= -\frac{S\,N'(d_1)\,\sigma}{2\sqrt{T}}
                          - rKe^{-rT}N(d_2), \label{eq:theta_full} \\[4pt]
  \nu                  &= S\sqrt{T}\,N'(d_1), \label{eq:vega_full} \\[4pt]
  \rho_{\text{call}}   &= KTe^{-rT}N(d_2), \label{eq:rho_full}
\end{align}$$ โดยที่ $N'(x) = \tfrac{1}{\sqrt{2\pi}}\,e^{-x^2/2}$ คือฟังก์ชันความหนาแน่น (Probability Density Function) ของการแจกแจงปกติมาตรฐาน.

#### บทบาทของ CDF $(N)$ เทียบกับ PDF $(N')$ ในสูตรค่ากรีก

ในสูตรค่ากรีกข้างต้น ฟังก์ชันการแจกแจงปกติมาตรฐานปรากฏสองรูปแบบที่ทำหน้าที่ต่างกัน คือฟังก์ชันสะสม $N(\cdot)$ (CDF) และฟังก์ชันความหนาแน่น $n(\cdot) = N'(\cdot)$ (PDF) การแยกแยะว่าตัวใดปรากฏที่ค่ากรีกใด ช่วยให้เข้าใจความหมายเชิงสถิติของแต่ละค่า:

- **ค่ากรีกสำหรับการแจกแจงแบบสะสม (CDF) $N(\cdot)$:** ตัวราคาออปชั่นเอง, $\Delta_{\text{call}} = N(d_1)$ และ $\rho_{\text{call}} \propto N(d_2)$ ค่าเหล่านี้ตอบคำถามเชิง*ความน่าจะเป็นสะสม* เช่น $N(d_2)$ คือความน่าจะเป็นภายใต้ $\mathbb{Q}$ ที่ออปชั่นจะจบในสถานะ ITM จึงมีค่าในช่วง $[0,1]$ และอิ่มตัว (saturate) ที่ปลายทั้งสองข้าง.

- **ค่ากรีกสำหรับการแจงแจงความน่าจะเป็น (PDF) $n(\cdot)$:** $\Gamma \propto N'(d_1)$, $\nu \propto N'(d_1)$ และพจน์หลักของ $\Theta$ ก็ $\propto N'(d_1)$ ค่าเหล่านี้วัด *ความหนาแน่นของความน่าจะเป็น ณ จุดปัจจุบัน* จึงสูงสุดที่ ATM ($d_1 \approx 0$) และลู่เข้าสู่ศูนย์เมื่อออกห่างจาก ATM.

เหตุผลเชิงแคลคูลัสคือการหาอนุพันธ์เทียบ $S$ แต่ละครั้งจะแปลง CDF ให้กลายเป็น PDF ผ่านกฏลูกโซ่ (chain rule) กล่าวคือ $\Delta = \partial C/\partial S$ (อนุพันธ์อันดับหนึ่ง) ยังคงรูป CDF $N(d_1)$ ขณะที่ $\Gamma = \partial^2 C/\partial S^2$ (อนุพันธ์อันดับสอง) ดึง $N(d_1)$ ลงมาเป็น $N'(d_1)$ เช่นเดียวกับ $\nu$ และ $\Theta$ ที่อนุพันธ์เทียบ $\sigma$ และ $t$ ไปสัมผัสเลขชี้กำลังภายใน $N(d)$ จึงปรากฏ $N'$ ออกมา โดยสรุป CDF บอก “มวลความน่าจะเป็นที่อยู่เลย $K$ ออกไป” (โอกาสได้ใช้สิทธิ) ส่วน PDF บอก “ความหนาแน่นของความน่าจะเป็นรอบราคา ปัจจุบัน” ซึ่งเป็นตัวกำหนดความโค้ง ($\Gamma$) ความไวต่อความผันผวน ($\nu$) และอัตราการเสื่อมของเวลา ($\Theta$).

### การประเมินมูลค่าแบบ Risk-Neutral และทฤษฎี Martingale

แบบจำลองการกำหนดราคาออปชั่นทั้งหมดในบทความนี้ตั้งอยู่บนแนวคิด*การประเมินมูลค่าแบบเป็นกลางต่อความเสี่ยง* (risk-neutral valuation) ส่วนนี้สรุปแนวคิดเชิงทฤษฎีที่อยู่เบื้องหลังเพื่อความครบถ้วน.

#### Martingale

กระบวนการสุ่ม $\{M_t\}$ เรียกว่าเป็นมาร์ติงเกลภายใต้มาตรวัด $\mathbb{Q}$ และ filtration $\{\mathcal{F}_t\}$ ถ้าค่าคาดหวังแบบมีเงื่อนไขของค่าในอนาคตเท่ากับค่าปัจจุบันเสมอ: $$\begin{equation}
  \mathbb{E}^{\mathbb{Q}}\!\left[\,M_t \mid \mathcal{F}_s\,\right] = M_s,
  \qquad s \le t.
  \label{eq:martingale}
\end{equation}$$ ในเชิงสัญชาตญาณมาร์ติงเกล คือ “เกมที่ยุติธรรม” (fair game) ที่ไม่มีแนวโน้ม (drift) ซึ่งคาดการณ์ได้ ค่าที่ดีที่สุดที่เราพยากรณ์อนาคตได้คือค่าปัจจุบันนั่นเอง เปรียบได้กับการโยนลูกเต๋าที่ผลในอดีตย่อมไม่ส่งผลใด ๆ ต่ออนาคต.

**ตัวอย่าง:** พิจารณาเกมทายเหรียญที่ได้/เสียตาละ 10 บาท สมมติขณะนี้ผู้เล่นมีเงิน $X_t = 150$ บาท ตาถัดไป ($X_{t+1}$) มีโอกาสเท่ากันที่จะได้เป็น 160 บาท หรือเหลือ 140 บาท ค่าคาดหวังของเงินตาถัดไปจึงเท่ากับ $\tfrac{1}{2}(160) + \tfrac{1}{2}(140) = 150$ บาท เท่ากับค่าปัจจุบันพอดี โดยไม่ขึ้นกับว่าผู้เล่นมาถึง 150 บาทได้อย่างไร

คุณสมบัตินี้ในเชิงคณิตศาสตร์เรียกว่า *คุณสมบัติมาร์ติงเกล* (martingale property) กล่าวคือ ค่าคาดหวังของค่าในอนาคตเมื่อทราบข้อมูลทั้งหมดจนถึงปัจจุบัน เท่ากับค่าปัจจุบันเสมอ: $$\mathbb{E}\!\left[X_{t+1} \mid X_1, X_2, \dots, X_t\right] = X_t \;(= 150).$$ ข้อควรระวังคือคุณสมบัตินี้ต่างจาก *คุณสมบัติมาร์คอฟ* (Markov property) ซึ่งระบุเพียงว่าการแจกแจงของอนาคตขึ้นกับสถานะปัจจุบันเท่านั้น คือ $P(X_{t+1} \mid X_1,\dots,X_t) = P(X_{t+1} \mid X_t)$ แต่ไม่ได้บังคับว่าค่าคาดหวังต้องเท่ากับค่าปัจจุบัน กระบวนการหนึ่งอาจเป็นมาร์ติงเกลโดยไม่เป็นมาร์คอฟ หรือเป็นมาร์คอฟโดยไม่เป็นมาร์ติงเกลก็ได้.

#### Risk-Neutral Measure $(\mathbb{Q})$

risk-neutral measure คือมาตรวัดความน่าจะเป็น $\mathbb{Q}$ ที่สมมูล (equivalent) กับมาตรวัดเชิงกายภาพ $\mathbb{P}$ และทำให้ *ราคาสินทรัพย์ที่คิดลดแล้ว* $\tilde{S}_t = e^{-rt}S_t$ เป็นมาร์ติงเกลภายใต้ $\mathbb{Q}$ ภายใต้มาตรวัดนี้สินทรัพย์ทุกตัวให้ผลตอบแทนคาดหวังเท่ากับอัตราปลอดความเสี่ยง $r$ (พจน์ drift ถูกแทนที่จากผลตอบแทนจริง $\mu$ เป็น $r$) ราคาออปชั่นจึงเท่ากับค่าคาดหวังของผลตอบแทนที่คิดลด: $$\begin{equation}
  V_0 = \mathbb{E}^{\mathbb{Q}}\!\left[\,e^{-rT}\,\mathrm{payoff}(S_T)\,\right].
  \label{eq:rn_pricing}
\end{equation}$$ สูตรการคำนวณมูลค่าของออปชั่น Call ของแบล็ก-โชลส์ใน [eq:bsm_call] ก็คือผลของ $\mathbb{E}^{\mathbb{Q}}\!\left[e^{-rT}(S_T-K)^+\right]$ นั่นเอง.

**ใช้ทำอะไร.** ประโยชน์หลักคือ $\mathbb{Q}$ ขจัด *ผลตอบแทนจริง $\mu$* และเบี้ยความเสี่ยงของนักลงทุนออกจากการกำหนดราคาทำให้ราคาออปชั่นไม่ขึ้นกับความชอบเสี่ยง (risk preference) ของแต่ละบุคคล เราจึงตั้งราคาได้ด้วยการคิดลดค่าคาดหวังเพียงอย่างเดียวโดยไม่ต้องทราบ $\mu$ หรือฟังก์ชันอรรถประโยชน์ของผู้ลงทุน นอกจากนี้การเลือก *numéraire* ต่างกันยังให้มาตรวัดมาร์ติงเกลที่ต่างกัน เช่น เมื่อใช้พันธบัตรไร้คูปองครบกำหนด $T$ เป็น numéraire จะได้ forward measure $\mathbb{Q}^{T}$ ซึ่งทำให้ราคาล่วงหน้า $F$ เป็นมาร์ติงเกล (ไม่มี drift) อันเป็นเหตุผลที่ SDE ของบาเชอลิเยร์และแบล็ก-76 ใน [eq:bachelier_sde] และ [eq:black76_sde] ไม่มีพจน์ drift.

**หากไม่มี $\mathbb{Q}$ จะเกิดอะไรขึ้น.** ทฤษฎีบทหลักของการกำหนดราคาสินทรัพย์ (Fundamental Theorem of Asset Pricing) (Harrison and Pliska 1981) ระบุว่าตลาด *ปราศจากการเก็งกำไร* (no-arbitrage) ก็ต่อเมื่อมีมาตรวัดมาร์ติงเกลที่สมมูลอย่างน้อยหนึ่งตัว ดังนั้นหากไม่มี $\mathbb{Q}$ ดังกล่าว ย่อมมีโอกาสเก็งกำไรแบบไร้ความเสี่ยง (arbitrage / “free lunch”) ในตลาด และหากเราพยายามตั้งราคาด้วยมาตรวัดเชิงกายภาพ $\mathbb{P}$ โดยใช้ drift จริง $\mu$ ราคาที่ได้ จะไม่สอดคล้องกันและเปิดช่องให้เก็งกำไร อีกทั้งยังต้องพึ่งพาเบี้ยความเสี่ยงของนักลงทุนแต่ละราย ทำให้ราคาไม่ถูกกำหนดอย่างเป็นเอกภาพ ในกรณีที่ $\mathbb{Q}$ มีได้*มากกว่าหนึ่งตัว* (ตลาดไม่สมบูรณ์, incomplete market) ราคาที่ปราศจากการเก็งกำไรจะไม่ซ้ำกันแต่กลายเป็น *ช่วงราคา* แทน.

**ความเชื่อมโยงกับความสัมพันธ์ $\Theta\text{--}\Gamma$.** เงื่อนไขที่ราคาออปชั่นซึ่งคิดลดแล้วต้องเป็นมาร์ติงเกลภายใต้ $\mathbb{Q}$ บังคับให้พจน์ drift ในการกระจายตามบทแทรกของอิโต (Itô’s lemma) เป็นศูนย์ ซึ่งให้สมการแบล็ก-โชลส์ [eq:bs_pde] โดยตรง ดังนั้นความสัมพันธ์ $\Theta\text{--}\Gamma$ ที่บทความนี้อาศัยจึงเป็นผลพวงโดยตรงของเงื่อนไข martingale/risk-neutral ไม่ใช่เพียงข้อสังเกตเชิงพีชคณิต.

### $\Theta$ ในแบบจำลองบาเชอลิเยร์ (Bachelier) และ แบล็ก-76 (Black-76)

ความสัมพันธ์ $\Theta\text{--}\Gamma$ ใน [eq:theta_gamma_rel] ไม่ได้เป็นลักษณะเฉพาะของแบบจำลองแบล็ก-โชลส์เท่านั้น แต่เป็นผลที่ตามมาจากโครงสร้างของกระบวนการสุ่มที่กำหนดให้สินทรัพย์อ้างอิงและเงื่อนไขการทำกำไรโดยปราศจากความเสี่ยง (no-arbitrage) ในตลาดที่มีประสิทธิภาพ เพื่อยืนยันประเด็นนี้ เราพิจารณาแบบจำลองทางเลือกอีกสองแบบ ได้แก่ Bachelier (normal model) และ Black-76 (log-normal forward model) ซึ่งตั้งอยู่บน *กระบวนการสุ่มคนละแบบ*กับแบบจำลองแบล็ก-โชลส์ แล้วนำไปสู่สมการเชิงอนุพันธ์ย่อยที่ต่างกันและมีค่า $\Theta$ ที่ต่างกันเล็กน้อย ทั้งนี้เราสามารถตรวจสอบย้อนกลับจากสมการอนุพันธ์ย่อยนั้น ๆ ได้โดยตรง แต่เพื่อความชัดเจน ในส่วนนี้จะระบุสมการเชิงอนุพันธ์สโตแคสติก (stochastic differential equation) ของแต่ละแบบจำลองไว้ เพื่อให้เห็นว่าความสัมพันธ์ $\Theta\text{--}\Gamma$ เกิดขึ้นได้อย่างไรไม่ว่าจะเลือกพลวัตของราคาแบบใด.

ก่อนเข้าสู่รายละเอียด เราสรุปนิยามของสัญลักษณ์ที่ใช้ร่วมกันในส่วนนี้ ซึ่งหลายตัวเป็นสัญลักษณ์เฉพาะของแบบจำลองทางเลือกและมักไม่ปรากฏ ในตำราออปชั่นพื้นฐาน

<table>
<caption>นิยามสัญลักษณ์เฉพาะของแบบจำลองทางเลือก (Bachelier และ Black-76)</caption>
<thead>
<tr>
<th style="text-align: left;"><strong>สัญลักษณ์</strong></th>
<th style="text-align: left;"><strong>นิยาม</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;"><span class="math inline"><em>τ</em></span></td>
<td style="text-align: left;">เวลาที่เหลือถึงวันหมดอายุ <span class="math inline">(<em>τ</em> = <em>T</em> − <em>t</em>)</span> ใช้แทน <span class="math inline"><em>T</em></span> เพื่อเน้นว่าเป็นเวลาที่ลดลงเข้าหาศูนย์</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>F</em></span></td>
<td style="text-align: left;">ราคาล่วงหน้า (forward price) <span class="math inline"> = <em>S</em> <em>e</em><sup><em>r</em><em>τ</em></sup></span> สำหรับสินทรัพย์ที่ไม่จ่ายเงินปันผล</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline">ℚ<sup><em>T</em></sup></span></td>
<td style="text-align: left;">forward measure ที่ใช้พันธบัตรไร้คูปองครบกำหนด <span class="math inline"><em>T</em></span> เป็น numéraire ทำให้ <span class="math inline"><em>F</em></span> เป็น martingale (ไม่มี drift)</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>W</em><sub><em>t</em></sub><sup>ℚ<sup><em>T</em></sup></sup></span></td>
<td style="text-align: left;">Brownian motion มาตรฐานภายใต้ <span class="math inline">ℚ<sup><em>T</em></sup></span></td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>σ</em><sub><em>N</em></sub></span></td>
<td style="text-align: left;">normal (absolute) volatility — ความผันผวนของระดับราคา หน่วยเดียวกับราคา (ใช้ใน Bachelier)</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>σ</em><sub><em>G</em></sub></span></td>
<td style="text-align: left;">log-normal (relative) volatility — ความผันผวนเชิงสัดส่วน เทียบได้กับ <span class="math inline"><em>σ</em></span> ของ BSM (ใช้ใน Black-76)</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>m</em><sub><em>A</em></sub></span></td>
<td style="text-align: left;">intrinsic forward value: <span class="math inline"><em>m</em><sub><em>A</em></sub> = <em>F</em> − <em>K</em></span> (Bachelier)</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>z</em><sub><em>A</em></sub></span></td>
<td style="text-align: left;">standardised moneyness: <span class="math inline">$z_A = m_A/(\sigma_N\sqrt{\tau})$</span> คือระยะห่างของ <span class="math inline"><em>F</em></span> จาก <span class="math inline"><em>K</em></span> ในหน่วยส่วนเบี่ยงเบนมาตรฐาน</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>m</em><sub><em>G</em></sub></span></td>
<td style="text-align: left;">log-moneyness: <span class="math inline"><em>m</em><sub><em>G</em></sub> = ln (<em>F</em>/<em>K</em>)</span> (Black-76)</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>d</em><sub>1</sub><sup><em>G</em></sup>, <em>d</em><sub>2</sub><sup><em>G</em></sup></span></td>
<td style="text-align: left;">ตัวแปรไร้มิติของ Black-76 (อนาล็อกของ <span class="math inline"><em>d</em><sub>1</sub>, <em>d</em><sub>2</sub></span> ใน BSM แต่อิงราคาล่วงหน้า <span class="math inline"><em>F</em></span> แทนราคา spot <span class="math inline"><em>S</em></span>) นิยามตาม [eq:black76_d]</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>N</em>(⋅), <em>n</em>(⋅)</span></td>
<td style="text-align: left;">CDF และ PDF <span class="math inline">(<em>n</em> = <em>N</em><sup>′</sup>)</span> ของการแจกแจงปกติมาตรฐาน</td>
</tr>
<tr>
<td style="text-align: left;"><span class="math inline"><em>Θ</em><sub><em>N</em></sub>, <em>Γ</em><sub><em>N</em></sub></span></td>
<td style="text-align: left;">Theta และ Gamma ภายใต้ Bachelier; <span class="math inline"><em>Θ</em><sub>BL</sub>, <em>Γ</em><sub>BL</sub></span> คือคู่เดียวกันภายใต้ Black-76</td>
</tr>
</tbody>
</table>

#### แบบจำลองของบาเชอลิเยร์ (Bachelier Model)

แบบจำลองบาเชอลิเยร์ใช้กระบวนการ Arithmetic Brownian Motion (ABM) เป็นพลวัตของราคาที่อิงกับราคาส่งมอบล่วงหน้า (forward price) $F$ ซึ่งเป็นมาร์ติงเกลภายใต้ forward measure $\mathbb{Q}^{T}$ ราคาล่วงหน้าจึงเคลื่อนที่แบบไม่มี drift และมีความผันผวนเชิงสัมบูรณ์ (absolute/normal volatility) $\sigma_N$ คงที่: $$\begin{equation}
  dF_t = \sigma_N\,dW_t^{\mathbb{Q}^{T}}.
  \label{eq:bachelier_sde}
\end{equation}$$ ข้อแตกต่างสำคัญจาก GBM คือ $\sigma_N$ เป็นความผันผวนของ *ระดับราคา* (จึงมีหน่วยเดียวกับราคา) ไม่ใช่ความผันผวนเชิงสัดส่วน และแบบจำลองนี้ยอมให้ราคาติดลบได้ ราคา Call ที่ได้จากการคิดลดมูลค่าคาดหวังของผลตอบแทนภายใต้ $\mathbb{Q}^{T}$ คือ: $$\begin{equation}
  C_{\mathrm{BC}} = e^{-r\tau}\bigl[m_A\,N(z_A)
                    + \sigma_N\sqrt{\tau}\,n(z_A)\bigr],
  \label{eq:bachelier_call}
\end{equation}$$ โดยที่ $m_A = F - K$ คือ intrinsic forward value, $z_A = m_A/(\sigma_N\sqrt{\tau})$ คือ standardised moneyness, $\sigma_N$ คือ normal (absolute) volatility, และ $n(\cdot)$ คือ PDF ของการแจกแจงปกติมาตรฐาน.

สมการอนุพันธ์ย่อยของบาเชอลิเยร์ (Bachelier) (forward-based, ไม่มี drift term): $$\begin{equation}
\begin{split}
  &\frac{\partial C}{\partial t}
  + \tfrac{1}{2}\sigma_N^2\,\frac{\partial^2 C}{\partial F^2}
  - r C = 0 \\[2pt]
  &\quad\Longleftrightarrow\quad
  \Theta_N + \tfrac{1}{2}\sigma_N^2\,\Gamma_N - r C_{\mathrm{BC}} = 0.
\end{split}
  \label{eq:bachelier_pde}
\end{equation}$$ จัดรูปได้ $\Theta_N = r\,C_{\mathrm{BC}} - \tfrac{1}{2}\sigma_N^2\,\Gamma_N$ จากนั้นแทน $\Gamma_N = e^{-r\tau}\,n(z_A)/(\sigma_N\sqrt{\tau})$ ลงไป: $$\begin{align}
  \Theta_N
  &= r\,C_{\mathrm{BC}}
     - \tfrac{1}{2}\sigma_N^2 \cdot
       \frac{e^{-r\tau}\,n(z_A)}{\sigma_N\sqrt{\tau}} \notag \\
  &= -\,\frac{e^{-r\tau}\,\sigma_N}{2\sqrt{\tau}}\,n(z_A)
     + r\,C_{\mathrm{BC}}.
  \label{eq:bachelier_theta}
\end{align}$$ สูตร [eq:bachelier_theta] ที่ได้จากสมการอนุพันธ์ย่อย ตรงกับ $\Theta_N$ ที่คำนวณโดยตรงด้วยอนุพันธ์เทียบ $\tau$ ของ [eq:bachelier_call] จึงยืนยันความสอดคล้อง: $\Theta_N + \tfrac{1}{2}\sigma_N^2\Gamma_N = rC_{\mathrm{BC}}$. $\blacksquare$

#### แบบจำลองของแบล็ก-76 (Black-76 Model)

แบบจำลองของแบล็ก-76 (Black 1976) ใช้ forward price $F$ เป็นตัวแปรหลัก และสมมติให้ $F$ เคลื่อนที่แบบ Geometric Brownian Motion โดยไม่มี drift เนื่องจาก $F$ เป็นมาร์ติงเกลภายใต้ forward measure $\mathbb{Q}^{T}$: $$\begin{equation}
  \frac{dF_t}{F_t} = \sigma_G\,dW_t^{\mathbb{Q}^{T}},
  \label{eq:black76_sde}
\end{equation}$$ โดยที่ $\sigma_G$ คือความผันผวนเชิงสัดส่วน (log-normal/relative volatility) ราคา Call ที่ได้คือ: $$\begin{equation}
  C_{\mathrm{BL}} = e^{-r\tau}\bigl[F\,N(d_1^G) - K\,N(d_2^G)\bigr],
  \label{eq:black76_call}
\end{equation}$$ โดยที่ $m_G = \ln(F/K)$ และ $$\begin{equation}
  d_1^G = \frac{m_G + \tfrac{1}{2}\sigma_G^2\tau}{\sigma_G\sqrt{\tau}},
  \qquad
  d_2^G = d_1^G - \sigma_G\sqrt{\tau}.
  \label{eq:black76_d}
\end{equation}$$

สมการอนุพันธ์ย่อยของแบล็ก-76 (ไม่มีพจน์ $\Delta$ เพราะ $F$ ไม่มี drift): $$\begin{equation}
\begin{split}
  &\frac{\partial C}{\partial t}
  + \tfrac{1}{2}\sigma_G^2 F^2\,\frac{\partial^2 C}{\partial F^2}
  - r C = 0 \\[2pt]
  &\quad\Longleftrightarrow\quad
  \Theta_{\mathrm{BL}} + \tfrac{1}{2}\sigma_G^2 F^2\,\Gamma_{\mathrm{BL}}
  = r\,C_{\mathrm{BL}}.
\end{split}
  \label{eq:black76_pde}
\end{equation}$$ ใช้ $F\,n(d_1^G) = K\,n(d_2^G)$ (ซึ่งพิสูจน์ได้จาก $n(d_2^G) = n(d_1^G)\,e^{m_G}$) และ $\Gamma_{\mathrm{BL}} = e^{-r\tau}\,n(d_1^G)/(F\sigma_G\sqrt{\tau})$: $$\begin{align}
  \Theta_{\mathrm{BL}}
  &= r\,C_{\mathrm{BL}} - \tfrac{1}{2}\sigma_G^2 F^2 \cdot
     \frac{e^{-r\tau}\,n(d_1^G)}{F\sigma_G\sqrt{\tau}} \notag \\
  &= -\,\frac{e^{-r\tau}\,F\sigma_G}{2\sqrt{\tau}}\,n(d_1^G)
     + r\,C_{\mathrm{BL}}.
  \label{eq:black76_theta}
\end{align}$$ จึงยืนยันความสอดคล้อง: $\Theta_{\mathrm{BL}} + \tfrac{1}{2}\sigma_G^2 F^2\Gamma_{\mathrm{BL}}
= r\,C_{\mathrm{BL}}$. $\blacksquare$

#### บทสรุปเชิงเปรียบเทียบ

เราสรุปกระบวนการสุ่ม (stochastic process) ในระดับจุลภาคของแต่ละแบบจำลองไว้เทียบเคียงกัน เพื่อให้เห็นว่าความแตกต่างของสมการอนุพันธ์ย่อยและของค่า $\Theta$ สืบเนื่องมาจากพลวัตของราคาที่สมมติไว้ตั้งแต่ต้น: $$\begin{align}
  \text{BSM (GBM):} \quad & dS_t = r\,S_t\,dt + \sigma\,S_t\,dW_t,
    \label{eq:sde_bsm} \\[2pt]
  \text{Black-76:} \quad & dF_t = \sigma_G\,F_t\,dW_t,
    \label{eq:sde_black76} \\[2pt]
  \text{Bachelier (ABM):} \quad & dF_t = \sigma_N\,dW_t.
    \label{eq:sde_bachelier}
\end{align}$$ ข้อสังเกตคือทั้งแบล็ก-76 และบาเชอลิเยร์ (Bachelier) ใช้ราคาล่วงหน้า (forward price) ซึ่งเป็น martingale จึงไม่มีพจน์ drift และทำให้พจน์ $\Delta$ หายไปจากสมการอนุพันธ์ย่อย ในทางตรงข้าม แบบจำลองแบล็ก-โชลส์ทำงานบนราคาสปอต (spot) ที่มี drift $rS$ จึงยังคงพจน์ $rS\Delta$ ไว้ ความแตกต่างเพียงข้อนี้ อธิบายโครงสร้างทั้งหมดของตารางที่ 2 ได้.

ทั้งสามแบบจำลองมีสมการอนุพันธ์ย่อยที่ให้ความสัมพันธ์เดียวกันในรูปทั่วไป: $$\begin{equation}
  \Theta + \tfrac{1}{2}\,\mathcal{V}^2\,\Gamma = r(V - S\Delta),
  \label{eq:pde_unified}
\end{equation}$$ โดยที่ $\mathcal{V}$ คือ “effective local vol” ของแต่ละแบบจำลองและพจน์ $S\Delta$ หายไปเมื่อ $F$ ไม่มี drift (BSM จะยังมีพจน์ $rS\Delta$):

<table>
<caption>เปรียบเทียบสมการอนุพันธ์ย่อยและ <span class="math inline"><em>Θ</em></span> ของแต่ละแบบจำลอง</caption>
<thead>
<tr>
<th style="text-align: left;"><strong>Model</strong></th>
<th style="text-align: center;"><strong>PDE</strong></th>
<th style="text-align: center;"><span class="math inline">𝒱<sup>2</sup></span></th>
<th style="text-align: center;"><strong>พจน์ <span class="math inline"><em>Δ</em></span></strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">BSM</td>
<td style="text-align: center;"><span class="math inline">$\Theta+\tfrac{1}{2}\sigma^2S^2\Gamma+rS\Delta=rV$</span></td>
<td style="text-align: center;"><span class="math inline"><em>σ</em><sup>2</sup><em>S</em><sup>2</sup></span></td>
<td style="text-align: center;">มี</td>
</tr>
<tr>
<td style="text-align: left;">Black-76</td>
<td style="text-align: center;"><span class="math inline">$\Theta+\tfrac{1}{2}\sigma_G^2F^2\Gamma=rV$</span></td>
<td style="text-align: center;"><span class="math inline"><em>σ</em><sub><em>G</em></sub><sup>2</sup><em>F</em><sup>2</sup></span></td>
<td style="text-align: center;">ไม่มี</td>
</tr>
<tr>
<td style="text-align: left;">Bachelier</td>
<td style="text-align: center;"><span class="math inline">$\Theta+\tfrac{1}{2}\sigma_N^2\Gamma=rV$</span></td>
<td style="text-align: center;"><span class="math inline"><em>σ</em><sub><em>N</em></sub><sup>2</sup></span></td>
<td style="text-align: center;">ไม่มี</td>
</tr>
</tbody>
</table>

ข้อสังเกตสำคัญ: เมื่อ $r \to 0$ ทุกโมเดลลู่เข้าสู่ $\Theta = -\tfrac{1}{2}\,\mathcal{V}^2\,\Gamma$ ซึ่งหมายความว่า Long Gamma เสมอมาพร้อมกับ Negative Theta และ Short Gamma เสมอมาพร้อมกับ Positive Theta ไม่ว่าจะใช้แบบจำลองใด.
