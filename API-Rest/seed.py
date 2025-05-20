from app import app, db, User, Medicine, bcrypt

with app.app_context():

    # Crear la base de datos
    db.create_all()

    # Eliminar registros existentes
    User.query.delete()
    Medicine.query.delete()
    db.session.commit()
    
    # Crear usuarios con contraseña hasheada y decodificada a string
    admin = User(username='admin', password=bcrypt.generate_password_hash('admin123').decode('utf-8'), role='admin')
    worker = User(username='worker', password=bcrypt.generate_password_hash('worker123').decode('utf-8'), role='worker')

    # Crear medicinas
    med1 = Medicine(name='Paracetamol', category='Analgesico', quantity=100, expiration_date='2025-12-31')
    med2 = Medicine(name='Ibuprofeno', category='Antiinflamatorio', quantity=50, expiration_date='2024-11-30')
    med3 = Medicine(name='Naproxeno', category='Antiinflamatorio', quantity=80, expiration_date='2026-01-15')
    med4 = Medicine(name='Ketorolaco', category='Analgesico', quantity=120, expiration_date='2025-08-20')
    med5 = Medicine(name='Diclofenaco', category='Antiinflamatorio', quantity=60, expiration_date='2024-09-10')
    med6 = Medicine(name='Metamizol', category='Analgesico', quantity=200, expiration_date='2026-05-30')
    med7 = Medicine(name='Ácido mefenámico', category='Antiinflamatorio', quantity=75, expiration_date='2025-03-22')
    med8 = Medicine(name='Tramadol', category='Analgesico', quantity=40, expiration_date='2025-12-01')
    med9 = Medicine(name='Meloxicam', category='Antiinflamatorio', quantity=90, expiration_date='2024-10-05')
    med10 = Medicine(name='Codeína', category='Analgesico', quantity=55, expiration_date='2025-07-11')
    med11 = Medicine(name='Indometacina', category='Antiinflamatorio', quantity=100, expiration_date='2025-02-18')
    med12 = Medicine(name='Morfina', category='Analgesico', quantity=30, expiration_date='2026-04-08')
    med13 = Medicine(name='Piroxicam', category='Antiinflamatorio', quantity=70, expiration_date='2024-12-31')
    med14 = Medicine(name='Oxicodona', category='Analgesico', quantity=25, expiration_date='2025-06-14')
    med15 = Medicine(name='Sulindaco', category='Antiinflamatorio', quantity=65, expiration_date='2026-03-27')
    med16 = Medicine(name='Fentanilo', category='Analgesico', quantity=35, expiration_date='2026-01-10')
    med17 = Medicine(name='Etodolaco', category='Antiinflamatorio', quantity=50, expiration_date='2025-09-09')
    med18 = Medicine(name='Buprenorfina', category='Analgesico', quantity=45, expiration_date='2024-11-12')
    med19 = Medicine(name='Celecoxib', category='Antiinflamatorio', quantity=85, expiration_date='2025-10-19')
    med20 = Medicine(name='Tapentadol', category='Analgesico', quantity=20, expiration_date='2025-08-04')
    med21 = Medicine(name='Ketoprofeno', category='Antiinflamatorio', quantity=95, expiration_date='2026-06-01')
    med22 = Medicine(name='Petidina', category='Analgesico', quantity=60, expiration_date='2026-07-20')

    db.session.add_all([
        admin, worker, med1, med2, med3, med4, med5, med6, med7, med8, med9, med10,
        med11, med12, med13, med14, med15, med16, med17, med18, med19,
        med20, med21, med22
    ])

    db.session.commit()

    print("Base de datos actualizada.")
