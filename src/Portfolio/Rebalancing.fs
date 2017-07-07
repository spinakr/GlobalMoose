module Rebalancing

open Portfolio

type RebalanceAction = {FundName: string; Diff: float}

let getRebalanceActions extraInvestmentAllowed (portfolio: Portfolio) = 
    let sum = sumOfAssets portfolio.EquityFunds
    let max = sum + extraInvestmentAllowed
    [   
        for asset in portfolio.EquityFunds do
        let currentAmount = asset.Amount
        let desiredShare = portfolio.Distribution.[asset.Name]
        let desiredAmount = max * (desiredShare / 100.)
        let actionDiff = desiredAmount - currentAmount
        if actionDiff <> 0. then yield {FundName = asset.Name; Diff = actionDiff }
    ]
