// SEO Audit CLI Tool - ES Module Version

import { runSimpleAudit } from '../src/seo/simple-seo-audit.js';
import fs from 'fs';
import path from 'path';

async function runCLIAudit() {
  const url = process.argv[2] || 'https://bookease.com';
  
  console.log(`
  ╔══════════════════════════════════════╗
  ║        BOOK EASE SEO AUDIT           ║
  ║         Technical Analysis           ║
  ╚══════════════════════════════════════╝
  `);
  
  console.log(`🔍 Auditing: ${url}\n`);
  
  try {
    const results = await runSimpleAudit(url);
    
    // Display results
    displayResults(results);
    
    // Save to file
    saveResultsToFile(results);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

function displayResults(results) {
  const { summary, issues, score } = results;
  
  console.log(`
  📊 AUDIT SUMMARY
  ═════════════════
  Overall Score: ${score}/100 (${summary.grade})
  Total Issues: ${summary.totalIssues}
  Critical Issues: ${summary.criticalIssues}
  High Priority Issues: ${summary.highIssues}
  `);
  
  if (issues.length > 0) {
    console.log('\n🚨 ISSUES FOUND:');
    console.log('═══════════════');
    
    // Group issues by severity
    const groupedIssues = groupIssuesBySeverity(issues);
    
    Object.entries(groupedIssues).forEach(([severity, issues]) => {
      console.log(`\n${getSeverityEmoji(severity)} ${severity.toUpperCase()} (${issues.length} issues):`);
      issues.slice(0, 5).forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.message}`);
      });
      if (issues.length > 5) {
        console.log(`  ... and ${issues.length - 5} more issues`);
      }
    });
  } else {
    console.log('✅ No issues found! Your SEO looks great!');
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('══════════════════');
  
  const recommendations = results.recommendations || [];
  recommendations.slice(0, 3).forEach(rec => {
    console.log(`\n${getPriorityEmoji(rec.priority)} ${rec.title}:`);
    rec.items.slice(0, 3).forEach(item => {
      console.log(`  • ${item}`);
    });
  });
}

function groupIssuesBySeverity(issues) {
  return issues.reduce((groups, issue) => {
    const severity = issue.severity || 'medium';
    if (!groups[severity]) groups[severity] = [];
    groups[severity].push(issue);
    return groups;
  }, {});
}

function getSeverityEmoji(severity) {
  const emojis = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  };
  return emojis[severity] || '🔵';
}

function getPriorityEmoji(priority) {
  const emojis = {
    urgent: '🔥',
    high: '⚡',
    medium: '⚠️',
    low: 'ℹ️'
  };
  return emojis[priority] || '📋';
}

function saveResultsToFile(results) {
  const filename = `seo-audit-${new Date().toISOString().split('T')[0]}.json`;
  const filepath = path.join(process.cwd(), 'reports', filename);
  
  // Create reports directory if it doesn't exist
  const reportsDir = path.dirname(filepath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Save results
  fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
  
  console.log(`\n💾 Detailed report saved to: ${filepath}`);
  
  // Also save human-readable version
  const txtFilename = filepath.replace('.json', '.txt');
  const txtContent = generateTextReport(results);
  fs.writeFileSync(txtFilename, txtContent);
  console.log(`📄 Text report saved to: ${txtFilename}`);
}

function generateTextReport(results) {
  let report = `
BOOK EASE SEO AUDIT REPORT
=========================
Generated: ${results.timestamp}
Audited URL: ${results.baseUrl}
Overall Score: ${results.score}/100 (${results.summary?.grade || 'N/A'})

SUMMARY
-------
Total Issues: ${results.summary?.totalIssues || 0}
Critical Issues: ${results.summary?.criticalIssues || 0}
High Priority Issues: ${results.summary?.highIssues || 0}

DETAILED FINDINGS
-----------------
`;

  if (results.issues && results.issues.length > 0) {
    const grouped = groupIssuesBySeverity(results.issues);
    
    Object.entries(grouped).forEach(([severity, issues]) => {
      report += `\n${severity.toUpperCase()} ISSUES:\n`;
      issues.forEach(issue => {
        report += `- ${issue.message}\n`;
        if (issue.details) {
          report += `  Details: ${JSON.stringify(issue.details)}\n`;
        }
      });
      report += '\n';
    });
  } else {
    report += 'No issues found!\n';
  }

  if (results.recommendations && results.recommendations.length > 0) {
    report += '\nRECOMMENDATIONS:\n---------------\n';
    results.recommendations.forEach(rec => {
      report += `\n${rec.title}:\n`;
      rec.items.forEach(item => {
        report += `- ${item}\n`;
      });
    });
  }

  return report;
}

// Run the audit when script is executed directly
runCLIAudit().catch(console.error);

export { runCLIAudit };