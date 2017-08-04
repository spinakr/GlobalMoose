module Calculation

open StatusFileReader


let totalsGroupedByDate statusUpdates = 
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.map (fun (key, group) -> key, group |> List.sumBy (fun x -> x.Amount))

let totalValue statusUpdates =
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.sortByDescending (fun (key, group) -> key)
    |> List.item 0
    |> snd
    |> List.sumBy (fun x -> x.Amount)
    
let totalProfit (statusUpdates:StatusUpdate.Row list) = 
    let totalInvested = statusUpdates |> List.sumBy (fun x -> x.Invested)
    let totalValue = totalValue statusUpdates
    let difference = totalValue - totalInvested
    difference
    
let totalProfitInPercent (statusUpdates:StatusUpdate.Row list) = 
    let totalInvested = statusUpdates |> List.sumBy (fun x -> x.Invested)
    let totalValue = totalValue statusUpdates
    let difference = totalValue - totalInvested
    (float difference / float totalValue) * 100.