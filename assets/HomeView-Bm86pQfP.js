import{d as n,c as o,o as s,a,t as l,u as d,F as _,r as m,b as r,e as g,w as u,f as p,R as h}from"./index-DL-5OM0R.js";const f={class:"bg-white text-center shadow-md rounded-lg overflow-hidden cursor-pointer"},b=["alt"],w={class:"p-4"},v={class:"text-xl font-semibold mb-2"},x=n({__name:"CategoryInfo",props:{categoryName:{},alt:{}},setup(c){return(e,i)=>(s(),o("div",f,[a("img",{src:"",alt:e.alt,class:"w-full h-48 object-cover bg-gradient-to-r from-blue-300 to-green-300"},null,8,b),a("div",w,[a("h2",v,l(e.categoryName),1)])]))}}),k={class:"container mx-auto p-4"},y={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"},S=n({__name:"HomeView",setup(c){const e=d();return(i,C)=>(s(),o("div",k,[a("div",y,[(s(!0),o(_,null,m(r(e).getCategories,([B,t])=>(s(),g(r(h),{to:{name:"category",params:{id:t.id}},key:t.id},{default:u(()=>[p(x,{"category-name":t.name,alt:t.alt.main},null,8,["category-name","alt"])]),_:2},1032,["to"]))),128))])]))}});export{S as default};
