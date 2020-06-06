import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Cookies from 'js-cookie';
import Logo from './styles/logo.png';


const PopupContainer = styled.div`
    -webkit-box-shadow: 0px -4px 19px 1px rgba(94,94,94,1);
    -moz-box-shadow: 0px -4px 19px 1px rgba(94,94,94,1);
    box-shadow: 0px -4px 19px 1px rgba(94,94,94,1);
    background-color: snow;
    barder: 1px solid gray;
    border-radius: 2px;
    width: 98%;
    max-width: 500px;
    padding: 20px;
    position: absolute;
    bottom: 60px;
    left: 50%;
    text-align: center;
    transform: translate(-50%, 200%);
    transition: all 1s ease-in-out;
`;
const CloseButton = styled.button`
    padding: 3px 5px;
    border-radius: 5px;
    // background-color: rgba(41,41,41, .8);
    font-size: 18px;
    font-weight: bold;
    width: 30px;
    height: 30px;
    position: absolute;
    outline: none;
    border: none;
    top: 5px;
    right: 5px;
`;
const Button = styled.button`
    padding: 5px 10px;
    font-size: 18px;
    color: snow;
    border: none;
    outline: none;
    margin: 40px 20px 0px 20px;
    background-color: rgb(25, 155, 226);
`;


const InstallPopupp = () => {

    const [allowed , setAllowed] = useState(true);

    useEffect(()=>{
        let deferredPrompt;
        const btn = document.querySelector('#btn');
        const btnContainer = document.querySelector('#btn-container');
        const closeBtn = document.querySelector('#close');
        closeBtn.addEventListener('click', () => {
            btnContainer.style.transform = 'translate(-50% , 500%)';
        });
        if(!Cookies.get('allowed')){
            window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (allowed) btnContainer.style.transform = "translate(-50% , 0)";
            btn.addEventListener("click", (e) => {
                btnContainer.style.transform = "translate(-50% , 500%)";
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                });
            });
            });
        }else{
            setAllowed(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
      <PopupContainer id="btn-container">
        <CloseButton id="close">X</CloseButton>
        <img src={Logo} alt="logo" width="60" height="60" style={{verticalAlign: 'middle'}}/>
        <Button id="btn">Install Wind Converter</Button>
        <p style={{ marginTop: "10px", marginBottom: '0px' }}>
          <label
            htmlFor="allow"
            style={{ fontStyle: "italic", marginRight: "5px" }}
          >
            Do not show me this again
          </label>
          <input
            type="checkbox"
            name="allow"
            id="allow"
            onChange={()=>{
                setAllowed(!allowed)
                if(allowed)
                Cookies.set("allowed", false, { expires: 365 });
                else
                Cookies.remove("allowed");
            }}
            checked={!allowed}
            style={{
              height: "15px",
              width: "15px",
              verticalAlign: "middle",
              borderRadius: "10px",
            }}
          />
        </p>
      </PopupContainer>
    );
}

export default InstallPopupp;