# StockAI — Code Bundle for Antigravity

> **Purpose.** Replace 2 files in the live React project to align all 8 SKUs with the Foundey brief: 4 canonical SKUs from the original brief (Classic White Sneakers, Leather Crossbody Bag, Minimalist Watch, Canvas Backpack) plus 4 coherent fashion-domain additions. Drops electronics SKUs (Apex Headphones, Audiophile Turntable, TechPro Charger) which were Stitch's invention and out of scope per the brief's "fashion brands" ICP.
>
> **Scope.** Two file replacements + one small refactor in ItemDeepReview.tsx to read from new `statCard` field.
>
> **Build budget.** Must stay under 250KB gzipped after replacement.

---

## File 1 of 2 — `src/lib/mock-data.ts`

Replace the entire file contents with:

```typescript
// PRD Section 5.3 — 8 recommendations
// 4 canonical SKUs from brief: Classic White Sneakers, Leather Crossbody Bag,
//   Minimalist Watch, Canvas Backpack
// 4 coherent additions: Wool Sweater, Yoga Pants, Cotton Polo, Trench Coat
// All within fashion/apparel ICP per Foundey brief

export interface Signal { label: string; detail: string; weight: number }
export interface Constraint { label: string; status: 'pass' | 'warn' | 'fail' }
export interface PastDecision { date: string; outcome: string; units: number; roi: string }
export interface Alternative { label: string; units: number; coverage: string; risk: string; revenue: number }
export interface ActivityEntry { time: string; user: string; action: string; detail: string; icon: string }

export interface Recommendation {
  id: number; title: string; sku: string; description: string;
  current: number; proposed: number;
  confidence: { score: number; tier: 'high' | 'medium' | 'low' };
  impact: string; impactValue: number; type: 'IMPACT' | 'OVERSTOCK';
  alert?: string; action?: string; initials: string; vendor: string; leadTime: string; baseImpact: number;
  signals: Signal[]; constraints: Constraint[]; pastDecisions: PastDecision[];
  forecastDays: number[]; alternatives: Alternative[];
  activityTimeline: ActivityEntry[]; externalSignal?: { label: string; detail: string };
  // Dynamic stat card details (replaces hardcoded text)
  statCard: {
    nextRestockGap: string;
    forecastDelta: string;
    daysOfCoverCurrent: number;
    daysOfCoverProjected: number;
    coverTarget: number;
  };
}

export const recommendations: Recommendation[] = [
  // === SKU #1: CLASSIC WHITE SNEAKERS (canonical from brief) ===
  {
    id: 1,
    title: 'Classic White Sneakers',
    sku: 'SN-2024-WHT-001',
    description: 'Northeast Regional Hub · 245 units on hand',
    current: 245,
    proposed: 725,
    confidence: { score: 98, tier: 'high' },
    impact: '+$47.2K',
    impactValue: 47200,
    type: 'IMPACT',
    alert: 'OOS in 3 days',
    initials: 'CW',
    vendor: 'Footwear Atelier',
    leadTime: '24h',
    baseImpact: 47204,
    statCard: {
      nextRestockGap: 'Next restock gap: Oct 12',
      forecastDelta: '14% vs forecast',
      daysOfCoverCurrent: 2.8,
      daysOfCoverProjected: 10.6,
      coverTarget: 12.0,
    },
    externalSignal: {
      label: 'Northeast Marathon Event',
      detail: 'Historical data and social trends indicate a 40% surge in athletic footwear demand in the Northeast region coinciding with the upcoming marathon. StockAI detected similar patterns in 2022 and 2023.',
    },
    signals: [
      { label: 'Sales Velocity', detail: '+34% vs last 7 days', weight: 88 },
      { label: 'Market Competitor Low Stock', detail: 'Regional competitors at <10% stock', weight: 62 },
      { label: 'Weather: Unseasonably Dry', detail: 'Forecast +4°C above seasonal average', weight: 24 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Northeast Distribution)', status: 'pass' },
      { label: 'Lead time reliability (Footwear Atelier)', status: 'pass' },
      { label: 'Supplier MOQs met', status: 'pass' },
      { label: 'Logistics cost variance within +/- 5%', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Sep 2023', outcome: 'Approved 350 units. Sold out in 12 days.', units: 350, roi: '+18% ROI' },
      { date: 'Apr 2024', outcome: 'Approved 420 units. Sold 380, 40 in buffer.', units: 420, roi: '+14% ROI' },
    ],
    forecastDays: [18, 22, 28, 35, 52, 78, 95, 88, 72, 45, 32, 25, 20, 18],
    alternatives: [
      { label: 'Conservative', units: 300, coverage: '14 days', risk: 'Tight', revenue: 28500 },
      { label: 'Recommended', units: 480, coverage: '21 days', risk: 'Covered', revenue: 47204 },
      { label: 'Aggressive', units: 600, coverage: '28 days', risk: 'Buffer', revenue: 62100 },
    ],
    activityTimeline: [
      { time: '2 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+480 units to Northeast Hub', icon: 'sparkles' },
      { time: '15 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '1 hour ago', user: 'StockAI', action: 'Confidence updated', detail: '96% → 98% (velocity signal strengthened)', icon: 'trending' },
      { time: '3 hours ago', user: 'Maya Chen', action: 'Viewed similar recommendation', detail: 'Lightweight Trench Coat — same region', icon: 'user' },
      { time: 'Yesterday', user: 'StockAI', action: 'Marathon event driver detected', detail: 'External data: Boston Marathon registration +12% YoY', icon: 'alert' },
      { time: '2 days ago', user: 'Shipping Ops', action: 'Lead time confirmed', detail: 'Footwear Atelier: 24h reliable (98% last 12mo)', icon: 'clock' },
      { time: 'Sep 2023', user: 'Maya Chen', action: 'Approved similar order', detail: '+350 units · Sold out in 12 days · +18% ROI', icon: 'file' },
    ],
  },

  // === SKU #2: LEATHER CROSSBODY BAG (canonical from brief) ===
  {
    id: 2,
    title: 'Leather Crossbody Bag',
    sku: 'BAG-2024-BRN-045',
    description: 'East Coast Hub · 156 units on hand',
    current: 156,
    proposed: 480,
    confidence: { score: 76, tier: 'medium' },
    impact: '+$28.4K',
    impactValue: 28400,
    type: 'IMPACT',
    alert: 'OOS in 5 days',
    initials: 'LB',
    vendor: 'Heritage Leather Co',
    leadTime: '48h',
    baseImpact: 28400,
    statCard: {
      nextRestockGap: 'Next restock gap: Nov 18',
      forecastDelta: '8% vs forecast',
      daysOfCoverCurrent: 4.1,
      daysOfCoverProjected: 14.2,
      coverTarget: 14.0,
    },
    externalSignal: {
      label: 'Holiday Gift Season Approaching',
      detail: 'Premium accessories sales historically surge 55% in the 6 weeks before the holiday season. Search trends for leather goods are up 32% year-over-year.',
    },
    signals: [
      { label: 'Sales Velocity', detail: '+22% vs trailing 7-day avg', weight: 71 },
      { label: 'Gift Season Proximity', detail: 'Premium accessories peak in 5 weeks', weight: 64 },
      { label: 'Trend Momentum', detail: '3 consecutive quarters of growth', weight: 42 },
    ],
    constraints: [
      { label: 'Warehouse capacity (East Coast Hub)', status: 'pass' },
      { label: 'Lead time reliability (Heritage Leather Co)', status: 'pass' },
      { label: 'Supplier MOQs met (min 100)', status: 'pass' },
      { label: 'Q4 accessories budget allocation (62% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Nov 2023', outcome: 'Restocked 380 units. Sold through in 18 days.', units: 380, roi: '+22% ROI' },
      { date: 'Jun 2024', outcome: 'Restocked 220 units. Sold through in 24 days.', units: 220, roi: '+11% ROI' },
    ],
    forecastDays: [22, 25, 28, 32, 38, 45, 52, 58, 62, 55, 48, 42, 38, 32],
    alternatives: [
      { label: 'Conservative', units: 240, coverage: '18 days', risk: 'Tight', revenue: 18200 },
      { label: 'Recommended', units: 324, coverage: '28 days', risk: 'Covered', revenue: 28400 },
      { label: 'Aggressive', units: 480, coverage: '42 days', risk: 'Buffer', revenue: 42100 },
    ],
    activityTimeline: [
      { time: '5 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+324 units to East Coast Hub', icon: 'sparkles' },
      { time: '20 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '2 hours ago', user: 'StockAI', action: 'Gift season driver activated', detail: 'Holiday proximity signal now weighted', icon: 'trending' },
      { time: '6 hours ago', user: 'Inventory Ops', action: 'Stock level alert triggered', detail: 'On-hand dropped below 200-unit threshold', icon: 'alert' },
      { time: 'Nov 2023', user: 'Sam Rivera', action: 'Approved similar holiday restock', detail: '+380 units · Sold through in 18 days · +22% ROI', icon: 'file' },
    ],
  },

  // === SKU #3: MINIMALIST WATCH (canonical from brief, but OVERSTOCK type) ===
  {
    id: 3,
    title: 'Minimalist Watch',
    sku: 'WTH-2024-SLV-023',
    description: 'Global Distribution Center · 1,200 on hand',
    current: 1200,
    proposed: 450,
    confidence: { score: 94, tier: 'high' },
    impact: '-$4.2K',
    impactValue: -4200,
    type: 'OVERSTOCK',
    action: 'Liquidation Rec',
    initials: 'MW',
    vendor: 'Chrono Atelier',
    leadTime: '72h',
    baseImpact: -4200,
    statCard: {
      nextRestockGap: 'Reduce inventory: Oct 15',
      forecastDelta: '-12% vs forecast',
      daysOfCoverCurrent: 38.4,
      daysOfCoverProjected: 14.0,
      coverTarget: 14.0,
    },
    signals: [
      { label: 'Demand Softening', detail: '-12% MoM velocity for 3 months', weight: 82 },
      { label: 'New Collection Launch', detail: 'Updated SS25 line replaces this colorway', weight: 67 },
      { label: 'Price Elasticity Shift', detail: 'Discount response declining — market saturated', weight: 38 },
    ],
    constraints: [
      { label: 'Transfer logistics cost ($1.2K)', status: 'pass' },
      { label: 'Outlet channel capacity', status: 'pass' },
      { label: 'Markdown authorization (20% max)', status: 'warn' },
      { label: 'Carrying cost threshold exceeded', status: 'warn' },
    ],
    pastDecisions: [
      { date: 'Q2 2024', outcome: 'Liquidated similar accessories SKU. 87% recovery.', units: 800, roi: '87% recovery' },
      { date: 'Q4 2023', outcome: 'Held overstock too long. Recovery dropped 15%.', units: 600, roi: '72% recovery' },
    ],
    forecastDays: [45, 42, 40, 38, 36, 34, 32, 30, 28, 26, 25, 24, 23, 22],
    alternatives: [
      { label: 'Transfer Only', units: -400, coverage: 'Redistribute', risk: 'Low', revenue: 3800 },
      { label: 'Recommended', units: -750, coverage: 'Transfer + markdown', risk: 'Low', revenue: 4200 },
      { label: 'Full Liquidation', units: -900, coverage: 'Clear all excess', risk: 'Medium', revenue: 5100 },
    ],
    activityTimeline: [
      { time: '10 min ago', user: 'StockAI', action: 'Overstock alert generated', detail: 'Inventory 2.7x 90-day projected demand', icon: 'sparkles' },
      { time: '1 hour ago', user: 'System', action: 'New collection launch detected', detail: 'SS25 silver colorway indexed; demand model updated', icon: 'alert' },
      { time: '1 day ago', user: 'StockAI', action: 'Velocity decline confirmed', detail: '3rd consecutive month of -12% MoM decline', icon: 'trending' },
      { time: '3 days ago', user: 'Category Mgr', action: 'Price elasticity review', detail: 'Discount response curve flattening vs Q2', icon: 'user' },
      { time: 'Q2 2024', user: 'Ops Team', action: 'Executed similar liquidation', detail: '800 units · 87% recovery rate · 14 day cycle', icon: 'file' },
    ],
  },

  // === SKU #4: CANVAS BACKPACK (canonical from brief, but OVERSTOCK transfer) ===
  {
    id: 4,
    title: 'Canvas Backpack',
    sku: 'BKP-2024-NVY-067',
    description: 'Central Warehouse · 560 units on hand',
    current: 560,
    proposed: 280,
    confidence: { score: 91, tier: 'high' },
    impact: '-$3.1K',
    impactValue: -3100,
    type: 'OVERSTOCK',
    action: 'Transfer Rec',
    initials: 'CB',
    vendor: 'Workshop Studios',
    leadTime: '24h',
    baseImpact: -3100,
    statCard: {
      nextRestockGap: 'Transfer to: West Coast Hub',
      forecastDelta: '-20% vs forecast',
      daysOfCoverCurrent: 28.0,
      daysOfCoverProjected: 14.0,
      coverTarget: 14.0,
    },
    signals: [
      { label: 'Regional Demand Mismatch', detail: 'Central 40% oversupplied vs West Coast deficit', weight: 78 },
      { label: 'Seasonal Shift Ending', detail: 'Back-to-school demand completed, velocity -20%', weight: 56 },
      { label: 'West Coast Opportunity', detail: 'Canvas accessories trending +30% in SF/LA', weight: 42 },
    ],
    constraints: [
      { label: 'Transfer logistics (Central → West Coast)', status: 'pass' },
      { label: 'Receiving warehouse capacity', status: 'pass' },
      { label: 'Transfer cost vs holding cost', status: 'pass' },
      { label: 'SKU condition for transfer (A-grade)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Q1 2024', outcome: 'Transferred 200 units Central→Southeast. 92% sell-through.', units: 200, roi: '92% sell-through' },
      { date: 'Q3 2023', outcome: 'Held overstock 6 weeks. Carrying cost $1.8K.', units: 0, roi: '-$1.8K cost' },
    ],
    forecastDays: [40, 38, 35, 32, 30, 28, 26, 25, 24, 23, 22, 22, 21, 20],
    alternatives: [
      { label: 'Partial Transfer', units: -180, coverage: 'Reduce to 1.5x demand', risk: 'Low', revenue: 2200 },
      { label: 'Recommended', units: -280, coverage: 'Right-size to demand', risk: 'Low', revenue: 3100 },
      { label: 'Full Redistribution', units: -350, coverage: 'Lean + West Coast push', risk: 'Medium', revenue: 3800 },
    ],
    activityTimeline: [
      { time: '6 min ago', user: 'StockAI', action: 'Transfer recommendation generated', detail: '-280 units from Central Warehouse', icon: 'sparkles' },
      { time: '30 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '4 hours ago', user: 'StockAI', action: 'Demand mismatch detected', detail: 'Central oversupply vs West Coast deficit identified', icon: 'alert' },
      { time: '1 day ago', user: 'Regional Mgr', action: 'West Coast demand flagged', detail: 'Canvas accessories trending in SF/LA metro', icon: 'user' },
      { time: 'Q1 2024', user: 'Ops Team', action: 'Executed similar transfer', detail: '200 units Central→Southeast · 92% sell-through', icon: 'file' },
    ],
  },

  // === SKU #5: WOOL KNIT SWEATER (new — weather-driven IMPACT) ===
  {
    id: 5,
    title: 'Wool Knit Sweater',
    sku: 'KNT-2024-CRM-012',
    description: 'Northeast Hub · 89 units on hand',
    current: 89,
    proposed: 280,
    confidence: { score: 89, tier: 'high' },
    impact: '+$22.4K',
    impactValue: 22400,
    type: 'IMPACT',
    alert: 'OOS in 7 days',
    initials: 'WS',
    vendor: 'Highland Textiles',
    leadTime: '48h',
    baseImpact: 22400,
    statCard: {
      nextRestockGap: 'Next restock gap: Oct 22',
      forecastDelta: '+18% vs forecast',
      daysOfCoverCurrent: 6.4,
      daysOfCoverProjected: 20.0,
      coverTarget: 21.0,
    },
    externalSignal: {
      label: 'Cold Snap Forecast',
      detail: 'Weather services indicate a cold snap arriving in 5 days across the Northeast corridor with temperatures 8°C below seasonal average. Historical data shows knitwear demand surges 35% during similar events.',
    },
    signals: [
      { label: 'Seasonal Demand Shift', detail: 'Fall knitwear +35% historically', weight: 80 },
      { label: 'Weather Forecast', detail: 'Cold snap in 5 days, 8°C below avg', weight: 61 },
      { label: 'Sales Velocity', detail: '+18% vs trailing 7-day avg', weight: 44 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Northeast Hub)', status: 'pass' },
      { label: 'Lead time reliability (Highland Textiles)', status: 'pass' },
      { label: 'Supplier MOQs met (min 100)', status: 'pass' },
      { label: 'Apparel budget allocation (55% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Oct 2023', outcome: 'Fall restock 280 units. Sold in 16 days.', units: 280, roi: '+19% ROI' },
      { date: 'Oct 2024', outcome: 'Restocked 320 units. Sold in 14 days.', units: 320, roi: '+16% ROI' },
    ],
    forecastDays: [25, 28, 32, 40, 58, 72, 85, 80, 65, 48, 35, 28, 25, 22],
    alternatives: [
      { label: 'Conservative', units: 130, coverage: '12 days', risk: 'Tight', revenue: 13200 },
      { label: 'Recommended', units: 191, coverage: '20 days', risk: 'Covered', revenue: 22400 },
      { label: 'Aggressive', units: 320, coverage: '32 days', risk: 'Buffer', revenue: 31600 },
    ],
    activityTimeline: [
      { time: '3 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+191 units to Northeast Hub', icon: 'sparkles' },
      { time: '25 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '2 hours ago', user: 'StockAI', action: 'Weather driver activated', detail: 'Cold snap forecast triggered seasonal model', icon: 'alert' },
      { time: '5 hours ago', user: 'StockAI', action: 'Velocity signal strengthened', detail: 'Early fall demand pattern matching 2023 cycle', icon: 'trending' },
      { time: 'Oct 2023', user: 'Maya Chen', action: 'Approved fall restock', detail: '+280 units · Sold in 16 days · +19% ROI', icon: 'file' },
    ],
  },

  // === SKU #6: PERFORMANCE YOGA PANTS (new — January wellness, medium conf) ===
  {
    id: 6,
    title: 'Performance Yoga Pants',
    sku: 'YGP-2024-BLK-034',
    description: 'Southeast DC · 142 units on hand',
    current: 142,
    proposed: 380,
    confidence: { score: 67, tier: 'medium' },
    impact: '+$9.2K',
    impactValue: 9200,
    type: 'IMPACT',
    initials: 'YP',
    vendor: 'Studio Athletics',
    leadTime: '24h',
    baseImpact: 9200,
    statCard: {
      nextRestockGap: 'Next restock gap: Jan 8',
      forecastDelta: '+11% vs forecast',
      daysOfCoverCurrent: 9.8,
      daysOfCoverProjected: 26.0,
      coverTarget: 28.0,
    },
    externalSignal: {
      label: 'New Year Wellness Surge',
      detail: 'Activewear sales historically spike 60% in January driven by New Year fitness commitments. Early indicators from gym membership data and search trends suggest a strong season ahead.',
    },
    signals: [
      { label: 'New Year Wellness Trend', detail: 'Activewear demand +60% in Jan historically', weight: 68 },
      { label: 'Early Velocity Signal', detail: '+18% vs 30-day average (limited history)', weight: 52 },
      { label: 'Category Growth', detail: 'Activewear category +25% YoY', weight: 40 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Southeast DC)', status: 'pass' },
      { label: 'Lead time reliability (Studio Athletics)', status: 'pass' },
      { label: 'Supplier MOQs met (min 50)', status: 'pass' },
      { label: 'New SKU data confidence (4 months history)', status: 'warn' },
    ],
    pastDecisions: [
      { date: 'Launch', outcome: 'Initial stock 100 units. Sold in 28 days.', units: 100, roi: '+8% ROI' },
    ],
    forecastDays: [30, 32, 35, 38, 42, 45, 48, 50, 48, 44, 40, 36, 33, 30],
    alternatives: [
      { label: 'Conservative', units: 150, coverage: '15 days', risk: 'Moderate', revenue: 5800 },
      { label: 'Recommended', units: 238, coverage: '26 days', risk: 'Covered', revenue: 9200 },
      { label: 'Aggressive', units: 400, coverage: '42 days', risk: 'Buffer', revenue: 14800 },
    ],
    activityTimeline: [
      { time: '12 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+238 units to Southeast DC', icon: 'sparkles' },
      { time: '45 min ago', user: 'System', action: 'Constraint validation passed', detail: '3 pass, 1 warning (data confidence)', icon: 'check' },
      { time: '3 hours ago', user: 'StockAI', action: 'Wellness trend activated', detail: 'January fitness spike model engaged', icon: 'trending' },
      { time: '1 day ago', user: 'Product Mgr', action: 'Reviewed new SKU performance', detail: 'Early sell-through exceeding initial projections', icon: 'user' },
      { time: 'Launch', user: 'Buying Team', action: 'Initial stock placed', detail: '100 units · Sold through in 28 days', icon: 'file' },
    ],
  },

  // === SKU #7: COTTON POLO SHIRT (new — cold-start, low confidence) ===
  {
    id: 7,
    title: 'Cotton Polo Shirt',
    sku: 'POL-2024-WHT-088',
    description: 'Central Warehouse · 32 units on hand',
    current: 32,
    proposed: 168,
    confidence: { score: 44, tier: 'low' },
    impact: '+$6.1K',
    impactValue: 6100,
    type: 'IMPACT',
    alert: 'OOS in 4 days',
    initials: 'CP',
    vendor: 'Premium Cotton Co',
    leadTime: '72h',
    baseImpact: 6100,
    statCard: {
      nextRestockGap: 'Next restock gap: Nov 5',
      forecastDelta: 'Insufficient history',
      daysOfCoverCurrent: 5.3,
      daysOfCoverProjected: 18.0,
      coverTarget: 21.0,
    },
    signals: [
      { label: 'New SKU — Limited History', detail: 'Only 6 weeks of sales data available', weight: 35 },
      { label: 'Category Momentum', detail: 'Polo category +15% YoY', weight: 52 },
      { label: 'High Uncertainty Band', detail: 'Demand range: 30-120 units over 14 days', weight: 28 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Central Warehouse)', status: 'pass' },
      { label: 'Lead time reliability (Premium Cotton Co)', status: 'warn' },
      { label: 'Supplier MOQ met (min 50)', status: 'pass' },
      { label: 'New product risk reserve (flagged)', status: 'warn' },
    ],
    pastDecisions: [
      { date: '6 weeks ago', outcome: 'Initial stock 60 units. Sold 42 in first month.', units: 60, roi: 'TBD (new SKU)' },
    ],
    forecastDays: [25, 28, 32, 38, 42, 40, 35, 30, 28, 26, 25, 24, 23, 22],
    alternatives: [
      { label: 'Conservative', units: 80, coverage: '10 days', risk: 'Moderate', revenue: 3200 },
      { label: 'Recommended', units: 136, coverage: '18 days', risk: 'Moderate', revenue: 6100 },
      { label: 'Aggressive', units: 240, coverage: '32 days', risk: 'High', revenue: 9800 },
    ],
    activityTimeline: [
      { time: '15 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+136 units to Central Warehouse (low confidence)', icon: 'sparkles' },
      { time: '1 hour ago', user: 'System', action: 'Constraint validation', detail: '2 pass, 2 warnings (lead time + new product risk)', icon: 'check' },
      { time: '3 hours ago', user: 'StockAI', action: 'Confidence capped at 44%', detail: 'Insufficient history for higher confidence band', icon: 'alert' },
      { time: '1 day ago', user: 'Buying Team', action: 'Category review completed', detail: 'Polo category growth confirmed, adoption curve uncertain', icon: 'user' },
      { time: '6 weeks ago', user: 'Buying Team', action: 'Initial order placed', detail: '60 units · 42 sold in first month · Monitoring', icon: 'file' },
    ],
  },

  // === SKU #8: LIGHTWEIGHT TRENCH COAT (new — RTO + cold snap multi-signal) ===
  {
    id: 8,
    title: 'Lightweight Trench Coat',
    sku: 'TRN-2024-KHK-056',
    description: 'West Coast Hub · 178 units on hand',
    current: 178,
    proposed: 520,
    confidence: { score: 92, tier: 'high' },
    impact: '+$31.6K',
    impactValue: 31600,
    type: 'IMPACT',
    alert: 'OOS in 6 days',
    initials: 'TC',
    vendor: 'Outerwear Studio',
    leadTime: '48h',
    baseImpact: 31600,
    statCard: {
      nextRestockGap: 'Next restock gap: Oct 28',
      forecastDelta: '+22% vs forecast',
      daysOfCoverCurrent: 5.8,
      daysOfCoverProjected: 18.4,
      coverTarget: 21.0,
    },
    externalSignal: {
      label: 'Return-to-Office + Cold Snap',
      detail: 'Corporate RTO mandates are driving a 35% increase in commuter outerwear demand. Combined with a cold snap arriving in 5 days, the West Coast corridor is showing strong demand signals.',
    },
    signals: [
      { label: 'Return-to-Office Pattern', detail: 'Commuter traffic +22% in metro areas', weight: 79 },
      { label: 'Weather Forecast', detail: 'Cold snap in 5 days, 8°C below avg', weight: 65 },
      { label: 'Seasonal Demand Shift', detail: 'Fall outerwear +28% historically', weight: 48 },
    ],
    constraints: [
      { label: 'Warehouse capacity (West Coast Hub)', status: 'pass' },
      { label: 'Lead time reliability (Outerwear Studio)', status: 'pass' },
      { label: 'Supplier MOQs met (min 100)', status: 'pass' },
      { label: 'Outerwear budget allocation (61% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Oct 2023', outcome: 'Restocked 320 units. Sold in 18 days.', units: 320, roi: '+21% ROI' },
      { date: 'Mar 2024', outcome: 'Restocked 280 units. Sold in 16 days.', units: 280, roi: '+18% ROI' },
    ],
    forecastDays: [28, 32, 38, 45, 62, 78, 88, 82, 68, 50, 38, 32, 28, 25],
    alternatives: [
      { label: 'Conservative', units: 240, coverage: '14 days', risk: 'Tight', revenue: 18400 },
      { label: 'Recommended', units: 342, coverage: '20 days', risk: 'Covered', revenue: 31600 },
      { label: 'Aggressive', units: 520, coverage: '32 days', risk: 'Buffer', revenue: 44200 },
    ],
    activityTimeline: [
      { time: '4 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+342 units to West Coast Hub', icon: 'sparkles' },
      { time: '22 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '2 hours ago', user: 'StockAI', action: 'Multi-driver alignment detected', detail: 'RTO + weather + seasonal all converging', icon: 'trending' },
      { time: '5 hours ago', user: 'StockAI', action: 'Cold snap weather signal activated', detail: 'Forecast: 8°C below seasonal in West Coast metros', icon: 'alert' },
      { time: 'Oct 2023', user: 'Maya Chen', action: 'Approved similar fall order', detail: '+320 units · Sold in 18 days · +21% ROI', icon: 'file' },
    ],
  },
];
```

