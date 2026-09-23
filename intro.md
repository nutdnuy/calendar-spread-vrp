---
title: Calendar Spread under VRP
description: วิเคราะห์ Delta, Gamma, Theta, Vega และ Rho ของ Calendar Spread ภายใต้สภาวะ Volatility Risk Premium
---

# Calendar Spread under VRP

<div class="welcome-hero"><p class="welcome-kicker">QuantCorner · Options Strategy</p><div class="welcome-lead">เมื่อ Theta กับ Gamma<br>ผลัดกันขับเคลื่อน Calendar Spread</div><p class="welcome-summary">เชื่อมค่ากรีกทั้งห้ากับโครงสร้าง Calendar Spread แล้วดูว่าแรงขับเคลื่อนของพอร์ตเปลี่ยนอย่างไร เมื่อ Implied Volatility และ Realized Volatility อยู่คนละระบอบ</p><div class="welcome-actions"><a class="button primary" href="foundations.html">เริ่มจากโมเดล <span aria-hidden="true">→</span></a><a class="welcome-text-link" href="#lessons">ดูทั้ง 5 ตอน <span aria-hidden="true">↓</span></a></div><p class="welcome-format">สมการ Black–Scholes · กราฟผลทดลอง · Greek explorer</p></div>

<div class="regime-map" aria-label="สองระบอบ Volatility Risk Premium"><div><span>IV &gt; RV</span><strong>Theta-led</strong><p>รายได้จาก time decay เด่นขึ้นภายใต้สมมติฐานของแบบจำลอง</p></div><div><span>RV &gt; IV</span><strong>Gamma-led</strong><p>การเคลื่อนไหวของราคาและ convexity มีบทบาทมากขึ้น</p></div></div>

<div class="welcome-preparation"><h3>กรอบการอ่าน</h3><p>ผลในเว็บเป็นการวิเคราะห์เชิงแบบจำลองจากพารามิเตอร์และการจำลองที่ระบุไว้ ไม่ใช่ผลตอบแทนตลาดจริง การเพิ่มจำนวนเส้นทางจำลองลด sampling error แต่ไม่ยืนยันว่าแบบจำลองตรงกับตลาด</p></div>

<h2 id="lessons">บทเรียน 5 ตอน</h2>

<div class="welcome-lessons">
<article class="welcome-lesson"><span class="welcome-lesson-number">01</span><div><p class="welcome-lesson-label">ฐานการกำหนดราคา</p><h3><a href="foundations.html">BSM & Risk-neutral</a></h3><p>เริ่มจาก Black–Scholes PDE, Martingale และการประเมินมูลค่าภายใต้ Q</p><p class="welcome-topics">GBM · PDE · Martingale</p><a class="welcome-text-link" href="foundations.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">02</span><div><p class="welcome-lesson-label">วัดความไวของราคาออปชัน</p><h3><a href="greeks.html">The Five Greeks</a></h3><p>Delta, Gamma, Theta, Vega และ Rho พร้อมความหมายและสูตร</p><p class="welcome-topics">Direction · Convexity · Time · Volatility · Rates</p><a class="welcome-text-link" href="greeks.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">03</span><div><p class="welcome-lesson-label">ประกอบสองอายุสัญญา</p><h3><a href="calendar-structure.html">Calendar & VRP</a></h3><p>โครงสร้าง Long/Short, Payoff ณ วันหมดอายุขาสั้น และความหมายของ VRP</p><p class="welcome-topics">Net Greeks · Term structure · IV − RV</p><a class="welcome-text-link" href="calendar-structure.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">04</span><div><p class="welcome-lesson-label">กำหนดสมมติฐานให้ตรวจสอบได้</p><h3><a href="experiment.html">Experimental Setup</a></h3><p>พารามิเตอร์ กระบวนการสุ่ม และเงื่อนไขของแต่ละ VRP regime</p><p class="welcome-topics">Parameters · Stochastic process · Reproducibility</p><a class="welcome-text-link" href="experiment.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">05</span><div><p class="welcome-lesson-label">อ่านผลด้วย Theta–Gamma trade-off</p><h3><a href="results.html">Results & Discussion</a></h3><p>อายุสัญญา ความผันผวน Moneyness และผลรวมของค่ากรีกในแต่ละระบอบ</p><p class="welcome-topics">Theta · Gamma · Vega · Rolling risk</p><a class="welcome-text-link" href="results.html">อ่านตอนนี้ →</a></div></article>
</div>

<!-- author-profile -->

<div class="welcome-resources"><h3>ต้นฉบับ</h3><p>เรียบเรียงจากบทความ “การวิเคราะห์ค่ากรีกในกลยุทธ์ Calendar Spread ภายใต้สภาวะ Volatility Risk Premium” โดย Triphop Mahithitarmmatorn</p><div class="welcome-download"><a href="foundations.md" download>ดาวน์โหลด Markdown ตอนแรก</a></div></div>
