import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { IconsContainer } from './style';

function ShareButtons({canva}){   

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
        <DownloadIcon onClick={downloadImage} style={{marginLeft:'30px'}}/>
        <WhatsAppIcon onClick={handleWhats} style={{marginLeft:'30px'}}/>        
        <ShareIcon onClick={handleShare} style={{marginLeft:'30px'}}/>
    </IconsContainer>
}

export default ShareButtons