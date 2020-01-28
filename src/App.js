import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import { Container, Card, Button, Form, Row, Col, Accordion } from 'react-bootstrap'
import previous_icon from './assets/images/chevron-circle-left-solid.svg';
import next_icon from './assets/images/chevron-circle-right-solid.svg';
import down_icon from './assets/images/chevron-circle-down-solid.svg';
import up_icon from './assets/images/chevron-circle-up-solid.svg';
import './App.css';

function numberWithCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const App = (props) => {
  const [visible, setVisible] = useState(false);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState(0);
  const inputD = 250000;
  const [inputE, setInputE] = useState(0);
  const [inputF, setInputF] = useState(0);
  const [inputG, setInputG] = useState(0);

  const handleShow = () => {
    setVisible(!visible);
    if (!visible) {
      const container= document.querySelectorAll(".division-293 .calculator .calculator-card .card .card-body div[class*='col-sm']")
      container.forEach(i => {
        i.style.display = "flex";
        i.style.alignItems = "center";
        i.style.paddingRight = 0
        i.children[0].style.marginRight = "5px";
      })
    }
  }

  const handleInputA = e => {
    let value = e.target.value.replace("$", "");
    value = value.replace(/,/g, "");
    setInputA(value);
    let inC = ""
    if (value) {
      inC = inC + parseInt(value);
    }
    if (inputB) {
      inC = inC !== "" && inC ? parseInt(inC) + parseInt(inputB) : parseInt(inputB)
    }
    setInputC(inC);
  }

  const handleInputB = e => {
    const value = e.target.value.replace("$", "").replace(/,/g, "");
    setInputB(value);
    let inC = "";
    if (value) {
      inC = inC + parseInt(value);
    }
    if (inputA){
      inC = inC !== "" && inC ? parseInt(inC) + parseInt(inputA) : parseInt(inputA)
    }
    setInputC(inC);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=UA-157087099-1";
    script.async = true;

    document.body.appendChild(script);

    const s = document.createElement("script");
    s.src="./script.js";
    s.async = true;

    return () => {
      document.body.removeChild(script);
    }
  })

  useEffect(() => {
    let inF = ""
    inF = inputB || inputE ? Math.min(inputB, inputE) : "";
    setInputF(inF);
  }, [inputB, inputE])

  useEffect(() => {
    if (inputC ) {
      if (parseInt(inputC) > parseInt(inputD)) setInputE(parseInt(inputC) - parseInt(inputD));
      else setInputE(0);
    } else setInputE("");
  }, [inputC])

  useEffect(() => {
    inputA ? setInputA(inputA) : setInputA("")
  }, [inputA])

  useEffect(() => {
    let inf = inputF;
    if (inf) {
      let number = parseInt(parseInt(inf) * 15 / 100);
      if ((parseInt(inf) * 15 / 100) - number >= 0.5) number = number + 1;
      console.log(number);
      setInputG(number)
    } else {
      setInputG(0)
    }
  }, [inputF])

  return (
    <>
      <Header />
      <section>
        <Container className="division-293">
          <div className="title">
            <h1>
              <img src={previous_icon} className="previous-icon" alt="previous" />
              DIVISION 293 CALCULATOR<br/>AUSTRALIA
              <img src={next_icon} className="next-icon" alt="next" />
            </h1>
          </div>
          <div className="calculator">
            <h5>Enter your details below to determine your Division 293 tax liability</h5>
            <div className="calculator-card">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header as="h5">Division 293 Tax Calculator</Card.Header>
                  <Card.Body>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6" xs="6">
                        Taxable Income (approx. p.a.)
                      </Form.Label>
                      <Col sm="6" xs="6">
                        <Form.Control type="text" className="input-a" value={inputA ? `$${numberWithCommas(inputA)}` : ""} onChange={e => handleInputA(e)} />
                        {visible ? <Form.Label>(a)</Form.Label> : null }
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6" xs="6">
                        Superannuation Contributions p.a.
                      </Form.Label>
                      <Col sm="6" xs="6">
                        <Form.Control type="text" className="input-b" value={inputB ? `$${numberWithCommas(inputB)}` : ""} onChange={e => handleInputB(e)} />
                        {visible ? <Form.Label>(b)</Form.Label> : null }
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6" xs="6">
                        Division 293 Tax Owing
                      </Form.Label>
                      <Col sm="6" xs="6">
                        <Form.Control type="text" className="input-g" value={inputG || inputG == 0 ? `$${numberWithCommas(inputG)}` : ""} />
                        {visible ? <Form.Label>(g)</Form.Label> : null }
                      </Col>
                    </Form.Group>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={() => handleShow()} style={{ backgroundColor: visible ? "#FFDC99" : "#D8E6FF", color: visible ? "#A37314" : "#2979FF" }}>
                      { !visible ? <span>Show detail<img src={down_icon} className="down-icon" alt="down" /></span> : <span>Hide detail<img src={up_icon} className="up-icon" alt="up" /></span>}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form.Group as={Row}>
                          <Form.Label column sm="6" xs="6">
                            Total Income and Contributions
                          </Form.Label>
                          <Form.Label column sm="2" xs="2">
                            (a+b)
                          </Form.Label>
                          <Col sm="4" xs="4">
                            <Form.Control type="text" className="input-c" value={inputC ? `$${numberWithCommas(inputC)}` : "$0"} />
                            {visible ? <Form.Label>(c)</Form.Label> : null }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="6" xs="6">
                            Less: Division 293 Threshold
                          </Form.Label>
                           <Form.Label column sm="2" xs="2">
                          </Form.Label>
                          <Col sm="4" xs="4">
                            <Form.Control type="text" className="input-d" defaultValue={inputD ? `$${numberWithCommas(inputD)}` : "$0"} disabled={true} />
                            {visible ? <Form.Label>(d)</Form.Label> : null }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="6" xs="6">
                            Amount above threshold
                          </Form.Label>
                          <Form.Label column sm="2" xs="2">
                            (c-d)
                          </Form.Label>
                          <Col sm="4" xs="4">
                            <Form.Control type="text" className="input-e" value={inputE ? `$${numberWithCommas(inputE)}` : "$0"} />
                            {visible ? <Form.Label>(e)</Form.Label> : null }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="6" xs="6">
                            Div. 293 applicable contributions
                          </Form.Label>
                          <Form.Label column sm="2" xs="2">
                            Lessor of (b) or (e) 
                          </Form.Label>
                          <Col sm="4" xs="4">
                            <Form.Control type="text" className="input-f" value={inputF ? `$${numberWithCommas(inputF)}` : "$0"} />
                            {visible ? <Form.Label>(f)</Form.Label> : null }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="6" xs="6">
                            Division 293 Tax Owning
                          </Form.Label>
                          <Form.Label column sm="2" xs="2">
                            (f) x 15%
                          </Form.Label>
                          <Col sm="4" xs="4">
                            <Form.Control type="text" className="input-g" value={inputG || inputG == 0 ? `$${numberWithCommas(inputG)}` : "$0"} />
                            {visible ? <Form.Label>(g)</Form.Label> : null }
                          </Col>
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card.Body>
                </Card>
              </Accordion>
              <p>Note: the above tax payable is an estimate and should be verified with your accountant or tax professional.</p>
            </div>
          </div>
          <div className="content">
            <h4>What is Division 293 Tax?</h4>
            <div>
              Division 293 is an additional tax on superannuation contributions for high income earners in Australia issued by the ATO. <br/><br/>

              293 Tax is designed to reduce the tax benefits that high income earners receive by charging an additional tax on superannuation contributions above the standard 15% tax rate.<br/><br/>

              In simple terms, everyday income earners pay 15% tax on superannuation contributions, high income earners, as determined by the ATO’s  Division 293 threshold, will pay 30% tax on all (or some) of their super contributions in a given financial year.
            </div>
            <h4>Who does it apply to?</h4>
            <div>
              People with Division 293 Income above 250,000 p.a. may be required to pay the additional 15% tax on their concessional superannuation contributions in a given financial year.<br/><br/>

              The Australian Tax Office will determine if the tax applies once an individual has lodged their tax return, and then issue a notice to the individual or their tax agent usually 1-2 months after.
            </div>
            <h4>How is Division 293 calculated?</h4>
            <div>
              The calculator above provides a summary of how the tax department calculates the Division 293 tax amount. <br/><br/>

              Division 293 is applied where the total of an individuals taxable income and their concessional superannuation contributions (e.g. those made by their employer or as part of the 25,000 tax concession cap) are in excess of $250,000.<br/><br/>

              The additional tax rate of 15% is only applied to the amount in excess of the $250,000. For the purposes of the calculation, the following definitions apply:<br/><br/>

              <b>Division 293 Income</b> is the same as an individual’s <b>taxable income</b>, which is the net of:
              <ul>
                <li>Assessable income;</li>
                <li>Allowable tax deductions;</li>
                <li>Reportable fringe benefits;</li>
                <li>Net investment losses and rental losses;</li>
                <li>Any amount on which family trust distribution tax is paid</li>
              </ul>
              <br/>

              <b>Superannuation Contributions</b> for the purposes of Division 293 are the total concessional superannuation contributions made during the year, including:
              <ul>
                <li>Employer superannuation contributions</li>
                <li>Personal deductible contributions</li>
                <li>Contributions for a defined benefit interest</li>
              </ul>
              <br/>

              Note that the additional tax does not apply to any excess non-concessional contributions you have made on a voluntary basis.<br/><br/>

              Individuals who are not high income earners can still be liable for the tax if they received a once off lump sum payment which tips them over the $250,000 limit in a given financial year.
            </div>
            <h4>What do I do if I receive a Division 293 notice?</h4>
            <div>
              Once a Division 293 notice is received from the ATO, there is a a tax liability owing within around 60 days. The individual can elect to pay the tax directly from their personal funds or they can arrange to release the money from their superannuation fund to pay the tax.<br/><br/>

              The election process can be done through the individual’s account on the myGov / ATO website.
            </div>
          </div>
        </Container>
        <div className="right-1">
        </div>
        <div className="right-2">
        </div>
        <div className="right-3">
        </div>
        <div className="right-4">
        </div>
        <div className="left-1">
        </div>
        <div className="left-2">
        </div>
        <div className="left-3">
        </div>
        <div className="left-4">
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
