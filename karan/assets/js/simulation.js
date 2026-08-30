/**
 * NetSuite 3-Way Matching & AP Reconciliation Engine Simulation
 * Author: Karan Deepak Arora
 * Purpose: Demonstrates automated 3-way match logic (PO vs IR vs VB)
 */

document.addEventListener('DOMContentLoaded', () => {
  const poQtyInput = document.getElementById('sim_po_qty');
  const poRateInput = document.getElementById('sim_po_rate');
  const irQtyInput = document.getElementById('sim_ir_qty');
  const vbQtyInput = document.getElementById('sim_vb_qty');
  const vbRateInput = document.getElementById('sim_vb_rate');
  const qtyTolInput = document.getElementById('sim_qty_tol');
  const priceTolInput = document.getElementById('sim_price_tol');

  const presetCleanBtn = document.getElementById('sim_preset_clean');
  const presetQtyErrBtn = document.getElementById('sim_preset_qty_err');
  const presetPriceErrBtn = document.getElementById('sim_preset_price_err');
  const presetTolBtn = document.getElementById('sim_preset_tol');

  // Output elements
  const poTotalEl = document.getElementById('sim_out_po_total');
  const irTotalEl = document.getElementById('sim_out_ir_total');
  const vbTotalEl = document.getElementById('sim_out_vb_total');
  const varianceAmtEl = document.getElementById('sim_out_variance_amt');
  const statusBanner = document.getElementById('sim_status_banner');
  const statusMsg = document.getElementById('sim_status_msg');
  const statusBadge = document.getElementById('sim_status_badge');
  const actionDetails = document.getElementById('sim_action_details');

  if (!poQtyInput) return;

  function formatCurrency(val) {
    return '$' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function runReconciliation() {
    const poQty = parseFloat(poQtyInput.value) || 0;
    const poRate = parseFloat(poRateInput.value) || 0;
    const irQty = parseFloat(irQtyInput.value) || 0;
    const vbQty = parseFloat(vbQtyInput.value) || 0;
    const vbRate = parseFloat(vbRateInput.value) || 0;
    const qtyTol = parseFloat(qtyTolInput.value) || 0;
    const priceTol = parseFloat(priceTolInput.value) || 0;

    const poTotal = poQty * poRate;
    const irTotal = irQty * poRate;
    const vbTotal = vbQty * vbRate;

    // Variance calculations (Bill vs Receipt for Qty, Bill vs PO for Price)
    const qtyDiff = vbQty - irQty;
    const qtyVariancePct = irQty > 0 ? Math.abs((qtyDiff / irQty) * 100) : 0;

    const priceDiff = vbRate - poRate;
    const priceVariancePct = poRate > 0 ? Math.abs((priceDiff / poRate) * 100) : 0;

    const netVarianceAmt = vbTotal - irTotal;

    // Update Metrics
    poTotalEl.textContent = formatCurrency(poTotal);
    irTotalEl.textContent = formatCurrency(irTotal);
    vbTotalEl.textContent = formatCurrency(vbTotal);
    varianceAmtEl.textContent = (netVarianceAmt >= 0 ? '+' : '') + formatCurrency(netVarianceAmt);

    // Apply color to variance amount
    if (Math.abs(netVarianceAmt) < 0.01) {
      varianceAmtEl.style.color = 'var(--text-primary)';
    } else if (netVarianceAmt > 0) {
      varianceAmtEl.style.color = 'var(--accent-danger)';
    } else {
      varianceAmtEl.style.color = 'var(--accent-warning)';
    }

    // Status Banner Logic
    statusBanner.className = 'sim-status-banner';

    if (qtyDiff === 0 && priceDiff === 0) {
      // Exact Match
      statusBanner.classList.add('status-matched');
      statusBadge.textContent = '3-WAY MATCH SUCCESS (100%)';
      statusMsg.textContent = 'PO, Item Receipt, and Vendor Bill perfectly reconciled.';
      actionDetails.innerHTML = '<strong>NetSuite Action:</strong> Automated Bill Approval &amp; Payment Scheduling triggered via Suitelet/Map-Reduce.';
    } else if (qtyVariancePct <= qtyTol && priceVariancePct <= priceTol) {
      // Within Tolerance
      statusBanner.classList.add('status-tolerance');
      statusBadge.textContent = 'MATCHED WITHIN TOLERANCE';
      statusMsg.textContent = `Variances (Qty: ${qtyVariancePct.toFixed(1)}%, Price: ${priceVariancePct.toFixed(1)}%) are within permitted thresholds.`;
      actionDetails.innerHTML = '<strong>NetSuite Action:</strong> Auto-approved with GL Variance Adjustment line injected via Custom GL Plugin.';
    } else {
      // Discrepancy Exceeded
      statusBanner.classList.add('status-discrepancy');
      statusBadge.textContent = 'VARIANCE EXCEPTION FLAGGED';
      let discrepancies = [];
      if (qtyVariancePct > qtyTol) discrepancies.push(`Qty Variance: ${qtyDiff > 0 ? '+' : ''}${qtyDiff} units (${qtyVariancePct.toFixed(1)}% vs ${qtyTol}% max)`);
      if (priceVariancePct > priceTol) discrepancies.push(`Price Variance: ${priceDiff > 0 ? '+' : ''}$${priceDiff.toFixed(2)}/unit (${priceVariancePct.toFixed(1)}% vs ${priceTol}% max)`);

      statusMsg.textContent = `Thresholds exceeded. ${discrepancies.join(' | ')}`;
      actionDetails.innerHTML = '<strong>NetSuite Action:</strong> Vendor Bill placed on <em>Payment Hold</em>. Automated email notification sent to Buyer &amp; AP Manager for discrepancy review.';
    }
  }

  // Bind inputs
  [poQtyInput, poRateInput, irQtyInput, vbQtyInput, vbRateInput, qtyTolInput, priceTolInput].forEach(input => {
    input.addEventListener('input', runReconciliation);
  });

  // Presets
  if (presetCleanBtn) {
    presetCleanBtn.addEventListener('click', () => {
      poQtyInput.value = 100;
      poRateInput.value = 50.00;
      irQtyInput.value = 100;
      vbQtyInput.value = 100;
      vbRateInput.value = 50.00;
      qtyTolInput.value = 2.0;
      priceTolInput.value = 1.0;
      runReconciliation();
    });
  }

  if (presetQtyErrBtn) {
    presetQtyErrBtn.addEventListener('click', () => {
      poQtyInput.value = 100;
      poRateInput.value = 50.00;
      irQtyInput.value = 85;
      vbQtyInput.value = 100;
      vbRateInput.value = 50.00;
      qtyTolInput.value = 2.0;
      priceTolInput.value = 1.0;
      runReconciliation();
    });
  }

  if (presetPriceErrBtn) {
    presetPriceErrBtn.addEventListener('click', () => {
      poQtyInput.value = 100;
      poRateInput.value = 50.00;
      irQtyInput.value = 100;
      vbQtyInput.value = 100;
      vbRateInput.value = 56.50;
      qtyTolInput.value = 2.0;
      priceTolInput.value = 1.0;
      runReconciliation();
    });
  }

  if (presetTolBtn) {
    presetTolBtn.addEventListener('click', () => {
      poQtyInput.value = 500;
      poRateInput.value = 25.00;
      irQtyInput.value = 495;
      vbQtyInput.value = 500;
      vbRateInput.value = 25.10;
      qtyTolInput.value = 2.0;
      priceTolInput.value = 1.0;
      runReconciliation();
    });
  }

  // Initial Run
  runReconciliation();
});
