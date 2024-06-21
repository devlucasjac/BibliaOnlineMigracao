import { useState,useContext } from 'react';

import { StyledDownload, StyledShare, StyledWhatsapp } from './style';

import DarkMode from '../../../context/DarkMode';

import { IconsContainer } from './style';

  function ShareButtons({canva}){   
    const {isLit} = useContext(DarkMode)

    const downloadImage = () => {
      const canvas = canva.current;
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'composed-image.png';
        link.click();
    };

    const handleWhats = () => {  
      const canvas = canva.current;
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(dataUrl)}`;
        window.open(whatsappURL, '_blank');
      };

    const handleShare = () => {  
        const canvas = canva.current;
        console.log(canva.current)
        const dataUrl = canvas.toDataURL({
          format: 'png',
          quality: 1,
        });
      
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'fabric-image.png', { type: 'image/png' });    
            
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              navigator.share({
                files: [file],
                title: 'Imagem Fabric.js',
                text: 'Olha esta imagem criada com Fabric.js!',
              }).catch(console.error);
            } else {
              alert('Seu navegador não suporta compartilhamento de arquivos.');
            }
          });
    };

    return <IconsContainer>           
        <StyledDownload onClick={downloadImage} isLit={isLit} style={{marginLeft:'30px'}}/>
        <StyledWhatsapp onClick={handleWhats} isLit={isLit} style={{marginLeft:'30px'}}/>        
        <StyledShare onClick={handleShare} isLit={isLit} style={{marginLeft:'30px'}}/>
    </IconsContainer>
}

export default ShareButtons