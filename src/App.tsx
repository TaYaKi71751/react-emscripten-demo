import React,{ useState } from 'react';
import Module from '@testing/string-number';

var __module__:any = null;

async function getModule(){
	let module:any = Module;
	if(!__module__){
		module()
			.then((m:any)=>{
				__module__ = m;
			})
	}
	return __module__;
}

async function add(a:string,b:string){
	let m:any = await getModule();
	const aPTR = m.allocateUTF8OnStack(a);
	const bPTR = m.allocateUTF8OnStack(b);
	const rPTR = m.ccall('__ADD_INTEGER__','number',['number','number'],[aPTR,bPTR]);
	const r = m.UTF8ToString(rPTR);
	m._free(rPTR);
	m = undefined;
	return r;
}

async function sub(a:string,b:string){
	let m:any = await getModule();
	const aPTR = m.allocateUTF8OnStack(a);
	const bPTR = m.allocateUTF8OnStack(b);
	const rPTR = m.ccall('__SUB_INTEGER__','number',['number','number'],[aPTR,bPTR]);
	const r = m.UTF8ToString(rPTR);
	m._free(rPTR);
	m = undefined;
	return r;
}

function App() {
	const [inputA,setInputA] = useState("0");
	const [inputB,setInputB] = useState("0");
	const [resultAdd,setResultAdd] = useState("0");
	const [resultSub,setResultSub] = useState("0");
	const handleA = (event:any) => {
		const _inputA = `${event.target.value || inputA}`;
		setInputA(`${event.target.value || inputA}`);
		add(`${_inputA}`,`${inputB}`).then((r:any)=>setResultAdd(`${r}`));
		sub(`${_inputA}`,`${inputB}`).then((r:any)=>setResultSub(`${r}`));
	}
	const handleB = (event:any) => {
		const _inputB = `${event.target.value || inputB}`;
		add(`${inputA}`,`${_inputB}`).then((r:any)=>setResultAdd(`${r}`));
		sub(`${inputA}`,`${_inputB}`).then((r:any)=>setResultSub(`${r}`));
		setInputB(`${event.target.value || inputB}`);
	}
  return (
		<>
			<input type="text" value={inputA} onChange={handleA}/>
			<input type="text" value={inputB} onChange={handleB}/>
			<div className={"result add"}>({inputA}) + ({inputB}) = {resultAdd}</div>
			<div className={"result sub"}>({inputA}) - ({inputB}) = {resultSub}</div>
		</>
  );
}

export default App;
