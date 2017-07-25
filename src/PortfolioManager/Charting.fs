module Charting

open FSharp.Charting
open StatusFileReader
open System

let totalsByDate statusUpdates = 
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.map (fun (key, group) -> key, group |> List.sumBy (fun x -> x.Amount))


let chartSumOfFunds (allStatusUpdates:StatusUpdate.Row list) = 
    System.Windows.Forms.Application.Run (Chart.Line(totalsByDate allStatusUpdates).ShowChart())

let chartFunds (allStatusUpdates:StatusUpdate.Row list) = 
    let statusUpdatesPerFund = allStatusUpdates |> List.groupBy (fun x -> x.Fund)
    let chartLines = [
        for fund in statusUpdatesPerFund do
            yield Chart.Line((totalsByDate (snd fund)))
    ]
    System.Windows.Forms.Application.Run (Chart.Combine(chartLines).ShowChart())
    