---
title: Net Vega Appendix
description: โค้ดคำนวณ Net Vega ของ Calendar Spread
inline_math: true
---

# Net Vega Appendix

<p class="lead">โค้ดอ้างอิงสำหรับตรวจค่า Vega ของแต่ละขาและ Net Vega ในตารางผลการศึกษา</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## โค้ดสำหรับคำนวณ Net Vega

โค้ดภาษา Python ต่อไปนี้ใช้คำนวณค่า Vega ของแต่ละขาและ $\nu_{net}$ ที่แสดงในตารางที่ 9 โดยอาศัยสูตร Vega ของแบบจำลองแบล็ก-โชลส์ $\nu = S\sqrt{T}\,N'(d_1)$ ต้องการเพียงไลบรารี `numpy` เท่านั้น:

    import numpy as np

    def norm_pdf(x):
        return np.exp(-x**2 / 2.0) / np.sqrt(2.0 * np.pi)

    def bsm_vega(S, K, r, sigma, T):
        d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) \
             / (sigma * np.sqrt(T))
        return S * np.sqrt(T) * norm_pdf(d1)

    # Calendar spread parameters (Fig. 7)
    S, r, sigma = 100.0, 0.02, 0.20
    T_S, T_L = 30 / 365, 180 / 365   # SHORT (near), LONG (far)

    print("K  v_LONG  v_SHORT  NetVega")
    for K in range(80, 121, 5):
        v_long  = bsm_vega(S, K, r, sigma, T_L)
        v_short = bsm_vega(S, K, r, sigma, T_S)
        print(K, round(v_long, 2), round(v_short, 2),
              round(v_long - v_short, 2))

### References

Black, Fischer. 1976. “The Pricing of Commodity Contracts.” *Journal of Financial Economics* 3 (1–2): 167–79.

Black, Fischer, and Myron Scholes. 1973. “The Pricing of Options and Corporate Liabilities.” *Journal of Political Economy* 81 (3): 637–54.

Cahill, M. 2020. “Rolling Calendar Spreads: A Systematic Approach to Selling Time Value.” *Journal of Derivatives* 27 (4): 58–71.

Carr, Peter, and Liuren Wu. 2009. “Variance Risk Premiums.” *Review of Financial Studies* 22 (3): 1311–41.

Harrison, J. Michael, and Stanley R. Pliska. 1981. “Martingales and Stochastic Integrals in the Theory of Continuous Trading.” *Stochastic Processes and Their Applications* 11 (3): 215–60.

Hull, John C. 2018. *Options, Futures, and Other Derivatives*. 10th ed. Pearson Education.

Merton, Robert C. 1973. “Theory of Rational Option Pricing.” *Bell Journal of Economics and Management Science* 4 (1): 141–83.

Natenberg, Sheldon. 1994. *Option Volatility and Pricing: Advanced Trading Strategies and Techniques*. 2nd ed. McGraw-Hill.
