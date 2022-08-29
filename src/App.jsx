// importamos el componente Colaboradores de la carpeta components
import Coworkers from "./components/Coworkers";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    /* llamado al componente importado */
    <div className="App">
      <Coworkers />
    </div>
  );
}

export default App;