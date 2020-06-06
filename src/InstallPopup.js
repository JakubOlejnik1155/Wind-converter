import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Cookies from 'js-cookie';


const PopupContainer = styled.div`
    background-color: rgba(25,155,226, .6);
    barder: 1px solid rgb(25,155,226);
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    position: absolute;
    bottom: 30%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, 500%);
    transition: all 1s ease-in-out;
`;
const CloseButton = styled.button`
    padding: 3px 5px;
    border-radius: 5px;
    background-color: rgba(41,41,41, .8);
    font-size: 14px;
    font-weight: bold;
    color: snow;
    position: absolute;
    border: 1px solid rgb(255,200,61);
    top: 5px;
    right: 5px;
`;
const Button = styled.button`
    padding: 5px 10px;
    font-size: 18px;
    border: 2px solid rgb(255,200,61);
    border-radius: 10px;
    color: snow;
    margin: 40px 20px 0px 20px;
    background-color: rgba(41,41,41, .9);
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
        <CloseButton id="close">close</CloseButton>
        <Button id="btn">Install As PWA App</Button>
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