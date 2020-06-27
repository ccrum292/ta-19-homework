import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function EmployeeTable(props){
  let employeeStorage = [];
  const [displayedEmployees, setDisplayedEmployess] = useState([{
    "name": {
    "title": "Mrs",
    "first": "Beatrice",
    "last": "Coleman"
    },
    "email": "beatrice.coleman@example.com",
    "dob": {
    "date": "1958-11-19T07:20:18.851Z",
    "age": 62
    },
    "phone": "(025)-901-5259",
    "picture": {
    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/54.jpg"
    }
  }]);

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=200&nat=us").then(data => {
      employeeStorage = data.data.results;
      setDisplayedEmployess(employeeStorage);
    });
  },[]);

  useEffect(() => {
    console.log("search change")
    // setDisplayedEmployess(filterEmployeesBasedOnSearch(props));
    // console.log(displayedEmployees);
    console.log(filterEmployeesBasedOnSearch(props))
  },[props.state.search]);

  const filterEmployeesBasedOnSearch = (props) => {
    let currentSearchArray = props.state.search.toLocaleLowerCase().split("");
    if(!currentSearchArray[0]){
      console.log("nothing in search")
      return displayedEmployees
    }
    const newArrayOfEmployeesBasedOnSearch = displayedEmployees.filter(val => {
      const fullnameForSearchArray = (val.name.first.toLocaleLowerCase() + " " + val.name.last.toLocaleLowerCase()).split("");
      const comparisonArray = [];
      for(let i = 0; i<currentSearchArray.length; i++){
        comparisonArray.push(fullnameForSearchArray[i]);
      }
      return comparisonArray.join("") === currentSearchArray.join("");
    });
    return newArrayOfEmployeesBasedOnSearch;
  };

  const compareNamesA = (a,b) => {
    let comparison = 0;
    if (a.name.first > b.name.first){
      comparison = 1;
    }else if(a.name.first < b.name.first){
      comparison = -1;
    }
    return comparison;
  }

  const compareNamesZ = (a,b) => {
    let comparison = 0;
    if (a.name.first > b.name.first){
      comparison = -1;
    }else if(a.name.first < b.name.first){
      comparison = 1;
    }
    return comparison;
  }

  let sortByNameCounter = 0;
  const sortByName = () =>{
    sortByNameCounter ++;
    if(sortByNameCounter % 2 === 0){
      setDisplayedEmployess(() => {
        return displayedEmployees.sort(compareNamesZ)
      });
    }else{
      setDisplayedEmployess(displayedEmployees.sort(compareNamesA));
    }
    console.log(displayedEmployees);
    console.log(sortByNameCounter);
  };

  const compateEmail = (a,b) => {
    let comparison = 0;
    if (a.email > b.email){
      comparison = 1;
    }else if(a.email < b.email){
      comparison = -1;
    }
    return comparison;
  }

  const sortByEmail = () =>{
    setDisplayedEmployess(displayedEmployees.sort(compateEmail))
    console.log(displayedEmployees);
  };  

  const comparePhone = (a,b) => {
    let comparison = 0;
    if (a.phone > b.phone){
      comparison = 1;
    }else if(a.phone < b.phone){
      comparison = -1;
    }
    return comparison;
  }

  const sortByPhone = () =>{
    setDisplayedEmployess(displayedEmployees.sort(comparePhone))
    console.log(displayedEmployees);
  };

  const compareDOB = (a,b) => {
    let comparison = 0;
    if (a.dob.date > b.dob.date){
      comparison = 1;
    }else if(a.dob.date < b.dob.date){
      comparison = -1;
    }
    return comparison;
  }

  const sortByDOB = () =>{
    setDisplayedEmployess(displayedEmployees.sort(compareDOB))
    console.log(displayedEmployees);
  };

  return(
    <div>
      <div>{JSON.stringify(displayedEmployees[0])}</div>
      <Table striped bordered hover variant={props.variant}>
        <thead>
          <th>Image</th>
          <th onClick={sortByName}>Name</th>
          <th onClick={sortByPhone}>Phone</th>
          <th onClick={sortByEmail}>Email</th>
          <th onClick={sortByDOB}>DOB</th>
        </thead>
        <tbody>
          {displayedEmployees ? displayedEmployees.map((data) => (
            <tr>
              <td className="d-flex justify-content-center"><img alt="Employee Headshot" src={data.picture.thumbnail}></img></td>
              <td>{data.name.first} {data.name.last}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{data.dob.date}</td>
            </tr>
          )): (<tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>)}
        </tbody>
      </Table>

    </div>
  );
};

export default EmployeeTable;