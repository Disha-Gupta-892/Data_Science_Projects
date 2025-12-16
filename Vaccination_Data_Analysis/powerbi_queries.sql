-- =====================================================
-- POWER BI ANALYTICAL QUERIES
-- Vaccination Data Analysis Project
-- =====================================================

-- =====================================================
-- EASY LEVEL QUERIES
-- =====================================================

-- Q1: Vaccination rates vs disease incidence correlation
SELECT 
    c.country_name,
    t.year,
    AVG(fc.coverage_percentage) as avg_coverage,
    AVG(fi.incidence_rate) as avg_incidence,
    AVG(fca.reported_cases) as avg_cases
FROM fact_coverage fc
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_time t ON fc.time_id = t.time_id
LEFT JOIN fact_incidence fi ON fi.country_id = c.country_id AND fi.time_id = t.time_id
LEFT JOIN fact_cases fca ON fca.country_id = c.country_id AND fca.time_id = t.time_id
WHERE t.year >= 2015
GROUP BY c.country_name, t.year
ORDER BY t.year DESC, c.country_name;

-- Q2: Drop-off rate between 1st dose and subsequent doses
SELECT 
    v.vaccine_description,
    t.year,
    fs.schedule_round,
    AVG(fc.coverage_percentage) as avg_coverage,
    COUNT(DISTINCT c.country_id) as country_count
FROM fact_vaccine_schedule fs
JOIN fact_coverage fc ON fs.country_id = fc.country_id 
    AND fs.vaccine_id = fc.vaccine_id 
    AND fs.time_id = fc.time_id
JOIN dim_vaccines v ON fs.vaccine_id = v.vaccine_id
JOIN dim_countries c ON fs.country_id = c.country_id
JOIN dim_time t ON fs.time_id = t.time_id
WHERE t.year >= 2020
GROUP BY v.vaccine_description, t.year, fs.schedule_round
ORDER BY v.vaccine_description, t.year, fs.schedule_round;

-- Q3: Urban vs rural vaccination rates (using geo_area from schedule)
SELECT 
    c.country_name,
    c.who_region,
    t.year,
    fs.geo_area,
    AVG(fc.coverage_percentage) as avg_coverage
FROM fact_vaccine_schedule fs
JOIN fact_coverage fc ON fs.country_id = fc.country_id 
    AND fs.vaccine_id = fc.vaccine_id 
    AND fs.time_id = fc.time_id
JOIN dim_countries c ON fs.country_id = c.country_id
JOIN dim_time t ON fs.time_id = t.time_id
WHERE t.year >= 2018
    AND fs.geo_area IS NOT NULL
GROUP BY c.country_name, c.who_region, t.year, fs.geo_area
ORDER BY t.year DESC, c.country_name;

-- Q4: Booster dose uptake over time
SELECT 
    t.year,
    v.vaccine_description,
    COUNT(CASE WHEN fs.schedule_round LIKE '%booster%' 
               OR fs.schedule_round LIKE '%dose 2%' 
               OR fs.schedule_round LIKE '%dose 3%' THEN 1 END) as booster_programs,
    AVG(CASE WHEN fs.schedule_round LIKE '%booster%' 
             OR fs.schedule_round LIKE '%dose 2%' 
             OR fs.schedule_round LIKE '%dose 3%' 
             THEN fc.coverage_percentage END) as avg_booster_coverage
FROM fact_vaccine_schedule fs
JOIN fact_coverage fc ON fs.country_id = fc.country_id 
    AND fs.vaccine_id = fc.vaccine_id 
    AND fs.time_id = fc.time_id
JOIN dim_vaccines v ON fs.vaccine_id = v.vaccine_id
JOIN dim_time t ON fs.time_id = t.time_id
WHERE t.year >= 2015
GROUP BY t.year, v.vaccine_description
HAVING booster_programs > 0
ORDER BY t.year DESC, avg_booster_coverage DESC;

-- Q5: Regions with high disease incidence despite high vaccination
SELECT 
    c.country_name,
    c.who_region,
    d.disease_description,
    AVG(fc.coverage_percentage) as avg_coverage,
    AVG(fi.incidence_rate) as avg_incidence,
    SUM(fca.reported_cases) as total_cases
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
    AND fca.time_id = t.time_id
WHERE t.year >= 2020
    AND d.disease_id IS NOT NULL
GROUP BY c.country_name, c.who_region, d.disease_description
HAVING avg_coverage > 70 AND avg_incidence > 0
ORDER BY avg_incidence DESC, avg_coverage DESC;

-- =====================================================
-- MEDIUM LEVEL QUERIES (Multi-table combinations)
-- =====================================================

-- Q1: Vaccine introduction correlation with disease reduction
WITH pre_intro AS (
    SELECT 
        fvi.country_id,
        fvi.vaccine_id,
        d.disease_id,
        AVG(fca.reported_cases) as avg_cases_before
    FROM fact_vaccine_introduction fvi
    JOIN dim_vaccines v ON fvi.vaccine_id = v.vaccine_id
    JOIN dim_time t ON fvi.time_id = t.time_id
    LEFT JOIN dim_diseases d ON LOWER(v.vaccine_description) LIKE CONCAT('%', LOWER(d.disease_code), '%')
    LEFT JOIN fact_cases fca ON fca.country_id = fvi.country_id 
        AND fca.disease_id = d.disease_id
        AND fca.time_id IN (
            SELECT time_id FROM dim_time 
            WHERE year BETWEEN t.year - 5 AND t.year - 1
        )
    WHERE fvi.intro_status = 'Yes' AND d.disease_id IS NOT NULL
    GROUP BY fvi.country_id, fvi.vaccine_id, d.disease_id
),
post_intro AS (
    SELECT 
        fvi.country_id,
        fvi.vaccine_id,
        d.disease_id,
        AVG(fca.reported_cases) as avg_cases_after
    FROM fact_vaccine_introduction fvi
    JOIN dim_vaccines v ON fvi.vaccine_id = v.vaccine_id
    JOIN dim_time t ON fvi.time_id = t.time_id
    LEFT JOIN dim_diseases d ON LOWER(v.vaccine_description) LIKE CONCAT('%', LOWER(d.disease_code), '%')
    LEFT JOIN fact_cases fca ON fca.country_id = fvi.country_id 
        AND fca.disease_id = d.disease_id
        AND fca.time_id IN (
            SELECT time_id FROM dim_time 
            WHERE year BETWEEN t.year + 1 AND t.year + 5
        )
    WHERE fvi.intro_status = 'Yes' AND d.disease_id IS NOT NULL
    GROUP BY fvi.country_id, fvi.vaccine_id, d.disease_id
)
SELECT 
    c.country_name,
    v.vaccine_description,
    d.disease_description,
    pre.avg_cases_before,
    post.avg_cases_after,
    ((pre.avg_cases_before - post.avg_cases_after) / NULLIF(pre.avg_cases_before, 0) * 100) as reduction_percentage
FROM pre_intro pre
JOIN post_intro post ON pre.country_id = post.country_id 
    AND pre.vaccine_id = post.vaccine_id 
    AND pre.disease_id = post.disease_id
JOIN dim_countries c ON pre.country_id = c.country_id
JOIN dim_vaccines v ON pre.vaccine_id = v.vaccine_id
JOIN dim_diseases d ON pre.disease_id = d.disease_id
WHERE pre.avg_cases_before > 0
ORDER BY reduction_percentage DESC;

-- Q2: Target population coverage by vaccine
SELECT 
    v.vaccine_description,
    c.who_region,
    t.year,
    SUM(fc.target_number) as total_target,
    SUM(fc.doses_administered) as total_doses,
    AVG(fc.coverage_percentage) as avg_coverage,
    (SUM(fc.doses_administered) / NULLIF(SUM(fc.target_number), 0) * 100) as actual_coverage_rate
FROM fact_coverage fc
JOIN dim_vaccines v ON fc.vaccine_id = v.vaccine_id
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_time t ON fc.time_id = t.time_id
WHERE t.year >= 2020
GROUP BY v.vaccine_description, c.who_region, t.year
ORDER BY t.year DESC, actual_coverage_rate DESC;

-- Q3: Regional disparities in vaccine introduction timelines
SELECT 
    c.who_region,
    v.vaccine_description,
    MIN(t.year) as first_introduction,
    MAX(t.year) as latest_introduction,
    (MAX(t.year) - MIN(t.year)) as introduction_gap_years,
    COUNT(DISTINCT c.country_id) as countries_introduced
FROM fact_vaccine_introduction fvi
JOIN dim_countries c ON fvi.country_id = c.country_id
JOIN dim_vaccines v ON fvi.vaccine_id = v.vaccine_id
JOIN dim_time t ON fvi.time_id = t.time_id
WHERE fvi.intro_status = 'Yes'
GROUP BY c.who_region, v.vaccine_description
HAVING COUNT(DISTINCT c.country_id) > 5
ORDER BY introduction_gap_years DESC, c.who_region;

-- Q4: Coverage gaps for high-priority diseases
SELECT 
    d.disease_description,
    c.who_region,
    COUNT(DISTINCT c.country_id) as total_countries,
    COUNT(DISTINCT CASE WHEN fc.coverage_percentage >= 80 THEN c.country_id END) as high_coverage_countries,
    COUNT(DISTINCT CASE WHEN fc.coverage_percentage < 50 THEN c.country_id END) as low_coverage_countries,
    AVG(fc.coverage_percentage) as avg_coverage,
    AVG(fi.incidence_rate) as avg_incidence
FROM dim_diseases d
JOIN fact_incidence fi ON d.disease_id = fi.disease_id
JOIN dim_countries c ON fi.country_id = c.country_id
JOIN dim_time t ON fi.time_id = t.time_id
LEFT JOIN dim_vaccines v ON LOWER(v.vaccine_description) LIKE CONCAT('%', LOWER(d.disease_code), '%')
LEFT JOIN fact_coverage fc ON fc.vaccine_id = v.vaccine_id 
    AND fc.country_id = c.country_id 
    AND fc.time_id = t.time_id
WHERE t.year >= 2020
    AND d.disease_description IN ('Tuberculosis', 'Hepatitis B', 'Measles', 'Polio', 'Tetanus')
GROUP BY d.disease_description, c.who_region
ORDER BY avg_coverage ASC, avg_incidence DESC;

-- Q5: Geographic disease prevalence patterns
SELECT 
    c.who_region,
    c.country_name,
    d.disease_description,
    AVG(fi.incidence_rate) as avg_incidence,
    SUM(fca.reported_cases) as total_cases,
    AVG(fc.coverage_percentage) as avg_vaccination_coverage,
    RANK() OVER (PARTITION BY d.disease_description ORDER BY AVG(fi.incidence_rate) DESC) as disease_rank
FROM fact_incidence fi
JOIN dim_countries c ON fi.country_id = c.country_id
JOIN dim_diseases d ON fi.disease_id = d.disease_id
JOIN dim_time t ON fi.time_id = t.time_id
LEFT JOIN fact_cases fca ON fca.country_id = fi.country_id 
    AND fca.disease_id = fi.disease_id 
    AND fca.time_id = t.time_id
LEFT JOIN dim_vaccines v ON LOWER(v.vaccine_description) LIKE CONCAT('%', LOWER(d.disease_code), '%')
LEFT JOIN fact_coverage fc ON fc.vaccine_id = v.vaccine_id 
    AND fc.country_id = c.country_id 
    AND fc.time_id = t.time_id
WHERE t.year >= 2018
GROUP BY c.who_region, c.country_name, d.disease_description
HAVING avg_incidence > 0
ORDER BY d.disease_description, disease_rank;

-- =====================================================
-- SCENARIO-BASED QUERIES
-- =====================================================

-- Scenario 1: Identify low-coverage regions for resource allocation
SELECT 
    c.who_region,
    c.country_name,
    AVG(fc.coverage_percentage) as avg_coverage,
    SUM(fc.target_number) as total_target_population,
    SUM(fc.target_number - fc.doses_administered) as unvaccinated_population,
    COUNT(DISTINCT fc.vaccine_id) as vaccine_types
FROM fact_coverage fc
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_time t ON fc.time_id = t.time_id
WHERE t.year >= 2022
GROUP BY c.who_region, c.country_name
HAVING avg_coverage < 60
ORDER BY unvaccinated_population DESC, avg_coverage ASC
LIMIT 50;

-- Scenario 2: Evaluate measles vaccination campaign effectiveness
WITH baseline AS (
    SELECT 
        c.country_name,
        AVG(fca.reported_cases) as avg_cases_before,
        AVG(fc.coverage_percentage) as avg_coverage_before
    FROM fact_cases fca
    JOIN dim_countries c ON fca.country_id = c.country_id
    JOIN dim_diseases d ON fca.disease_id = d.disease_id
    JOIN dim_time t ON fca.time_id = t.time_id
    LEFT JOIN dim_vaccines v ON LOWER(v.vaccine_description) LIKE '%measles%'
    LEFT JOIN fact_coverage fc ON fc.vaccine_id = v.vaccine_id 
        AND fc.country_id = c.country_id 
        AND fc.time_id = t.time_id
    WHERE d.disease_description LIKE '%Measles%'
        AND t.year BETWEEN 2015 AND 2019
    GROUP BY c.country_name
),
current AS (
    SELECT 
        c.country_name,
        AVG(fca.reported_cases) as avg_cases_after,
        AVG(fc.coverage_percentage) as avg_coverage_after
    FROM fact_cases fca
    JOIN dim_countries c ON fca.country_id = c.country_id
    JOIN dim_diseases d ON fca.disease_id = d.disease_id
    JOIN dim_time t ON fca.time_id = t.time_id
    LEFT JOIN dim_vaccines v ON LOWER(v.vaccine_description) LIKE '%measles%'
    LEFT JOIN fact_coverage fc ON fc.vaccine_id = v.vaccine_id 
        AND fc.country_id = c.country_id 
        AND fc.time_id = t.time_id
    WHERE d.disease_description LIKE '%Measles%'
        AND t.year BETWEEN 2020 AND 2024
    GROUP BY c.country_name
)
SELECT 
    b.country_name,
    b.avg_cases_before,
    c.avg_cases_after,
    ((b.avg_cases_before - c.avg_cases_after) / NULLIF(b.avg_cases_before, 0) * 100) as case_reduction_pct,
    b.avg_coverage_before,
    c.avg_coverage_after,
    (c.avg_coverage_after - b.avg_coverage_before) as coverage_improvement,
    CASE 
        WHEN ((b.avg_cases_before - c.avg_cases_after) / NULLIF(b.avg_cases_before, 0) * 100) > 50 
            AND (c.avg_coverage_after - b.avg_coverage_before) > 10 
        THEN 'Highly Effective'
        WHEN ((b.avg_cases_before - c.avg_cases_after) / NULLIF(b.avg_cases_before, 0) * 100) > 25 
        THEN 'Moderately Effective'
        ELSE 'Needs Improvement'
    END as campaign_effectiveness
FROM baseline b
JOIN current c ON b.country_name = c.country_name
WHERE b.avg_cases_before > 0
ORDER BY case_reduction_pct DESC;

-- Scenario 3: Vaccine demand forecasting
SELECT 
    v.vaccine_description,
    c.who_region,
    AVG(fc.target_number) as avg_target_last_3yrs,
    AVG(fc.doses_administered) as avg_doses_last_3yrs,
    AVG(fc.coverage_percentage) as avg_coverage_last_3yrs,
    -- Forecast next year demand (assuming 5% population growth)
    ROUND(AVG(fc.target_number) * 1.05) as forecasted_target_2025,
    -- Forecast doses needed to achieve 95% coverage
    ROUND(AVG(fc.target_number) * 1.05 * 0.95) as doses_needed_95pct_target
FROM fact_coverage fc
JOIN dim_vaccines v ON fc.vaccine_id = v.vaccine_id
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_time t ON fc.time_id = t.time_id
WHERE t.year BETWEEN 2021 AND 2023
GROUP BY v.vaccine_description, c.who_region
ORDER BY forecasted_target_2025 DESC;

-- Scenario 4: WHO 95% measles coverage target tracking
SELECT 
    c.country_name,
    c.who_region,
    t.year,
    AVG(fc.coverage_percentage) as current_coverage,
    95 - AVG(fc.coverage_percentage) as gap_to_target,
    CASE 
        WHEN AVG(fc.coverage_percentage) >= 95 THEN 'Target Achieved'
        WHEN AVG(fc.coverage_percentage) >= 90 THEN 'Close to Target'
        WHEN AVG(fc.coverage_percentage) >= 80 THEN 'On Track'
        ELSE 'Needs Urgent Action'
    END as status,
    SUM(fc.target_number) as target_population,
    SUM(fc.target_number) * (95 - AVG(fc.coverage_percentage)) / 100 as additional_vaccinations_needed
FROM fact_coverage fc
JOIN dim_countries c ON fc.country_id = c.country_id
JOIN dim_vaccines v ON fc.vaccine_id = v.vaccine_id
JOIN dim_time t ON fc.time_id = t.time_id
WHERE v.vaccine_description LIKE '%Measles%'
    AND t.year >= 2020
GROUP BY c.country_name, c.who_region, t.year
ORDER BY t.year DESC, gap_to_target DESC;

-- =====================================================
-- POWER BI DAX MEASURES (To be created in Power BI)
-- =====================================================

/*
-- Coverage Rate (%)
Coverage Rate = 
DIVIDE(
    SUM(fact_coverage[doses_administered]),
    SUM(fact_coverage[target_number]),
    0
) * 100

-- Year-over-Year Growth
YoY Coverage Growth = 
VAR CurrentYearCoverage = [Coverage Rate]
VAR PreviousYearCoverage = 
    CALCULATE(
        [Coverage Rate],
        DATEADD(dim_time[year], -1, YEAR)
    )
RETURN
    DIVIDE(
        CurrentYearCoverage - PreviousYearCoverage,
        PreviousYearCoverage,
        0
    ) * 100

-- Disease Burden Index
Disease Burden Index = 
    SUM(fact_incidence[incidence_rate]) * 
    SUM(fact_cases[reported_cases]) / 1000

-- Vaccination Effectiveness Score
Vaccination Effectiveness = 
VAR Coverage = [Coverage Rate]
VAR CaseReduction = 
    DIVIDE(
        [Cases Previous Year] - [Cases Current Year],
        [Cases Previous Year],
        0
    )
RETURN
    (Coverage * 0.5) + (CaseReduction * 100 * 0.5)
*/