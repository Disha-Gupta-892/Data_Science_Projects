# ==========================================================
# FULL EDA: Mental Health in Tech Workplace
# Author: Senior Data Scientist
# ==========================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# ----------------------------------------------------------
# Configuration
# ----------------------------------------------------------
plt.style.use("seaborn-v0_8")
sns.set_palette("Set2")
pd.set_option("display.max_columns", None)

# ----------------------------------------------------------
# Load Dataset
# ----------------------------------------------------------
df = pd.read_csv("survey.csv")
print("Initial Shape:", df.shape)

# ----------------------------------------------------------
# Drop Irrelevant Columns
# ----------------------------------------------------------
df.drop(columns=["comments", "Timestamp"], inplace=True, errors="ignore")

# ----------------------------------------------------------
# Clean Age
# ----------------------------------------------------------
df = df[(df["Age"] >= 18) & (df["Age"] <= 65)]

# ----------------------------------------------------------
# Clean Gender
# ----------------------------------------------------------
def clean_gender(g):
    g = str(g).lower()
    if g in ["male", "m", "man", "cis male", "male-ish"]:
        return "Male"
    elif g in ["female", "f", "woman", "cis female", "female-ish"]:
        return "Female"
    else:
        return "Other"

df["Gender"] = df["Gender"].apply(clean_gender)

# ----------------------------------------------------------
# Handle Missing Values
# ----------------------------------------------------------
for col in df.columns:
    if df[col].dtype == "object":
        df[col].fillna("Unknown", inplace=True)
    elif df[col].dtype in ['int64', 'float64']:
        df[col].fillna(df[col].median(), inplace=True)

print("Cleaned Shape:", df.shape)

# ==========================================================
# 1. TREATMENT PREVALENCE
# ==========================================================
plt.figure(figsize=(8, 6))
ax = sns.countplot(x="treatment", data=df, hue="treatment", palette="Set2", legend=False)
plt.title("Have Employees Sought Mental Health Treatment?", fontsize=16, fontweight='bold')
plt.xlabel("Treatment Sought", fontsize=14)
plt.ylabel("Number of Employees", fontsize=14)

# Add value labels on bars
for p in ax.patches:
    ax.annotate(f'{int(p.get_height())}', 
                (p.get_x() + p.get_width() / 2., p.get_height()), 
                ha='center', va='bottom', fontsize=12, fontweight='bold')

plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('treatment_prevalence.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 2. FAMILY HISTORY vs TREATMENT
# ==========================================================
plt.figure(figsize=(10, 6))
pd.crosstab(
    df["family_history"],
    df["treatment"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Family History vs Treatment Seeking", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Family History of Mental Health Issues", fontsize=14)
plt.legend(title="Treatment Sought", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=0, ha='center')
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('family_history_treatment.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 3. WORK INTERFERENCE DUE TO MENTAL HEALTH
# ==========================================================
plt.figure(figsize=(10, 8))
ax = sns.countplot(
    y="work_interfere",
    data=df,
    order=df["work_interfere"].value_counts().index,
    hue="work_interfere",
    palette="Set2",
    legend=False
)
plt.title("Mental Health Interference with Work", fontsize=16, fontweight='bold')
plt.xlabel("Number of Employees", fontsize=14)
plt.ylabel("Level of Interference", fontsize=14)

# Add value labels
for p in ax.patches:
    width = p.get_width()
    plt.text(width + 5, p.get_y() + p.get_height()/2, f'{int(width)}', 
             ha='left', va='center', fontsize=12, fontweight='bold')

plt.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.savefig('work_interference.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 4. COMPANY SIZE vs TREATMENT
# ==========================================================
plt.figure(figsize=(14, 8))
pd.crosstab(
    df["no_employees"],
    df["treatment"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Company Size vs Mental Health Treatment Seeking", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Company Size (Number of Employees)", fontsize=14)
plt.legend(title="Treatment Sought", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45, ha='right', fontsize=12)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('company_size_treatment.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 5. EMPLOYER BENEFITS vs SEEKING HELP
# ==========================================================
plt.figure(figsize=(12, 8))
pd.crosstab(
    df["benefits"],
    df["seek_help"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Employer Benefits vs Seeking Help for Mental Health", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Employer Mental Health Benefits", fontsize=14)
plt.legend(title="Seeking Help", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45, ha='right', fontsize=12)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('benefits_seek_help.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 6. ANONYMITY vs FEAR OF CONSEQUENCES
# ==========================================================
plt.figure(figsize=(12, 8))
pd.crosstab(
    df["anonymity"],
    df["mental_health_consequence"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Workplace Anonymity vs Fear of Mental Health Consequences", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Perceived Anonymity at Work", fontsize=14)
plt.legend(title="Fear of Consequences", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45, ha='right', fontsize=12)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('anonymity_consequence.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 7. TECH COMPANY vs NON-TECH COMPANY
# ==========================================================
plt.figure(figsize=(10, 6))
pd.crosstab(
    df["tech_company"],
    df["treatment"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Tech vs Non-Tech Companies: Mental Health Treatment", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Company Type", fontsize=14)
plt.legend(title="Treatment Sought", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=0, ha='center', fontsize=12)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('tech_company_treatment.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 8. REMOTE WORK vs WORK INTERFERENCE
# ==========================================================
plt.figure(figsize=(12, 8))
pd.crosstab(
    df["remote_work"],
    df["work_interfere"],
    normalize="index"
).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
plt.title("Remote Work vs Mental Health Interference", fontsize=16, fontweight='bold')
plt.ylabel("Percentage of Employees", fontsize=14)
plt.xlabel("Remote Work Arrangement", fontsize=14)
plt.legend(title="Interference Level", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45, ha='right', fontsize=12)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('remote_work_interference.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 9. DISCUSSION COMFORT: COWORKERS & SUPERVISOR
# ==========================================================
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

sns.countplot(x="coworkers", data=df, ax=axes[0], hue="coworkers", palette="Set2", legend=False)
axes[0].set_title("Comfort Discussing Mental Health with Coworkers", fontsize=14, fontweight='bold')
axes[0].set_xlabel("Comfort Level", fontsize=12)
axes[0].set_ylabel("Number of Employees", fontsize=12)
axes[0].tick_params(axis='x', rotation=45, labelsize=10)

sns.countplot(x="supervisor", data=df, ax=axes[1], hue="supervisor", palette="Set2", legend=False)
axes[1].set_title("Comfort Discussing Mental Health with Supervisor", fontsize=14, fontweight='bold')
axes[1].set_xlabel("Comfort Level", fontsize=12)
axes[1].set_ylabel("Number of Employees", fontsize=12)
axes[1].tick_params(axis='x', rotation=45, labelsize=10)

plt.suptitle("Comfort Levels for Mental Health Discussions at Work", fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('discussion_comfort.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 10. MENTAL vs PHYSICAL HEALTH SERIOUSNESS
# ==========================================================
plt.figure(figsize=(12, 8))
ax = sns.countplot(x="mental_vs_physical", data=df, hue="mental_vs_physical", palette="Set2", legend=False)
plt.title("Is Mental Health Taken as Seriously as Physical Health?", fontsize=16, fontweight='bold')
plt.xlabel("Employee Response", fontsize=14)
plt.ylabel("Number of Employees", fontsize=14)
plt.xticks(rotation=45, ha='right', fontsize=12)

# Add value labels
for p in ax.patches:
    ax.annotate(f'{int(p.get_height())}', 
                (p.get_x() + p.get_width() / 2., p.get_height()), 
                ha='center', va='bottom', fontsize=12, fontweight='bold')

plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('mental_vs_physical.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 11. OBSERVED NEGATIVE CONSEQUENCES
# ==========================================================
plt.figure(figsize=(10, 6))
ax = sns.countplot(x="obs_consequence", data=df, hue="obs_consequence", palette="Set2", legend=False)
plt.title("Observed Negative Consequences of Mental Health Disclosure", fontsize=16, fontweight='bold')
plt.xlabel("Observed Consequences", fontsize=14)
plt.ylabel("Number of Employees", fontsize=14)

# Add value labels
for p in ax.patches:
    ax.annotate(f'{int(p.get_height())}', 
                (p.get_x() + p.get_width() / 2., p.get_height()), 
                ha='center', va='bottom', fontsize=12, fontweight='bold')

plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('observed_consequences.png', dpi=300, bbox_inches='tight')
plt.close()

# ==========================================================
# 12. STRONGEST EDA-LEVEL PREDICTORS OF TREATMENT
# ==========================================================
key_features = [
    "family_history",
    "work_interfere",
    "benefits",
    "care_options",
    "anonymity",
    "mental_health_consequence"
]

for feature in key_features:
    plt.figure(figsize=(10, 6))
    pd.crosstab(
        df[feature],
        df["treatment"],
        normalize="index"
    ).plot(kind="bar", stacked=True, ax=plt.gca(), colormap="Set2")
    plt.title(f"{feature.replace('_', ' ').title()} vs Treatment Seeking", fontsize=14, fontweight='bold')
    plt.ylabel("Percentage of Employees", fontsize=12)
    plt.xlabel(f"{feature.replace('_', ' ').title()}", fontsize=12)
    plt.legend(title="Treatment Sought", bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.xticks(rotation=45, ha='right', fontsize=10)
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.savefig(f'{feature}_treatment.png', dpi=300, bbox_inches='tight')
    plt.close()

# ==========================================================
# Save Cleaned Dataset
# ==========================================================
df.to_csv("cleaned_mental_health_survey.csv", index=False)
print("EDA Complete | Cleaned data saved")
