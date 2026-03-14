async function pdfToWord(){

let file=document.getElementById("pdfFile").files[0];

let reader=new FileReader();

reader.onload=async function(){

let typedarray=new Uint8Array(this.result);

let pdf=await pdfjsLib.getDocument(typedarray).promise;

let text="";

for(let i=1;i<=pdf.numPages;i++){

let page=await pdf.getPage(i);
let content=await page.getTextContent();

content.items.forEach(item=>{
text+=item.str+" ";
});

}

const doc=new docx.Document({
sections:[{
children:[new docx.Paragraph(text)]
}]
});

docx.Packer.toBlob(doc).then(blob=>{

let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="converted.docx";
a.click();

});

};

reader.readAsArrayBuffer(file);

}



async function wordToPdf(){

alert("Word to PDF works best with a server. This demo shows basic conversion.");

}
