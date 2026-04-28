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
}

export const recommendations: Recommendation[] = [
  {
    id: 1, title: 'Vortex Runner Pro', sku: 'FW-VRP-01',
    description: 'Northeast Regional Hub • 124 units on hand',
    current: 420, proposed: 900,
    confidence: { score: 98, tier: 'high' },
    impact: '$12,400', impactValue: 12400, type: 'IMPACT',
    alert: 'OOS in 3 days', initials: 'VR', vendor: 'Nike Distribution', leadTime: '24h', baseImpact: 47204,
    externalSignal: { label: 'Northeast Marathon Event', detail: 'Historical data and social trends indicate a 40% surge in athletic footwear demand in the Northeast region coinciding with the upcoming marathon. StockAI detected similar patterns in 2022 and 2023.' },
    signals: [
      { label: 'Sales Velocity', detail: '+34% vs last 7 days', weight: 88 },
      { label: 'Market Competitor Low Stock', detail: 'Regional competitors at <10% stock', weight: 62 },
      { label: 'Weather: Unseasonably Dry', detail: 'Forecast +4°C above seasonal average', weight: 24 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Northeast Distribution)', status: 'pass' },
      { label: 'Lead time reliability (Nike Distribution)', status: 'pass' },
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
      { time: '3 hours ago', user: 'Maya Chen', action: 'Viewed similar recommendation', detail: 'Urban Commuter Jacket — same region', icon: 'user' },
      { time: 'Yesterday', user: 'StockAI', action: 'Marathon event driver detected', detail: 'External data: Boston Marathon registration +12% YoY', icon: 'alert' },
      { time: '2 days ago', user: 'Shipping Ops', action: 'Lead time confirmed', detail: 'Nike Distribution: 24h reliable (98% last 12mo)', icon: 'clock' },
      { time: 'Sep 2023', user: 'Maya Chen', action: 'Approved similar order', detail: '+350 units · Sold out in 12 days · +18% ROI', icon: 'file' },
    ],
  },
  {
    id: 2, title: 'Chronos Minimalist Watch', sku: 'ACC-CMW-09',
    description: 'East Hub • 15 units on hand',
    current: 50, proposed: 200,
    confidence: { score: 72, tier: 'medium' },
    impact: '$8,120', impactValue: 8120, type: 'IMPACT',
    alert: 'OOS in 1 day', initials: 'CM', vendor: 'Chrono Corp', leadTime: '48h', baseImpact: 18500,
    externalSignal: { label: 'Holiday Gift Season Approaching', detail: 'Premium watch sales historically surge 55% in the 6 weeks before the holiday season. Social media mentions of minimalist watches are up 32% YoY.' },
    signals: [
      { label: 'Sales Velocity', detail: '+28% vs trailing 7-day avg', weight: 74 },
      { label: 'Gift Season Proximity', detail: 'Premium accessories peak in 3 weeks', weight: 58 },
      { label: 'Trend Momentum', detail: '3 consecutive quarters of growth', weight: 45 },
    ],
    constraints: [
      { label: 'Warehouse capacity (East Hub)', status: 'pass' },
      { label: 'Lead time reliability (Chrono Corp)', status: 'pass' },
      { label: 'Supplier MOQs met (min 50)', status: 'pass' },
      { label: 'Q4 accessories budget allocation (62% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Nov 2023', outcome: 'Restocked 120 units. Sold through in 18 days.', units: 120, roi: '+22% ROI' },
      { date: 'Jun 2024', outcome: 'Restocked 80 units. Sold through in 24 days.', units: 80, roi: '+11% ROI' },
    ],
    forecastDays: [30, 32, 35, 38, 42, 48, 55, 60, 62, 58, 50, 42, 35, 30],
    alternatives: [
      { label: 'Conservative', units: 100, coverage: '14 days', risk: 'Tight', revenue: 12200 },
      { label: 'Recommended', units: 150, coverage: '21 days', risk: 'Covered', revenue: 18500 },
      { label: 'Aggressive', units: 250, coverage: '35 days', risk: 'Buffer', revenue: 28400 },
    ],
    activityTimeline: [
      { time: '5 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+150 units to East Hub', icon: 'sparkles' },
      { time: '20 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '2 hours ago', user: 'StockAI', action: 'Gift season driver activated', detail: 'Holiday proximity signal now weighted', icon: 'trending' },
      { time: '6 hours ago', user: 'Inventory Ops', action: 'Stock level alert triggered', detail: 'On-hand dropped below 20-unit threshold', icon: 'alert' },
      { time: 'Nov 2023', user: 'Sam Rivera', action: 'Approved similar holiday restock', detail: '+120 units · Sold through in 18 days · +22% ROI', icon: 'file' },
    ],
  },
  {
    id: 3, title: 'Apex Wireless Headphones', sku: 'ELC-AWH-03',
    description: 'Global Distribution Center • 1,200 on hand',
    current: 1200, proposed: 450,
    confidence: { score: 94, tier: 'high' },
    impact: '-$4,200', impactValue: -4200, type: 'OVERSTOCK',
    action: 'Liquidation Rec', initials: 'AW', vendor: 'Audio Systems Inc', leadTime: '72h', baseImpact: -4200,
    signals: [
      { label: 'Demand Softening', detail: '-12% MoM velocity for 3 months', weight: 82 },
      { label: 'Competitor Product Launch', detail: 'Sony WH-1000XM6 released last week', weight: 65 },
      { label: 'Price Elasticity Shift', detail: 'Discount response declining — market saturated', weight: 38 },
    ],
    constraints: [
      { label: 'Transfer logistics cost ($1.2K)', status: 'pass' },
      { label: 'Outlet channel capacity', status: 'pass' },
      { label: 'Markdown authorization (20% max)', status: 'warn' },
      { label: 'Carrying cost threshold exceeded', status: 'warn' },
    ],
    pastDecisions: [
      { date: 'Q2 2024', outcome: 'Liquidated similar electronics SKU. 87% recovery.', units: 800, roi: '87% recovery' },
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
      { time: '1 hour ago', user: 'System', action: 'Competitor launch detected', detail: 'Sony WH-1000XM6 indexed; demand model updated', icon: 'alert' },
      { time: '1 day ago', user: 'StockAI', action: 'Velocity decline confirmed', detail: '3rd consecutive month of -12% MoM decline', icon: 'trending' },
      { time: '3 days ago', user: 'Category Mgr', action: 'Price elasticity review', detail: 'Discount response curve flattening vs Q2', icon: 'user' },
      { time: 'Q2 2024', user: 'Ops Team', action: 'Executed similar liquidation', detail: '800 units · 87% recovery rate · 14 day cycle', icon: 'file' },
    ],
  },
  {
    id: 4, title: 'Audiophile Turntable X', sku: 'ELC-ATX-04',
    description: 'South Port Hub • 4 units on hand',
    current: 4, proposed: 24,
    confidence: { score: 81, tier: 'medium' },
    impact: '$5,900', impactValue: 5900, type: 'IMPACT',
    alert: 'OOS in 5 days', initials: 'AT', vendor: 'Audio Systems Inc', leadTime: '36h', baseImpact: 5900,
    externalSignal: { label: 'Vinyl Resurgence Trend', detail: 'Vinyl record sales hit a 30-year high last quarter. Turntable searches are up 45% YoY, driven by Gen-Z and millennial collectors.' },
    signals: [
      { label: 'Niche Conversion Rate', detail: '4.2x category average conversion', weight: 76 },
      { label: 'Vinyl Sales Correlation', detail: 'Record sales +45% YoY, strong co-purchase', weight: 54 },
      { label: 'Low Inventory Urgency', detail: 'Only 4 units vs 2.1 units/day velocity', weight: 48 },
    ],
    constraints: [
      { label: 'Warehouse capacity (South Port Hub)', status: 'pass' },
      { label: 'Lead time reliability (Audio Systems Inc)', status: 'pass' },
      { label: 'Supplier MOQ met (min 10)', status: 'pass' },
      { label: 'Specialty electronics budget (41% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Mar 2024', outcome: 'Restocked 15 units. Sold in 9 days.', units: 15, roi: '+26% ROI' },
      { date: 'Aug 2024', outcome: 'Restocked 18 units. Sold in 11 days.', units: 18, roi: '+21% ROI' },
    ],
    forecastDays: [35, 38, 42, 48, 52, 55, 58, 55, 50, 45, 40, 38, 36, 35],
    alternatives: [
      { label: 'Conservative', units: 12, coverage: '6 days', risk: 'Tight', revenue: 3500 },
      { label: 'Recommended', units: 20, coverage: '10 days', risk: 'Covered', revenue: 5900 },
      { label: 'Aggressive', units: 36, coverage: '18 days', risk: 'Buffer', revenue: 9200 },
    ],
    activityTimeline: [
      { time: '8 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+20 units to South Port Hub', icon: 'sparkles' },
      { time: '30 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '4 hours ago', user: 'StockAI', action: 'Vinyl trend signal updated', detail: 'Co-purchase correlation strengthened', icon: 'trending' },
      { time: '1 day ago', user: 'Category Mgr', action: 'Reviewed enthusiast segment', detail: 'Niche buyer segment growing 3x in 6 months', icon: 'user' },
      { time: 'Mar 2024', user: 'Maya Chen', action: 'Approved similar restock', detail: '+15 units · Sold in 9 days · +26% ROI', icon: 'file' },
    ],
  },
  {
    id: 5, title: 'Urban Commuter Jacket', sku: 'APP-UCJ-12',
    description: 'West Coast Hub • 340 units on hand',
    current: 340, proposed: 680,
    confidence: { score: 89, tier: 'high' },
    impact: '$9,800', impactValue: 9800, type: 'IMPACT',
    alert: 'OOS in 7 days', initials: 'UC', vendor: 'UrbanWear Co', leadTime: '48h', baseImpact: 22400,
    externalSignal: { label: 'Return-to-Office Surge', detail: 'Corporate RTO mandates are driving a 35% increase in commuter apparel demand. Weather forecast shows a cold snap arriving in 5 days across the West Coast corridor.' },
    signals: [
      { label: 'Seasonal Demand Shift', detail: 'Fall commuter apparel +35% historically', weight: 80 },
      { label: 'Weather Forecast', detail: 'Cold snap in 5 days, 8°C below avg', weight: 61 },
      { label: 'RTO Office Pattern', detail: 'Commuter traffic +22% in metro areas', weight: 44 },
    ],
    constraints: [
      { label: 'Warehouse capacity (West Coast Hub)', status: 'pass' },
      { label: 'Lead time reliability (UrbanWear Co)', status: 'pass' },
      { label: 'Supplier MOQs met (min 100)', status: 'pass' },
      { label: 'Apparel budget allocation (55% remaining)', status: 'pass' },
    ],
    pastDecisions: [
      { date: 'Oct 2023', outcome: 'Fall restock 280 units. Sold in 16 days.', units: 280, roi: '+19% ROI' },
      { date: 'Oct 2024', outcome: 'Restocked 320 units. Sold in 14 days.', units: 320, roi: '+16% ROI' },
    ],
    forecastDays: [25, 28, 32, 40, 58, 72, 85, 80, 65, 48, 35, 28, 25, 22],
    alternatives: [
      { label: 'Conservative', units: 200, coverage: '12 days', risk: 'Tight', revenue: 13200 },
      { label: 'Recommended', units: 340, coverage: '21 days', risk: 'Covered', revenue: 22400 },
      { label: 'Aggressive', units: 500, coverage: '30 days', risk: 'Buffer', revenue: 31600 },
    ],
    activityTimeline: [
      { time: '3 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+340 units to West Coast Hub', icon: 'sparkles' },
      { time: '25 min ago', user: 'System', action: 'Constraint validation passed', detail: 'All 4 constraints cleared', icon: 'check' },
      { time: '2 hours ago', user: 'StockAI', action: 'Weather driver activated', detail: 'Cold snap forecast triggered seasonal model', icon: 'alert' },
      { time: '5 hours ago', user: 'StockAI', action: 'RTO signal detected', detail: 'Metro commuter data shows +22% foot traffic', icon: 'trending' },
      { time: 'Oct 2023', user: 'Maya Chen', action: 'Approved fall restock', detail: '+280 units · Sold in 16 days · +19% ROI', icon: 'file' },
    ],
  },
  {
    id: 6, title: 'SmartFit Yoga Mat Pro', sku: 'FIT-SYM-07',
    description: 'Southeast DC • 89 units on hand',
    current: 89, proposed: 320,
    confidence: { score: 67, tier: 'medium' },
    impact: '$4,350', impactValue: 4350, type: 'IMPACT',
    initials: 'SY', vendor: 'FitGear Ltd', leadTime: '24h', baseImpact: 9200,
    externalSignal: { label: 'January Wellness Spike', detail: 'Fitness equipment sales historically spike 60% in January. Early indicators from gym membership data suggest a strong season ahead.' },
    signals: [
      { label: 'New Year Wellness Trend', detail: 'Fitness gear demand +60% in Jan historically', weight: 68 },
      { label: 'Early Velocity Signal', detail: '+18% vs 30-day average (new SKU)', weight: 52 },
      { label: 'Category Growth', detail: 'Home fitness category +25% YoY', weight: 40 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Southeast DC)', status: 'pass' },
      { label: 'Lead time reliability (FitGear Ltd)', status: 'pass' },
      { label: 'Supplier MOQs met (min 50)', status: 'pass' },
      { label: 'New SKU data confidence (4 months history)', status: 'warn' },
    ],
    pastDecisions: [
      { date: 'Launch', outcome: 'Initial stock 100 units. Sold in 28 days.', units: 100, roi: '+8% ROI' },
    ],
    forecastDays: [30, 32, 35, 38, 42, 45, 48, 50, 48, 44, 40, 36, 33, 30],
    alternatives: [
      { label: 'Conservative', units: 150, coverage: '18 days', risk: 'Moderate', revenue: 5800 },
      { label: 'Recommended', units: 231, coverage: '28 days', risk: 'Covered', revenue: 9200 },
      { label: 'Aggressive', units: 400, coverage: '45 days', risk: 'Buffer', revenue: 14800 },
    ],
    activityTimeline: [
      { time: '12 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+231 units to Southeast DC', icon: 'sparkles' },
      { time: '45 min ago', user: 'System', action: 'Constraint validation passed', detail: '3 pass, 1 warning (data confidence)', icon: 'check' },
      { time: '3 hours ago', user: 'StockAI', action: 'Wellness trend activated', detail: 'January fitness spike model engaged', icon: 'trending' },
      { time: '1 day ago', user: 'Product Mgr', action: 'Reviewed new SKU performance', detail: 'Early sell-through exceeding initial projections', icon: 'user' },
      { time: 'Launch', user: 'Buying Team', action: 'Initial stock placed', detail: '100 units · Sold through in 28 days', icon: 'file' },
    ],
  },
  {
    id: 7, title: 'Heritage Leather Backpack', sku: 'ACC-HLB-15',
    description: 'Central Warehouse • 560 units on hand',
    current: 560, proposed: 280,
    confidence: { score: 91, tier: 'high' },
    impact: '-$3,100', impactValue: -3100, type: 'OVERSTOCK',
    action: 'Transfer Rec', initials: 'HL', vendor: 'LeatherCraft Inc', leadTime: '24h', baseImpact: -3100,
    signals: [
      { label: 'Regional Demand Mismatch', detail: 'Central 40% oversupplied vs West Coast deficit', weight: 78 },
      { label: 'Seasonal Shift Ending', detail: 'Back-to-school demand completed, velocity -20%', weight: 56 },
      { label: 'West Coast Opportunity', detail: 'Leather accessories trending +30% in SF/LA', weight: 42 },
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
      { time: '1 day ago', user: 'Regional Mgr', action: 'West Coast demand flagged', detail: 'Leather accessories trending in SF/LA metro', icon: 'user' },
      { time: 'Q1 2024', user: 'Ops Team', action: 'Executed similar transfer', detail: '200 units Central→Southeast · 92% sell-through', icon: 'file' },
    ],
  },
  {
    id: 8, title: 'TechPro Wireless Charger', sku: 'ELC-TWC-22',
    description: 'Northeast DC • 12 units on hand',
    current: 12, proposed: 96,
    confidence: { score: 44, tier: 'low' },
    impact: '$2,800', impactValue: 2800, type: 'IMPACT',
    alert: 'OOS in 2 days', initials: 'TW', vendor: 'TechSupply Global', leadTime: '72h', baseImpact: 6100,
    signals: [
      { label: 'New SKU — Limited History', detail: 'Only 6 weeks of sales data available', weight: 35 },
      { label: 'Category Momentum', detail: 'Wireless charging category +40% YoY', weight: 52 },
      { label: 'High Uncertainty Band', detail: 'Demand range: 30-120 units over 14 days', weight: 28 },
    ],
    constraints: [
      { label: 'Warehouse capacity (Northeast DC)', status: 'pass' },
      { label: 'Lead time reliability (TechSupply Global)', status: 'warn' },
      { label: 'Supplier MOQ met (min 24)', status: 'pass' },
      { label: 'New product risk reserve (flagged)', status: 'warn' },
    ],
    pastDecisions: [
      { date: '6 weeks ago', outcome: 'Initial stock 30 units. Sold 18 in first month.', units: 30, roi: 'TBD (new SKU)' },
    ],
    forecastDays: [25, 28, 32, 38, 42, 40, 35, 30, 28, 26, 25, 24, 23, 22],
    alternatives: [
      { label: 'Conservative', units: 48, coverage: '10 days', risk: 'Moderate', revenue: 3200 },
      { label: 'Recommended', units: 84, coverage: '18 days', risk: 'Moderate', revenue: 6100 },
      { label: 'Aggressive', units: 144, coverage: '30 days', risk: 'High', revenue: 9800 },
    ],
    activityTimeline: [
      { time: '15 min ago', user: 'StockAI', action: 'Generated recommendation', detail: '+84 units to Northeast DC (low confidence)', icon: 'sparkles' },
      { time: '1 hour ago', user: 'System', action: 'Constraint validation', detail: '2 pass, 2 warnings (lead time + new product risk)', icon: 'check' },
      { time: '3 hours ago', user: 'StockAI', action: 'Confidence capped at 44%', detail: 'Insufficient history for higher confidence band', icon: 'alert' },
      { time: '1 day ago', user: 'Buying Team', action: 'Category review completed', detail: 'Wireless charging growth confirmed, adoption curve uncertain', icon: 'user' },
      { time: '6 weeks ago', user: 'Buying Team', action: 'Initial order placed', detail: '30 units · 18 sold in first month · Monitoring', icon: 'file' },
    ],
  },
];
