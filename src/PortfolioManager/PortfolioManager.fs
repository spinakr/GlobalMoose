module PortfolioManager
    
open FSharp.Configuration
open FSharp.Charting
open Portfolio
open StatusFileReader
open System

type Settings = AppSettings<"App.config">

let toStatusUpdates statusUpdates = 
    Array.map (fun (s:StatusUpdate) -> s.Rows |> Seq.toList) statusUpdates
    |> List.concat


[<EntryPoint>]
let main argv =

    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath |> toStatusUpdates


    let chartingData = [for status in statusUpdates -> (status.Date, status.Amount)]
    printf "Amount:     %A \n" chartingData

    System.Windows.Forms.Application.Run (Chart.Line(chartingData).ShowChart())

    0 // return an integer exit code