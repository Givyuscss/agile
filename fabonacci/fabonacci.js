class fabonacci_dp{
	of(x){
		var dp = [0,1]
		for(var i=0;i<x;i++){
			dp.push(dp[i]+dp[i+1])
		}
		console.log('Fabonacci(%d)==%d',x,dp[x])
	}
}

function main(){
	fabonacci = new fabonacci_dp()
	for(var i=1;i<=200;i++){
		fabonacci.of(i)
	}
}

main()