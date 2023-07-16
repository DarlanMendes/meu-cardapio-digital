import * as ImageConversion from "image-conversion"
export async function photoConvertProvider(e){
    console.log("photo", e);
    const file = e.target.files[0];
        
       
        
    const compressed = await  ImageConversion.compress(file,{
          quality: 0.5,
          maxWidth: 342,
          maxHeight: 800
        })
      const imagem = await ImageConversion.filetoDataURL(compressed)
    
    return imagem   
          
}