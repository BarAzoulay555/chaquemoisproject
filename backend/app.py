from flask import Flask
from flask_cors import CORS
from backend.routes.main_routes import main_bp

# יצירת אפליקציית Flask
app = Flask(__name__)

# לאפשר CORS לכל נתיבי ה-API
CORS(app, resources={r"/api/*": {"origins": "*"}})

# רישום ה-Blueprint של הראוטים
app.register_blueprint(main_bp)

# נתיב בדיקת חיים
@app.route("/api/health", methods=["GET"])
def health_check():
    return {"status": "✅ השרת פועל תקין"}

# הרצת השרת
if __name__ == "__main__":
    app.run(debug=True)
