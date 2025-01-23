from flask import Blueprint, request, jsonify
from models import db, Article

api_routes = Blueprint('api', __name__)

@api_routes.route('/articles', methods=['GET'])
def get_articles():
    articles = Article.query.all()
    return jsonify([{"id": a.id, "title": a.title, "content": a.content} for a in articles])

@api_routes.route('/articles/<int:id>', methods=['GET'])
def get_article(id):
    article = Article.query.get_or_404(id)
    return jsonify({"id": article.id, "title": article.title, "content": article.content})

@api_routes.route('/articles', methods=['POST'])
def add_article():
    data = request.get_json()
    new_article = Article(title=data['title'], content=data['content'])
    db.session.add(new_article)
    db.session.commit()
    return jsonify({"message": "Article created successfully!"}), 201
