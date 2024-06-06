import React, { useRef,useEffect } from "react"

import { fabric } from 'fabric';

import ShareButtons from "../ShareButtons";

import cidade from "../../../img/bgImg/cidade.png"

function CanvasContainer({text}){
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 500,
      });
  
      fabric.Image.fromURL(cidade, (img) => {
        img.set({
          left: 0,
          top: 0,
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  
        const textbox = new fabric.Textbox(text, {
          left: canvas.width / 2,
          top: canvas.height / 2,
          width: 800,
          maxWidth: 800,
          originX: 'center',
          originY: 'center',
          fontSize: 30,
          fill: '#111',
          textAlign: 'justify-left',
        });        

        canvas.add(textbox);
        canvas.renderAll();
      });
    }, [text]);    

   

    return <div>   
      {canvasRef !== null &&<>
            <canvas ref={canvasRef}></canvas>     
            <ShareButtons canva={canvasRef}/>
            </>
      }
        </div>
}

export default CanvasContainer