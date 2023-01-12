import { textData } from './textData.js';

function TextModules(pageName, section) {
  // console.log(pageName, section);


  if (!pageName) {
    return null;
  }
  else if (pageName && section) { return textData[pageName][section] }
  else { return textData[pageName];} 
    
}
export default TextModules;