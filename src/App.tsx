import React,{ useState } from 'react';
const Module = require('@testing/string-number');

async function add(a,b){
	return await new Promise((resolve,reject) => {
		Module()
			.then((_Module)=>{
				const _init = _Module.cwrap('__SAFE_CALC_INIT__','undefined',['string','string','string']);
				const _add = _Module.cwrap('__ADD_INTEGER__','string',['string','string']);
				const _sub = _Module.cwrap('__SUB_INTEGER__','string',['string','string']);
				const _mul = _Module.cwrap('__MUL_INTEGER__','string',['string','string']);
				_init('-','','0123456789')
				const r = _add(a,b);
				resolve(r);
			})
	});
}

async function sub(a,b){
	return await new Promise((resolve,reject) => {
		Module()
			.then((_Module)=>{
				const _init = _Module.cwrap('__SAFE_CALC_INIT__','undefined',['string','string','string']);
				const _add = _Module.cwrap('__ADD_INTEGER__','string',['string','string']);
				const _sub = _Module.cwrap('__SUB_INTEGER__','string',['string','string']);
				const _mul = _Module.cwrap('__MUL_INTEGER__','string',['string','string']);
				_init('-','','0123456789')

				const r = _sub(a,b);
				resolve(r);
			})
	});
}

async function mul(a,b){
	return await new Promise((resolve,reject) => {
		Module()
			.then((_Module)=>{
				const _init = _Module.cwrap('__SAFE_CALC_INIT__','undefined',['string','string','string']);
				const _add = _Module.cwrap('__ADD_INTEGER__','string',['string','string']);
				const _sub = _Module.cwrap('__SUB_INTEGER__','string',['string','string']);
				const _mul = _Module.cwrap('__MUL_INTEGER__','string',['string','string']);
				_init('-','','0123456789')
				const r = _mul(a,b);
				resolve(r);
			})
	});
}

function App() {
	const [inputA,setInputA] = useState("0");
	const [inputB,setInputB] = useState("0");
	const [resultAdd,setResultAdd] = useState("0");
	const [resultSub,setResultSub] = useState("0");
	const [resultMul,setResultMul] = useState("0");
	const handleA = (event:any) => {
		const _inputA = `${event.target.value || inputA}`;
		setInputA(`${event.target.value || inputA}`.replaceAll(/[^\-0-9-]/g,''));
		try {
			add(`${_inputA}`,`${inputB}`).then((r:any)=>setResultAdd(`${r}`));
			sub(`${_inputA}`,`${inputB}`).then((r:any)=>setResultSub(`${r}`));
			mul(`${_inputA}`,`${inputB}`).then((r:any)=>setResultMul(`${r}`));
		} catch (e) {
			console.error(e);
		}
	}
	const handleB = (event:any) => {
		const _inputB = `${event.target.value || inputB}`;
		try {
			add(`${inputA}`,`${_inputB}`).then((r:any)=>setResultAdd(`${r}`));
			sub(`${inputA}`,`${_inputB}`).then((r:any)=>setResultSub(`${r}`));
			mul(`${inputA}`,`${_inputB}`).then((r:any)=>setResultMul(`${r}`));
		} catch (e) {
			console.error(e);
		}
		setInputB(`${event.target.value || inputB}`.replaceAll(/[^\-0-9-]/g,''));
	}
  return (
		<>
			<input type="text" value={inputA} onChange={handleA}/>
			<input type="text" value={inputB} onChange={handleB}/>
			<div className={"result add"}>({inputA}) + ({inputB}) = {resultAdd}</div>
			<div className={"result sub"}>({inputA}) - ({inputB}) = {resultSub}</div>
			<div className={"result mul"}>({inputA}) * ({inputB}) = {resultMul}</div>
		</>
  );
}

export default App;
