import { useState } from "react"
import {coworkerBase} from "../coworkerBase"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

//Construcción componente Coworkers
const Coworkers = () => {
const [newCoworker, setNewCoworker] = useState("")
const [newCoworkerEmail, setNewCoworkerEmail] = useState("")
const [coworkerList, setCoworkerList] = useState(coworkerBase)

const [validated, setValidated] = useState(false);

const inputCaptureName = (e) => {
    setNewCoworker(e.target.value)
}

const inputCaptureEmail = (e) => {
    setNewCoworkerEmail(e.target.value)
}


const sendForm = (e) => {
    e.preventDefault()
    const inputFieldName = document.querySelector("#formBasicName01");
    const formBasicEmail01 = document.querySelector("#formBasicEmail01");
    let id = Date.now();
    id = id.toString();
    id = id.substr(9,4);
    const form = e.currentTarget;
    if (form.checkValidity() === true && newCoworker !=="" && newCoworkerEmail !=="") {
            setCoworkerList([...coworkerList, {id: id, name: newCoworker, email: newCoworkerEmail}])
            inputFieldName.value = ""
            formBasicEmail01.value = ""
            setNewCoworker("")
            setNewCoworkerEmail("")
            setValidated(true);
        } else if (form.checkValidity() === false && (newCoworker ==="" || newCoworkerEmail !=="")){
            setValidated(true)
            return 
        } else if (form.checkValidity() === false && (newCoworker !=="" || newCoworkerEmail ==="")) {
            setValidated(true)
            return             
        }
}
/*
***************************************************************************
* Función que debería filtrar, pero no lo hace. Realicé un sinnúmero de 
* pruebas y algunas averiguaciones basándome en lo aprendido en las clases, 
* pero no pude con la función. Así que la dejé tal como debería ser 
* según el material de estudio y según lo explicado en teoría y ayudantía.
* Abajo comento el problema sobre el código. Si pudieran ayudarme en la corrección
* estaría agradecido <----------------------------------------------------
***************************************************************************
*/ 
/*************************************************************************
* Función "searchCoworkerName" búsqueda de colaborador por nombre: Recibe el nombre desde un 
* listener onChange en el Form.Control del NavBar
***************************************************************************/
const searchCoworkerName = (recivedCoworkerName) => {
//  Se recibe desde listener el nombre del colaborador usándolo para filtrar igualdades en la lista "coworkerList".
//  Los valores que hagan match se guardarán en filteredList
    const filteredList = coworkerList.filter(coworker => coworker.name === recivedCoworkerName)

    /*ESTE COMPORTAMIENTO ES RARO:
    * El despliegue de estos valores depende de si comentamos la linea N°78.                               *
    * Mientras la línea 78 esté activa (descomentada) los valores de "filteredList" y de "coworkerList"    *
    * no se despliegan. Mi observación es que este comportamiento podría estar asociado a que no me cambia * 
    * el estado de coworkerList mediante setCoworkerList de la línea 78 */
    console.log("valor de filteredList-->", filteredList)
    console.log("valor de coworkerList-->", coworkerList)
    
    // aquí se hace el cambio de estado de la lista "coworkerList" con los valores que 
    // hicieron match en el filter, pero esto no funciona y hace que coworkerList quede vacío. 
    setCoworkerList(filteredList)    
}
return (
<>

{/*
******************************** 
*            Navbar            *
********************************
*/}
<Navbar bg="dark" expand="lg" variant="dark">
    <Container fluid>
        <Navbar.Brand href="#home" style={{margin: '2vh'}}>Buscador de Colaboradores</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{marginLeft: '50vw'}}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Busca un colaborador"
              className="me-2"
              aria-label="Search"
              onChange={(e) => searchCoworkerName(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
    </Container>
</Navbar>
{/*
******************************** 
*            Form              *
********************************
*/}
    <Form onSubmit={sendForm} noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="formBasicName01">
        <Form.Label style={{marginTop: '5vh'}}><strong>Nombre del colaborador</strong></Form.Label>
        <Form.Control 
            required
            type="text" 
            placeholder="Ingresa el nombre del colaborador" 
            name="newCoworker" 
            onChange={inputCaptureName}
        />
            <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre válido!
            </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail01">
        <Form.Label><strong>Correo del colaborador</strong></Form.Label>
        <Form.Control 
            required
            type="text" 
            placeholder="Ingresa el correo del colaborador" 
            name="newCoworkerEmail" 
            onChange={inputCaptureEmail} 
        />
            <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo válido!
            </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">Agregar colaborador</Button>
    </Form>
    <hr style={{marginTop: '5vh', border: 'solid 1.5px'}}></hr>
{/*
******************************** 
*            Table             *
********************************
*/}
<Form.Label><h1>Listado de colaboradores</h1></Form.Label>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Id</th>
            <th>Nombre del colaborador</th>
            <th>Correo del colaborador</th>
            </tr>
        </thead>
        <tbody>
            {coworkerList.map(coworker =>
                <tr key={coworker.id}>
                    <td>{coworker.id}</td>
                    <td>{coworker.name}</td>
                    <td>{coworker.email}</td>
                </tr>
            )}
        </tbody>
    </Table>
</>
)
}

export default Coworkers