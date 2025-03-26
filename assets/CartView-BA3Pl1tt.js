import{d as x,g as y,h as g,k as C,j as k,v as w,c as o,a as e,m as u,F as b,r as P,t as m,b as S,o as l}from"./index-DL-5OM0R.js";import{u as j}from"./products-DPfcdwG1.js";const B={class:"p-6 bg-white rounded-lg shadow-md"},O={class:"mb-4"},F={class:"flex items-center"},I=["src","alt"],V={class:"ml-2"},N={class:"text-lg font-semibold"},$={class:"text-gray-600"},z={class:"text-gray-600"},A=["onClick"],E={key:1,class:"text-gray-600 mb-4 text-lg"},L={key:2,class:"text-gray-800 mb-4 text-lg"},U=x({__name:"CartView",setup(Q){const n=y(),_=j(),c=n.getCart(),t=g([]),i=g(!1);if(c.value.size>0){const a=Array();for(const[r,s]of c.value){const d=_.getProductById(r);if(!d.value){_.restoreProduct(C,k,r).then(h=>{h&&t.value.push(h)});continue}a.push(w(d.value))}t.value=a}const f=a=>{n.removeProduct(a),t.value=t.value.filter(r=>r.id!==a)},v=()=>{n.clearCart(),t.value=[]},p=()=>{v(),i.value=!0};return(a,r)=>(l(),o("div",B,[r[0]||(r[0]=e("h2",{class:"text-2xl font-bold mb-4"},"Shopping Cart",-1)),t.value.length>0?(l(),o(b,{key:0},[e("ul",O,[(l(!0),o(b,null,P(t.value,s=>(l(),o("li",{key:s.id,class:"flex justify-between items-center mb-2"},[e("div",F,[e("img",{src:s.imageUrl,alt:s.name,class:"w-16 h-16 object-contain"},null,8,I),e("div",V,[e("h3",N,m(s.name),1),e("p",$,m(s.price)+" $",1),e("p",z,"Quantity: "+m(S(c).get(s.id)),1)])]),e("button",{class:"text-red-500 hover:text-red-700 cursor-pointer",onClick:d=>f(s.id)}," × ",8,A)]))),128))]),e("div",{class:"flex justify-between"},[e("button",{class:"bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600",onClick:v}," Clear Cart "),e("button",{class:"bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600",onClick:p}," Place Order ")])],64)):u("",!0),!i.value&&t.value.length===0?(l(),o("div",E," Your cart is empty. ")):u("",!0),i.value?(l(),o("div",L,"Order placed 🥳")):u("",!0)]))}});export{U as default};
