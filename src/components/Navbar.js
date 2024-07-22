import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">MovieDb</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Popular</Nav.Link>
          <Nav.Link as={Link} to="/top-rated">Top Rated</Nav.Link>
          <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
        </Nav>
        <Form inline="true" onSubmit={handleSearch} className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit" variant="outline-info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;