// Simplified Working SEO Audit Tool

export class SimpleSEOAudit {
  constructor(url) {
    this.url = url;
    this.results = {
      timestamp: new Date().toISOString(),
      url: url,
      issues: [],
      score: 100
    };
  }

  async runAudit() {
    console.log(`🔍 Running SEO audit for: ${this.url}`);
    
    try {
      // Check basic connectivity
      await this.checkConnectivity();
      
      // Check robots.txt
      await this.checkRobotsTxt();
      
      // Check sitemap
      await this.checkSitemap();
      
      // Check HTTPS
      await this.checkHTTPS();
      
      // Calculate final score
      this.calculateScore();
      
      return this.generateReport();
      
    } catch (error) {
      this.results.issues.push({
        type: 'error',
        message: `Audit failed: ${error.message}`,
        severity: 'high'
      });
      this.results.score = 0;
      return this.generateReport();
    }
  }

  async checkConnectivity() {
    try {
      const response = await fetch(this.url, { method: 'HEAD', timeout: 5000 });
      if (!response.ok) {
        this.results.issues.push({
          type: 'connectivity',
          message: `Site returned status ${response.status}`,
          severity: response.status >= 500 ? 'critical' : 'medium'
        });
      }
    } catch (error) {
      this.results.issues.push({
        type: 'connectivity',
        message: `Cannot connect to site: ${error.message}`,
        severity: 'critical'
      });
    }
  }

  async checkRobotsTxt() {
    try {
      const robotsUrl = `${this.url}/robots.txt`;
      const response = await fetch(robotsUrl, { method: 'GET', timeout: 5000 });
      
      if (response.ok) {
        const content = await response.text();
        
        if (content.includes('Disallow: /')) {
          this.results.issues.push({
            type: 'robots.txt',
            message: 'Blocking all crawlers - will hurt SEO',
            severity: 'critical'
          });
        }
        
        if (!content.includes('Sitemap:')) {
          this.results.issues.push({
            type: 'robots.txt',
            message: 'Missing sitemap reference',
            severity: 'medium'
          });
        }
      } else {
        this.results.issues.push({
          type: 'robots.txt',
          message: 'robots.txt not found',
          severity: 'medium'
        });
      }
    } catch (error) {
      this.results.issues.push({
        type: 'robots.txt',
        message: `Error checking robots.txt: ${error.message}`,
        severity: 'medium'
      });
    }
  }

  async checkSitemap() {
    try {
      const sitemapUrl = `${this.url}/sitemap-index.xml`;
      const response = await fetch(sitemapUrl, { method: 'GET', timeout: 5000 });
      
      if (!response.ok) {
        this.results.issues.push({
          type: 'sitemap',
          message: 'Sitemap not found at /sitemap-index.xml',
          severity: 'medium'
        });
      }
    } catch (error) {
      this.results.issues.push({
        type: 'sitemap',
        message: `Error checking sitemap: ${error.message}`,
        severity: 'medium'
      });
    }
  }

  async checkHTTPS() {
    if (!this.url.startsWith('https://')) {
      this.results.issues.push({
        type: 'security',
        message: 'Site not using HTTPS - critical for SEO and security',
        severity: 'critical'
      });
    }
  }

  calculateScore() {
    const criticalIssues = this.results.issues.filter(i => i.severity === 'critical').length;
    const highIssues = this.results.issues.filter(i => i.severity === 'high').length;
    const mediumIssues = this.results.issues.filter(i => i.severity === 'medium').length;
    
    this.results.score = Math.max(0, 100 - (criticalIssues * 25) - (highIssues * 15) - (mediumIssues * 5));
  }

  generateReport() {
    const criticalCount = this.results.issues.filter(i => i.severity === 'critical').length;
    const highCount = this.results.issues.filter(i => i.severity === 'high').length;
    const mediumCount = this.results.issues.filter(i => i.severity === 'medium').length;
    
    return {
      ...this.results,
      summary: {
        totalIssues: this.results.issues.length,
        criticalIssues: criticalCount,
        highIssues: highCount,
        mediumIssues: mediumCount,
        score: this.results.score,
        grade: this.getGrade(this.results.score)
      },
      recommendations: this.generateRecommendations()
    };
  }

  getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  generateRecommendations() {
    const recommendations = [];
    
    const criticalIssues = this.results.issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'urgent',
        title: 'Critical Issues Needing Immediate Attention',
        items: criticalIssues.map(i => i.message)
      });
    }
    
    const highIssues = this.results.issues.filter(i => i.severity === 'high');
    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        title: 'High Priority Improvements',
        items: highIssues.map(i => i.message)
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'low',
        title: 'Great Job!',
        items: ['Your site appears to be well-optimized for SEO']
      });
    }
    
    return recommendations;
  }
}

// Simple CLI function
export async function runSimpleAudit(url = 'https://bookease.com') {
  const auditor = new SimpleSEOAudit(url);
  return await auditor.runAudit();
}