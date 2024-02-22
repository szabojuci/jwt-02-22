import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
 
  const Login = async () => {
    try {
      const response = await axios.post('https://jwt.sulla.hu/login', { username, password });
      setToken(response.data.token);
      setLoginError('');
      setLoginSuccess('Sikeres belépés!');
    } catch (error) {
      setLoginError('Sikertelen felhasználónév vagy jelszó', error);
      setLoginSuccess('');
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Sikertelen adatlekérdezés: ", error);
    }
  };
  return (
  
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Bejelentkezés</h3>
              {loginError && <div className="alert alert-danger">{loginError}</div>}
              {loginSuccess && <div className="alert alert-success">{loginSuccess}</div>}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Felhasználónév</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Jelszó</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={Login}>Küldés</button>
                {token && (
                  <div className="mt-3">
                    <h2>Védett végpont</h2>
                    <button
                      className="btn btn-secondary"
                      onClick={fetchData}>Lekérdezés</button>
                    {data && (
                       <div className="mt-3">
                       <h3>Termékek</h3>
                       <table className="table">
                         <thead>
                           <tr>
                             <th scope="col">Id</th>
                             <th scope="col">Név</th>
                             <th scope="col">Ár</th>
                           </tr>
                         </thead>
                         <tbody>
                           {data.map((item) => (
                             <tr key={item.id}>
                               <td>{item.id}</td>
                               <td>{item.name}</td>
                               <td>{item.price}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
