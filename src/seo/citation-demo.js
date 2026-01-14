// Citation Builder Usage Example
// Demonstrates how to use the citation management system

import { CitationBuilder, CitationMonitor, createCitationCampaign } from './citation-builder.js';

// Example 1: Create and execute a citation campaign
async function runMumbaiCitationCampaign() {
  console.log("🚀 Starting Mumbai citation campaign...\n");
  
  // Create citation builder with business configuration
  const citationBuilder = new CitationBuilder({
    businessName: "BookEase - Verified Companion Services",
    primaryCategory: "Escort Service",
    secondaryCategories: ["Companion Service", "Dating Service"]
  });
  
  // Generate submission queue for Mumbai
  const mumbaiQueue = citationBuilder.generateSubmissionQueue(["Mumbai"]);
  
  console.log(`📋 Generated ${mumbaiQueue.length} citation submissions for Mumbai:`);
  mumbaiQueue.slice(0, 10).forEach((citation, index) => {
    console.log(`${index + 1}. ${citation.source.name} (${citation.tier}) - Priority: ${Math.round(citation.priority)}`);
  });
  
  if (mumbaiQueue.length > 10) {
    console.log(`... and ${mumbaiQueue.length - 10} more directories`);
  }
  
  // Show detailed submission data for top priority citation
  const topCitation = mumbaiQueue[0];
  const submissionData = citationBuilder.prepareSubmissionData(topCitation);
  
  console.log("\n📝 Submission Data for Google My Business:");
  console.log("Business Name:", submissionData.businessData.businessName);
  console.log("Address:", submissionData.businessData.address);
  console.log("Phone:", submissionData.businessData.contact.phone);
  console.log("Description:", submissionData.businessData.description.substring(0, 100) + "...");
  
  console.log("\n📋 Submission Instructions:");
  submissionData.submissionInstructions.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });
  
  // Execute submissions (simulated)
  console.log("\n📤 Executing submissions (simulated)...");
  const results = await citationBuilder.executeSubmissions(mumbaiQueue.slice(0, 5));
  
  console.log("\n📊 Submission Results:");
  results.forEach((result, index) => {
    const statusEmoji = result.status === 'submitted' ? '✅' : '❌';
    console.log(`${statusEmoji} ${result.source.name}: ${result.status}`);
  });
  
  // Generate performance report
  const report = citationBuilder.generatePerformanceReport();
  console.log("\n📈 Performance Report:");
  console.log(`Total Directories: ${report.summary.totalDirectories}`);
  console.log(`Successfully Submitted: ${report.summary.submitted}`);
  console.log(`Success Rate: ${report.summary.successRate}%`);
  console.log(`Active Citations: ${report.summary.activeCitations}`);
  
  return { citationBuilder, results, report };
}

// Example 2: Monitor existing citations
async function monitorExistingCitations() {
  console.log("\n🔍 Monitoring existing citations...\n");
  
  const monitor = new CitationMonitor();
  
  // Sample existing citations to monitor
  const existingCitations = [
    {
      id: "gmb-mumbai",
      source: { name: "Google My Business" },
      trackingUrl: "https://www.google.com/maps/place/BookEase+Mumbai",
      city: "Mumbai",
      tier: "tier1"
    },
    {
      id: "fb-delhi", 
      source: { name: "Facebook Business" },
      trackingUrl: "https://www.facebook.com/bookease.delhi",
      city: "Delhi",
      tier: "tier1"
    },
    {
      id: "justdial-bangalore",
      source: { name: "JustDial" },
      trackingUrl: "https://www.justdial.com/Bangalore/BookEase",
      city: "Bangalore", 
      tier: "tier2"
    }
  ];
  
  // Add citations to monitoring
  existingCitations.forEach(citation => {
    monitor.addCitation(citation);
  });
  
  // Check health of each citation
  console.log("🏥 Checking citation health:");
  for (const citation of existingCitations) {
    const health = await monitor.checkCitationHealth(citation);
    const status = health.isAccessible ? "✅ Active" : "❌ Inactive";
    console.log(`${status} - ${citation.source.name} (${citation.city})`);
    
    if (health.napsMatch !== undefined) {
      console.log(`   NAP Consistency: ${health.napsMatch ? '✅ Match' : '❌ Mismatch'}`);
    }
  }
  
  // Generate alerts
  const alerts = monitor.generateAlerts();
  if (alerts.length > 0) {
    console.log("\n⚠️  Alerts:");
    alerts.forEach(alert => {
      console.log(`• ${alert.message} (${alert.citation})`);
    });
  } else {
    console.log("\n✅ All citations are healthy!");
  }
  
  return monitor;
}

