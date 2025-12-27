import streamlit as st
import pickle
import pandas as pd

# Load model and encoders
model = pickle.load(open("model.pkl", "rb"))
encoders = pickle.load(open("encoders.pkl", "rb"))

# App Title
st.set_page_config(page_title="Mental Health Predictor", layout="centered")
st.title("🧠 Mental Health Treatment Prediction App")
st.markdown(
    "Predict whether an employee is likely to seek **mental health treatment** based on workplace factors."
)

# Sidebar Inputs
st.sidebar.header("Employee Details")

Gender = st.sidebar.selectbox("Gender", ["Male", "Female", "Other"])
family_history = st.sidebar.selectbox("Family History of Mental Illness", ["Yes", "No"])
work_interfere = st.sidebar.selectbox(
    "Mental Health Interferes with Work",
    ["Never", "Rarely", "Sometimes", "Often"]
)
benefits = st.sidebar.selectbox("Employer Provides Mental Health Benefits", ["Yes", "No", "Don't know"])
care_options = st.sidebar.selectbox("Aware of Care Options", ["Yes", "No", "Not sure"])
seek_help = st.sidebar.selectbox("Employer Encourages Seeking Help", ["Yes", "No", "Don't know"])
anonymity = st.sidebar.selectbox("Anonymity Protected", ["Yes", "No", "Don't know"])
mental_health_consequence = st.sidebar.selectbox(
    "Fear of Negative Consequences", ["Yes", "No", "Maybe"]
)
coworkers = st.sidebar.selectbox(
    "Comfort Discussing with Coworkers", ["Yes", "No", "Some of them"]
)
supervisor = st.sidebar.selectbox(
    "Comfort Discussing with Supervisor", ["Yes", "No", "Some of them"]
)

# Input DataFrame
input_data = pd.DataFrame([[
    Gender,
    family_history,
    work_interfere,
    benefits,
    care_options,
    seek_help,
    anonymity,
    mental_health_consequence,
    coworkers,
    supervisor
]], columns=[
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
])

# Encode inputs
encoded_data = []
for col in input_data.columns:
    encoded_value = encoders[col].transform([input_data[col].iloc[0]])[0]
    encoded_data.append(encoded_value)

input_data_encoded = pd.DataFrame([encoded_data], columns=input_data.columns)

# Prediction
if st.button("🔍 Predict Treatment Likelihood"):
    prediction = model.predict(input_data_encoded)[0]

    if prediction == 1:
        st.success("✅ Likely to seek mental health treatment")
    else:
        st.warning("⚠️ Unlikely to seek mental health treatment")

    st.markdown("---")
    st.caption("⚖️ This prediction is based on historical survey data and should not replace professional advice.")
