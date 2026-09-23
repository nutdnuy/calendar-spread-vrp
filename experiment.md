---
title: Experimental Setup
description: พารามิเตอร์และกระบวนการสุ่มของการทดลอง
inline_math: true
---

# Experimental Setup

<p class="lead">ระบุพารามิเตอร์และกระบวนการสุ่มของแต่ละ VRP regime ให้การทดลองแยกจากข้อมูลตลาดจริงอย่างชัดเจน</p>

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
<td style="text-align: left;">เวลาคงเหลือเมื่อเริ่มตัวอย่าง</td>
<td style="text-align: left;">30 วัน (30/365 ปี)</td>
<td style="text-align: left;">180 วัน (180/365 ปี)</td>
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

การทดลองแยก **แบบจำลองสำหรับตีราคา** ซึ่งใช้ IV คงที่ $\sigma_{\mathrm{IV}}$ ออกจาก **กระบวนการราคาสมมติสำหรับวัดผล** ซึ่งใช้ความผันผวน $\sigma_{\mathrm{RV}}$ แบบจำลองตีราคา BSM ใช้กระบวนการภายใต้ $\mathbb{Q}_{\mathrm{model}}$: $$\begin{equation}
  dS_t = r\,S_t\,dt + \sigma_{\mathrm{IV}}\,S_t\,dW_t^{\mathbb{Q}_{\mathrm{model}}},
  \label{eq:sde_pricing}
\end{equation}$$ ส่วนเส้นทางราคาสมมติภายใต้มาตรวัดเชิงกายภาพ $\mathbb{P}$ ใช้ความผันผวน $\sigma_{\mathrm{RV}}$ และ drift $\mu$: $$\begin{equation}
  dS_t = \mu\,S_t\,dt + \sigma_{\mathrm{RV}}\,S_t\,dW_t^{\mathbb{P}}.
  \label{eq:sde_realized}
\end{equation}$$ การกำหนด $\sigma_{\mathrm{IV}} \ne \sigma_{\mathrm{RV}}$ ในที่นี้เป็นการศึกษาความคลาดเคลื่อนระหว่างแบบจำลองตีราคากับกระบวนการสมมติ ไม่ใช่การเปลี่ยนมาตรวัดจาก $\mathbb{P}$ เป็น $\mathbb{Q}$ ของ GBM ตัวเดียวกัน เพราะการเปลี่ยนมาตรวัดที่สมมูลเปลี่ยน drift แต่ไม่เปลี่ยนสัมประสิทธิ์ diffusion ของกระบวนการเดียวกัน และ $\sigma_{\mathrm{RV}}$ ในการทดลองเป็นพารามิเตอร์ที่ตั้งไว้ ไม่ใช่ค่าความผันผวนตลาดที่สังเกตแล้ว สองกรณีจึงเปรียบเทียบขนาดของความผันผวนดังนี้: $$\begin{align}
  \text{กรณี A } (IV>RV): \quad & \sigma_{\mathrm{RV}} < \sigma_{\mathrm{IV}},
    \label{eq:caseA} \\
  \text{กรณี B } (RV>IV): \quad & \sigma_{\mathrm{RV}} > \sigma_{\mathrm{IV}}.
    \label{eq:caseB}
\end{align}$$

สำหรับพอร์ตที่ปรับ Delta hedge อย่างต่อเนื่อง ก่อนขาสั้นหมดอายุ เมื่อทั้งสองขาใช้ IV เดียวกันและคงที่ ไม่มีเงินปันผล ต้นทุนธุรกรรม หรือการกระโดดของราคา พจน์กำไร-ขาดทุนหลังหักต้นทุนเงินทุนในช่วงสั้น $dt$ จากความต่างของความแปรปรวนมีรูปประมาณ: $$\begin{equation}
  d\Pi \;\approx\; \tfrac{1}{2}\,\Gamma_{\text{net}}\,S_t^2
        \bigl(\sigma_{\mathrm{RV}}^2 - \sigma_{\mathrm{IV}}^2\bigr)\,dt.
  \label{eq:gamma_pnl}
\end{equation}$$ สมการ [eq:gamma_pnl] แสดงเฉพาะองค์ประกอบ Theta–Gamma ภายใต้สมมติฐานข้างต้น เมื่อ $\Gamma_{\text{net}}<0$ กรณี A ให้พจน์นี้เป็นบวก ส่วนกรณี B ให้พจน์นี้เป็นลบ ไม่ใช่การรับประกัน P&L รวมของกลยุทธ์ หาก IV เปลี่ยน ต้องรวมผลของ Vega ของแต่ละขาและพจน์อันดับสูงด้วย; หากไม่ได้ปรับ Delta hedge ยังคงมีความเสี่ยงทิศทางราคา ส่วนเครื่องหมาย $\Gamma_{\text{net}}$ ต้องตรวจใหม่เมื่อราคาเคลื่อนห่างจาก ATM.

การวิเคราะห์ค่ากรีกในงานนี้ใช้แบบจำลองแบล็ก-โชลส์ [eq:bsm_call] โดยคำนวณค่า $\Theta$ และ $\Gamma$ ตามสมการ [eq:theta_bsm] และ [eq:gamma_bsm] ตามลำดับ ที่ระดับความผันผวนแฝง ($\sigma_{IV}$) ต่าง ๆ กัน คือ 10%, 20%, 35% และ 50% เพื่อจำลองสภาวะตลาดที่หลากหลาย.