// Example 3: Multi-city citation campaign
async function runMultiCityCampaign() {
  console.log("\n🌍 Starting multi-city citation campaign...\n");
  
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
  
  // Create campaign
  const { builder, queue } = createCitationCampaign(cities, {
    businessName: "BookEase - Verified Companion Services"
  });
  
  console.log(`📋 Generated ${queue.length} total submissions across ${cities.length} cities:`);
  
  // Group by city
  const cityBreakdown = {};
  queue.forEach(item => {
    if (!cityBreakdown[item.city]) cityBreakdown[item.city] = 0;
    cityBreakdown[item.city]++;
  });
  
  Object.entries(cityBreakdown).forEach(([city, count]) => {
    console.log(`• ${city}: ${count} directories`);
  });
  
  // Show priority breakdown
  const tierBreakdown = { tier1: 0, tier2: 0, tier3: 0, tier4: 0 };
  queue.forEach(item => {
    tierBreakdown[item.tier]++;
  });
  
  console.log("\n🎯 Priority Breakdown:");
  Object.entries(tierBreakdown).forEach(([tier, count]) => {
    if (count > 0) {
      console.log(`• ${tier.toUpperCase()}: ${count} directories`);
    }
  });
  
  return builder;
}

// Example 4: Citation strategy recommendation
function generateCitationStrategy() {
  console.log("\n💡 Citation Strategy Recommendation:\n");
  
  const strategy = {
    phase1: {
      timeframe: "Week 1-2",
      focus: "Tier 1 directories",
      goals: [
        "Complete Google My Business setup",
        "Establish Facebook Business presence",
        "Submit to high-authority directories"
      ],
      expectedOutcome: "Foundation citations established"
    },
    phase2: {
      timeframe: "Week 3-4", 
      focus: "Tier 2 directories",
      goals: [
        "Submit to regional directories (JustDial, Sulekha)",
        "Real estate and local business directories",
        "Begin citation monitoring setup"
      ],
      expectedOutcome: "Expanded local presence"
    },
    phase3: {
      timeframe: "Month 2+",
      focus: "Maintenance and expansion",
      goals: [
        "Monitor citation health and accuracy",
        "Respond to reviews and engage with listings",
        "Expand to additional cities as needed"
      ],
      expectedOutcome: "Sustainable local SEO foundation"
    }
  };
  
  Object.entries(strategy).forEach(([phase, details]) => {
    console.log(`${phase.toUpperCase()}: ${details.timeframe}`);
    console.log(`Focus: ${details.focus}`);
    console.log("Goals:");
    details.goals.forEach(goal => console.log(`  • ${goal}`));
    console.log(`Expected: ${details.expectedOutcome}\n`);
  });
  
  return strategy;
}

// Run all examples
async function demonstrateCitationSystem() {
  console.log("=== CITATION BUILDER DEMONSTRATION ===\n");
  
  try {
    // Run Mumbai campaign
    await runMumbaiCitationCampaign();
    
    // Monitor existing citations
    await monitorExistingCitations();
    
    // Multi-city campaign
    await runMultiCityCampaign();
    
    // Strategy recommendation
    generateCitationStrategy();
    
    console.log("\n✅ Citation builder demonstration completed!");
    
  } catch (error) {
    console.error("❌ Demonstration failed:", error.message);
  }
}

// Export for use in other modules
export {
  runMumbaiCitationCampaign,
  monitorExistingCitations,
  runMultiCityCampaign,
  generateCitationStrategy,
  demonstrateCitationSystem
};

// Run demonstration if script is executed directly
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  demonstrateCitationSystem();
}