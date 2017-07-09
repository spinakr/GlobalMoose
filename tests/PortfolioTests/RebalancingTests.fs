module RebalancingTests

open NUnit.Framework

open Portfolio
open Rebalancing

[<Test>]
let ``GetRebalanceActions_GivenAllThreeOff0Extra_ShouldReturn3Actions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 1000.); FundAmount("fund2", 2000.); FundAmount("fund3", 3000.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio 0.

    Assert.AreEqual(List.length actions, 3)
    Assert.IsTrue(List.contains {FundName = "fund1"; Diff = -400.} actions)
    Assert.IsTrue(List.contains {FundName = "fund2"; Diff = -1400.} actions)
    Assert.IsTrue(List.contains {FundName = "fund3"; Diff = 1800.} actions)

[<Test>]
let ``GetRebalanceActions_GivenOneOnTwoOff0Extra_ShouldReturnTwoActions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 800.); FundAmount("fund2", 600.); FundAmount("fund3", 4600.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio 0.

    Assert.AreEqual(List.length actions, 2)
    Assert.IsTrue(List.contains {FundName = "fund1"; Diff = -200.} actions)
    Assert.IsTrue(List.contains {FundName = "fund3"; Diff = 200.} actions)

[<Test>]
let ``GetRebalanceActions_GivenAllOn0Extra_ShouldReturnNoActions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 600.); FundAmount("fund2", 600.); FundAmount("fund3", 4800.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio 0.

    Assert.IsEmpty actions


[<Test>]
let ``GetRebalanceActions_GivenAllThreeOff10000Extra_ShouldReturn3Actions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 80.)
            .Add("fund2", 10.)
            .Add("fund3", 10.)
    let funds = [FundAmount("fund1", 3000.); FundAmount("fund2", 2000.); FundAmount("fund3", 1000.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio 10000.

    Assert.AreEqual(List.length actions, 3)
    Assert.IsTrue(List.contains {FundName = "fund1"; Diff = 9800.} actions)
    Assert.IsTrue(List.contains {FundName = "fund2"; Diff = -400.} actions)
    Assert.IsTrue(List.contains {FundName = "fund3"; Diff = 600.} actions)

[<Test>]
let ``ApplyActions_GivenBuyAction_ShouldBuyDesiredFund`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 80.)
            .Add("fund2", 10.)
            .Add("fund3", 10.)
    let funds = [FundAmount("fund1", 3000.); FundAmount("fund2", 2000.); FundAmount("fund3", 1000.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = [{FundName = "fund1"; Diff = 1000.}]
    let portfolio = applyActions portfolio actions

    Assert.AreEqual(portfolio.EquityFunds.[0].Amount, 4000)

[<Test>]
let ``ApplyActions_GivenSellAction_ShouldSellDesiredFund`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 80.)
            .Add("fund2", 10.)
            .Add("fund3", 10.)
    let funds = [FundAmount("fund1", 3000.); FundAmount("fund2", 2000.); FundAmount("fund3", 1000.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = [{FundName = "fund1"; Diff = -1000.}]
    let portfolio = applyActions portfolio actions

    Assert.AreEqual(portfolio.EquityFunds.[0].Amount, 2000)

[<Test>]
let ``RebalancePortfolio_GivenUnbalancedPortfolio_ShouldRebalanceToDistribution`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 80.)
            .Add("fund2", 10.)
            .Add("fund3", 10.)
    let funds = [FundAmount("fund1", 3000.); FundAmount("fund2", 2000.); FundAmount("fund3", 1000.)]
    let portfolio = Portfolio(funds, distribution)

    let balancedPortfolio = rebalancePortfolio portfolio 0.
    let actions = getRebalanceActions balancedPortfolio 0.

    Assert.IsEmpty actions