---

## File 2 of 2 — `src/lib/mock-ai/responses.ts`

Replace the entire file contents with:

```typescript
// PRD 5.3 — Response trees per recommendation
// Aligned with mock-data.ts: 4 canonical SKUs from brief + 4 coherent additions
// All apparel/accessories. No electronics, no audio gear.

import type { ResponseCategory } from './router';

export interface ResponseTree {
  recommendationId: number;
  defaultAnswer: string;
  categories: Record<ResponseCategory, string[]>;
  suggestedQuestions: {
    why: string[];
    forecast: string[];
    alternatives: string[];
    activity: string[];
  };
}

const TREES: ResponseTree[] = [
  // === SKU #1: CLASSIC WHITE SNEAKERS (HERO — full depth) ===
  {
    recommendationId: 1,
    defaultAnswer:
      "The model considers velocity, regional events, weather, and competitor stock levels. For Classic White Sneakers, the Northeast marathon driver is the largest weight contributor, which is why the recommendation is +480 units instead of the steady-state +280.",
    categories: {
      confidence: [
        "The 98% confidence comes from three things lining up. First, sales velocity is up 34% over the last 7 days, which is statistically significant. Second, the marathon driver has 9 years of historical data showing a consistent 40% surge pattern. Third, all four constraints passed cleanly. The remaining 2% uncertainty is the marathon variance band — last year's surge was 38%, two years ago it was 43%.",
        "Mostly because the marathon signal carries variance. Historical surge has ranged from 38% to 43% across the last 7 years. The model can't be more precise than that band, so 98% reflects the bottom edge of the range. If you want to narrow it further, you'd need to wait for next-day registration data, but you'd lose 24 hours of lead time.",
        "Three drivers stack: velocity is +34%, the marathon historically lifts athletic footwear 40%, and weather is favorable. The 2% gap is the marathon variance — it's never landed on exactly 40% in the last 7 years. Nothing in the data suggests this year would be the outlier.",
      ],
      alternatives: [
        "Two real alternatives. Order 350 units instead of 480 — that's the conservative scenario, captures 80% of upside but cuts stockout risk from 'covered' to 'tight.' Or order 600 — the aggressive scenario, full marathon coverage plus buffer, but adds $4.2K to working capital. The 480 recommendation is the impact-weighted optimum.",
        "If you cut to 300 units, you'd save $5K in working capital but accept a ~30% probability of stockout by day 6 of the marathon weekend. The model flagged this trade-off and chose +480 because the lost-sales cost ($47K downside) outweighs the capital savings.",
        "The model considered three: 300 (capital-conservative), 480 (recommended), 600 (full-coverage). 480 won on expected-value math: highest probability of capturing demand without overstock risk.",
      ],
      risk: [
        "The biggest risk is the marathon variance. If this year's surge is on the low end (say 35% instead of 40%), you'd end up with about 80 units of overstock by week 3. Recoverable in next replenishment cycle. The model flagged this as low-severity because the markdown cost is $2.1K, much smaller than the $47K stockout cost on the other side.",
        "Two risks worth naming. First, marathon variance — covered above. Second, weather. The current forecast is favorable, but a storm during the event would compress demand into a tighter window and could cause same-day stockouts at high-foot-traffic stores. Mitigation: keep 12% safety stock at the top three Boston stores.",
        "If the marathon is canceled, you'd be holding 480 units of athletic footwear in a region that's already at steady-state. Recovery time is around 6 weeks of normal sell-through. Probability of cancellation is under 1% (event has run for 28 consecutive years), so the model didn't weight it heavily.",
      ],
      history: [
        "Three similar recommendations approved in the last 18 months. Sep 2023 marathon prep: approved 350 units, sold out in 12 days, +18% ROI. Apr 2024 Boston event: approved 420 units, sold 380, retained 40 in transferable buffer. Sep 2024: similar marathon, approved 510, sold 490. Pattern is consistent.",
        "The closest precedent is Sep 2023. Same SKU family, same region, similar surge driver. Approved 350 units, sold out in 12 days. The model has incorporated that outcome into the current weighting.",
      ],
      explanation: [
        "Three drivers in order of weight. (1) Sales velocity: +34% vs trailing 7-day average — biggest signal at weight 88. (2) Competitor stock levels: regional competitors are below 10% on comparable SKUs, weight 62. (3) Weather: 4°C above seasonal average, marginal lift on athletic footwear, weight 24. The marathon driver is treated as a discrete event, separate from continuous signals.",
        "It's the velocity, the competitor stock, and the marathon. Velocity says 'demand is already trending up.' Competitor stock says 'the demand has nowhere else to go.' The marathon says 'demand is about to spike.' Three independent signals, all pointing the same direction. That's why the confidence is high.",
      ],
      timing: [
        "If you approve today, the order ships tomorrow morning and arrives at the Northeast Distribution Center on Wednesday. Replenishment to stores happens Thursday-Friday, which puts inventory in place 48 hours before the marathon weekend. That's the tightest acceptable window.",
        "Lead time on Footwear Atelier is 24 hours, plus 48 hours for the warehouse-to-store leg. Approve by end of day for full coverage. Approve tomorrow morning and you'd still hit it, but with no buffer for warehouse delays.",
      ],
      constraints: [
        "All four passed. Warehouse capacity at the Northeast DC is at 67% utilization, plenty of room. Lead time reliability for Footwear Atelier is 98% over the last 12 months. MOQ is 250 units, and we're recommending 480, well above. Logistics cost variance is +2.3% on this lane, within the 5% tolerance band.",
        "Worth knowing: lead time has slipped twice in the last quarter, both times by 12 hours. The 98% reliability number includes those. If you want to be safer, you can build in 24 hours of buffer by ordering today instead of waiting for tomorrow's pricing review.",
      ],
      forecast: [
        "The 14-day forecast shows demand peaking on day 6 (marathon Saturday), tailing through day 9, then returning to baseline. Without action, on-hand units hit zero by day 5 in three of the eight Northeast stores. With the recommended +480, all stores stay above the safety threshold through day 14.",
        "Demand is highly concentrated in days 5-9. About 62% of the projected revenue lands in that 5-day window. The replenishment is sized to cover that surge plus 10 days of trailing demand.",
      ],
      override: [
        "Fair pushback. The model's recommendation is the impact-weighted optimum, but there's a real range of reasonable choices here. If you want to override, the dismiss action will capture your reasoning code, and the model will retrain on it for the next similar decision. What's driving your concern?",
        "I hear you. If you want to go more conservative, 350 is a defensible call. The model would still approve that — it's within the 'high confidence' band. Anything below 300 is where the model would flag the choice as below the impact threshold.",
      ],
    },
    suggestedQuestions: {
      why: [
        "Why is the confidence 98% and not 100%?",
        "What happens if I cut this to 300 units?",
        "Show me past similar decisions.",
      ],
      forecast: [
        "When does the demand peak?",
        "What if the marathon is rainy?",
        "How many units do I lose without action?",
      ],
      alternatives: [
        "What's the most conservative option?",
        "Why didn't the model recommend 600?",
        "How does the 480 break down by store?",
      ],
      activity: [
        "Who approved similar recommendations?",
        "What was the outcome of the Sep 2023 decision?",
        "Has this SKU been overridden before?",
      ],
    },
  },

  // === SKU #2: LEATHER CROSSBODY BAG ===
  {
    recommendationId: 2,
    defaultAnswer: "Premium accessory with growing velocity heading into holiday gift season. Current inventory of 156 units covers about 4 days at projected velocity. The +324 recommendation extends coverage through the gift surge window.",
    categories: {
      confidence: [
        "76% reflects moderate certainty. The gift season pattern is well-documented — premium accessories spike 55% in the 6 weeks before holidays, consistent over 4 years of data. The remaining uncertainty is around how much of that lift this specific colorway captures vs the broader category.",
        "Three signals stack: velocity is up 22%, gift season proximity adds weight 64, and the trend has held for 3 quarters. The 24% gap to 100% is the single-SKU variance — premium leather goods have wider performance bands than mass-market accessories.",
      ],
      alternatives: [
        "Three options. Conservative: 240 units, covers 18 days but tight if gift demand front-loads. Recommended: 324 units, balances cover and capital. Aggressive: 480 units, full season buffer but ties up $14K extra in working capital. The 324 number is the EV optimum.",
        "If you go to 200, you'd save about $8K in capital but accept stockout risk in week 3 of November. The trade-off is roughly $12K in projected lost sales vs the savings. Model recommends against it.",
      ],
      risk: [
        "Main risk is gift season pacing. If holiday shopping shifts later this year (Black Friday-driven), the demand curve compresses into December and you might end with overstock through mid-November. Mitigation: the 28-day cover gives you flexibility to redirect to other channels.",
        "Secondary risk: vendor concentration. Heritage Leather Co supplies 3 of our top accessories SKUs. A vendor delay would hit multiple lines. Lead time reliability is 96% over 12 months, so probability is low.",
      ],
      history: ["Two relevant precedents. Nov 2023: restocked 380 units for holiday, sold through in 18 days at +22% ROI. Jun 2024: restocked 220 units for summer, sold in 24 days at +11% ROI. Holiday timing performs better than off-season, which the model has weighted into the current recommendation."],
      explanation: ["Velocity is the primary driver at weight 71. Gift season proximity adds weight 64 — this is a forward-looking signal based on holiday calendar. Trend momentum at weight 42 confirms the category is healthy beyond just the holiday spike."],
      timing: ["Heritage Leather Co lead time is 48 hours. Approve today for Thursday delivery. Current stock covers through Friday at best, so timing matters."],
      constraints: ["MOQ is 100 units — we're well above. Warehouse capacity is fine at 71% utilization. Q4 accessories budget has 62% remaining, plenty of room for this allocation."],
      forecast: ["Demand curve has gradual lift starting now, accelerating in early November as gift shoppers begin. Peak occurs around weeks 3-4 from today. Without action, you'll run low by day 5 and hit zero in the busy stores by day 7."],
      override: ["Your call. The 76% confidence means there's meaningful judgment room. If you have insight on gift season timing the model lacks — say, marketing campaign timing — that's a valid override input."],
    },
    suggestedQuestions: {
      why: ["Why is confidence only 76%?", "How big is the gift season lift?", "Is the trend specific to this colorway?"],
      forecast: ["When does holiday demand peak?", "How fast will we sell through?", "What's the post-holiday tail?"],
      alternatives: ["Should we go more aggressive?", "Can we split the order?", "What's the most conservative defensible call?"],
      activity: ["How did Nov 2023 holiday perform?", "Any returns concerns?", "Who manages this category?"],
    },
  },

  // === SKU #3: MINIMALIST WATCH (OVERSTOCK liquidation) ===
  {
    recommendationId: 3,
    defaultAnswer: "This is an overstock liquidation. Current inventory of 1,200 units is 2.7x the 90-day projected demand. The model recommends reducing to 450 units through transfer to higher-demand markets and managed markdown.",
    categories: {
      confidence: [
        "94% confidence in the overstock diagnosis. Velocity has been declining 12% month-over-month for 3 months running, which is a clear pattern. The new SS25 collection launch replaces this colorway in marketing, so demand will continue to soften. The 6% remaining uncertainty is around recovery rate variance.",
        "The model is highly confident this is overstock, less confident on the exact recovery rate. Q2 2024 we hit 87% on a similar liquidation. Q4 2023 we waited too long and dropped to 72%. The recommendation is sized to capture the higher recovery band.",
      ],
      alternatives: [
        "Three options. Transfer Only: -400 units, redistribute to West Coast where this colorway still moves. Recommended: -750 units, mix of transfer and 15% markdown to clear faster. Full Liquidation: -900 units, aggressive markdown plus outlet channel. The middle option preserves the most margin.",
        "If you only transfer (no markdown), recovery is roughly $3.8K but the timeline stretches to 8-10 weeks. The recommended action gets you to $4.2K in 3-4 weeks. Speed has value when carrying costs are accumulating.",
      ],
      risk: [
        "Main risk is recovery rate decay. Every month of delay reduces recovery by ~15%. We've seen this pattern twice in 2 years. The Q4 2023 example holding cost us about $1.8K in carrying plus dropped recovery from a projected 87% to actual 72%.",
        "Smaller risk: brand perception on aggressive markdowns. 15% off this premium SKU shouldn't trigger luxury concerns, but if discounting persists past 30 days, the brand team usually steps in. Recommendation respects that boundary.",
      ],
      history: ["Q2 2024 was the closest precedent. Liquidated 800 units of a similar accessories SKU at 87% recovery in a 14-day cycle. Q4 2023 we held longer than recommended — recovery dropped to 72%. Lesson is consistent: act early, recovery rate erodes monthly."],
      explanation: ["Three signals. Demand softening at weight 82 is the strongest — three consecutive months of -12% MoM is unambiguous. New collection launch at weight 67 confirms this colorway is being replaced in active marketing. Price elasticity shift at weight 38 shows discount response is also flattening, which means deeper markdowns aren't proportionally effective."],
      timing: ["Sooner is better. Every month delayed costs roughly 15% of recovery rate. Recommend initiating transfer within 48 hours and markdown by end of week. The full cycle should close in 3-4 weeks."],
      constraints: ["No MOQ on liquidation. Transfer logistics cost is $1.2K. Two warnings: markdown authorization is at 20% max (we're proposing 15%, well within), and carrying cost threshold has been exceeded — that's actually what triggered this recommendation."],
      forecast: ["At natural sell-through velocity (-12% MoM declining), it would take roughly 8.5 months to clear the current inventory. Carrying cost over that period exceeds the liquidation cost by about 3x."],
      override: ["If you believe the new SS25 collection will somehow pull demand back to this colorway, holding makes sense. But the data and the marketing team's plans both point the other direction. Strong recommendation to act."],
    },
    suggestedQuestions: {
      why: ["Why liquidate instead of holding?", "How accurate is the decline forecast?", "What's the carrying cost per month?"],
      forecast: ["How long until natural sell-through?", "Will the new collection drive any spillover?", "What's the markdown response curve?"],
      alternatives: ["Can we transfer instead of liquidate?", "What markdown percentage is needed?", "Which markets want this SKU?"],
      activity: ["Have we liquidated this SKU before?", "What was the recovery rate?", "Who approved past liquidations?"],
    },
  },

  // === SKU #4: CANVAS BACKPACK (OVERSTOCK transfer) ===
  {
    recommendationId: 4,
    defaultAnswer: "Regional demand mismatch. Central Warehouse is 40% oversupplied while West Coast has a deficit on this SKU. The recommendation is to transfer 280 units rather than hold or liquidate.",
    categories: {
      confidence: [
        "91% confidence in the demand mismatch diagnosis. Central velocity dropped 20% post-back-to-school, while West Coast and Southeast show canvas accessories trending +30%. The mismatch is clear across multiple data points. The 9% uncertainty is about transfer timing precision.",
        "The model is highly confident this is a redistribution problem, not an overstock problem. The same SKU is selling well in other markets — we just have it in the wrong place. That's why the recommendation is transfer, not markdown.",
      ],
      alternatives: [
        "Three options. Partial Transfer: -180 units, conservative reduction to 1.5x demand at Central. Recommended: -280 units, right-size to demand. Full Redistribution: -350 units, aggressive lean plus West Coast push. The middle option captures most upside without overcommitting to West Coast forecast accuracy.",
        "Alternative is to hold and run a Central-only promotion. Lower logistics cost, but recovery takes 4-6 weeks vs 2 weeks for transfer. Total math favors the transfer.",
      ],
      risk: [
        "Risk of transferring: $1.2K logistics cost and 48 hours of transit time. If Central demand unexpectedly spikes, you'd be short. Risk of holding: $3.1K in carrying costs and the opportunity cost of missing the West Coast trend window.",
        "Back-to-school demand is fully complete — velocity has stabilized at the lower level. Probability of a Central demand spike before holiday season is under 5%. Q1 2024 transfer to Southeast hit 92% sell-through, supporting this recommendation.",
      ],
      history: [
        "Q1 2024: transferred 200 units Central→Southeast, 92% sell-through in 3 weeks. Q3 2023: held overstock for 6 weeks — carrying cost was $1.8K and recovery dropped 15%. Lesson is consistent: transfer early when there's a destination market.",
      ],
      explanation: ["Core signal is the regional demand mismatch at weight 78. Central is 40% oversupplied post-back-to-school, while SF/LA metros show canvas accessories trending +30%. Seasonal shift ending at weight 56 confirms the Central decline is structural, not temporary. West Coast opportunity at weight 42 provides the destination logic."],
      timing: ["Transfer logistics are 48 hours door-to-door. Initiate today for Wednesday arrival at West Coast Hub. Every month of delay at Central reduces recovery rate by ~15%."],
      constraints: ["Transfer cost is $1.2K. Receiving warehouse has capacity at 73% utilization. SKU condition is A-grade, approved for transfer. No markdown needed — this is redistribution, not liquidation."],
      forecast: ["Central demand is flat-to-declining for the next 6 weeks until holiday. West Coast demand is climbing and will peak in 3-4 weeks as fall fashion cycles through. The transfer window is optimal right now."],
      override: ["If you expect early holiday demand at Central, holding makes sense. But the last 3 years show holiday lift doesn't start until 6 weeks from now. The carrying cost of waiting is real."],
    },
    suggestedQuestions: {
      why: ["Why is demand declining at Central?", "Is the West Coast trend sustainable?", "What's the markdown alternative?"],
      forecast: ["How long to sell through naturally?", "Any holiday boost coming?", "What's the velocity trend?"],
      alternatives: ["Which locations should receive transfers?", "Can we bundle with other products?", "What's the transfer cost?"],
      activity: ["When was the last transfer?", "How did it perform?", "Any quality issues?"],
    },
  },

  // === SKU #5: WOOL KNIT SWEATER (weather-driven IMPACT) ===
  {
    recommendationId: 5,
    defaultAnswer: "Seasonal demand shift driving the recommendation. Knitwear sees a 35% lift in early fall. Cold snap forecast in 5 days adds urgency. Current inventory covers about 6 days at projected velocity.",
    categories: {
      confidence: [
        "89% confidence comes from three converging signals. Fall seasonal lift is historically reliable at 35% (+/- 5%). The cold snap forecast in 5 days accelerates the curve. And early velocity is +18%, confirming the pattern is starting. All three signals align.",
        "The 11% uncertainty is mostly weather variance. If the cold snap misses the Northeast corridor, the demand lift drops to about 20% instead of 35%. Still profitable, but the order would be oversized by about 60 units.",
      ],
      alternatives: [
        "Three options. Conservative: 130 units, covers 12 days, captures initial cold snap but not full fall season. Recommended: 191 units, covers the seasonal peak. Aggressive: 320 units, full season plus holiday buffer. The 191 number balances seasonal certainty against holiday uncertainty.",
        "If you want to stage it, order 130 now and 60 in two weeks. Downside: shipping cost twice and a 48-hour gap during peak transition.",
      ],
      risk: [
        "Two risks. Weather variance: if the cold snap misses, you'd hold pre-season inventory for an extra 2 weeks. Style risk: last fall's knitwear had a 6% return rate due to fit. If this season's cut has the same issue, returns eat margin.",
        "The seasonal lift signal is the most reliable of the three. Cold snap and velocity are both supporting evidence. If either weakens, the order could scale back to 130-150 with little downside.",
      ],
      history: ["Oct 2023: restocked 280 units, sold in 16 days at +19% ROI. Oct 2024: restocked 320 units, sold in 14 days at +16% ROI. Consistent fall pattern with improving velocity year-over-year."],
      explanation: ["Three signals stack. Seasonal demand shift at weight 80 — fall knitwear lifts 35% historically. Weather forecast at weight 61 — cold snap in 5 days, 8°C below average. Sales velocity at weight 44 — early indicator confirming pattern. Independent signals, all pointing up."],
      timing: ["Highland Textiles lead time is 48 hours. Cold snap hits in 5 days. Approve today for Wednesday delivery, giving 2 days of buffer before the demand spike."],
      constraints: ["MOQ is 100 units — we're above. Northeast Hub has capacity. Apparel budget is at 55% remaining for the quarter. No constraints flagged."],
      forecast: ["Demand curve peaks around days 5-9 coinciding with the cold snap, then sustains at elevated levels through fall. Without action, current inventory runs out by day 7."],
      override: ["If you think the cold snap forecast is unreliable or fall demand is softer than historical, a smaller order is reasonable. The seasonal lift alone justifies +130, the full +191 depends on weather and velocity holding."],
    },
    suggestedQuestions: {
      why: ["What's driving the seasonal lift?", "How reliable is the cold snap forecast?", "Is the velocity sustained?"],
      forecast: ["When does fall demand peak?", "How long does the season last?", "What's the sell-through rate?"],
      alternatives: ["What if we order 130 instead?", "Can we stagger the order?", "Any clearance risk at end of season?"],
      activity: ["How did last fall perform?", "Any style changes this season?", "What's the return rate?"],
    },
  },

  // === SKU #6: PERFORMANCE YOGA PANTS (medium conf, January wellness) ===
  {
    recommendationId: 6,
    defaultAnswer: "Steady-state demand with moderate confidence. The 67% reflects limited historical data — this SKU launched 4 months ago. Early velocity is promising but the model wants more cycles before being fully confident.",
    categories: {
      confidence: [
        "67% is the model's honest assessment given limited data. This SKU launched 4 months ago — the model has one partial season of sell-through. The January wellness spike is a well-documented category pattern at +60%, but whether this specific product captures that lift is uncertain. Two more quarters would push confidence to about 82%.",
        "The 33% uncertainty breaks down roughly as: 15% from insufficient product history, 10% from competitive response unknown, and 8% from January spike magnitude variance year-to-year.",
      ],
      alternatives: [
        "Three options. Conservative: 150 units, 15 days of cover, enough to test the January spike without overcommitting. Recommended: 238 units, captures the seasonal window. Aggressive: 400 units, full 42-day coverage but risky for a 4-month-old SKU.",
        "Alternative is a trial restock of 100 units with a velocity trigger for follow-up. Downside: if the wellness spike hits hard, you'd lose 3-4 days during reorder. Vendor lead time is fast (24h) so this option is viable.",
      ],
      risk: [
        "Primary risk is new product uncertainty. The activewear category is growing +25% YoY, but this specific SKU has only 4 months of data. If velocity doesn't sustain through January, you'd have about 50 units of slow inventory. Markdown cost on activewear is moderate at roughly $400.",
        "Secondary risk: January wellness spike varies year to year. 2023 was +52%, 2024 was +68%. The model uses +60% as baseline, but actual could be at either end of the range.",
      ],
      history: ["Only one data point: launch stock of 100 units sold through in 28 days at +8% ROI. Promising but insufficient for high-confidence prediction. Category precedents (similar activewear) show 85% sell-through in January for established SKUs."],
      explanation: ["Three signals at moderate weight. New Year wellness trend at weight 68 — activewear historically spikes 60% in January. Early velocity at weight 52 — this SKU is +18% vs 30-day average. Category growth at weight 40 — activewear +25% YoY. Model is cautious because product-specific data is thin."],
      timing: ["Studio Athletics lead time is 24 hours, fastest of any vendor today. You have time to wait 1-2 days if you want more velocity data. But the January spike ramps in roughly 10 days."],
      constraints: ["MOQ is 50 units — we're above. Warehouse has space. One warning: new SKU data confidence is at 4 months, below the 6-month threshold for high-confidence recommendations."],
      forecast: ["Demand curve shows gradual lift starting now, peaking mid-January. Smoother than event-driven spikes — no single day dominates. Without action, you'll run low by day 12 but won't fully stock out."],
      override: ["Given 67% confidence, the model would support a more conservative order without flagging it. If you want to wait 1-2 weeks for more velocity data, the fast 24h lead time gives you that flexibility."],
    },
    suggestedQuestions: {
      why: ["Why is confidence only 67%?", "What data is the model missing?", "How does it compare to similar activewear?"],
      forecast: ["What's the 30-day demand outlook?", "How big is the January wellness spike?", "How fast is the category growing?"],
      alternatives: ["Should we wait for more data?", "What's the conservative order?", "Can we do a trial restock?"],
      activity: ["How has it sold since launch?", "Any marketing campaigns planned?", "What's the customer feedback?"],
    },
  },

  // === SKU #7: COTTON POLO SHIRT (LOW CONFIDENCE 44%) ===
  {
    recommendationId: 7,
    defaultAnswer: "Low confidence (44%) due to limited product history. However, the polo category is growing and the on-hand stock will run out in 4 days. The recommendation is moderate at +136 units to test demand without overcommitting.",
    categories: {
      confidence: [
        "44% is the lowest confidence in today's queue, and the model is being transparent about why. This SKU has only 6 weeks of sales data — far below the 6-month minimum for high confidence. The polo category is growing at +15% YoY, but how THIS specific product performs vs competitors is unclear.",
        "The confidence is capped by three factors. First, only 6 weeks of history. Second, the demand range is wide (30-120 units over 14 days). Third, Premium Cotton Co has a lead time reliability warning. The category signal is okay but product-specific data is thin.",
      ],
      alternatives: [
        "Three options. Conservative: 80 units, covers 10 days, limits downside if adoption is slower than hoped. Recommended: 136 units, measured test that captures upside without betting big. Aggressive: 240 units, full 32-day bet on the category trend.",
        "You could also negotiate consignment with Premium Cotton Co — they've offered it for new SKUs before. Reduces your risk to near-zero but cuts margin by 15%.",
      ],
      risk: [
        "Biggest risk is adoption uncertainty. New basic apparel SKUs have a bimodal outcome: they catch on quickly (60% of cases) or they flatline after the initial trial (40%). If this one flatlines, you'd hold roughly 50 units of slow inventory. Markdown cost about $400.",
        "Secondary risk: Premium Cotton Co lead time has slipped twice in the last quarter, both by 24+ hours. On a 72-hour quoted lead time, that's significant. If you approve today and they slip, the inventory gap widens.",
      ],
      history: ["One data point: 60 units initial stock 6 weeks ago. 42 sold in the first month at 70% sell-through. That's decent but not conclusive. Category precedents are mixed — basic apparel SKUs have high variance in first-year performance."],
      explanation: ["Category momentum at weight 52 is the strongest driver, but it's a category-level signal, not product-specific. The new SKU limited-history flag at weight 35 actively suppresses confidence. High uncertainty band at weight 28 reflects the model's honest assessment that it doesn't know enough yet."],
      timing: ["Premium Cotton Co lead time is 72 hours, longest in today's queue, plus a reliability warning. Approve today for Monday delivery if they're on time, Wednesday if they slip. Current 32-unit stock covers about 5 days at estimated velocity."],
      constraints: ["MOQ is 50 — we're above at 136. Warehouse has space. Two warnings: supplier lead time reliability at 89% (below 95% threshold), and new product risk reserve flagged — this order would use 60% of the new-SKU risk budget for the quarter."],
      forecast: ["Forecast has wide error bars. Central estimate is about 6 units/day, range is 2-9. The bar chart shows a modest peak around day 5 as the product gets more visibility, then settling into steady state — IF adoption holds. If not, the curve drops to 2 units/day by day 8."],
      override: ["Given 44% confidence, the model would fully support a smaller order or even a hold-and-monitor decision. Waiting 2 weeks for more velocity data is defensible. The category trend isn't going anywhere — this is about product-specific risk."],
    },
    suggestedQuestions: {
      why: ["Why is confidence so low?", "What data is the model missing?", "Is the category growth reliable?"],
      forecast: ["What's the expected adoption curve?", "How fast is the category growing?", "When will we have more confidence?"],
      alternatives: ["Should we start with fewer units?", "Can we get a consignment deal?", "What's the return policy?"],
      activity: ["Is this our first reorder?", "What's the supplier reliability?", "Any quality concerns from initial batch?"],
    },
  },

  // === SKU #8: LIGHTWEIGHT TRENCH COAT (multi-driver, RTO + cold snap) ===
  {
    recommendationId: 8,
    defaultAnswer: "Multi-signal recommendation. Return-to-office mandates plus an incoming cold snap are converging to drive outerwear demand on the West Coast. Current inventory covers about 6 days at projected velocity.",
    categories: {
      confidence: [
        "92% confidence comes from three independent signals aligning. RTO commuter pattern at weight 79 shows metro foot traffic up 22%, well-documented. Cold snap forecast at weight 65 — 8°C below seasonal, 5 days out. Seasonal demand shift at weight 48 — fall outerwear lifts 28% historically. All three independent, all pointing up.",
        "The 8% uncertainty is split between weather variance (the cold snap could miss the West Coast corridor) and RTO pattern stability (corporate mandates can shift). Either weakening would scale the recommendation back by about 80 units.",
      ],
      alternatives: [
        "Three options. Conservative: 240 units, 14 days of cover, captures RTO surge but tight on cold snap. Recommended: 342 units, covers the multi-signal peak. Aggressive: 520 units, full season plus holiday buffer at $13K extra capital.",
        "If you want to be safer, 240 captures most of the RTO upside (the most reliable signal) and lets weather-driven demand be a follow-up reorder. Vendor lead time of 48h makes this viable.",
      ],
      risk: [
        "Primary risk is weather variance. If the cold snap misses West Coast metros, the demand lift drops from 35% to about 22%. You'd be holding roughly 100 units of pre-season inventory. Recovery is straightforward — outerwear has 3-month sell-through window.",
        "Secondary risk: RTO mandate softening. Some companies have walked back full RTO in recent months. If commuter traffic dips, the +22% signal weakens. Mitigation: the 28-day cover gives flexibility to redirect to other channels.",
      ],
      history: ["Two relevant precedents. Oct 2023: restocked 320 units, sold in 18 days at +21% ROI. Mar 2024: restocked 280 units for spring, sold in 16 days at +18% ROI. Outerwear pattern is consistent — strong fall and spring demand windows."],
      explanation: ["Three drivers stack independently. RTO commuter pattern at weight 79 is the strongest — metro foot traffic data is real-time and unambiguous. Weather forecast at weight 65 — cold snap is 5 days out, high probability event. Seasonal demand shift at weight 48 — fall outerwear historically lifts 28%. Three independent signals, all pointing up. That's why confidence is high."],
      timing: ["Outerwear Studio lead time is 48 hours. Cold snap hits in 5 days. Approve today for Wednesday delivery, gives 2-3 days of buffer before the demand surge."],
      constraints: ["All four passed. MOQ is 100 units — we're at 342, well above. West Coast Hub has capacity. Outerwear budget at 61% remaining. No constraints flagged."],
      forecast: ["Demand curve peaks around days 5-9 coinciding with cold snap arrival, then sustains at elevated levels through fall. About 58% of projected revenue lands in the 5-day surge window. Without action, current inventory zeros out by day 6."],
      override: ["If you have insight on RTO mandates softening that the model doesn't see, a smaller order is reasonable. Conservative 240 captures the most reliable signal (RTO) without betting on weather. The full +342 depends on all three signals holding."],
    },
    suggestedQuestions: {
      why: ["What's driving the high confidence?", "How reliable is the cold snap forecast?", "Is the RTO trend sustainable?"],
      forecast: ["When does the demand peak?", "How long does the season last?", "What's the sell-through rate?"],
      alternatives: ["What if we order 240 instead?", "Can we stage the order?", "Any clearance risk at end of season?"],
      activity: ["How did Oct 2023 fall perform?", "Any style changes this season?", "What's the return rate?"],
    },
  },
];

// Track used indices to avoid repetition (PRD 5.9)
const usedIndices: Record<string, Set<number>> = {};

export function getResponseTree(recId: number): ResponseTree {
  return TREES.find((t) => t.recommendationId === recId) ?? TREES[0];
}

export function getResponse(recId: number, category: ResponseCategory): string {
  const tree = getResponseTree(recId);
  const variants = tree.categories[category];
  if (!variants || variants.length === 0) return tree.defaultAnswer;

  const key = `${recId}-${category}`;
  if (!usedIndices[key]) usedIndices[key] = new Set();

  // Find an unused index, or reset if all used
  let available = variants.map((_, i) => i).filter((i) => !usedIndices[key].has(i));
  if (available.length === 0) {
    usedIndices[key] = new Set();
    available = variants.map((_, i) => i);
  }

  const idx = available[Math.floor(Math.random() * available.length)];
  usedIndices[key].add(idx);
  return variants[idx];
}
```

