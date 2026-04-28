// PRD 5.3 — Response trees per recommendation
// Rec #1 (Vortex Runner Pro) gets full depth. Others get 2-3 variants per category.

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
  {
    recommendationId: 1,
    defaultAnswer:
      "Good question. The model considers velocity, regional events, weather, and competitor stock levels. For this specific SKU, the Northeast marathon driver is the largest weight contributor, which is why the recommendation is +480 units instead of the steady-state +280.",
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
        "The closest precedent is Sep 2023. Same SKU family, same region, similar surge driver (different event, similar magnitude). Approved 350 units, sold out in 12 days. The model has incorporated that outcome into the current weighting.",
      ],
      explanation: [
        "Three drivers in order of weight. (1) Sales velocity: +34% vs trailing 7-day average — biggest signal at weight 88. (2) Competitor stock levels: regional competitors are below 10% on comparable SKUs, weight 62. (3) Weather: 4°C above seasonal average, marginal lift on athletic footwear, weight 24. The marathon driver is treated as a discrete event, separate from continuous signals.",
        "It's the velocity, the competitor stock, and the marathon. Velocity says 'demand is already trending up.' Competitor stock says 'the demand has nowhere else to go.' The marathon says 'demand is about to spike.' Three independent signals, all pointing the same direction. That's why the confidence is high.",
      ],
      timing: [
        "If you approve today, the order ships tomorrow morning and arrives at the Northeast Distribution Center on Wednesday. Replenishment to stores happens Thursday-Friday, which puts inventory in place 48 hours before the marathon weekend. That's the tightest acceptable window.",
        "Lead time on this vendor is 24 hours, plus 48 hours for the warehouse-to-store leg. Approve by end of day for full coverage. Approve tomorrow morning and you'd still hit it, but with no buffer for warehouse delays.",
      ],
      constraints: [
        "All four passed. Warehouse capacity at the Northeast DC is at 67% utilization, plenty of room. Lead time reliability for this vendor is 98% over the last 12 months. MOQ is 250 units, and we're recommending 480, well above. Logistics cost variance is +2.3% on this lane, within the 5% tolerance band.",
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

  // Rec 2 — Chronos Minimalist Watch
  {
    recommendationId: 2,
    defaultAnswer: "The model sees an immediate stockout risk with only 15 units on hand and 7-day velocity suggesting depletion within 24 hours. The +150 recommendation captures the projected demand curve for the next 21 days.",
    categories: {
      confidence: [
        "72% reflects moderate certainty. The velocity signal is clear (+28% trend), but this SKU has seasonal variance that the model hasn't seen enough cycles to fully trust. Two more quarters of data would push this into the high-confidence band.",
      ],
      alternatives: [
        "Conservative: 100 units. Covers 14 days at current velocity but doesn't account for the upward trend. Aggressive: 250 units. Full coverage plus buffer. The 150 recommendation is the sweet spot between capital and risk.",
      ],
      risk: [
        "Main risk is fashion trend decay. Minimalist watches have had 3 consecutive quarters of growth, but the trend could plateau. If it does, you'd have ~30 units of slow-moving inventory. Markdown cost: roughly $900.",
      ],
      history: ["Two similar orders in the past year. Both sold through within 18 days. No overstock on either."],
      explanation: ["Velocity is the primary driver at weight 74. Trend momentum adds weight 45. Low current stock acts as an urgency multiplier, not a signal per se."],
      timing: ["Vendor lead time is 48 hours. Approve today for delivery Thursday. Current stock covers through tomorrow at best."],
      constraints: ["MOQ is 50 units — we're well above. Warehouse capacity is fine. Budget allocation for accessories has 62% remaining this quarter."],
      forecast: ["Demand curve is relatively flat with a slight upward slope. No discrete events driving a spike. The urgency comes from the near-zero on-hand count, not from a demand surge."],
      override: ["Your call. The 72% confidence means the model itself acknowledges meaningful uncertainty. If you have market context the model doesn't, that's a valid override."],
    },
    suggestedQuestions: {
      why: ["Why is confidence only 72%?", "What's driving the velocity spike?", "Is this a trend or seasonal?"],
      forecast: ["What does the 21-day demand look like?", "How fast will we sell through 200?", "Any upcoming events?"],
      alternatives: ["What if I only order 100?", "Can we split across hubs?", "What's the minimum safe order?"],
      activity: ["Any recent overrides on this SKU?", "How did the last restock perform?", "Who manages this category?"],
    },
  },

  // Rec 3 — Apex Wireless Headphones (OVERSTOCK)
  {
    recommendationId: 3,
    defaultAnswer: "This is an overstock liquidation recommendation. Current inventory of 1,200 units is 2.7x the 90-day projected demand. The model recommends reducing to 450 units through a managed liquidation or transfer to higher-velocity locations.",
    categories: {
      confidence: ["94% confidence in the overstock diagnosis. Velocity has been declining 12% month-over-month for 3 months. The product lifecycle model shows this SKU entering the tail phase."],
      alternatives: ["Transfer 400 units to West Coast (higher demand there). Markdown 200 units at 20% off through the outlet channel. Hold 150 units as buffer. Net recovery: $3.8K vs holding cost of $4.2K."],
      risk: ["Risk of NOT acting: $4.2K in carrying costs over the next quarter. Risk of acting: minimal — transferring to higher-velocity locations has a 91% sell-through rate historically."],
      history: ["Similar overstock situation in Q2 2024 with a comparable electronics SKU. Liquidation executed, 87% recovery rate. Lesson: act early, recovery drops 15% per month of delay."],
      explanation: ["Declining velocity (-12% MoM) is the primary signal. Seasonal patterns confirm Q4 is historically the weakest quarter for this category. New model launches from competitors are also pressuring demand."],
      timing: ["Sooner is better. Every month of delay reduces recovery rate by approximately 15%. Recommend initiating transfer within 48 hours."],
      constraints: ["No MOQ constraint on liquidation. Transfer logistics cost is $1.2K. Net savings after transfer: $3.0K."],
      forecast: ["At current velocity, it would take 8.5 months to sell through the current inventory naturally. The carrying cost over that period exceeds the liquidation cost."],
      override: ["If you believe there's a demand event coming that the model doesn't see, holding is defensible. But the data strongly supports reducing inventory now."],
    },
    suggestedQuestions: {
      why: ["Why liquidate instead of holding?", "How accurate is the decline forecast?", "What's the carrying cost per month?"],
      forecast: ["How long until natural sell-through?", "Is there any seasonal uptick coming?", "What's the break-even point?"],
      alternatives: ["Can we transfer instead of liquidate?", "What markdown percentage is needed?", "Which locations want this SKU?"],
      activity: ["Have we liquidated this SKU before?", "What was the recovery rate?", "Who approved past liquidations?"],
    },
  },

  // Rec 4 — Audiophile Turntable X
  {
    recommendationId: 4,
    defaultAnswer: "Niche product with strong conversion rate. Low on-hand (4 units) against a specialty buyer segment that's shown 3x growth in the last 6 months. The +20 recommendation is conservative given the trend.",
    categories: {
      confidence: [
        "81% confidence reflects strong niche demand signals. The vinyl resurgence trend has been consistent for 18 months, and this SKU's 4.2x conversion rate is well above category average. The remaining uncertainty is around segment size — enthusiast markets can plateau without warning.",
        "The model is fairly confident because the vinyl co-purchase correlation is strong (weight 54) and the conversion rate is exceptional. The 19% gap to 100% is the niche market volatility premium.",
      ],
      alternatives: [
        "Conservative: 12 units. Covers 6 days but risks stockout if the vinyl trend accelerates. Aggressive: 36 units. Full 18-day buffer, but ties up capital in a niche segment. The 20-unit recommendation balances these.",
        "You could go as low as 10 without triggering a stockout in the next 5 days. But the conversion data suggests you'd leave revenue on the table. 20 captures the upside without overcommitting.",
      ],
      risk: [
        "The main risk is niche market saturation. Vinyl turntable buyers are a specific demographic — if the segment plateaus, 20 units could take 4-6 weeks to sell instead of 10 days. The markdown cost on specialty audio is low (~$200) because the enthusiast market holds value well.",
        "Smaller risk: supplier lead time. Audio Systems Inc has a 36-hour quoted lead time but specialty products occasionally face component delays. Current reliability is 94% on-time.",
      ],
      history: ["Two similar restocks this year. Mar 2024: 15 units, sold in 9 days (+26% ROI). Aug 2024: 18 units, sold in 11 days (+21% ROI). Consistent performance, no overstock."],
      explanation: ["The vinyl resurgence is the macro driver — record sales hit a 30-year high. But the immediate signal is the 4.2x conversion rate, which means every visitor to this product page is 4x more likely to buy than the category average. Combined with only 4 units on hand, the urgency is clear."],
      timing: ["Audio Systems Inc lead time is 36 hours. Approve today for Thursday delivery. At current velocity (2.1 units/day), you'll hit zero by tomorrow afternoon."],
      constraints: ["MOQ is 10 units — we're ordering 20, well above. Warehouse has space. Specialty electronics budget is at 41% remaining for the quarter, plenty of room."],
      forecast: ["Demand is steady-state with a slight upward slope driven by vinyl trend momentum. No spike event, just consistent enthusiast demand. Peak occurs mid-week when online audio forums drive traffic."],
      override: ["This is a niche call. If you believe the vinyl trend is peaking, a smaller order is defensible. The model sees continued growth but acknowledges the enthusiast market is harder to predict than mainstream categories."],
    },
    suggestedQuestions: {
      why: ["Why only 20 additional units?", "What's the conversion rate?", "Is the vinyl trend sustainable?"],
      forecast: ["How fast does this SKU sell?", "Any events boosting demand?", "What's the reorder point?"],
      alternatives: ["Can we order more aggressively?", "What's the MOQ?", "Is there a bulk discount?"],
      activity: ["Has this been restocked recently?", "What's the customer profile?", "Any returns data?"],
    },
  },

  // Rec 5 — Urban Commuter Jacket
  {
    recommendationId: 5,
    defaultAnswer: "Seasonal demand shift driving the recommendation. Commuter apparel sees a 35% lift in early fall. Current inventory covers 12 days at projected velocity. The +340 recommendation extends coverage to 28 days.",
    categories: {
      confidence: [
        "89% confidence comes from three converging signals. Fall seasonal lift is historically reliable at 35% (+/- 5%). The weather forecast shows a cold snap in 5 days, which accelerates the curve. And RTO mandates are driving a 22% increase in metro commuter foot traffic. All three are independent, well-documented signals.",
        "The 11% uncertainty band is mostly weather variance. If the cold snap misses the West Coast corridor, the demand lift drops to ~20% instead of 35%. Still profitable, but the recommendation would be oversized by about 80 units.",
      ],
      alternatives: [
        "Conservative: 200 units. Covers 12 days, captures the initial cold snap but not the full fall season. Aggressive: 500 units. Full season coverage plus holiday buffer. The 340 recommendation covers the seasonal peak without overcommitting to holiday demand, which is less certain.",
        "If you want to stage it, you could order 200 now and 140 in two weeks. Downside: you'd pay shipping twice and lose 48 hours of coverage during the peak transition period.",
      ],
      risk: [
        "Two risks. First, weather: if the cold snap doesn't materialize, the commuter jacket demand stays flat for another 2 weeks and you're holding 340 units of pre-season inventory. Second, style risk: last year's commuter jacket had a 7% return rate due to fit issues. If this season's cut has the same problem, returns eat into the margin.",
        "The RTO signal is the softest of the three. Corporate mandates can shift, and hybrid work patterns are unpredictable. If RTO reverses, commuter apparel demand drops back to 2023 levels, which would make this order ~120 units too large.",
      ],
      history: ["Oct 2023: restocked 280 units, sold in 16 days (+19% ROI). Oct 2024: restocked 320 units, sold in 14 days (+16% ROI). Consistent fall pattern with improving velocity."],
      explanation: ["Three signals stack: (1) seasonal demand shift — fall commuter apparel lifts 35% historically, weight 80. (2) Weather forecast — cold snap in 5 days, 8°C below average, weight 61. (3) RTO office pattern — metro commuter traffic +22%, weight 44. Independent signals, all pointing up."],
      timing: ["UrbanWear Co lead time is 48 hours. The cold snap hits in 5 days. Approve today for Wednesday delivery, giving 3 days of buffer before the demand spike."],
      constraints: ["MOQ is 100 units — we're well above. West Coast Hub has capacity. Apparel budget is at 55% remaining. No constraints flagged."],
      forecast: ["Demand curve peaks around days 5-9 coinciding with the cold snap, then sustains at elevated levels through the fall season. Without action, current inventory runs out by day 7."],
      override: ["If you think the cold snap forecast is unreliable or RTO mandates are softening, a smaller order is reasonable. The seasonal lift alone justifies +200, but the full +340 depends on weather and commuter traffic holding."],
    },
    suggestedQuestions: {
      why: ["What's driving the seasonal lift?", "How reliable is the cold snap forecast?", "Is the RTO trend real?"],
      forecast: ["When does fall demand peak?", "How long does the season last?", "What's the sell-through rate?"],
      alternatives: ["What if we order 200 instead?", "Can we stagger the order?", "Any clearance risk at end of season?"],
      activity: ["How did last fall perform?", "Any style changes this season?", "What's the return rate?"],
    },
  },

  // Rec 6 — SmartFit Yoga Mat Pro
  {
    recommendationId: 6,
    defaultAnswer: "Steady-state demand with a moderate confidence score. The 67% reflects limited historical data for this SKU — it launched 4 months ago. Early velocity is promising but the model needs 2 more quarters of data.",
    categories: {
      confidence: [
        "67% is the model's honest assessment given limited data. This SKU launched 4 months ago — the model has one partial season of sell-through data. The January wellness spike is a well-documented category pattern (+60% historically), but whether this specific product captures that lift is uncertain. Two more quarters would push confidence to ~82%.",
        "The 33% uncertainty breaks down roughly as: 15% from insufficient product history, 10% from unknown competitive response (new entrants in home fitness), and 8% from the wellness spike magnitude being variable year-to-year.",
      ],
      alternatives: [
        "Conservative: 150 units. Covers 18 days, enough to test the January wellness spike without overcommitting. Aggressive: 400 units. Full 45-day coverage, but risky for a 4-month-old SKU with limited history. The 231-unit recommendation is the middle path.",
        "You could also do a trial restock of 100 units and set a velocity trigger for a follow-up order. Downside: if the wellness spike hits hard, you'd lose 3-4 days of coverage during the reorder window.",
      ],
      risk: [
        "Primary risk is new product uncertainty. The category (home fitness) is growing +25% YoY, but this specific SKU has only 4 months of data. If velocity doesn't sustain, you'd have ~80 units of slow-moving inventory. Markdown cost on fitness equipment is moderate — about $600 on 80 units.",
        "Secondary risk: the January wellness spike varies significantly. In 2023 it was +52%, in 2024 it was +68%. The model uses +60% as the baseline, but the actual range could put you at either end of the inventory plan.",
      ],
      history: ["Only one data point: initial stock of 100 units sold through in 28 days (+8% ROI). Promising but insufficient for high-confidence prediction. Category precedents (similar yoga products) show 85% sell-through rate in January."],
      explanation: ["Three signals, but all at moderate weight. (1) New Year wellness trend — fitness gear historically spikes +60% in January, weight 68. (2) Early velocity — this SKU is +18% vs 30-day average, weight 52. (3) Category growth — home fitness +25% YoY, weight 40. The model is cautious because product-specific data is thin."],
      timing: ["FitGear Ltd lead time is 24 hours — fastest of any vendor. You have time to wait 1-2 days if you want more velocity data before committing. But the wellness spike ramp starts in ~10 days."],
      constraints: ["MOQ is 50 units — we're above. Warehouse has space. One warning flag: new SKU data confidence is at 4 months, below the 6-month threshold for high-confidence recommendations."],
      forecast: ["Demand curve shows gradual lift starting now, peaking in mid-January. The curve is smoother than event-driven spikes — no single day dominates. Without action, you'll run low by day 12 but won't fully stock out."],
      override: ["Given the 67% confidence, the model would support a more conservative order without flagging it. If you want to wait for 1-2 more weeks of velocity data, the fast lead time (24h) gives you that option."],
    },
    suggestedQuestions: {
      why: ["Why is confidence only 67%?", "What data is the model missing?", "How does it compare to similar products?"],
      forecast: ["What's the 30-day demand outlook?", "How big is the January wellness spike?", "How fast is the category growing?"],
      alternatives: ["Should we wait for more data?", "What's the conservative order?", "Can we do a trial restock?"],
      activity: ["How has it sold since launch?", "Any marketing campaigns planned?", "What's the customer feedback?"],
    },
  },

  // Rec 7 — Heritage Leather Backpack (OVERSTOCK / Transfer)
  {
    recommendationId: 7,
    defaultAnswer: "Regional demand mismatch. Central Warehouse is 40% oversupplied while the West Coast has a deficit. The model recommends transferring 280 units to higher-velocity locations where leather accessories are trending.",
    categories: {
      confidence: [
        "91% confidence in the demand mismatch diagnosis. Central velocity has dropped 20% post-back-to-school, while West Coast and Southeast velocity is up 30% for leather accessories. The mismatch is clear and well-documented across multiple data points.",
        "The 9% uncertainty is about transfer timing. If holiday demand arrives early at Central, the transfer might be premature. But historical patterns show holiday lift doesn't start for another 6 weeks at this location.",
      ],
      alternatives: [
        "Partial transfer: 180 units. Reduces Central to 1.5x demand, conservative approach. Full redistribution: 350 units. Leans out Central aggressively and pushes hard into West Coast. The 280-unit recommendation right-sizes Central to 1x demand while capturing the West Coast opportunity.",
        "Alternative to transfer: bundle the backpacks with other leather accessories for a Central-only promotion. Lower risk but slower recovery — estimated 4-6 weeks vs 2 weeks for transfer.",
      ],
      risk: [
        "Risk of transferring: $1.2K logistics cost and 48 hours of transit time. If Central demand unexpectedly spikes, you'd be short. Risk of NOT transferring: $3.1K in carrying costs over the next quarter, plus the opportunity cost of not capturing the West Coast leather trend.",
        "The back-to-school demand is fully complete — velocity has stabilized at the lower level. The risk of a surprise Central demand spike is low (<5%). The Q1 2024 transfer to Southeast had a 92% sell-through rate, supporting this recommendation.",
      ],
      history: [
        "Q1 2024: transferred 200 units Central→Southeast. 92% sell-through in 3 weeks. Q3 2023: held overstock for 6 weeks — carrying cost was $1.8K and recovery rate dropped 15%. Lesson: transfer early.",
      ],
      explanation: ["The core signal is the regional demand mismatch (weight 78). Central is 40% oversupplied post-back-to-school, while SF/LA metro areas show leather accessories trending +30%. The seasonal shift ending (weight 56) confirms the Central decline isn't temporary. West Coast opportunity (weight 42) provides the destination logic."],
      timing: ["Transfer logistics take 48 hours door-to-door. Initiate today for Wednesday arrival at West Coast Hub. Every month of delay at Central reduces recovery rate by ~15%."],
      constraints: ["Transfer cost is $1.2K. Receiving warehouse has capacity. SKU condition is A-grade, approved for transfer. No markdown needed — this is a redistribution, not a liquidation."],
      forecast: ["Central demand is flat-to-declining for the next 6 weeks until holiday season. West Coast demand is climbing and will peak in 3-4 weeks as fall fashion cycles through. The transfer window is optimal right now."],
      override: ["If you expect early holiday demand at Central, holding makes sense. But the last 3 years show holiday lift doesn't start until 6 weeks from now. The carrying cost of waiting is real."],
    },
    suggestedQuestions: {
      why: ["Why is demand declining at Central?", "Is the West Coast trend sustainable?", "What's the markdown risk?"],
      forecast: ["How long to sell through naturally?", "Any holiday boost coming?", "What's the velocity trend?"],
      alternatives: ["Which locations should receive transfers?", "Can we bundle with other products?", "What's the transfer cost?"],
      activity: ["When was the last transfer?", "How did it perform at other locations?", "Any quality issues?"],
    },
  },

  // Rec 8 — TechPro Wireless Charger (LOW CONFIDENCE)
  {
    recommendationId: 8,
    defaultAnswer: "Low confidence (44%) due to new product with minimal history. However, the category is hot and competitor data shows strong adoption curves. The recommendation is moderate at +84 units to test demand without overcommitting.",
    categories: {
      confidence: [
        "44% is the lowest confidence in today's queue, and the model is being transparent about why. This SKU has only 6 weeks of sales data — far below the 6-month minimum for high confidence. The wireless charging category is growing 40% YoY, but we can't reliably predict how THIS product will perform vs competitors.",
        "The confidence is capped because of three factors: (1) only 6 weeks of history, (2) the demand range is wide (30-120 units over 14 days), and (3) TechSupply Global's lead time reliability has a warning flag. The category signal is strong but product-specific data is thin.",
      ],
      alternatives: [
        "Conservative: 48 units. Covers 10 days, limits downside if adoption is slower than expected. Aggressive: 144 units. Full 30-day bet on the category momentum. The 84-unit recommendation is a measured test — enough to capture upside without betting the house on a 6-week-old SKU.",
        "You could also do a consignment arrangement with TechSupply Global — they've offered it for new SKUs before. Reduces your risk to zero but cuts margin by 15%.",
      ],
      risk: [
        "The biggest risk is adoption uncertainty. New wireless charger SKUs have a bimodal outcome: either they catch on quickly (60% of cases) or they flatline after the initial curiosity period (40% of cases). If this one flatlines, you'd be holding 60+ units of slow-moving inventory. Recovery through markdown: ~$800 loss.",
        "Secondary risk: TechSupply Global's lead time has a warning flag. They've slipped twice in the last quarter, both by 24+ hours. On a 72-hour quoted lead time, that's significant. If you approve today and they slip, inventory gap widens.",
      ],
      history: ["Only data point: initial order of 30 units, 6 weeks ago. 18 sold in the first month. That's a 60% sell-through, which is decent but not conclusive. Category precedents are mixed — wireless charger SKUs have high variance in first-year performance."],
      explanation: ["The category signal (wireless charging +40% YoY, weight 52) is the strongest driver, but it's a category-level signal, not product-specific. The new SKU limited-history flag (weight 35) actively suppresses confidence. The high uncertainty band (demand range 30-120, weight 28) reflects the model's honest assessment that it doesn't know enough yet."],
      timing: ["TechSupply Global lead time is 72 hours — longest in today's queue. Plus the reliability warning. Approve today for Monday delivery if they're on time, Wednesday if they slip. Current stock of 12 units covers ~4 days at estimated velocity."],
      constraints: ["MOQ is 24 — we're above at 84. Warehouse has space. Two warnings: (1) supplier lead time reliability at 89% (below 95% threshold), (2) new product risk reserve flagged — this order would use 60% of the new-SKU risk budget for the quarter."],
      forecast: ["Demand forecast has wide error bars. Central estimate is ~6 units/day, but the range is 2-9. The bar chart shows a modest peak around day 5 as the product gets more visibility, then settling into a steady state — if adoption holds. If it doesn't, the curve drops to 2 units/day by day 8."],
      override: ["Given the 44% confidence, the model would fully support a smaller order or even a hold-and-monitor decision. If you want to wait 2 more weeks for velocity data, that's defensible. The category momentum isn't going anywhere — this is about product-specific risk."],
    },
    suggestedQuestions: {
      why: ["Why is confidence so low?", "What competitor data exists?", "Is the category growth reliable?"],
      forecast: ["What's the expected adoption curve?", "How fast is the category growing?", "Any tech refresh cycles coming?"],
      alternatives: ["Should we start with fewer units?", "Can we get a consignment deal?", "What's the return policy?"],
      activity: ["Is this our first reorder?", "What's the supplier reliability?", "Any quality concerns from initial batch?"],
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
