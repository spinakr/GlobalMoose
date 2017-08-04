module Charting

open FSharp.Charting
open StatusFileReader
open System
open Calculation

let chartSumOfFunds (allStatusUpdates:StatusUpdate.Row list) = 
    System.Windows.Forms.Application.Run (Chart.Line(totalsGroupedByDate allStatusUpdates).ShowChart())

let chartFunds (allStatusUpdates:StatusUpdate.Row list) = 
    let statusUpdatesPerFund = allStatusUpdates |> List.groupBy (fun x -> x.Fund)
    let chartLines = [
        for fund in statusUpdatesPerFund do
            yield Chart.Line((totalsGroupedByDate (snd fund)))
    ]
    System.Windows.Forms.Application.Run (Chart.Combine(chartLines).ShowChart())
    