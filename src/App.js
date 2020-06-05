import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import {FormControl, InputGroup} from 'react-bootstrap';

import BeaufortData from './constants/Beaufort.json';
import InstallPopupp from './InstallPopup';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => (props.darkTheme ? "rgb(41,41,41)" : "white")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Header = styled.p`
  color: ${(props) => (props.darkTheme ? "snow" : "black")};
  font-style: italic;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  letter-spacing: 1px;
`;
const CopyRights = styled.span`
  font-size: 12px;
  font-style: italic;
  color: ${(props) => (props.darkTheme ? "snow" : "black")};
  position: absolute;
  bottom: 3px;
  left: 5px;
`;
const inputStyles = {
  border: "1.5px solid rgb(25,155,226)",
  backgroundColor: "transparent",
};
const inputLabelStyles = {
  backgroundColor: "rgb(25,155,226)",
  border: "1px solid rgb(25,155,226)",
  color: "black",
};

const App = () => {

    const [state, setState] = React.useState({
        knt: "",
        b: "",
        ms: "",
        kph: ""
    });
    const [isDarkThemeOn, setIsDarkThemeOn] = React.useState(false);

    React.useEffect(()=>{
        const darkTheme = Cookies.get('darktheme');
        if (darkTheme) {
            setIsDarkThemeOn(true)
        }
    },[])

    const inputChangeHandler = (event) => {
        let value = parseFloat(event.target.value.replace(',', '.'));
        for (let i = 0; i <event.target.value.length; i++) {
          const code = event.target.value.charAt(i).charCodeAt(0);
          if ((code < 48 && code !== 46 && code !== 44) || code > 57)
            value = NaN;
        }
      if (!isNaN(value) || event.target.value.length === 0){
        let tmpStateObject = {};
        let ms, kph, b, knt;
        switch (event.target.name) {
          case "knt":
            if (event.target.value.length === 0){
              ms = '';
              kph = '';
              b= '';
            }else{
              ms =  Math.round(event.target.value * 0.514444 *10)/10;
              kph = Math.round(ms *3.6*10)/10;
              b = Math.round(0.723 * Math.pow(event.target.value, 2/3));
              if(b > 12) b = 12;
            }
            tmpStateObject = {ms: ms, kph: kph, b: b}
            break;
          case "b":
            if(event.target.value > 12) return;
            if (event.target.value.length === 0) {
              ms = '';
              kph = '';
              knt = '';
            } else {
              BeaufortData.data.forEach((element) => {
                if (element.b.toString() === event.target.value){
                  ms = element.ms;
                  kph = element.kph;
                  knt = element.knt;
                }
              })
            }
            tmpStateObject = { ms: ms, kph: kph, knt: knt }
            break;
          case "ms":
            if (event.target.value.length === 0) {
              knt = '';
              kph = '';
              b = '';
            } else {
              knt =  Math.round(event.target.value / 0.514444 * 10) / 10;
              kph = Math.round(event.target.value * 3.6 * 10) /10;
              b = Math.round(1.127 * Math.pow(event.target.value, 2 / 3));
              if (b > 12) b = 12;
            }
            tmpStateObject = { knt: knt, kph: kph, b: b }
            break;
          case "kph":
            if (event.target.value.length === 0) {
              knt = '';
              ms = '';
              b = '';
            } else {
              ms = Math.round(event.target.value / 3.6 * 10)/10;
              knt = Math.round(ms / 0.514444 * 10) / 10;
              b = Math.round(1.127 * Math.pow(ms, 2 / 3));
              if (b > 12) b = 12;
            }
            tmpStateObject = { knt: knt, ms: ms, b: b }
            break;
          default:
            break;
        }
        setState({...state, ...tmpStateObject, [event.target.name]: event.target.value})
      }
    }

    const changeThemeHandler = () => {
        if(!isDarkThemeOn) {
            Cookies.set("darktheme", true, {expires: 365});
            setIsDarkThemeOn(!isDarkThemeOn)
        }else if(isDarkThemeOn){
            Cookies.remove("darktheme");
            setIsDarkThemeOn(!isDarkThemeOn);
        }
    }

    return (
      <div style={{ position: "relative", overflow: 'hidden' }}>
        <Container darkTheme={isDarkThemeOn}>
          <Header darkTheme={isDarkThemeOn}>
            <img
              src="https://img.icons8.com/fluent/48/000000/windy-weather.png"
              alt="wind"
              style={{ width: "40px", marginRight: "5px" }}
            />
            Wind converter
            <img
              src="https://img.icons8.com/fluent/48/000000/windy-weather.png"
              alt="wind"
              style={{ width: "40px", marginLeft: "5px" }}
            />
          </Header>

          <InputGroup className="mb-3 pr-5 pl-5" style={{maxWidth: '500px'}}>
            <InputGroup.Prepend>
              <InputGroup.Text style={inputLabelStyles} id="basic-addon1">
                knt
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="knt"
              placeholder="knt"
              value={state.knt}
              onChange={inputChangeHandler}
              style={
                isDarkThemeOn ? { ...inputStyles, color: "white" } : inputStyles
              }
              aria-label="knt"
              aria-describedby="knt"
            />
          </InputGroup>

          <InputGroup className="mb-3 pr-5 pl-5" style={{ maxWidth: '500px' }}>
            <InputGroup.Prepend>
              <InputGroup.Text style={inputLabelStyles} id="basic-addon1">
                ° B
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="b"
              placeholder="° B"
              value={state.b}
              style={
                isDarkThemeOn ? { ...inputStyles, color: "white" } : inputStyles
              }
              onChange={inputChangeHandler}
              aria-label="Bscale"
              aria-describedby="B-scale"
            />
          </InputGroup>

          <InputGroup className="mb-3 pr-5 pl-5" style={{ maxWidth: '500px' }}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" style={inputLabelStyles}>
                m/s
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="ms"
              placeholder="m/s"
              value={state.ms}
              onChange={inputChangeHandler}
              style={
                isDarkThemeOn ? { ...inputStyles, color: "white" } : inputStyles
              }
              aria-label="m/s"
              aria-describedby="m/s"
            />
          </InputGroup>

          <InputGroup className="mb-3 pr-5 pl-5" style={{ maxWidth: '500px' }}>
            <InputGroup.Prepend>
              <InputGroup.Text style={inputLabelStyles} id="basic-addon1">
                kph
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="kph"
              name="kph"
              value={state.kph}
              onChange={inputChangeHandler}
              style={
                isDarkThemeOn ? { ...inputStyles, color: "white" } : inputStyles
              }
              aria-label="kph"
              aria-describedby="kph"
            />
          </InputGroup>
        </Container>
        <CopyRights darkTheme={isDarkThemeOn}>
          &copy; 2020 Jakub Olejnik
        </CopyRights>
        <div className="toggle">
        <span role="img" aria-label="icon">☀️</span>
          <input type="checkbox" id="toggle-switch" checked={isDarkThemeOn} onChange={changeThemeHandler}/>
          <label htmlFor="toggle-switch">
          </label>
          <span role="img" aria-label="icon">🌙</span>
        </div>
        <InstallPopupp/>
      </div>
    );
}

export default App;