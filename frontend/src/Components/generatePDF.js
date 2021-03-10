import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

function pdf(){
    const doc = new jsPDF();
    doc.setFontSize(40)     
    doc.text(80, 25, 'Your Bill')
    const tableColumn = [["Name", "Price Per Piece", "Quantity Bought", "Final Price"]];
    const tableRows = [];
    doc.setFontSize(25)  
    const user = {
      username: sessionStorage.getItem("username"),
    }
    axios.post("/api1/user/getCart", user)
        .then(function(response){
          var carts = response.data.cart;
          var name=response.data.name;
          var address = response.data.address
          var phnum = sessionStorage.getItem("username")
          console.log(name,address,phnum);
          var i,t=0;
          for(i=0;i<carts.length;i++){
            t=t+Number(carts[i].itemPrice*carts[i].quantity);
            const data = [
              carts[i].itemName,
              carts[i].itemPrice+"/-",
              carts[i].quantity,
              Number(carts[i].itemPrice*carts[i].quantity)+"/-"
            ];
            tableRows.push(data);
          }
          doc.autoTable({
            headStyles: {fillColor: [137, 44, 220]}, 
            margin: { top: 10 },
            head:tableColumn, 
            body:tableRows, 
            startY: 50,
            styles:{halign:'center', fontSize:11},
            foot: [["Total", "","",t + "/-"]],
            footStyles: {fillColor: [137, 44, 220], fontSize:13}, 
          });
          let finalY = doc.previousAutoTable.finalY;
          doc.setFontSize(20);
          doc.text(13, finalY+25, "Delivery Details");
          doc.setFontSize(10);
          doc.text(13, finalY+30, name);
          doc.text(13, finalY+35, address);
          doc.text(13, finalY+40, phnum);
          //console.log(finalY);
          doc.save("bill")
      })
  };


export default pdf;