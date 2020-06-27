import React, { useState } from 'react';
import './App.css';
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import CardOne from "./components/CardOne";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [search, setSearch] = useState("")
  return (
    <div>
      <Nav/>
      <Layout>
        <Row className="mt-5">
          <Col>
            <CardOne variantText="light" variant="dark" header="h5" titleText="Search for Employees">
              <SearchBar state={{search, setSearch}} placeholder="Text Here"></SearchBar>
            </CardOne>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <Col>
            <CardOne variantText="light" variant="dark" header="h5" titleText="Employees">
              <EmployeeTable state={{search, setSearch}} variant="secondary"></EmployeeTable>
            </CardOne>
          </Col>
        </Row>
      </Layout>
    </div>  
  );
}

export default App;
