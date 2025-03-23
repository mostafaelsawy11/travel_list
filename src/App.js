import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];




export default function App(){
      const [items,setItems]= useState(initialItems);

  return <div className="app">
    <Logo/>
    <Form items={items} setItems = {setItems}/>
    <PackingList items={items}/>
    <Status/>
  </div>
   
}
function Logo(){
   return <h1>🌴 FAR AWAY 👜 </h1>
}


function Form({items,setItems}){

  const [ quantity , setQuantity] =useState(1);
  const [description , setDescription]=useState("");
  function HanddleSubmit(e){
    e.preventDefault();
    if(!description)
      return ;
    const newObj = {quantity,description,packed:false , id:Date.now()};
    setDescription("");
    setQuantity(1);
    setItems([...items,newObj]);
  }
  return(
    <form className="add-form" onSubmit={HanddleSubmit}>
       <h3>What do you need for your 😍 trip?</h3>
       <select onChange={(e)=>setQuantity(Number(e.target.value))}>
         {Array.from( {length:20},( _,i) => i + 1 ).map((num)=>(
          <option value={num} key={num}>
              {num}
          </option>
           )
        )
        }
       </select>
       <input type="text" placeholder="Item..." onChange={(e)=>setDescription(e.target.value)}></input>
       <button>Add</button>
    </form>
);
  
}


function PackingList({items}){
   return <div className="list">
        <ul>
          {items.map((item) =>( <Item item={item}/>))}
        </ul>
   </div>
}
function Item({item}){
   return <li>
       <span style={item.packed?{textDecoration:"line-through"}:{}}>
          {item.quantity} {item.description}
       </span>
       <button>❌</button>

   </li>
}



function Status(){
  return <footer className="stats">
    <em>
      you have X items in your list and you packed X(X%).
    </em>
  </footer>
}