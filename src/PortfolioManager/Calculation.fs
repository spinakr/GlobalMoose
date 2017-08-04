module Calculation

open StatusFileReader


let totalsByDate statusUpdates = 
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.map (fun (key, group) -> key, group |> List.sumBy (fun x -> x.Amount))

let getTotalValue statusUpdates =
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.sortByDescending (fun (key, group) -> key)
    |> List.item 0
    |> snd
    |> List.sumBy (fun x -> x.Amount)
    

    
