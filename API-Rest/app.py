from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS


# Configuración de la aplicación
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medicines.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'tu_clave_secreta'

CORS(app)

# Inicializar la base de datos
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Clase para representar un usuario
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)

# Clase para representar una medicina
class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    expiration_date = db.Column(db.String(10), nullable=False)

@app.route('/')
def home():
    return "API de Medicinas corriendo correctamente."

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({
            'message': 'Login exitoso',
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role
            }
        }), 200
    else:
        return jsonify({'message': 'Credenciales inválidas'}), 401

# Ruta para obtener todos los usuarios
@app.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'username': u.username,
        'role': u.role
    } for u in users])

# Ruta para obtener todas las medicinas
@app.route('/medicines')
def get_medicines():
    medicines = Medicine.query.all()
    return jsonify([{
        'id': m.id,
        'name': m.name,
        'category': m.category,
        'quantity': m.quantity,
        'expiration_date': m.expiration_date
    } for m in medicines])

# Ruta para obtener una medicina por su ID
@app.route('/medicines/<int:id>')
def get_medicine(id):
    medicine = Medicine.query.get_or_404(id)
    return jsonify({
        'id': medicine.id,
        'name': medicine.name,
        'category': medicine.category,
        'quantity': medicine.quantity,
        'expiration_date': medicine.expiration_date
    })

# Ruta para crear una nueva medicina
@app.route('/medicines', methods=['POST'])
def create_medicine():
    data = request.json
    new_medicine = Medicine(
        name=data['name'],
        category=data['category'],
        quantity=data['quantity'],
        expiration_date=data['expiration_date']
    )
    db.session.add(new_medicine)
    db.session.commit()
    return jsonify({'message': 'Medicina creada correctamente'}), 201

# Ruta para actualizar una medicina
@app.route('/medicines/<int:id>', methods=['PUT'])
def update_medicine(id):
    medicine = Medicine.query.get_or_404(id)
    data = request.json
    medicine.name = data.get('name', medicine.name)
    medicine.category = data.get('category', medicine.category)
    medicine.quantity = data.get('quantity', medicine.quantity)
    medicine.expiration_date = data.get('expiration_date', medicine.expiration_date)
    db.session.commit()
    return jsonify({'message': 'Medicina actualizada'})

# Ruta para eliminar una medicina
@app.route('/medicines/<int:id>', methods=['DELETE'])
def delete_medicine(id):
    medicine = Medicine.query.get_or_404(id)
    db.session.delete(medicine)
    db.session.commit()
    return jsonify({'message': 'Medicina eliminada'})

if __name__ == '__main__':
    app.run(debug=True)
    
