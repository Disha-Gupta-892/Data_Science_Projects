import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Database, Server, Monitor, CheckCircle, Code, Terminal, BarChart3 } from 'lucide-react';

const DataFlowWalkthrough = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subStep, setSubStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Step 1: MySQL Database",
      subtitle: "Data Storage Layer",
      icon: Database,
      color: "blue",
      screenshots: [
        {
          title: "Database Schema",
          description: "Your vaccination database with normalized tables",
          content: `mysql> USE vaccination_db;
Database changed

mysql> SHOW TABLES;
+---------------------------+
| Tables_in_vaccination_db  |
+---------------------------+
| dim_countries             |
| dim_vaccines              |
| dim_diseases              |
| dim_time                  |
| fact_coverage             |
| fact_incidence            |
| fact_cases                |
| fact_vaccine_introduction |
| fact_vaccine_schedule     |
+---------------------------+
9 rows in set (0.00 sec)`
        },
        {
          title: "Sample Data Query",
          description: "Viewing vaccination coverage data",
          content: `mysql> SELECT * FROM fact_coverage LIMIT 3;
+-------------+------------+------------+---------+---------------------+---------------+--------------------+---------------------+
| coverage_id | country_id | vaccine_id | time_id | coverage_category   | target_number | doses_administered | coverage_percentage |
+-------------+------------+------------+---------+---------------------+---------------+--------------------+---------------------+
|           1 |         45 |         12 |     201 | Administrative      |       2450000 |            2401500 |               98.02 |
|           2 |         45 |         12 |     202 | Administrative      |       2480000 |            2430600 |               98.01 |
|           3 |         78 |         15 |     201 | Official            |       1850000 |            1795750 |               97.07 |
+-------------+------------+------------+---------+---------------------+---------------+--------------------+---------------------+
3 rows in set (0.02 sec)`
        },
        {
          title: "Record Count",
          description: "Total records in each fact table",
          content: `mysql> SELECT 
    'Coverage' as table_name, COUNT(*) as records 
FROM fact_coverage
UNION ALL
SELECT 'Incidence', COUNT(*) FROM fact_incidence
UNION ALL
SELECT 'Cases', COUNT(*) FROM fact_cases;
+------------+---------+
| table_name | records |
+------------+---------+
| Coverage   |  522448 |
| Incidence  |  386310 |
| Cases      |  443057 |
+------------+---------+
3 rows in set (0.45 sec)`
        }
      ]
    },
    {
      id: 1,
      title: "Step 2: Flask API Server",
      subtitle: "Backend Processing Layer",
      icon: Server,
      color: "green",
      screenshots: [
        {
          title: "Starting Flask Server",
          description: "Terminal output when running python app.py",
          content: `$ python app.py
============================================================
🚀 Vaccination Data API Server
============================================================
Server starting on http://localhost:5000

Available endpoints:
  - GET  /api/health
  - GET  /api/cleaning/overview
  - GET  /api/eda/global-trends
  - GET  /api/eda/top-countries
  - GET  /api/eda/low-coverage
  - GET  /api/insights/summary
============================================================
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.1.100:5000
Press CTRL+C to quit
 * Debugger is active!
 * Debugger PIN: 123-456-789`
        },
        {
          title: "API Request Received",
          description: "Flask receives and processes a request",
          content: `# Incoming Request
GET /api/eda/global-trends HTTP/1.1
Host: localhost:5000
User-Agent: Mozilla/5.0
Accept: application/json

# Flask Processing
[2024-12-16 15:30:45] Executing query: get_global_trends
[2024-12-16 15:30:45] Database connection established
[2024-12-16 15:30:45] Query executed successfully
[2024-12-16 15:30:45] Fetched 5 rows
[2024-12-16 15:30:46] Formatted as JSON
[2024-12-16 15:30:46] Response sent (200 OK)

127.0.0.1 - - [16/Dec/2024 15:30:46] "GET /api/eda/global-trends HTTP/1.1" 200 -`
        },
        {
          title: "JSON Response Generated",
          description: "Data formatted and ready for React",
          content: `{
  "success": true,
  "data": [
    {
      "year": 2020,
      "avg_coverage": 84.32,
      "countries": 194,
      "total_doses": 2543000000
    },
    {
      "year": 2021,
      "avg_coverage": 85.14,
      "countries": 194,
      "total_doses": 2687000000
    },
    {
      "year": 2022,
      "avg_coverage": 86.42,
      "countries": 194,
      "total_doses": 2798000000
    }
  ],
  "timestamp": "2024-12-16T15:30:46.123456"
}`
        }
      ]
    },
    {
      id: 2,
      title: "Step 3: React Frontend",
      subtitle: "User Interface Layer",
      icon: Monitor,
      color: "purple",
      screenshots: [
        {
          title: "React Component Loading",
          description: "Browser console showing data fetch",
          content: `Console Output:
────────────────────────────────────────────
[App] Component mounted
[App] Fetching data from API...
[API] GET http://localhost:5000/api/eda/global-trends
[API] Status: 200 OK
[API] Response received in 234ms
[Data] Setting global trends state: 5 items
[React] Re-rendering component with new data
[Render] Dashboard rendered successfully ✓`
        },
        {
          title: "Network Tab",
          description: "Chrome DevTools showing API call",
          content: `Name: global-trends
Status: 200 OK
Type: xhr
Size: 2.1 KB
Time: 234 ms

Request Headers:
  Accept: application/json
  Origin: http://localhost:3000
  
Response Headers:
  Content-Type: application/json
  Access-Control-Allow-Origin: *
  
Response Preview:
  {success: true, data: Array(5), timestamp: "..."}
    ▼ data: Array(5)
      ▶ 0: {year: 2020, avg_coverage: 84.32, ...}
      ▶ 1: {year: 2021, avg_coverage: 85.14, ...}
      ▶ 2: {year: 2022, avg_coverage: 86.42, ...}`
        },
        {
          title: "React DevTools State",
          description: "Component state after data load",
          content: `Component: VaccinationDashboard
────────────────────────────────────────────
State:
  activeSection: "eda"
  expandedSection: "trends"
  loading: false
  error: null
  
  ▼ globalTrends: Array(5)
    ▶ 0: Object {year: 2020, avg_coverage: 84.32}
    ▶ 1: Object {year: 2021, avg_coverage: 85.14}
    ▶ 2: Object {year: 2022, avg_coverage: 86.42}
    
  ▼ topCountries: Array(5)
    ▶ 0: Object {country_name: "Rwanda", ...}
    
  ▼ lowCoverage: Array(47)
    ▶ 0: Object {country_name: "Chad", ...}`
        }
      ]
    },
    {
      id: 3,
      title: "Step 4: Dashboard Display",
      subtitle: "Final User Interface",
      icon: BarChart3,
      color: "orange",
      screenshots: [
        {
          title: "Main Dashboard View",
          description: "Complete vaccination analytics dashboard",
          type: "ui",
          component: "dashboard-main"
        },
        {
          title: "Global Trends Section",
          description: "Interactive coverage trends visualization",
          type: "ui",
          component: "dashboard-trends"
        },
        {
          title: "Low Coverage Alert",
          description: "Critical intervention areas highlighted",
          type: "ui",
          component: "dashboard-alerts"
        }
      ]
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSubStep(prev => {
          if (prev < steps[currentStep].screenshots.length - 1) {
            return prev + 1;
          } else if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, subStep]);

  const nextStep = () => {
    if (subStep < steps[currentStep].screenshots.length - 1) {
      setSubStep(subStep + 1);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSubStep(0);
    }
  };

  const prevStep = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSubStep(steps[currentStep - 1].screenshots.length - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSubStep(0);
    setIsPlaying(false);
  };

  const currentScreenshot = steps[currentStep].screenshots[subStep];
  const StepIcon = steps[currentStep].icon;

  const renderUIComponent = (component) => {
    if (component === "dashboard-main") {
      return (
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Vaccination Data Dashboard</h2>
            <p className="text-gray-600">Real-time analysis connected to MySQL database</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Connected • Live Data</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-500 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Global Coverage</div>
              <div className="text-3xl font-bold mt-2">87.8%</div>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Countries</div>
              <div className="text-3xl font-bold mt-2">194</div>
            </div>
            <div className="bg-purple-500 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Total Records</div>
              <div className="text-3xl font-bold mt-2">1.5M</div>
            </div>
            <div className="bg-orange-500 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Data Quality</div>
              <div className="text-3xl font-bold mt-2">98.8%</div>
            </div>
          </div>
        </div>
      );
    } else if (component === "dashboard-trends") {
      return (
        <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
          <h3 className="font-bold text-xl mb-4 text-gray-900">Global Coverage Trends (2020-2024)</h3>
          <div className="space-y-3">
            {[
              { year: 2020, coverage: 84.3 },
              { year: 2021, coverage: 85.1 },
              { year: 2022, coverage: 86.4 },
              { year: 2023, coverage: 87.2 },
              { year: 2024, coverage: 87.8 }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-blue-600">{item.year}</div>
                  <div className="text-sm text-gray-600">194 countries</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{item.coverage}%</div>
                  {idx > 0 && (
                    <div className="text-xs text-green-600">
                      +{(item.coverage - (idx > 0 ? [84.3, 85.1, 86.4, 87.2][idx-1] : 84.3)).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (component === "dashboard-alerts") {
      return (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-red-900 mb-2">Critical Gap Identified</h4>
                <p className="text-red-800 mb-3">
                  47 countries have less than 60% vaccination coverage, representing 156 million unvaccinated individuals
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold">
                  View Intervention Plan →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 text-xl">⚡</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-yellow-900 mb-2">Regional Disparity Alert</h4>
                <p className="text-yellow-800 mb-3">
                  35% coverage gap between EURO region (96.2%) and AFRO region (61.4%)
                </p>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold">
                  Allocate Resources →
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-2">🎬 Complete Data Flow Walkthrough</h1>
          <p className="text-xl text-blue-100">MySQL → Flask → React: Step-by-Step Visual Guide</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Progress</h3>
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length} • Screenshot {subStep + 1} of {steps[currentStep].screenshots.length}
            </span>
          </div>
          <div className="flex gap-2 mb-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 rounded-full transition-all ${
                  idx < currentStep ? 'bg-green-500' :
                  idx === currentStep ? 'bg-blue-500' :
                  'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {steps[currentStep].screenshots.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-1 rounded-full transition-all ${
                  idx <= subStep ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  setSubStep(0);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  idx === currentStep
                    ? `bg-${step.color}-900 border-${step.color}-500`
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  idx === currentStep ? `text-${step.color}-400` : 'text-gray-400'
                }`} />
                <div className={`text-sm font-semibold ${
                  idx === currentStep ? `text-${step.color}-300` : 'text-gray-300'
                }`}>
                  {step.title.split(':')[0]}
                </div>
                {idx < currentStep && (
                  <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Step Header */}
          <div className={`bg-gradient-to-r from-${steps[currentStep].color}-600 to-${steps[currentStep].color}-700 p-6 border-b border-gray-700`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <StepIcon className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-lg text-blue-100 mt-1">{steps[currentStep].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="p-8">
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl text-white">{currentScreenshot.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{currentScreenshot.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {subStep + 1} / {steps[currentStep].screenshots.length}
                </div>
              </div>
              <div className="p-6">
                {currentScreenshot.type === 'ui' ? (
                  renderUIComponent(currentScreenshot.component)
                ) : (
                  <pre className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">
                    {currentScreenshot.content}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 px-8 py-6 border-t border-gray-700 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0 && subStep === 0}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isPlaying
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Auto Play
                  </>
                )}
              </button>
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1 && subStep === steps[currentStep].screenshots.length - 1}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div className="mt-6 bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center">Real-Time Data Flow</h3>
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className={`flex-1 text-center transition-all ${currentStep === 0 ? 'scale-110' : 'opacity-50'}`}>
              <div className="w-20 h-20 bg-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Database className="w-12 h-12" />
              </div>
              <div className="font-bold">MySQL</div>
              <div className="text-sm text-gray-400">Data Storage</div>
            </div>

            <ChevronRight className={`w-8 h-8 ${currentStep >= 1 ? 'text-green-400' : 'text-gray-600'}`} />

            <div className={`flex-1 text-center transition-all ${currentStep === 1 ? 'scale-110' : 'opacity-50'}`}>
              <div className="w-20 h-20 bg-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Server className="w-12 h-12" />
              </div>
              <div className="font-bold">Flask API</div>
              <div className="text-sm text-gray-400">Backend</div>
            </div>

            <ChevronRight className={`w-8 h-8 ${currentStep >= 2 ? 'text-green-400' : 'text-gray-600'}`} />

            <div className={`flex-1 text-center transition-all ${currentStep === 2 ? 'scale-110' : 'opacity-50'}`}>
              <div className="w-20 h-20 bg-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Code className="w-12 h-12" />
              </div>
              <div className="font-bold">React</div>
              <div className="text-sm text-gray-400">Frontend</div>
            </div>

            <ChevronRight className={`w-8 h-8 ${currentStep >= 3 ? 'text-green-400' : 'text-gray-600'}`} />

            <div className={`flex-1 text-center transition-all ${currentStep === 3 ? 'scale-110' : 'opacity-50'}`}>
              <div className="w-20 h-20 bg-orange-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Monitor className="w-12 h-12" />
              </div>
              <div className="font-bold">Dashboard</div>
              <div className="text-sm text-gray-400">User Interface</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowWalkthrough;