# 🧠 Mental Health in Tech — EDA, ML & Predictive Web App

An end-to-end **data science and machine learning project** that analyzes mental health trends in the tech industry, identifies key workplace factors influencing mental health treatment, and deploys a **live predictive web application** using Streamlit.

This project transforms raw survey data into **actionable insights, predictive intelligence, and a real-world decision-support tool**.

---

## 🚀 What This Project Does

✔️ Cleans and preprocesses real-world survey data
✔️ Performs **deep Exploratory Data Analysis (EDA)**
✔️ Answers critical people-analytics questions
✔️ Identifies key drivers of mental health treatment
✔️ Trains a **machine learning classification model**
✔️ Deploys a **Streamlit web app** for live predictions

In short:
**Raw Data → Insights → Prediction → Deployed App**

---

## 🧠 Business & Research Questions Answered

This project explicitly answers:

* What percentage of tech employees seek mental health treatment?
* Does **family history** influence treatment decisions?
* Does mental health interfere with work productivity?
* Do **company size** and **remote work** matter?
* Do employer **benefits and anonymity** reduce stigma?
* Are tech companies more supportive than non-tech?
* Are employees comfortable discussing mental health with:

  * Coworkers?
  * Supervisors?
* Is mental health treated as seriously as physical health?
* Which workplace factors are **strongest predictors** of treatment?

---

## 🧩 High-Level System Architecture

1. **Data Ingestion**

   * Mental Health in Tech Survey (2014)
   * 1,200+ real employee responses

2. **Data Cleaning & Feature Engineering**

   * Age normalization
   * Gender standardization
   * Missing value handling
   * Categorical normalization

3. **Exploratory Data Analysis**

   * Univariate analysis
   * Bivariate relationships
   * Workplace culture insights
   * Policy vs behavior analysis

4. **Machine Learning Pipeline**

   * Feature selection
   * Categorical encoding
   * Model training (Random Forest)
   * Model evaluation & feature importance

5. **Deployment**

   * Streamlit-based interactive web app
   * Real-time prediction of treatment likelihood

---

## 📊 Key Insights (Executive Summary)

* A **significant portion of tech employees** have sought mental health treatment.
* Employees with **family history** are far more likely to seek help.
* **Employer-provided benefits and anonymity** strongly reduce fear and stigma.
* Policy presence alone is not enough — **psychological safety matters more**.
* Remote work does not eliminate mental health challenges.
* Supervisor openness plays a critical role in treatment decisions.

---

## 🛠️ Tools & Technologies Used

| Category         | Tools                    |
| ---------------- | ------------------------ |
| Programming      | Python                   |
| Data Analysis    | Pandas, NumPy            |
| Visualization    | Matplotlib, Seaborn      |
| Machine Learning | Scikit-learn             |
| Model Type       | Random Forest Classifier |
| Deployment       | Streamlit                |
| Version Control  | Git & GitHub             |

---

## 📁 Project Structure

```
mental_health_tech/
│
├── survey.csv
├── cleaned_mental_health_survey.csv
│
├── full_mental_health_eda.py        # Complete EDA + all graphs
├── train_and_save_model.py          # ML training & model saving
├── model.pkl                        # Trained ML model
├── encoder.pkl                      # Label encoder
│
├── app.py                           # Streamlit web app
├── requirements.txt
└── README.md
```

---

## 🖥️ Streamlit Web App – Live Prediction

The deployed app allows users to:

* Select workplace and personal factors
* Predict likelihood of seeking mental health treatment
* Understand how workplace culture influences outcomes

### Run Locally

```bash
pip install -r requirements.txt
streamlit run app.py
```

---

## 🧪 Machine Learning Details

* **Problem Type**: Binary Classification
* **Target Variable**: `treatment`
* **Model Used**: Random Forest Classifier
* **Accuracy**: ~78–82% (realistic for behavioral data)

### Top Predictive Features

* Family history
* Work interference
* Employer benefits
* Anonymity protection
* Fear of consequences
* Supervisor openness

---

## 🔒 Ethical Considerations

* No individual-level identification
* No medical diagnosis claims
* Predictions are **supportive, not prescriptive**
* Built with responsible AI principles

> ⚠️ This tool is for educational and analytical purposes only and does not replace professional mental health advice.

---

## 📈 Future Enhancements

* SHAP-based model explainability
* Power BI / Tableau dashboard
* Bias analysis (gender, geography)
* NLP analysis of open-ended comments
* Cloud deployment (Streamlit Cloud / Hugging Face)

---

## 🧪 Ideal Use Cases

* HR & People Analytics teams
* Mental health awareness research
* Data science portfolios
* Responsible AI demonstrations
* Predictive analytics case studies

---

## 👤 Author

**Disha Gupta**

Data Scientist | AI Engineer | People Analytics

Focused on building **ethical, explainable, and deployable AI systems**

---
