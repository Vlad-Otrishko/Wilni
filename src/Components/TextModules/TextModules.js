import { textData } from './textData.js';

function TextModules(pageName, section) {
  // let pageContent = undefined;
  if (section) { return textData[pageName][section] }
  else {return textData[pageName];} 
    
}
export default TextModules;