---

## Refactor in `src/components/ItemDeepReview.tsx`

The new `mock-data.ts` adds a `statCard` field to each Recommendation. Update the stat cards section to read dynamic values per rec instead of hardcoded text.

### Find these hardcoded strings and replace with dynamic references

| Hardcoded (current) | Dynamic (new) |
|---|---|
| `Next restock gap: Oct 12` | `{rec.statCard.nextRestockGap}` |
| `14% vs forecast` | `{rec.statCard.forecastDelta}` |
| `2.8 → 10.6` (in days of cover stat card) | `{rec.statCard.daysOfCoverCurrent} → {rec.statCard.daysOfCoverProjected}` |
| `Target: 12.0 days` | `Target: {rec.statCard.coverTarget} days` |

Use the existing TypeScript interface `Recommendation['statCard']` from mock-data.ts. Type safety should be enforced — every rec has all 5 fields.

---

## Build sequence

1. Replace `src/lib/mock-data.ts` with the file above
2. Replace `src/lib/mock-ai/responses.ts` with the file above
3. Apply the 4 string replacements in `ItemDeepReview.tsx`
4. Run `pnpm build` and verify bundle size < 250KB gzipped
5. Run `pnpm dev` and smoke test in browser:
   - Rec #1 Classic White Sneakers: external signal "Northeast Marathon Event"
   - Rec #3 Minimalist Watch: NO external signal callout (overstock recs don't have one), drivers reference "New Collection Launch", **zero references to Sony WH-1000XM6 anywhere**
   - Rec #7 Cotton Polo: 44% rose confidence pill, 2 warning constraints, "Insufficient history" forecast delta
   - Rec #8 Lightweight Trench Coat: 3 signals (RTO + Cold Snap + Seasonal), confidence 92%
   - Stat cards show different `nextRestockGap` text per rec (not all "Oct 12")
