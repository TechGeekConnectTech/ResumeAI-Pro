import os

# Create uploads directory
os.makedirs("uploads/resumes", exist_ok=True)
print("Created uploads directory")

# Create services directory
os.makedirs("app/services", exist_ok=True)
print("Created services directory")

print("Directory structure setup completed!")