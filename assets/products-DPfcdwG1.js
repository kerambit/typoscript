import{x as g,h as a,v as l,i as c,y as P}from"./index-DL-5OM0R.js";const y=g("products",()=>{const n=a(new Map),u=a(new Map);function s(t,e){const r=n.value.get(t);if(u.value.has(e.id))return;if(u.value.set(e.id,e),!r){n.value.set(t,[e]);return}const o=l(r);o.push(e),n.value.set(t,o)}function d(t){return c(()=>n.value.get(t))}function f(t,e){for(const r of e)s(t,r)}function i(t){return c(()=>u.value.get(t))}async function v(t,e,r){const o=await P(t,e,r);if(o){for(const p of o.categoryIds)s(p,o);return o}}return{getProductsByCategoryId:d,addProduct:s,setProducts:f,getProductById:i,restoreProduct:v}});export{y as u};
