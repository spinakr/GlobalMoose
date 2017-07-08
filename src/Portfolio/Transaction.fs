module Transaction

type T = {FundName: string; Diff: float}

let getRebalanceActions (portfolio: Portfolio) extraInvestment = 
    let sum = sumOfAssets portfolio.EquityFunds
    let max = sum + extraInvestment
    [   
        for asset in portfolio.EquityFunds do
            let currentAmount = asset.Amount
            let desiredShare = portfolio.Distribution.[asset.Name]
            let desiredAmount = max * (desiredShare / 100.)
            let actionDiff = desiredAmount - currentAmount
            if actionDiff <> 0. then yield {FundName = asset.Name; Diff = actionDiff }
    ]

let isAssetBalanced (asset: FundAmount) (distribution: Map<string, float>) portfolioValue = 
    let currentAmount = asset.Amount
    let desiredShare = distribution.[asset.Name]
    let desiredAmount = portfolioValue * (desiredShare / 100.)
    let actionDiff = desiredAmount - currentAmount
    match actionDiff with
        | 0. -> true
        | _ -> false

let isPortfolioBalanced (portfolio: Portfolio) = 
    let sum = sumOfAssets portfolio.EquityFunds
    List.exists (fun x -> isAssetBalanced x portfolio.Distribution sum) portfolio.EquityFunds

let adjustAsset (fund: FundAmount) action = 
    match action with
        | a when (a.FundName = fund.Name) -> FundAmount(fund.Name, fund.Amount + action.Diff)
        | _ -> fund

let applyAction (portfolio: Portfolio) action = 
    let newAssets = List.map (fun fund -> adjustAsset fund action) portfolio.EquityFunds
    Portfolio(newAssets, portfolio.Distribution)

let rec applyActions portfolio actions = 
    match actions with
        | [] -> portfolio
        | action :: actions -> applyActions (applyAction portfolio action) actions

let rebalancePortfolio portfolio extraInvestment =
    let actions = getRebalanceActions portfolio extraInvestment
    applyActions portfolio actions