//getValue
//replaceByNull
function getValue(attributeValue){
  if(attributeValue.search('@')!=-1){
    const varName = attributeValue.replace("@","");
    const val = variables[varName];
    if(val!=undefined){
      return val.value;
    }
    return "";
  }else{
    return attributeValue;
  }
}

function replaceByNull(domObject){
  const text = document.createTextNode("");
  domObject.parentNode.replaceChild(text,domObject);
}

var variables ={};
var tags = document.getElementsByTagName("*");
let i=0;
while(tags[i]!=undefined){
  if(tags[i].tagName=='PRINT'){
    
    if(tags[i].attributes.getNamedItem("name") ==undefined){
      console.log("Mention name of variable to be displayed")
      replaceByNull(tags[i]);
    }
    const varName =variables[tags[i].attributes.getNamedItem("name").value];
    if(varName!=undefined){
      const text = document.createTextNode(variables[tags[i].attributes.getNamedItem("name").value].value);
      tags[i].parentNode.replaceChild(text,tags[i]);
    }else{
      console.log("No variable named "+tags[i].attributes.getNamedItem("name").value+" found");
      replaceByNull(tags[i])
    }
    // tags = document.getElementsByTagName("*");
    i--;
  }else if(tags[i].tagName=='REPEAT'){
    
    var times =tags[i].attributes.getNamedItem('times');
    if(times!=undefined){
      times = getValue(times.value);
      if(isNaN(times)){
        console.log("times attribute must be a number");
      }else{
        times = parseFloat(times);
        const data = tags[i].innerHTML;
        var newData="";
        for(let j=0;j<times;j++){
          newData+=data;
        }
        tags[i].innerHTML=newData;
        tags = document.getElementsByTagName("*");
      }
    }else{
      console.log("times attribute is not mentioned in repeat tag.");
    }
  }else if(tags[i].tagName=='VAR'){
    
    const varName = tags[i].attributes.getNamedItem('name');
    var varValue =tags[i].attributes.getNamedItem('value');
    const varType = tags[i].attributes.getNamedItem('type');
    if(varName!=undefined || varType!=undefined || varValue!=undefined){
      varValue = getValue(varValue.value)
      if(varType.value.toLowerCase() == "number"){
        varValue = parseFloat(varValue);
      }
      variables[varName.value]={
        value:varValue,
        type:varType.value
      }
    }else{ 
      console.log("Value,Type or Name not specified in <var>");
    }
  }else if(tags[i].tagName=='IF'){
    
    const val1Obj = tags[i].attributes.getNamedItem('val1');
    const val2Obj =tags[i].attributes.getNamedItem('val2');
    const comparisionObj = tags[i].attributes.getNamedItem('comparision');
    if(val1Obj!=undefined || val2Obj!=undefined || comparisionObj!=undefined){
      const val1 = getValue(val1Obj.value);
      const val2 = getValue(val2Obj.value);
      const comparision = getValue(comparisionObj.value);
      var yes=true;
      if(comparision=='=' && val1==val2){}
      else if(comparision=='<' && val1 <val2){}
      else if(comparision=='<=' && val1 <= val2){}
      else if(comparision=='>' && val1 >val2){}
      else if(comparision=='>=' && val1 >= val2){}
      else if(comparision=='!=' && val1 != val2){}
      else{yes=false};
      const elseData = tags[i].getElementsByTagName('else');
      if(yes){
        for(let j=0;j<elseData.length;j++){
          tags[i].removeChild(elseData[j]);
        }
      }else{
        var newData = "";
        for(let j=0;j<elseData.length;j++){
          newData+=elseData[j].innerHTML;
        }
        tags[i].innerHTML=newData;
        tags = document.getElementsByTagName("*");
      }
    }else{ 
      console.log("Val1, Val2 or Comparision not specified in <if>");
    }    
  }else if(tags[i].tagName =='BREAK'){
    
    var a=tags[i].parentNode;
    while(a.tagName != 'REPEAT'){
      a=a.parentNode;
    }
    const text = a.innerHTML.toLowerCase();
    const index= text.indexOf('<break>');
    a.innerHTML=a.innerHTML.slice(0,index);
    tags = document.getElementsByTagName("*");
  }else if(tags[i].tagName =='PERFORM'){
    
    const val1Obj = tags[i].attributes.getNamedItem('val1');
    const val2Obj =tags[i].attributes.getNamedItem('val2');
    const actionObj = tags[i].attributes.getNamedItem('action');
    const nameObj = tags[i].attributes.getNamedItem('name');
    if(val1Obj!=undefined || val2Obj!=undefined || actionObj!=undefined||nameObj!=undefined){
      const val1 = parseFloat(getValue(val1Obj.value));
      const val2 = parseFloat(getValue(val2Obj.value));
      const action = getValue(actionObj.value);
      const name = getValue(nameObj.value);
      var variable = variables[name];
      if(variable.type=='number'){
        var val;
        if(action=='+'){
          val=val1+val2;
        }else if(action=='-'){
          val=val1-val2;
        }else if(action=='*'){
          val=val1*val2;
        }else if(action=='/'){
          val=val1/val2;
        }else if(action=='%'){
          val=val1%val2;
        }else {
          val=-1;
        }
        variable.value=val;
        tags = document.getElementsByTagName("*");

      }else{
        console.log("Given destination variable is not defined or is not a number");
      }
    }else{
      console.log("Val1, Val2, Action or Name not specified in <PERFORM>");
    }
  }
  i++;
}