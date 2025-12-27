# 🧠 Mental Health in Tech — End-to-End Data Science Project

An end-to-end **data science, machine learning, and deployment project** that analyzes mental health trends in the tech industry, identifies workplace factors influencing treatment-seeking behavior, and deploys a **live predictive web application** using Streamlit.

This project demonstrates the **complete data science lifecycle** — from raw data to insights to production-ready deployment.

---

## 🚀 What This Project Does

✔️ Cleans and preprocesses real-world survey data

✔️ Performs **comprehensive Exploratory Data Analysis (EDA)**

✔️ Answers all key business and research questions

✔️ Builds a **machine learning model** to predict treatment likelihood

✔️ Deploys a **Streamlit web app** for real-time predictions

✔️ Uses **Makefile and run.sh** for reproducible execution

**Pipeline:**
**Raw Data → EDA → Insights → ML → Deployed App**

---

## 🧠 Business & EDA Questions Answered

This project explicitly answers:

1. What is the prevalence of mental health treatment in the tech industry?
2. Does family history influence treatment decisions?
3. Does mental health interfere with work productivity?
4. Does company size affect treatment likelihood?
5. Do employer benefits encourage seeking help?
6. Does anonymity reduce fear of negative consequences?
7. Are tech companies more supportive than non-tech companies?
8. Does remote work reduce mental health interference?
9. Are employees comfortable discussing mental health with:

   * Coworkers?
   * Supervisors?
10. Is mental health treated as seriously as physical health?
11. Which workplace factors are the strongest predictors of treatment?

All answers are supported by **data-driven visualizations**.

---

## 🧩 Project Architecture

```
mental-health-tech-analytics/
│
├── data/
│   ├── survey.csv                          # Raw dataset
│   └── cleaned_mental_health_survey.csv    # Cleaned dataset
│
├── eda/
│   ├── eda_mentalhealth.py                 # Full EDA (all questions)
│   ├── Sample_EDA_Submission_Template.ipynb
│   ├── output.txt
│   └── figures/                            # All generated plots
│       ├── treatment_prevalence.png
│       ├── family_history_treatment.png
│       ├── work_interference.png
│       ├── company_size_treatment.png
│       ├── benefits_seek_help.png
│       ├── anonymity_consequence.png
│       ├── mental_vs_physical.png
│       └── ...
│
├── ml/
│   ├── ml_treatment_prediction.py          # Model experimentation
│   ├── train_and_save_model.py             # Final training script
│   ├── model.pkl                           # Trained model
│   └── encoders.pkl                        # Saved encoders
│
├── app/
│   └── app.py                              # Streamlit web app
│
├── presentation/
│   └── Mental_Health_in_Tech_Survey.pptx   # Stakeholder presentation
│
├── Makefile                                # Command-based automation
├── run.sh                                  # One-click execution
├── requirements.txt
├── README.md
└── .gitignore
```

---

## 📊 Key Insights (Executive Summary)

* A **significant portion** of tech employees have sought mental health treatment.
* Employees with a **family history** are much more likely to seek help.
* **Employer benefits and anonymity** strongly reduce stigma and fear.
* Remote work does not eliminate mental health challenges.
* Supervisor openness has a **major impact** on treatment decisions.
* Mental health is still **not treated as seriously** as physical health in many organizations.

---

## 🤖 Machine Learning Overview

* **Problem Type:** Binary Classification
* **Target Variable:** `treatment`
* **Model Used:** Random Forest Classifier
* **Accuracy:** ~78–82% (realistic for behavioral data)

### Most Important Features

* Family history
* Work interference
* Employer benefits
* Anonymity protection
* Fear of consequences
* Supervisor comfort level

---

## 🌐 Streamlit Web Application

The deployed app allows users to:

* Input workplace and personal factors
* Predict likelihood of seeking mental health treatment
* Interactively explore model behavior

### Run Locally

```bash
streamlit run app/app.py
```

---

## ⚙️ How to Run the Project

### Option 1: Using Makefile (Recommended)

```bash
make setup      # Install dependencies
make eda        # Run full EDA
make train      # Train and save ML model
make app        # Launch Streamlit app
```

### Option 2: One-Click Execution

```bash
chmod +x run.sh
./run.sh
```

---

## 🛠️ Tools & Technologies

| Category         | Tools               |
| ---------------- | ------------------- |
| Programming      | Python              |
| Data Analysis    | Pandas, NumPy       |
| Visualization    | Matplotlib, Seaborn |
| Machine Learning | Scikit-learn        |
| Deployment       | Streamlit           |
| Automation       | Makefile, Bash      |
| Version Control  | Git, GitHub         |

---

## 🔒 Ethical Considerations

* No personal identification
* No medical diagnosis claims
* Predictions are **decision-support only**
* Built using responsible AI principles

> ⚠️ This project is for educational and analytical purposes only and does not replace professional mental health advice.

---

## 📈 Future Enhancements

* SHAP-based explainability
* Bias and fairness analysis
* Statistical hypothesis testing (chi-square)
* Power BI / Tableau dashboard
* Cloud deployment (Streamlit Cloud / Hugging Face)

---

## 👤 Author

**Disha**

Data Scientist | AI Engineer | People Analytics

Focused on building **ethical, deployable, and insight-driven AI systems**

---
