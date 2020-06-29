import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function EmployeeTable(props) {
  // let employeeStorage = [];
  const [displayedEmployees, setDisplayedEmployess] = useState("");
  const [displayedEmployeesShadow, setDisplayedEmployessShadow] = useState("");


  // gets data on initial page load
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=50&nat=us").then(data => {
      // employeeStorage = data.data.results;
      setDisplayedEmployess(data.data.results);
      setDisplayedEmployessShadow(data.data.results);
    });
  }, []);


  // changes displayedEmployees state when search state changes

  useEffect(() => {
    console.log("search change")
    setDisplayedEmployess(filterEmployeesBasedOnSearch());
    // console.log(displayedEmployees);
    // console.log(filterEmployeesBasedOnSearch(props))
  },[props.state.search]);


  // Search Bar Functionality

  const filterEmployeesBasedOnSearch = () => {
    let currentSearchArray = props.state.search.toLocaleLowerCase().split("");
    if(!currentSearchArray[0]){
      console.log("nothing in search")
      return displayedEmployeesShadow
    }
    const newArrayOfEmployeesBasedOnSearch = displayedEmployeesShadow.filter(val => {
      const fullnameForSearchArray = (val.name.first.toLocaleLowerCase() + " " + val.name.last.toLocaleLowerCase()).split("");
      const comparisonArray = [];
      for(let i = 0; i<currentSearchArray.length; i++){
        comparisonArray.push(fullnameForSearchArray[i]);
      }
      return comparisonArray.join("") === currentSearchArray.join("");
    });
    return newArrayOfEmployeesBasedOnSearch;
  };


  // Sort By Name

  const compareNamesA = (a, b) => {
    let comparison = 0;
    if (a.name.first > b.name.first) {
      comparison = 1;
    } else if (a.name.first < b.name.first) {
      comparison = -1;
    }
    return comparison;
  }

  const compareNamesZ = (a, b) => {
    let comparison = 0;
    if (a.name.first > b.name.first) {
      comparison = -1;
    } else if (a.name.first < b.name.first) {
      comparison = 1;
    }
    return comparison;
  }

  const [sortByNameCounter, setByNameCounter] = useState(1)
  const sortByName = () => {
    setByNameCounter(curr=> curr + 1)
    if (sortByNameCounter % 2 === 0) {
      setDisplayedEmployess(displayedEmployees.sort(compareNamesZ));
    } else {
      setDisplayedEmployess(displayedEmployees.sort(compareNamesA));
    }
  };


  // Sort by EMAIL

  const compareEmailA = (a, b) => {
    let comparison = 0;
    if (a.email > b.email) {
      comparison = 1;
    } else if (a.email < b.email) {
      comparison = -1;
    }
    return comparison;
  }

  const compareEmailZ = (a, b) => {
    let comparison = 0;
    if (a.email > b.email) {
      comparison = -1;
    } else if (a.email < b.email) {
      comparison = 1;
    }
    return comparison;
  }

  const [sortByEmailCounter, setSortByEmailCounter] = useState(1)
  const sortByEmail = () => {
    setSortByEmailCounter(curr => curr + 1);
    if(sortByEmailCounter % 2 === 0){
      setDisplayedEmployess(displayedEmployees.sort(compareEmailZ))
    }else{
      setDisplayedEmployess(displayedEmployees.sort(compareEmailA))
    }
  };


  // Sort By Phone # 

  const comparePhoneA = (a, b) => {
    let comparison = 0;
    if (a.phone > b.phone) {
      comparison = 1;
    } else if (a.phone < b.phone) {
      comparison = -1;
    }
    return comparison;
  }

  const comparePhoneZ = (a, b) => {
    let comparison = 0;
    if (a.phone > b.phone) {
      comparison = -1;
    } else if (a.phone < b.phone) {
      comparison = 1;
    }
    return comparison;
  }

  const [sortByPhoneCounter, setSortByPhoneCounter] = useState(1);
  const sortByPhone = () => {
    setSortByPhoneCounter(curr => curr + 1);
    if(sortByPhoneCounter % 2 === 0){
      setDisplayedEmployess(displayedEmployees.sort(comparePhoneZ))
    }else{
      setDisplayedEmployess(displayedEmployees.sort(comparePhoneA))
    }
  };


  // Sort by Date of Birth

  const compareDOBA = (a, b) => {
    let comparison = 0;
    if (a.dob.date > b.dob.date) {
      comparison = 1;
    } else if (a.dob.date < b.dob.date) {
      comparison = -1;
    }
    return comparison;
  }

  const compareDOBZ = (a, b) => {
    let comparison = 0;
    if (a.dob.date > b.dob.date) {
      comparison = -1;
    } else if (a.dob.date < b.dob.date) {
      comparison = 1;
    }
    return comparison;
  }

  const [sortByDOBCounter, setSortByDOBCounter] = useState(1);
  const sortByDOB = () => {
    setSortByDOBCounter(curr => curr + 1);
    if(sortByDOBCounter % 2 === 0){
      setDisplayedEmployess(displayedEmployees.sort(compareDOBZ))
    }else{
      setDisplayedEmployess(displayedEmployees.sort(compareDOBA))
    }
  };


  // RETURN

  return (
    <div>
      {/* <div>displayedEmployees[0].name.first: {displayedEmployees[0].name.first}</div> */}
      <Table striped bordered hover variant={props.variant}>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={sortByName}>Name</th>
            <th onClick={sortByPhone}>Phone</th>
            <th onClick={sortByEmail}>Email</th>
            <th onClick={sortByDOB}>DOB</th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees ? displayedEmployees.map((data) => {
            // console.log(data)
            return (
              <tr key={data.login.uuid}>
                <td className="d-flex justify-content-center"><img alt="Employee Headshot" src={data.picture.thumbnail}></img></td>
                <td>{data.name.first} {data.name.last}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.dob.date}</td>
              </tr>
            )
          }) : (<tr>
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