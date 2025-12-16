import React, { useState } from 'react';
import { Play, Database, TrendingUp, BarChart3, FileText, CheckCircle, AlertCircle, Download, ChevronDown, ChevronRight } from 'lucide-react';

const ProjectOutputDemo = () => {
  const [activeSection, setActiveSection] = useState('cleaning');
  const [expandedSection, setExpandedSection] = useState('overview');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Simulated output data
  const cleaningOutput = {
    overview: {
      datasets: [
        { name: 'Coverage', records: 523847, columns: 11, missing: 1243, duplicates: 156, cleaned: 522448 },
        { name: 'Incidence', records: 387291, columns: 8, missing: 892, duplicates: 89, cleaned: 386310 },
        { name: 'Cases', records: 445632, columns: 7, missing: 2341, duplicates: 234, cleaned: 443057 },
        { name: 'Introduction', records: 52883, columns: 6, missing: 0, duplicates: 45, cleaned: 52838 },
        { name: 'Schedule', records: 128475, columns: 11, missing: 456, duplicates: 67, cleaned: 127952 }
      ]
    },
    qualityMetrics: {
      completeness: 99.2,
      accuracy: 98.7,
      consistency: 99.5,
      validity: 98.9
    }
  };

  const edaOutput = {
    globalTrends: [
      { year: 2020, avgCoverage: 84.3, countries: 194 },
      { year: 2021, avgCoverage: 85.1, countries: 194 },
      { year: 2022, avgCoverage: 86.4, countries: 194 },
      { year: 2023, avgCoverage: 87.2, countries: 194 },
      { year: 2024, avgCoverage: 87.8, countries: 194 }
    ],
    topCountries: [
      { name: 'Rwanda', coverage: 98.5, region: 'AFRO' },
      { name: 'Bangladesh', coverage: 97.8, region: 'SEARO' },
      { name: 'Bhutan', coverage: 97.2, region: 'SEARO' },
      { name: 'Sri Lanka', coverage: 96.9, region: 'SEARO' },
      { name: 'Cuba', coverage: 96.5, region: 'AMRO' }
    ],
    lowCoverage: [
      { name: 'Chad', coverage: 38.2, region: 'AFRO', unvaccinated: 3200000 },
      { name: 'South Sudan', coverage: 42.1, region: 'AFRO', unvaccinated: 2800000 },
      { name: 'Somalia', coverage: 45.8, region: 'AFRO', unvaccinated: 2400000 },
      { name: 'Central African Rep.', coverage: 47.3, region: 'AFRO', unvaccinated: 1900000 },
      { name: 'Equatorial Guinea', coverage: 49.6, region: 'AFRO', unvaccinated: 680000 }
    ],
    diseaseImpact: [
      { disease: 'Measles', casesReduction: -82.3, coverage: 89.2 },
      { disease: 'Polio', casesReduction: -99.9, coverage: 86.7 },
      { disease: 'Diphtheria', casesReduction: -95.4, coverage: 85.3 },
      { disease: 'Pertussis', casesReduction: -78.6, coverage: 84.8 },
      { disease: 'Tetanus', casesReduction: -94.2, coverage: 83.9 }
    ]
  };

  const sqlOutput = {
    databaseStats: {
      totalTables: 9,
      totalViews: 3,
      totalRecords: 1532605,
      avgQueryTime: '1.4s',
      indexCount: 24
    },
    sampleQueries: [
      { name: 'Coverage Trend', rows: 45, executionTime: '0.8s' },
      { name: 'Regional Analysis', rows: 128, executionTime: '1.2s' },
      { name: 'Disease Correlation', rows: 234, executionTime: '1.6s' },
      { name: 'Low Coverage Regions', rows: 47, executionTime: '0.9s' }
    ]
  };

  const insights = [
    { 
      title: 'Critical Gap Identified',
      type: 'alert',
      description: '47 countries have <60% vaccination coverage, representing 156 million unvaccinated individuals',
      action: 'Prioritize mobile vaccination campaigns'
    },
    {
      title: 'Success Story',
      type: 'success',
      description: 'Measles vaccination achieved 82.3% reduction in global cases since widespread adoption',
      action: 'Model for other vaccine programs'
    },
    {
      title: 'Regional Disparity',
      type: 'warning',
      description: '35% coverage gap between highest (EURO: 96.2%) and lowest (AFRO: 61.4%) performing regions',
      action: 'Increase resource allocation to AFRO'
    },
    {
      title: 'Drop-off Challenge',
      type: 'alert',
      description: '18% average decline from first to third dose in multi-dose vaccines',
      action: 'Implement SMS reminder systems'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📊 Project Output Demonstration
              </h1>
              <p className="text-gray-600">
                Live simulation of vaccination data analysis results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-600">Running</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'cleaning', label: 'Data Cleaning', icon: Database },
              { id: 'eda', label: 'EDA Results', icon: TrendingUp },
              { id: 'sql', label: 'SQL Output', icon: Database },
              { id: 'insights', label: 'Key Insights', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeSection === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Data Cleaning Output */}
            {activeSection === 'cleaning' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                  <div className="mb-4">
                    <span className="text-blue-400">$</span> python scripts/01_data_cleaning.py
                  </div>
                  <div className="space-y-2">
                    <div>{'='*70}</div>
                    <div className="text-yellow-400 font-bold">VACCINATION DATA CLEANING PIPELINE</div>
                    <div>{'='*70}</div>
                    <div className="mt-4">Loading datasets...</div>
                    <div>✓ All datasets loaded successfully</div>
                    <div className="mt-3 text-white">Cleaning Coverage Data...</div>
                    <div>✓ Coverage data cleaned: 522,448 records</div>
                    <div className="mt-3 text-white">Cleaning Incidence Rate Data...</div>
                    <div>✓ Incidence data cleaned: 386,310 records</div>
                    <div className="mt-3 text-white">Cleaning Reported Cases Data...</div>
                    <div>✓ Cases data cleaned: 443,057 records</div>
                    <div className="mt-3 text-white">Cleaning Vaccine Introduction Data...</div>
                    <div>✓ Introduction data cleaned: 52,838 records</div>
                    <div className="mt-3 text-white">Cleaning Vaccine Schedule Data...</div>
                    <div>✓ Schedule data cleaned: 127,952 records</div>
                  </div>
                </div>

                {/* Dataset Overview Table */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-900">Dataset Overview</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dataset</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Original</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Missing</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Duplicates</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cleaned</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cleaningOutput.overview.datasets.map((dataset, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{dataset.name}</td>
                            <td className="px-6 py-4 text-right text-gray-600">{dataset.records.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-orange-600">{dataset.missing.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-red-600">{dataset.duplicates.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-green-600 font-semibold">{dataset.cleaned.toLocaleString()}</td>
                            <td className="px-6 py-4 text-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quality Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(cleaningOutput.qualityMetrics).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                      <div className="text-sm opacity-90 capitalize mb-2">{key}</div>
                      <div className="text-3xl font-bold">{value}%</div>
                      <div className="mt-2 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDA Output */}
            {activeSection === 'eda' && (
              <div className="space-y-6">
                {/* Global Trends */}
                <div className="bg-white rounded-lg border">
                  <button
                    onClick={() => toggleSection('trends')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-gray-900">Global Coverage Trends (2020-2024)</h3>
                    {expandedSection === 'trends' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'trends' && (
                    <div className="px-6 pb-6">
                      <div className="space-y-3 mt-4">
                        {edaOutput.globalTrends.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold text-blue-600">{item.year}</div>
                              <div className="text-sm text-gray-600">{item.countries} countries</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">{item.avgCoverage}%</div>
                              <div className="text-xs text-green-600">
                                {idx > 0 && `+${(item.avgCoverage - edaOutput.globalTrends[idx-1].avgCoverage).toFixed(1)}%`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Trend Visualization */}
                      <div className="mt-6 h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg p-4 relative">
                        <svg className="w-full h-full">
                          <polyline
                            points={edaOutput.globalTrends.map((item, idx) => 
                              `${(idx / (edaOutput.globalTrends.length - 1)) * 100}%,${100 - ((item.avgCoverage - 80) / 20 * 100)}%`
                            ).join(' ')}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            vectorEffect="non-scaling-stroke"
                          />
                          {edaOutput.globalTrends.map((item, idx) => (
                            <circle
                              key={idx}
                              cx={`${(idx / (edaOutput.globalTrends.length - 1)) * 100}%`}
                              cy={`${100 - ((item.avgCoverage - 80) / 20 * 100)}%`}
                              r="5"
                              fill="#3b82f6"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Top Performers */}
                <div className="bg-white rounded-lg border">
                  <button
                    onClick={() => toggleSection('top')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-gray-900">Top 5 Performing Countries</h3>
                    {expandedSection === 'top' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'top' && (
                    <div className="p-6">
                      <div className="space-y-3">
                        {edaOutput.topCountries.map((country, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{country.name}</div>
                              <div className="text-sm text-gray-500">{country.region} Region</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-green-600">{country.coverage}%</div>
                              <div className="text-xs text-gray-500">coverage</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Low Coverage - Critical */}
                <div className="bg-white rounded-lg border border-red-200">
                  <button
                    onClick={() => toggleSection('low')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-gray-900">Critical: Low Coverage Countries</h3>
                    </div>
                    {expandedSection === 'low' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'low' && (
                    <div className="p-6">
                      <div className="space-y-3">
                        {edaOutput.lowCoverage.map((country, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{country.name}</div>
                              <div className="text-sm text-gray-600">{country.region} Region</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-red-600">{country.coverage}%</div>
                              <div className="text-xs text-red-700">{(country.unvaccinated / 1000000).toFixed(1)}M unvaccinated</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Action Required:</strong> These countries require immediate intervention with mobile clinics and community outreach programs.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Disease Impact */}
                <div className="bg-white rounded-lg border">
                  <button
                    onClick={() => toggleSection('disease')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-gray-900">Vaccination Impact on Diseases</h3>
                    {expandedSection === 'disease' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'disease' && (
                    <div className="p-6">
                      <div className="space-y-4">
                        {edaOutput.diseaseImpact.map((disease, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{disease.disease}</span>
                              <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                {Math.abs(disease.casesReduction)}% reduction
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Coverage: {disease.coverage}%</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${disease.coverage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SQL Output */}
            {activeSection === 'sql' && (
              <div className="space-y-6">
                {/* Database Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">Total Tables</div>
                    <div className="text-3xl font-bold mt-2">{sqlOutput.databaseStats.totalTables}</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">Views</div>
                    <div className="text-3xl font-bold mt-2">{sqlOutput.databaseStats.totalViews}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">Total Records</div>
                    <div className="text-3xl font-bold mt-2">{(sqlOutput.databaseStats.totalRecords / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">Avg Query Time</div>
                    <div className="text-3xl font-bold mt-2">{sqlOutput.databaseStats.avgQueryTime}</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">Indexes</div>
                    <div className="text-3xl font-bold mt-2">{sqlOutput.databaseStats.indexCount}</div>
                  </div>
                </div>

                {/* Sample Query Execution */}
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                  <div className="mb-4">
                    <span className="text-blue-400">mysql&gt;</span> SELECT * FROM vw_vaccination_overview LIMIT 5;
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-yellow-400 border-b border-gray-700">
                          <th className="text-left py-2 px-3">country_name</th>
                          <th className="text-left py-2 px-3">who_region</th>
                          <th className="text-right py-2 px-3">year</th>
                          <th className="text-left py-2 px-3">vaccine</th>
                          <th className="text-right py-2 px-3">coverage</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-3">Rwanda</td>
                          <td className="py-2 px-3">AFRO</td>
                          <td className="text-right py-2 px-3">2024</td>
                          <td className="py-2 px-3">DTP3</td>
                          <td className="text-right py-2 px-3">98.5</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-3">Bangladesh</td>
                          <td className="py-2 px-3">SEARO</td>
                          <td className="text-right py-2 px-3">2024</td>
                          <td className="py-2 px-3">MCV1</td>
                          <td className="text-right py-2 px-3">97.8</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-3">Bhutan</td>
                          <td className="py-2 px-3">SEARO</td>
                          <td className="text-right py-2 px-3">2024</td>
                          <td className="py-2 px-3">BCG</td>
                          <td className="text-right py-2 px-3">97.2</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-3">Sri Lanka</td>
                          <td className="py-2 px-3">SEARO</td>
                          <td className="text-right py-2 px-3">2024</td>
                          <td className="py-2 px-3">Polio3</td>
                          <td className="text-right py-2 px-3">96.9</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">Cuba</td>
                          <td className="py-2 px-3">AMRO</td>
                          <td className="text-right py-2 px-3">2024</td>
                          <td className="py-2 px-3">HepB3</td>
                          <td className="text-right py-2 px-3">96.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-gray-400">5 rows in set ({sqlOutput.databaseStats.avgQueryTime})</div>
                </div>

                {/* Query Performance */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-900">Query Performance Metrics</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {sqlOutput.sampleQueries.map((query, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Play className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-900">{query.name}</span>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-gray-600">{query.rows} rows</div>
                            <div className="font-mono text-blue-600">{query.executionTime}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Insights */}
            {activeSection === 'insights' && (
              <div className="space-y-4">
                {insights.map((insight, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-lg border-l-4 p-6 ${
                      insight.type === 'alert' ? 'bg-red-50 border-red-500' :
                      insight.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {insight.type === 'alert' && <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />}
                      {insight.type === 'warning' && <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />}
                      {insight.type === 'success' && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />}
                      <div className="flex-1">
                        <h4 className={`font-semibold text-lg mb-2 ${
                          insight.type === 'alert' ? 'text-red-900' :
                          insight.type === 'warning' ? 'text-yellow-900' :
                          'text-green-900'
                        }`}>
                          {insight.title}
                        </h4>
                        <p className={`mb-3 ${
                          insight.type === 'alert' ? 'text-red-800' :
                          insight.type === 'warning' ? 'text-yellow-800' :
                          'text-green-800'
                        }`}>
                          {insight.description}
                        </p>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                          insight.type === 'alert' ? 'bg-red-100 text-red-700' :
                          insight.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          <ChevronRight className="w-4 h-4" />
                          {insight.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
                    <div className="text-sm text-gray-600 mb-2">Total Analysis Questions</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">30</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      All answered with insights
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600">
                    <div className="text-sm text-gray-600 mb-2">Data Quality Score</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">98.8%</div>
                    <div className="text-sm text-green-600">Excellent quality achieved</div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
                    <div className="text-sm text-gray-600 mb-2">Actionable Insights</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">47</div>
                    <div className="text-sm text-purple-600">Ready for implementation</div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 text-white mt-8">
                  <h3 className="text-2xl font-bold mb-4">Executive Summary</h3>
                  <div className="space-y-3 text-blue-50">
                    <p>
                      <strong className="text-white">Global Progress:</strong> Vaccination coverage has improved from 84.3% to 87.8% over the past 5 years, representing 48 million additional vaccinated individuals.
                    </p>
                    <p>
                      <strong className="text-white">Critical Challenges:</strong> 47 countries remain below 60% coverage, with 156 million unvaccinated people requiring urgent intervention.
                    </p>
                    <p>
                      <strong className="text-white">Success Stories:</strong> Measles vaccination has achieved an 82.3% reduction in global cases, demonstrating the life-saving impact of sustained vaccination programs.
                    </p>
                    <p>
                      <strong className="text-white">Recommended Actions:</strong> Immediate mobile clinic deployment to low-coverage regions, SMS reminder systems for multi-dose vaccines, and increased resource allocation to AFRO region.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Export Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              <span>Download Full Report (PDF)</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Export to Excel</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Open in Power BI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOutputDemo;