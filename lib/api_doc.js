#!/usr/bin/env node
const path=require("path"),fsExtra=require("fs-extra"),{print:print}=require("./index");function isArrEmpty(r){return 0===r.length}function fmtYapiSchemas(r,n){return r.map(r=>{let e={};var t,a,i,s;return n?({name:a,required:s,value:i}=r,e={[a]:i||"any",required:!!+s}):({name:t,type:a,required:i,desc:s,example:r}=r,e={[t]:"text"===a?"string":a||r||"any",required:!!+i},s&&(e.desc=s)),e})}exports.FormatYapi=function(r){var e=process.cwd(),r=path.join(e,r);const t=require(r)||[],a=[];t.forEach(r=>{const{name:e,list:t}=r,o={name:e,apis:[]};t.forEach(r=>{var{title:e,method:t,path:a,tag:i,req_query:s,req_body_form:n,req_headers:r}=r,n=fmtYapiSchemas(n||[]),s=fmtYapiSchemas(s||[]),r=fmtYapiSchemas(r||[],!0);const p={title:e,method:t,path:a};isArrEmpty(i)||(p.tag=i),isArrEmpty(n)||(p.body=n),isArrEmpty(s)||(p.query=s),isArrEmpty(r)||(p.headers=r),o.apis.push(p)}),a.push(o)});try{var i=path.join(process.cwd(),"yapi.json");fsExtra.writeFileSync(i,JSON.stringify(a,"","\t")),print.Message(`文件生成 ${i} !!!`)}catch(r){print.Error("格式化出现了不可预知的错误")}},exports.FormatSwagger=function(r){};