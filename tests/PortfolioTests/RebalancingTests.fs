module RebalancingTests

open NUnit.Framework

open Portfolio
open Rebalancing

[<Test>]
let ``GetRebalanceActions_GivenAllThreeOff_ShouldReturn3Actions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 1000.); FundAmount("fund2", 2000.); FundAmount("fund3", 3000.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio

    Assert.AreEqual(List.length actions, 3)
    Assert.IsTrue(List.contains {FundName = "fund1"; Diff = -400.} actions)
    Assert.IsTrue(List.contains {FundName = "fund2"; Diff = -1400.} actions)
    Assert.IsTrue(List.contains {FundName = "fund3"; Diff = 1800.} actions)


[<Test>]
let ``GetRebalanceActions_GivenAllOn_ShouldReturnNoActions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 600.); FundAmount("fund2", 600.); FundAmount("fund3", 4800.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio

    Assert.IsEmpty actions

[<Test>]
let ``GetRebalanceActions_GivenOneOnTwoOff_ShouldReturnTwoActions`` () =
    let distribution = 
        Map.empty
            .Add("fund1", 10.)
            .Add("fund2", 10.)
            .Add("fund3", 80.)
    let funds = [FundAmount("fund1", 800.); FundAmount("fund2", 600.); FundAmount("fund3", 4600.)]
    let portfolio = Portfolio(funds, distribution)
    let actions = getRebalanceActions portfolio

    Assert.AreEqual(List.length actions, 2)
    Assert.IsTrue(List.contains {FundName = "fund1"; Diff = -200.} actions)
    Assert.IsTrue(List.contains {FundName = "fund3"; Diff = 200.} actions)
