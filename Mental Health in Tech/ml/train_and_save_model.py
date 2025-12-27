import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load cleaned data
df = pd.read_csv("cleaned_mental_health_survey.csv")

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

# Encode categorical data
encoders = {}
for col in df.columns:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col])
    encoders[col] = encoder

X = df.drop(target, axis=1)
y = df[target]

# Train model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=8,
    random_state=42
)
model.fit(X, y)

# Save model & encoders
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(encoders, open("encoders.pkl", "wb"))

print("✅ Model and encoders saved successfully")
