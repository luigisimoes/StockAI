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