6. `git add . && git commit -m "feat: replace SKUs with canonical brief alignment" && git push`
7. Vercel auto-redeploy, verify live URL shows new SKUs

---

## What changed at a glance

**Removed (out of scope per brief):**
- Vortex Runner Pro (rebranded as Classic White Sneakers, canonical)
- Chronos Minimalist Watch (rebranded as Minimalist Watch, canonical)
- Apex Wireless Headphones (electronics — REMOVED entirely)
- Audiophile Turntable X (electronics — REMOVED)
- Urban Commuter Jacket (rebranded as Lightweight Trench Coat for canonical fit)
- SmartFit Yoga Mat Pro (rebranded as Performance Yoga Pants for apparel fit)
- Heritage Leather Backpack (rebranded as Canvas Backpack, canonical)
- TechPro Wireless Charger (electronics — REMOVED, replaced with Cotton Polo cold-start scenario)

**Final 8 SKUs (all apparel/accessories, fits brief ICP):**

| # | SKU | Type | Confidence | Driver |
|---|---|---|---|---|
| 1 | Classic White Sneakers | IMPACT | 98% high | Marathon (canonical) |
| 2 | Leather Crossbody Bag | IMPACT | 76% medium | Holiday gift season (canonical) |
| 3 | Minimalist Watch | OVERSTOCK | 94% high | New SS25 collection launch (canonical) |
| 4 | Canvas Backpack | OVERSTOCK | 91% high | Regional transfer (canonical) |
| 5 | Wool Knit Sweater | IMPACT | 89% high | Cold snap weather |
| 6 | Performance Yoga Pants | IMPACT | 67% medium | January wellness |
| 7 | Cotton Polo Shirt | IMPACT | 44% LOW | Cold-start, limited history |
| 8 | Lightweight Trench Coat | IMPACT | 92% high | RTO + cold snap multi-signal |

**Vendors updated** to fashion-domain names: Footwear Atelier, Heritage Leather Co, Chrono Atelier, Workshop Studios, Highland Textiles, Studio Athletics, Premium Cotton Co, Outerwear Studio.

**External signals updated** to fashion-coherent triggers: gift season, weather, RTO, wellness trends, regional mismatches, collection launches.

**Activity timelines updated** to reference fashion-coherent users (Category Mgr, Buying Team, Inventory Ops) and cross-link between coherent SKUs (Sneakers references Trench Coat as "same region viewing").
