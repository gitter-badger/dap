dap

.NS("https://dap.js.org/stuff/untab.js")

.FUNC({
	convert	:{
		decode	:source=>{
			const	stack	=[],
				tab	=/;\t+/g,
				lines	=source.split(/[\r\n]+/g),
				scheme	=lines.shift().split(tab),
				rowskey	=scheme.pop();
				
			let	rows=[],
				last={};
				
			lines.forEach(line=>{
				const	row	= line.split(tab),
					head	= row.shift().split("\t"),
					tabs	= head.length,
					data	= {};
					
				row.unshift(head.pop());
				row.forEach((v,i)=>data[scheme[i]]=v);
				
				if(tabs>stack.length){
					stack.push(rows);
					rows=last[rowskey]=[];//data.rows
				}
				
				while(tabs<stack.length)
					rows=stack.pop();
					
				rows.push(data);
				last=data;
			});
			return rows;
		}		
	}
})
