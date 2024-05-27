import React, { useRef,useEffect } from "react"

import { fabric } from 'fabric';

import train from "../../../img/bgImg/Train.jpeg"

function ShareTextButton({text}){
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
  
      fabric.Image.fromURL(train, (img) => {
        img.set({
          left: 0,
          top: 0,
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  
        const textObj = new fabric.Text(text, {
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: 'center',
          originY: 'center',
          fontSize: 30,
          fill: '#ffffff',
        });
  
        canvas.add(textObj);
        canvas.renderAll();
      });
    }, [text]);    

    const exportImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL({
          format: 'png',
          quality: 1,
        });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'composed-image.png';
        link.click();
      };

    return <div>   
            <canvas ref={canvasRef}></canvas>     
            <button onClick={exportImage}>
                Compartilha
            </button>
        </div>
}


export default ShareTextButton