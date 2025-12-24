import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

def load_data(file_path):
    """Load NSL-KDD dataset CSV"""
    df = pd.read_csv(file_path)
    return df

def preprocess_data(df):
    """Encode categorical features and scale numerical features"""
    cat_cols = df.select_dtypes(include=['object']).columns
    num_cols = df.select_dtypes(include=['int64', 'float64']).columns

    # Label encode categorical columns
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])

    # Standardize numerical columns
    scaler = StandardScaler()
    df[num_cols] = scaler.fit_transform(df[num_cols])

    return df

if __name__ == "__main__":
    df = load_data("data/raw/nslkdd.csv")
    df_processed = preprocess_data(df)
    df_processed.to_csv("data/processed/nslkdd_processed.csv", index=False)
    print("Preprocessing completed, saved to data/processed/nslkdd_processed.csv")
