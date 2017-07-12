[<AutoOpen>]
module PortfolioTypes

type FundStatus(name: string, amount: float, invested: string, date: System.DateTime) = 
    member this.Name = name
    member this.Amount = amount
    member this.Invested = invested
    member this.Date = date


type FundAmount(name: string, amount: float) =
    member this.Amount = amount
    member this.Name = name

type Portfolio(equityFunds: FundAmount list, distribution: Map<string, float>) = 
    member this.EquityFunds = equityFunds
    member this.Distribution = distribution