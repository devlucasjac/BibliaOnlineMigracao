function ShareButtons({canva}){
    
    const exportImage = () => {
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

    return <>
        <button onClick={exportImage}>
            Baixar
        </button>
    </>
}

export default ShareButtons