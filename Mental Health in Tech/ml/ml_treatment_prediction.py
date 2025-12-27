# ============================================
# Mental Health Treatment Prediction - ML Model
# ============================================

import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

# -------------------------------
# Load Cleaned Data
# -------------------------------
df = pd.read_csv("cleaned_mental_health_survey.csv")

# -------------------------------
# Select Relevant Features
# -------------------------------
features = [
    "Gender",
    "family_history",
    "work_interfere",
    "benefits",
    "care_options",
    "seek_help",
    "anonymity",
    "mental_health_consequence",
    "coworkers",
    "supervisor"
]

target = "treatment"

df = df[features + [target]]

# -------------------------------
# Encode Categorical Variables
# -------------------------------
encoders = {}
for col in df.columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Note: Target 'treatment' is encoded as 0='No', 1='Yes'

# -------------------------------
# Train-Test Split
# -------------------------------
X = df.drop(target, axis=1)
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# -------------------------------
# Model 1: Logistic Regression
# -------------------------------
log_model = LogisticRegression(max_iter=1000)
log_model.fit(X_train, y_train)

log_preds = log_model.predict(X_test)

print("\n--- Logistic Regression ---")
print("Accuracy:", accuracy_score(y_test, log_preds))
print("Confusion Matrix:\n", confusion_matrix(y_test, log_preds))
print(classification_report(y_test, log_preds))

# -------------------------------
# Model 2: Random Forest
# -------------------------------
rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=8,
    random_state=42
)

rf_model.fit(X_train, y_train)
rf_preds = rf_model.predict(X_test)

print("\n--- Random Forest ---")
print("Accuracy:", accuracy_score(y_test, rf_preds))
print("Confusion Matrix:\n", confusion_matrix(y_test, rf_preds))
print(classification_report(y_test, rf_preds))

# -------------------------------
# Feature Importance
# -------------------------------
importance = pd.Series(
    rf_model.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print("\nFeature Importance:")
print(importance)
