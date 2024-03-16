
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container} from 'react-bootstrap';


const AppNavbar = () => {


    return (
    //   <>
    //     <Navbar bg='dark' variant='dark' expand='lg'>
    //       <Container fluid>
    //         <Navbar.Brand as={Link} to='/'>
    //           University Search
    //         </Navbar.Brand>
    //         <Navbar.Toggle aria-controls='navbar' />
    //         <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
    //           <Nav className='ml-auto d-flex'>
    //             <Nav.Link as={Link} to='/'>
    //               Search For Colleges
    //             </Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Container>
    //     </Navbar>
    //   </>
   
   <>
   <header>
    <img
      id="profilepic"
      src="./Assets/images/profile pic.png"
      alt="profilePicture"
      width="10%"
      height="10%"
    />
    <h1>Roopa Thimmanacherla</h1>
    <nav>
      <a href="#AboutMe" alt="informantion about employee"
        ><h3><b>AboutMe</b></h3></a
      >
      <a href="#Work" alt="employee projects"
        ><h3><b>Work</b></h3></a
      >
      <a href="#contactinfo" alt="employee contact information"
        ><h3><b>ContactMe</b></h3></a
      >
      <a
        href="./Assets/Roopa_salesforce.pdf"
        alt="employee resume"
        target="_blank"
        ><h3>Resume</h3></a
      >
    </nav>
  </header>
  </>

    );


};

export default AppNavbar;