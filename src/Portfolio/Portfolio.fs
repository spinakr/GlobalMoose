module Portfolio

type FundAmount(name: string, amount: float) =
    member this.Amount = amount
    member this.Name = name

type Portfolio(equityFunds: FundAmount list, distribution: Map<string, float>) = 
    member this.EquityFunds = equityFunds
    member this.Distribution = distribution

let sumOfAssets funds =
    funds |> List.sumBy(fun (x:FundAmount) -> x.Amount)






   






