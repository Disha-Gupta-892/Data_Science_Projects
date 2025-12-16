import React, { useState } from 'react';
import { FileText, Database, BarChart3, Code, CheckCircle, Download, ChevronRight } from 'lucide-react';

const VaccinationProject = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const projectPhases = [
    { id: 1, name: 'Data Extraction & Cleaning', status: 'pending', icon: FileText },
    { id: 2, name: 'SQL Database Setup', status: 'pending', icon: Database },
    { id: 3, name: 'Exploratory Analysis', status: 'pending', icon: BarChart3 },
    { id: 4, name: 'Power BI Integration', status: 'pending', icon: Code },
  ];

  const deliverables = [
    'Python scripts for data cleaning',
    'SQL database schema & queries',
    'EDA Jupyter notebooks',
    'Power BI dashboard files (.pbix)',
    'Technical documentation',
    'Analysis report with insights'
  ];

  const pythonScript = `# vaccination_data_cleaning.py
import pandas as pd
import numpy as np
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

class VaccinationDataProcessor:
    """
    Professional data cleaning pipeline for vaccination datasets
    """
    
    def __init__(self, data_path):
        self.data_path = data_path
        self.coverage_df = None
        self.incidence_df = None
        self.cases_df = None
        self.intro_df = None
        self.schedule_df = None
        
    def load_data(self):
        """Load all vaccination datasets"""
        print("Loading datasets...")
        try:
            self.coverage_df = pd.read_csv(f'{self.data_path}/coverage_data.csv')
            self.incidence_df = pd.read_csv(f'{self.data_path}/incidence_rate.csv')
            self.cases_df = pd.read_csv(f'{self.data_path}/reported_cases.csv')
            self.intro_df = pd.read_csv(f'{self.data_path}/vaccine_introduction.csv')
            self.schedule_df = pd.read_csv(f'{self.data_path}/vaccine_schedule.csv')
            print("✓ All datasets loaded successfully")
        except Exception as e:
            print(f"Error loading data: {e}")
            
    def clean_coverage_data(self):
        """Clean coverage dataset"""
        print("\\nCleaning Coverage Data...")
        df = self.coverage_df.copy()
        
        # Handle missing values
        df['Target_number'] = df['Target_number'].fillna(0)
        df['Doses'] = df['Doses'].fillna(0)
        df['Coverage'] = df['Coverage'].fillna(0)
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Standardize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Ensure data types
        df['year'] = pd.to_numeric(df['year'], errors='coerce')
        df['coverage'] = pd.to_numeric(df['coverage'], errors='coerce')
        
        # Filter valid years
        df = df[df['year'].between(1980, 2025)]
        
        # Cap coverage at 100%
        df['coverage'] = df['coverage'].clip(upper=100)
        
        self.coverage_df = df
        print(f"✓ Coverage data cleaned: {len(df)} records")
        return df
        
    def clean_incidence_data(self):
        """Clean incidence rate dataset"""
        print("\\nCleaning Incidence Rate Data...")
        df = self.incidence_df.copy()
        
        # Standardize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Handle missing values
        df['incidence_rate'] = df['incidence_rate'].fillna(0)
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Ensure data types
        df['year'] = pd.to_numeric(df['year'], errors='coerce')
        df['incidence_rate'] = pd.to_numeric(df['incidence_rate'], errors='coerce')
        
        # Remove negative values
        df = df[df['incidence_rate'] >= 0]
        
        self.incidence_df = df
        print(f"✓ Incidence data cleaned: {len(df)} records")
        return df
        
    def clean_cases_data(self):
        """Clean reported cases dataset"""
        print("\\nCleaning Reported Cases Data...")
        df = self.cases_df.copy()
        
        # Standardize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Handle missing values
        df['cases'] = df['cases'].fillna(0)
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Ensure data types
        df['year'] = pd.to_numeric(df['year'], errors='coerce')
        df['cases'] = pd.to_numeric(df['cases'], errors='coerce')
        
        # Remove negative values
        df = df[df['cases'] >= 0]
        
        self.cases_df = df
        print(f"✓ Cases data cleaned: {len(df)} records")
        return df
        
    def clean_introduction_data(self):
        """Clean vaccine introduction dataset"""
        print("\\nCleaning Vaccine Introduction Data...")
        df = self.intro_df.copy()
        
        # Standardize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Ensure data types
        df['year'] = pd.to_numeric(df['year'], errors='coerce')
        
        # Standardize intro values
        df['intro'] = df['intro'].fillna('Unknown')
        
        self.intro_df = df
        print(f"✓ Introduction data cleaned: {len(df)} records")
        return df
        
    def clean_schedule_data(self):
        """Clean vaccine schedule dataset"""
        print("\\nCleaning Vaccine Schedule Data...")
        df = self.schedule_df.copy()
        
        # Standardize column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Ensure data types
        df['year'] = pd.to_numeric(df['year'], errors='coerce')
        
        self.schedule_df = df
        print(f"✓ Schedule data cleaned: {len(df)} records")
        return df
        
    def generate_data_quality_report(self):
        """Generate comprehensive data quality report"""
        print("\\n" + "="*60)
        print("DATA QUALITY REPORT")
        print("="*60)
        
        datasets = {
            'Coverage': self.coverage_df,
            'Incidence': self.incidence_df,
            'Cases': self.cases_df,
            'Introduction': self.intro_df,
            'Schedule': self.schedule_df
        }
        
        for name, df in datasets.items():
            if df is not None:
                print(f"\\n{name} Dataset:")
                print(f"  - Total records: {len(df):,}")
                print(f"  - Columns: {len(df.columns)}")
                print(f"  - Missing values: {df.isnull().sum().sum()}")
                print(f"  - Duplicates: {df.duplicated().sum()}")
                
    def export_cleaned_data(self, output_path='cleaned_data'):
        """Export all cleaned datasets"""
        print(f"\\nExporting cleaned data to {output_path}/...")
        
        import os
        os.makedirs(output_path, exist_ok=True)
        
        self.coverage_df.to_csv(f'{output_path}/coverage_cleaned.csv', index=False)
        self.incidence_df.to_csv(f'{output_path}/incidence_cleaned.csv', index=False)
        self.cases_df.to_csv(f'{output_path}/cases_cleaned.csv', index=False)
        self.intro_df.to_csv(f'{output_path}/introduction_cleaned.csv', index=False)
        self.schedule_df.to_csv(f'{output_path}/schedule_cleaned.csv', index=False)
        
        print("✓ All cleaned datasets exported successfully")
        
    def run_pipeline(self):
        """Execute complete data cleaning pipeline"""
        print("="*60)
        print("VACCINATION DATA CLEANING PIPELINE")
        print("="*60)
        
        self.load_data()
        self.clean_coverage_data()
        self.clean_incidence_data()
        self.clean_cases_data()
        self.clean_introduction_data()
        self.clean_schedule_data()
        self.generate_data_quality_report()
        self.export_cleaned_data()
        
        print("\\n" + "="*60)
        print("✓ DATA CLEANING PIPELINE COMPLETED SUCCESSFULLY")
        print("="*60)

# Usage
if __name__ == "__main__":
    processor = VaccinationDataProcessor('data')
    processor.run_pipeline()`;

  const sqlScript = `-- =====================================================
-- VACCINATION DATABASE SCHEMA
-- Database: vaccination_db
-- Author: Data Analytics Team
-- Date: ${new Date().toISOString().split('T')[0]}
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS vaccination_db;
USE vaccination_db;

-- =====================================================
-- DIMENSION TABLES
-- =====================================================

-- Countries Dimension
CREATE TABLE dim_countries (
    country_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(3) UNIQUE NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    who_region VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_region (who_region)
);

-- Vaccines/Antigens Dimension
CREATE TABLE dim_vaccines (
    vaccine_id INT PRIMARY KEY AUTO_INCREMENT,
    vaccine_code VARCHAR(20) UNIQUE NOT NULL,
    vaccine_description VARCHAR(200),
    antigen_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_vaccine_code (vaccine_code)
);

-- Diseases Dimension
CREATE TABLE dim_diseases (
    disease_id INT PRIMARY KEY AUTO_INCREMENT,
    disease_code VARCHAR(20) UNIQUE NOT NULL,
    disease_description VARCHAR(200),
    severity_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_disease_code (disease_code)
);

-- Time Dimension
CREATE TABLE dim_time (
    time_id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    quarter INT,
    decade INT,
    UNIQUE KEY unique_year (year),
    INDEX idx_year (year)
);

-- =====================================================
-- FACT TABLES
-- =====================================================

-- Vaccination Coverage Fact Table
CREATE TABLE fact_coverage (
    coverage_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    vaccine_id INT NOT NULL,
    time_id INT NOT NULL,
    coverage_category VARCHAR(50),
    target_number INT,
    doses_administered INT,
    coverage_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES dim_countries(country_id),
    FOREIGN KEY (vaccine_id) REFERENCES dim_vaccines(vaccine_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    INDEX idx_country_year (country_id, time_id),
    INDEX idx_vaccine (vaccine_id)
);

-- Disease Incidence Fact Table
CREATE TABLE fact_incidence (
    incidence_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    disease_id INT NOT NULL,
    time_id INT NOT NULL,
    denominator VARCHAR(50),
    incidence_rate DECIMAL(10,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES dim_countries(country_id),
    FOREIGN KEY (disease_id) REFERENCES dim_diseases(disease_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    INDEX idx_country_disease (country_id, disease_id),
    INDEX idx_year (time_id)
);

-- Reported Cases Fact Table
CREATE TABLE fact_cases (
    case_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    disease_id INT NOT NULL,
    time_id INT NOT NULL,
    reported_cases INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES dim_countries(country_id),
    FOREIGN KEY (disease_id) REFERENCES dim_diseases(disease_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    INDEX idx_country_disease_year (country_id, disease_id, time_id)
);

-- Vaccine Introduction Fact Table
CREATE TABLE fact_vaccine_introduction (
    intro_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    vaccine_id INT NOT NULL,
    time_id INT NOT NULL,
    intro_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES dim_countries(country_id),
    FOREIGN KEY (vaccine_id) REFERENCES dim_vaccines(vaccine_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    INDEX idx_country_vaccine (country_id, vaccine_id)
);

-- Vaccine Schedule Fact Table
CREATE TABLE fact_vaccine_schedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    vaccine_id INT NOT NULL,
    time_id INT NOT NULL,
    schedule_round VARCHAR(50),
    target_population VARCHAR(100),
    target_pop_description TEXT,
    geo_area VARCHAR(100),
    age_administered VARCHAR(50),
    source_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES dim_countries(country_id),
    FOREIGN KEY (vaccine_id) REFERENCES dim_vaccines(vaccine_id),
    FOREIGN KEY (time_id) REFERENCES dim_time(time_id),
    INDEX idx_country_vaccine_year (country_id, vaccine_id, time_id)
);

-- =====================================================
-- ANALYTICAL VIEWS
-- =====================================================

-- View: Vaccination Coverage Overview
CREATE VIEW vw_vaccination_overview AS
SELECT 
    c.country_name,
    c.who_region,
    t.year,
    v.vaccine_description,
    fc.coverage_percentage,
    fc.target_number,
    fc.doses_administered
FROM fact_coverage fc
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_vaccines v ON fc.vaccine_id = v.vaccine_id
JOIN dim_time t ON fc.time_id = t.time_id;

-- View: Disease Incidence Analysis
CREATE VIEW vw_disease_incidence AS
SELECT 
    c.country_name,
    c.who_region,
    t.year,
    d.disease_description,
    fi.incidence_rate,
    fca.reported_cases
FROM fact_incidence fi
JOIN dim_countries c ON fi.country_id = c.country_id
JOIN dim_diseases d ON fi.disease_id = d.disease_id
JOIN dim_time t ON fi.time_id = t.time_id
LEFT JOIN fact_cases fca ON fca.country_id = fi.country_id 
    AND fca.disease_id = fi.disease_id 
    AND fca.time_id = fi.time_id;

-- View: Vaccination Impact Analysis
CREATE VIEW vw_vaccination_impact AS
SELECT 
    c.country_name,
    c.who_region,
    t.year,
    v.vaccine_description,
    fc.coverage_percentage,
    d.disease_description,
    fi.incidence_rate,
    fca.reported_cases
FROM fact_coverage fc
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_vaccines v ON fc.vaccine_id = v.vaccine_id
JOIN dim_time t ON fc.time_id = t.time_id
LEFT JOIN dim_diseases d ON LOWER(v.vaccine_description) LIKE CONCAT('%', LOWER(d.disease_code), '%')
LEFT JOIN fact_incidence fi ON fi.country_id = c.country_id 
    AND fi.disease_id = d.disease_id 
    AND fi.time_id = t.time_id
LEFT JOIN fact_cases fca ON fca.country_id = c.country_id 
    AND fca.disease_id = d.disease_id 
    AND fca.time_id = t.time_id;

-- =====================================================
-- SAMPLE ANALYTICAL QUERIES
-- =====================================================

-- Query 1: Top 10 countries by vaccination coverage
SELECT 
    country_name,
    AVG(coverage_percentage) as avg_coverage
FROM vw_vaccination_overview
WHERE year >= 2020
GROUP BY country_name
ORDER BY avg_coverage DESC
LIMIT 10;

-- Query 2: Disease trends over time
SELECT 
    year,
    disease_description,
    AVG(incidence_rate) as avg_incidence,
    SUM(reported_cases) as total_cases
FROM vw_disease_incidence
GROUP BY year, disease_description
ORDER BY year DESC, total_cases DESC;

-- Query 3: Vaccination impact correlation
SELECT 
    vaccine_description,
    disease_description,
    AVG(coverage_percentage) as avg_coverage,
    AVG(incidence_rate) as avg_incidence
FROM vw_vaccination_impact
WHERE coverage_percentage IS NOT NULL 
    AND incidence_rate IS NOT NULL
GROUP BY vaccine_description, disease_description
HAVING COUNT(*) > 10
ORDER BY avg_coverage DESC;

-- =====================================================
-- DATA INTEGRITY CHECKS
-- =====================================================

-- Check for orphaned records
SELECT 'Coverage orphans' as check_type, COUNT(*) as count
FROM fact_coverage fc
LEFT JOIN dim_countries c ON fc.country_id = c.country_id
WHERE c.country_id IS NULL

UNION ALL

SELECT 'Incidence orphans', COUNT(*)
FROM fact_incidence fi
LEFT JOIN dim_countries c ON fi.country_id = c.country_id
WHERE c.country_id IS NULL;

-- =====================================================
-- END OF SCHEMA
-- =====================================================`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Vaccination Data Analysis Project
              </h1>
              <p className="text-gray-600 text-lg">
                Public Health & Epidemiology Analytics Platform
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Timeline</div>
              <div className="text-2xl font-bold text-blue-600">14 Days</div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Python
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              SQL
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Power BI
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              EDA
            </span>
          </div>
        </div>

        {/* Project Phases */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {projectPhases.map((phase) => (
            <div
              key={phase.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <phase.icon className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-300">
                  {phase.id}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {phase.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                Ready to start
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b">
            {['overview', 'python', 'sql', 'deliverables'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This comprehensive project analyzes global vaccination data to understand trends in vaccination coverage, disease incidence, and effectiveness. The project integrates data cleaning, SQL database design, exploratory data analysis, and Power BI visualization to deliver actionable insights for public health strategy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      Data Sources
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Coverage Data (vaccination rates)</li>
                      <li>• Incidence Rate (disease occurrence)</li>
                      <li>• Reported Cases (disease statistics)</li>
                      <li>• Vaccine Introduction (timeline)</li>
                      <li>• Vaccine Schedule (administration plans)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Key Objectives
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Assess vaccination effectiveness</li>
                      <li>• Identify low-coverage regions</li>
                      <li>• Analyze disease trends</li>
                      <li>• Support policy decisions</li>
                      <li>• Optimize resource allocation</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
                  <h3 className="font-semibold text-lg mb-2">
                    Business Impact
                  </h3>
                  <p className="text-blue-50">
                    Enable data-driven decisions for public health agencies, support targeted vaccination campaigns, forecast vaccine demand, and provide evidence-based recommendations for global health policy formulation.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'python' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Python Data Cleaning Script
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Script
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">
                    {pythonScript}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'sql' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    SQL Database Schema
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download SQL
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-blue-400 font-mono">
                    {sqlScript}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Project Deliverables
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deliverables.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quality Standards
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Comprehensive data quality checks and validation</li>
                    <li>• Normalized database following 3NF principles</li>
                    <li>• Interactive and user-friendly Power BI dashboards</li>
                    <li>• Detailed documentation with reproducible results</li>
                    <li>• Actionable insights for stakeholders</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">Next Steps:</span> Download the Python and SQL scripts, set up your environment, load the data, and begin the analysis pipeline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaccinationProject;