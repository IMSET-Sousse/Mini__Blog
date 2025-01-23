from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

app = Flask(__name__)
@app.route('/')
def home():
    return "Welcome to the Mini Blog!"
if __name__ == '__main__':
    app.run(debug=True)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/miniblog'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Changez ceci pour une clé secrète sécurisée
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id
        }

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur enregistré avec succès'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Nom d\'utilisateur ou mot de passe incorrect'}), 401

@app.route('/api/articles', methods=['GET'])
def get_articles():
    articles = Article.query.order_by(Article.created_at.desc()).all()
    return jsonify([article.to_dict() for article in articles])

@app.route('/api/articles/<int:id>', methods=['GET'])
def get_article(id):
    article = Article.query.get_or_404(id)
    return jsonify(article.to_dict())

@app.route('/api/articles', methods=['POST'])
@jwt_required()
def add_article():
    data = request.json
    user_id = get_jwt_identity()
    new_article = Article(title=data['title'], content=data['content'], user_id=user_id)
    db.session.add(new_article)
    db.session.commit()
    return jsonify(new_article.to_dict()), 201

@app.route('/api/articles/<int:id>', methods=['PUT'])
@jwt_required()
def update_article(id):
    article = Article.query.get_or_404(id)
    if article.user_id != get_jwt_identity():
        return jsonify({'message': 'Non autorisé'}), 403
    data = request.json
    article.title = data['title']
    article.content = data['content']
    db.session.commit()
    return jsonify(article.to_dict())

@app.route('/api/articles/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_article(id):
    article = Article.query.get_or_404(id)
    if article.user_id != get_jwt_identity():
        return jsonify({'message': 'Non autorisé'}), 403
    db.session.delete(article)
    db.session.commit()
    return jsonify({'message': 'Article supprimé avec succès'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)