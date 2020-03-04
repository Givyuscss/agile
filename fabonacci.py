class fabonacci_dp():
	def of(self,x):
		dp = [0,1]
		for i in range(x):
			dp.append(dp[i] + dp[i+1])
		print('Fabonacci.of(%d)==%d'%(x,dp[x]))

def main():
	fabonacci = fabonacci_dp()
	for i in range(1,201):
		fabonacci.of(i)

if __name__ == '__main__':
	main()