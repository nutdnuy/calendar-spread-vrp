---
title: Experimental Setup
description: พารามิเตอร์และกระบวนการสุ่มของการทดลอง
inline_math: true
---

# Experimental Setup

<p class="lead">ระบุพารามิเตอร์และกระบวนการสุ่มของแต่ละ VRP regime ให้การทดลองแยกจากข้อมูลตลาดจริงอย่างชัดเจน</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## การออกแบบการทดลอง (Experimental Setup)

### พารามิเตอร์การทดลอง

เพื่อวิเคราะห์พฤติกรรมของ Greek Values ในกลยุทธ์ Calendar Spread ตัวอย่างที่ใช้ในการวิเคราะห์กำหนดพารามิเตอร์ดังนี้:

<table>
<caption>พารามิเตอร์กลยุทธ์ Calendar Spread ตัวอย่าง</caption>
<thead>
<tr>
<th style="text-align: left;"><strong>พารามิเตอร์</strong></th>
<th style="text-align: left;"><strong>ขา SHORT</strong></th>
<th style="text-align: left;"><strong>ขา LONG</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">ประเภทออปชั่น</td>
<td style="text-align: left;">Call</td>
<td style="text-align: left;">Call</td>
</tr>
<tr>
<td style="text-align: left;">วันหมดอายุ</td>
<td style="text-align: left;">01/01/2026</td>
<td style="text-align: left;">01/06/2026</td>
</tr>
<tr>
<td style="text-align: left;">ราคาใช้สิทธิ (K)</td>
<td style="text-align: left;">100</td>
<td style="text-align: left;">100</td>
</tr>
<tr>
<td style="text-align: left;">ราคาสินทรัพย์ (S)</td>
<td colspan="2" style="text-align: center;">100 (ATM)</td>
</tr>
<tr>
<td style="text-align: left;">อัตราดอกเบี้ย (r)</td>
<td colspan="2" style="text-align: center;">2%</td>
</tr>
</tbody>
</table>

กรณีทดสอบแบ่งตามสภาวะ Volatility Risk Premium (VRP):

- **กรณี A**: $IV > RV$ (implied volatility สูงกว่า realized)

- **กรณี B**: $IV < RV$ (implied volatility ต่ำกว่า realized)

### กระบวนการสุ่มของแต่ละกรณี VRP

หัวใจของการวิเคราะห์อยู่ที่ความแตกต่างระหว่างความผันผวนสองชนิด คือความผันผวน ที่ใช้ *ตั้งราคา* ออปชั่น (implied volatility, $\sigma_{\mathrm{IV}}$) กับความผันผวนที่ราคาสินทรัพย์ *เกิดขึ้นจริง* (realized volatility, $\sigma_{\mathrm{RV}}$). กล่าวอีกนัยหนึ่ง พอร์ตถูกตีมูลค่า (mark-to-market) ภายใต้มาตรวัดความเสี่ยงเป็นกลางที่ใช้ $\sigma_{\mathrm{IV}}$: $$\begin{equation}
  dS_t = r\,S_t\,dt + \sigma_{\mathrm{IV}}\,S_t\,dW_t^{\mathbb{Q}},
  \label{eq:sde_pricing}
\end{equation}$$ ในขณะที่ราคาจริงในตลาดวิวัฒน์ตามมาตรวัดเชิงกายภาพ (physical measure $\mathbb{P}$) ด้วยความผันผวน $\sigma_{\mathrm{RV}}$ และ drift $\mu$ ที่อาจต่างจาก $r$: $$\begin{equation}
  dS_t = \mu\,S_t\,dt + \sigma_{\mathrm{RV}}\,S_t\,dW_t^{\mathbb{P}}.
  \label{eq:sde_realized}
\end{equation}$$ สองกรณี VRP จึงเป็นเพียงการเปรียบเทียบขนาดของความผันผวนทั้งสอง: $$\begin{align}
  \text{กรณี A } (IV>RV): \quad & \sigma_{\mathrm{RV}} < \sigma_{\mathrm{IV}},
    \label{eq:caseA} \\
  \text{กรณี B } (RV>IV): \quad & \sigma_{\mathrm{RV}} > \sigma_{\mathrm{IV}}.
    \label{eq:caseB}
\end{align}$$

ความเชื่อมโยงระหว่างกระบวนการสุ่มทั้งสองกับค่ากรีกปรากฏชัดผ่านการแยกองค์ประกอบกำไร-ขาดทุนของพอร์ตที่ป้องกันความเสี่ยงแบบ delta-neutral (delta-hedged P&L) (Hull 2018) กล่าวคือ เมื่อพอร์ตถูกตีราคาด้วย $\sigma_{\mathrm{IV}}$ แต่สินทรัพย์เคลื่อนไหวจริงด้วย $\sigma_{\mathrm{RV}}$ กำไร-ขาดทุนสะสมในช่วงเวลาสั้น ๆ $dt$ มีรูปประมาณ: $$\begin{equation}
  d\Pi \;\approx\; \tfrac{1}{2}\,\Gamma_{\text{net}}\,S_t^2
        \bigl(\sigma_{\mathrm{RV}}^2 - \sigma_{\mathrm{IV}}^2\bigr)\,dt.
  \label{eq:gamma_pnl}
\end{equation}$$ สมการ [eq:gamma_pnl] สรุปกลไกทั้งหมดของกลยุทธ์ไว้ในบรรทัดเดียว กล่าวคือ เนื่องจาก Calendar Spread มี $\Gamma_{\text{net}} < 0$ ในกรณี A ที่ $\sigma_{\mathrm{RV}} < \sigma_{\mathrm{IV}}$ พจน์ในวงเล็บเป็นลบ คูณกับ $\Gamma_{\text{net}}$ ที่เป็นลบจึงได้ $d\Pi > 0$ (กำไร โดยมี $\Theta$ เป็นตัวขับเคลื่อน) ส่วนในกรณี B ที่ $\sigma_{\mathrm{RV}} > \sigma_{\mathrm{IV}}$ พจน์ในวงเล็บเป็นบวก ทำให้ $d\Pi < 0$ (ขาดทุน โดยมี $\Gamma$ เป็นตัวขับเคลื่อน) ผลนี้ให้คำอธิบายเชิงปริมาณว่าเหตุใดตัวขับเคลื่อนหลักจึงสลับระหว่าง $\Theta$ และ $\Gamma$ ตามสภาวะ VRP ดังจะวิเคราะห์ในรายละเอียดต่อไป

การวิเคราะห์ค่ากรีกในงานนี้ใช้แบบจำลองแบล็ก-โชลส์ [eq:bsm_call] โดยคำนวณค่า $\Theta$ และ $\Gamma$ ตามสมการ [eq:theta_bsm] และ [eq:gamma_bsm] ตามลำดับ ที่ระดับความผันผวนแฝง ($\sigma_{IV}$) ต่าง ๆ กัน คือ 10%, 20%, 35% และ 50% เพื่อจำลองสภาวะตลาดที่หลากหลาย.
