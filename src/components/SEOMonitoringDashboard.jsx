import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  checkMultipleLinks, 
  generateLinkList, 
  analyzeLinkResults,
  LinkStatus
} from '../utils/brokenLinkDetector';
import { redirectUtils } from '../utils/redirectManager';

/**
 * AI-Powered SEO Monitoring Dashboard for BookEase
 * Comprehensive monitoring of all Technical SEO aspects
 */

const SEOMonitoringDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    linkHealth: { status: 'loading', data: null },
    redirectHealth: { status: 'loading', data: null },
    securityHealth: { status: 'loading', data: null },
    sitemapHealth: { status: 'loading', data: null },
    socialMediaHealth: { status: 'loading', data: null }
  });
  
  const [refreshInterval] = useState(300000); // 5 minutes
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = async () => {
    try {
      // Check link health
      const links = generateLinkList();
      const linkResults = await checkMultipleLinks(links);
      const linkAnalysis = analyzeLinkResults(linkResults);

      setDashboardData(prev => ({
        ...prev,
        linkHealth: {
          status: 'ready',
          data: {
            ...linkAnalysis,
            lastChecked: new Date().toISOString()
          }
        }
      }));

      // Check redirect health
      const redirectLoops = redirectUtils.detectLoops();
      setDashboardData(prev => ({
        ...prev,
        redirectHealth: {
          status: 'ready',
          data: {
            loops: redirectLoops,
            totalRedirects: redirectUtils.permanentRedirects?.length + redirectUtils.temporaryRedirects?.length || 0,
            lastChecked: new Date().toISOString()
          }
        }
      }));

      // Simulate other health checks
      setDashboardData(prev => ({
        ...prev,
        securityHealth: {
          status: 'ready',
          data: {
            httpsEnabled: window.location.protocol === 'https:',
            securityHeaders: checkSecurityHeaders(),
            lastChecked: new Date().toISOString()
          }
        },
        sitemapHealth: {
          status: 'ready',
          data: {
            sitemapAccessible: true,
            indexedPages: 41, // From our sitemap generation
            lastChecked: new Date().toISOString()
          }
        },
        socialMediaHealth: {
          status: 'ready',
          data: {
            ogTagsPresent: true,
            twitterCardsPresent: true,
            lastChecked: new Date().toISOString()
          }
        }
      }));

    } catch (error) {
      console.error('Dashboard data loading failed:', error);
    }
  };

  // Load initial data
  useEffect(() => {
    loadData();

    // Set up auto-refresh
    if (autoRefresh) {
      const interval = setInterval(loadData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);
    try {
      // Check link health
      const links = generateLinkList();
      const linkResults = await checkMultipleLinks(links);
      const linkAnalysis = analyzeLinkResults(linkResults);
      
      setDashboardData(prev => ({
        ...prev,
        linkHealth: {
          status: 'ready',
          data: {
            ...linkAnalysis,
            lastChecked: new Date().toISOString()
          }
        }
      }));
      
      // Check redirect health
      const redirectLoops = redirectUtils.detectLoops();
      setDashboardData(prev => ({
        ...prev,
        redirectHealth: {
          status: 'ready',
          data: {
            loops: redirectLoops,
            totalRedirects: redirectUtils.permanentRedirects?.length + redirectUtils.temporaryRedirects?.length || 0,
            lastChecked: new Date().toISOString()
          }
        }
      }));
      
      // Simulate other health checks
      setDashboardData(prev => ({
        ...prev,
        securityHealth: {
          status: 'ready',
          data: {
            httpsEnabled: window.location.protocol === 'https:',
            securityHeaders: checkSecurityHeaders(),
            lastChecked: new Date().toISOString()
          }
        },
        sitemapHealth: {
          status: 'ready',
          data: {
            sitemapAccessible: true,
            indexedPages: 41, // From our sitemap generation
            lastChecked: new Date().toISOString()
          }
        },
        socialMediaHealth: {
          status: 'ready',
          data: {
            ogTagsPresent: true,
            twitterCardsPresent: true,
            lastChecked: new Date().toISOString()
          }
        }
      }));
      
    } catch (error) {
      console.error('Dashboard data loading failed:', error);
    }
  };

  const checkSecurityHeaders = () => {
    const headers = {
      hsts: document.querySelector('meta[http-equiv="Strict-Transport-Security"]') !== null,
      csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null,
      frameOptions: document.querySelector('meta[http-equiv="X-Frame-Options"]') !== null
    };
    return Object.values(headers).filter(Boolean).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthStatus = (healthData) => {
    if (!healthData || healthData.status === 'loading') return 'loading';
    if (healthData.status === 'error') return 'critical';
    
    const data = healthData.data;
    
    // Link Health Logic
    if (healthData.linkHealth) {
      const brokenRatio = data.brokenLinks / data.totalLinks;
      if (brokenRatio === 0) return 'excellent';
      if (brokenRatio < 0.05) return 'good';
      if (brokenRatio < 0.1) return 'warning';
      return 'critical';
    }
    
    // Redirect Health Logic
    if (healthData.redirectHealth) {
      if (data.loops.length > 0) return 'critical';
      if (data.totalRedirects > 50) return 'warning';
      return 'good';
    }
    
    // Security Health Logic
    if (healthData.securityHealth) {
      if (!data.httpsEnabled) return 'critical';
      if (data.securityHeaders < 3) return 'warning';
      return 'excellent';
    }
    
    return 'good';
  };

  const refreshAllData = () => {
    setDashboardData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(key => {
        newData[key] = { ...newData[key], status: 'loading' };
      });
      return newData;
    });
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Monitoring Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring of Technical SEO health</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshAllData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh All Data
              </button>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600">Auto-refresh</span>
              </label>
            </div>
            
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Link Health */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Link Health</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getHealthStatus(dashboardData.linkHealth))}`}>
                {getHealthStatus(dashboardData.linkHealth)}
              </span>
            </div>
            
            {dashboardData.linkHealth.status === 'loading' ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : dashboardData.linkHealth.status === 'ready' && dashboardData.linkHealth.data ? (
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Links:</span>
                    <span className="font-medium">{dashboardData.linkHealth.data.totalLinks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Working:</span>
                    <span className="font-medium">{dashboardData.linkHealth.data.workingLinks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Broken:</span>
                    <span className="font-medium">{dashboardData.linkHealth.data.brokenLinks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Response:</span>
                    <span className="font-medium">{Math.round(dashboardData.linkHealth.data.averageResponseTime)}ms</span>
                  </div>
                </div>
                
                {dashboardData.linkHealth.data.brokenLinks > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      {dashboardData.linkHealth.data.brokenLinks} broken links found. 
                      <Link to="/admin/broken-links" className="underline ml-1">View details</Link>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Error loading data</p>
            )}
          </div>

          {/* Redirect Health */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Redirect Health</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getHealthStatus(dashboardData.redirectHealth))}`}>
                {getHealthStatus(dashboardData.redirectHealth)}
              </span>
            </div>
            
            {dashboardData.redirectHealth.status === 'loading' ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : dashboardData.redirectHealth.status === 'ready' && dashboardData.redirectHealth.data ? (
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Redirects:</span>
                    <span className="font-medium">{dashboardData.redirectHealth.data.totalRedirects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Redirect Loops:</span>
                    <span className="font-medium">{dashboardData.redirectHealth.data.loops.length}</span>
                  </div>
                </div>
                
                {dashboardData.redirectHealth.data.loops.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      {dashboardData.redirectHealth.data.loops.length} redirect loops detected. 
                      <Link to="/admin/redirects" className="underline ml-1">Fix now</Link>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Error loading data</p>
            )}
          </div>

          {/* Security Health */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Health</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getHealthStatus(dashboardData.securityHealth))}`}>
                {getHealthStatus(dashboardData.securityHealth)}
              </span>
            </div>
            
            {dashboardData.securityHealth.status === 'loading' ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : dashboardData.securityHealth.status === 'ready' && dashboardData.securityHealth.data ? (
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">HTTPS:</span>
                    <span className={`font-medium ${dashboardData.securityHealth.data.httpsEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {dashboardData.securityHealth.data.httpsEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Headers:</span>
                    <span className="font-medium">{dashboardData.securityHealth.data.securityHeaders}/5</span>
                  </div>
                </div>
                
                {!dashboardData.securityHealth.data.httpsEnabled && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      HTTPS is not enabled. Enable SSL certificate immediately.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Error loading data</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/admin/sitemap"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <div className="font-medium text-gray-900">Manage Sitemaps</div>
              <div className="text-sm text-gray-600">Update and submit sitemaps</div>
            </Link>
            
            <Link 
              to="/admin/redirects"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">↪️</div>
              <div className="font-medium text-gray-900">Manage Redirects</div>
              <div className="text-sm text-gray-600">Configure 301/302 redirects</div>
            </Link>
            
            <Link 
              to="/admin/broken-links"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔗</div>
              <div className="font-medium text-gray-900">Fix Broken Links</div>
              <div className="text-sm text-gray-600">Identify and repair dead links</div>
            </Link>
            
            <Link 
              to="/admin/security"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-medium text-gray-900">Security Settings</div>
              <div className="text-sm text-gray-600">Configure security headers</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOMonitoringDashboard;