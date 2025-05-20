import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicineList.css';
import logo from '../assets/logo.png';
import iconUsers from '../assets/icon-users.png';
import iconOrders from '../assets/icon-orders.png';
import iconMed from '../assets/icon-med.png';

export default function MedicineCatalog() {
  const [medicines, setMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    quantity: '',
    expiration_date: ''
  });


  useEffect(() => {
    axios.get('http://localhost:5000/medicines')
      .then(response => setMedicines(response.data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;


  // Extraer las categorías únicas
  const categories = ['Todas', ...new Set(medicines.map(med => med.category))];

  // Filtrar medicinas según categoría
  const filteredMedicines = selectedCategory === 'Todas'
    ? medicines
    : medicines.filter(med => med.category === selectedCategory);

  const handleEditClick = (medicine) => {
  setSelectedMedicine(medicine);
  setShowEditForm(true);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setSelectedMedicine({ ...selectedMedicine, [name]: value });
};

const handleEditSubmit = () => {
  axios.put(`http://localhost:5000/medicines/${selectedMedicine.id}`, selectedMedicine)
    .then(() => {
      setShowEditForm(false);
      setSelectedMedicine(null);
      // Refrescar la lista
      return axios.get('http://localhost:5000/medicines');
    })
    .then(response => setMedicines(response.data))
    .catch(error => console.error('Error al editar:', error));
};

const handleDeleteClick = (id) => {
  setConfirmDeleteId(id);
};

const confirmDelete = () => {
  axios.delete(`http://localhost:5000/medicines/${confirmDeleteId}`)
    .then(() => {
      setConfirmDeleteId(null);
      // Refrescar la lista
      return axios.get('http://localhost:5000/medicines');
    })
    .then(response => setMedicines(response.data))
    .catch(error => console.error('Error al eliminar:', error));
};

const cancelDelete = () => {
  setConfirmDeleteId(null);
};

const handleAddChange = (e) => {
  const { name, value } = e.target;
  setNewMedicine({ ...newMedicine, [name]: value });
};

const handleAddSubmit = () => {
  axios.post('http://localhost:5000/medicines', newMedicine)
    .then(() => {
      setShowAddForm(false);
      setNewMedicine({ name: '', category: '', quantity: '', expiration_date: '' });
      return axios.get('http://localhost:5000/medicines');
    })
    .then(response => setMedicines(response.data))
    .catch(error => console.error('Error al añadir medicina:', error));
};



  return (
    <div className="page" style={{width: '100vw'}}>
      
      {/* Navbar */}
      <header className="navbar">
        <div className="brand">
            <img className='logo' src={logo} alt="Logo" />
            <b>Sistema de Inventario</b>
        </div>
        <nav className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Catálogo</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      {/* Sección bienvenida */}
      <section className="section">
        <h1>Bienvenido al Catálogo de Medicinas</h1>
        <p>Consulta la disponibilidad y detalles de nuestras medicinas</p>
        <button onClick={() => document.getElementById('catalog').scrollIntoView()}>Explorar</button>
      </section>

      {/* Catálogo */}
      <section className="catalog">
        <div id="catalog">
          <h2>Medicinas Disponibles</h2>

          {/* Cinta de opciones */}
          <div className="category-filter">
            <label htmlFor="category-select"><strong>Filtrar por Categoría:</strong> </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
             {role === 'admin' && (
                <div className="medicine-add">
                  <button onClick={() => setShowAddForm(true)}>Agregar Medicina</button>
                </div>
              )}

          </div>

          {showAddForm && (
            <div className="modal" id="add-medicine">
              <div className="modal-content">
                <h3>Agregar Nueva Medicina</h3>
                <div className="modal-content-form-group">
                  <p>Nombre:</p>
                  <input
                    className='modal-content-input'
                    name="name"
                    value={newMedicine.name}
                    onChange={handleAddChange}
                    placeholder="Nombre"
                  />
                  <p>Categoría:</p>
                  <input
                    className='modal-content-input'
                    name="category"
                    value={newMedicine.category}
                    onChange={handleAddChange}
                    placeholder="Categoría"
                  />
                  <p>Cantidad:</p>
                  <input
                    className='modal-content-input'
                    name="quantity"
                    value={newMedicine.quantity}
                    onChange={handleAddChange}
                    placeholder="Cantidad"
                  />
                  <p>Vencimiento:</p>
                  <input
                    className='modal-content-input'
                    name="expiration_date"
                    value={newMedicine.expiration_date}
                    onChange={handleAddChange}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <button className='modal-content-save' onClick={handleAddSubmit}>Guardar</button>
                  <button className='modal-content-cancel' onClick={() => setShowAddForm(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

         

          {showEditForm && selectedMedicine && (
            <div className="modal">
              <div className="modal-content">
                <h3>Editar Medicina</h3>
                
                <div className="modal-content-form-group">
                    <p>Nombre:</p>
                    <input className='modal-content-input' name="name" value={selectedMedicine.name} onChange={handleEditChange} placeholder="Nombre" />
                    <p>Cantidad:</p>
                    <input className='modal-content-input' name="quantity" value={selectedMedicine.quantity} onChange={handleEditChange} placeholder="Cantidad" />
                    <p>Vencimiento:</p>
                    <input className='modal-content-input' name="expiration_date" value={selectedMedicine.expiration_date} onChange={handleEditChange} placeholder="Vencimiento" />
                </div>
                <div>
                  <button className ='modal-content-save' onClick={handleEditSubmit}>Guardar</button>
                  <button className='modal-content-cancel' onClick={() => setShowEditForm(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {confirmDeleteId && (
            <div className="modal">
              <div className="modal-content">
                <h3>¿Estás seguro de que deseas eliminar esta medicina?</h3>
                <button className='modal-content-cancel' onClick={cancelDelete}>Cancelar</button>
                <button className='modal-content-confirm' onClick={confirmDelete}>Sí, eliminar</button>
              </div>
            </div>
          )}

          {/* Tarjetas filtradas */}
          <div className="cards">
            {filteredMedicines.map(med => (
              <div key={med.id} className="card">
                <h3>{med.name}</h3>
                <img src="https://st2.depositphotos.com/2914313/8164/v/450/depositphotos_81647722-stock-illustration-medicine-drugs-flat-icons-set.jpg" alt="" />
                <p>Categoría:  {med.category}</p>
                <p>Cantidad: {med.quantity}</p>
                <p>Vencimiento: {med.expiration_date}</p>
                {role === 'admin' && (
                  <div className="card-buttons">
                  <button onClick={() => handleEditClick(med)}>Editar</button>
                  <button onClick={() => handleDeleteClick(med.id)}>Eliminar</button>
                </div> 
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados */}
        <section className="featured">
        <h2>Medicinas Destacadas</h2>
        <div className="featured-grid">
            <div className="featured-card">
                <img src="https://st2.depositphotos.com/2914313/8164/v/450/depositphotos_81647722-stock-illustration-medicine-drugs-flat-icons-set.jpg" alt="Destacado 1" />
                <h3>Paracetamol</h3>
                <p>Alivio rápido para el dolor y la fiebre.</p>
                <button >Ver más</button>
            </div>
            <div className="featured-card">
                <img src="https://st2.depositphotos.com/2914313/8164/v/450/depositphotos_81647722-stock-illustration-medicine-drugs-flat-icons-set.jpg" alt="Destacado 2" />
                <h3>Amoxicilina</h3>
                <p>Antibiótico de amplio espectro.</p>
                <button>Ver más</button>
            </div>
            <div className="featured-card">
                <img src="https://st2.depositphotos.com/2914313/8164/v/450/depositphotos_81647722-stock-illustration-medicine-drugs-flat-icons-set.jpg" alt="Destacado 3" />
                <h3>Ibuprofeno</h3>
                <p>Ideal para inflamaciones y dolores musculares.</p>
                <button>Ver más</button>
            </div>
        </div>
        </section>


      {/* Resumen */}
      <section className="summary">
        <h2>Resumen</h2>
        <div className="circle-row">
          <div className="circle-container">
            <div className="circle"><img src={iconMed} alt="Icono medicinas" /></div>
            <strong><p>Medicinas registradas</p> <p>{medicines.length}</p></strong>
          </div>
          <div className="circle-container">
            <div className="circle-big"><img src={iconOrders} alt="Icono pedidos" /></div>
            <strong><p>Pedidos completados</p><p>122</p></strong>
          </div>
          <div className="circle-container">
            <div className="circle"><img src={iconUsers} alt="Icono usuarios" /></div>
            <strong ><p >Usuarios activos</p> <p  >64</p></strong>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h3>Redes Sociales</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3>Enlaces</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">© 2025 Inventario Medicinas - Todos los derechos reservados</div>
      </footer>
    </div>
  );
}
