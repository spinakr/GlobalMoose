module PortfolioTests

open Portfolio
open NUnit.Framework

[<Test>]
let ``SumOfAssets_ShouldReturnSumOfAllFundAmounts`` () =
    let funds = [FundAmount("fund1", 1000); FundAmount("fund2", 2000); FundAmount("fund3", 3000)]
    let total = sumOfAssets funds
    Assert.AreEqual(total, 6000)
    
