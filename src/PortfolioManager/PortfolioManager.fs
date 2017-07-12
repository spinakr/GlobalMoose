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

    let statusUpdates = 
        loadAllStatusUpdates Settings.FileDirectoryPath 
        |> toStatusUpdates 

    let totalsByDate = 
        statusUpdates
        |> List.groupBy (fun x -> x.Date)
        |> List.map (fun (key, group) -> key, group |> List.sumBy (fun x -> x.Amount))


    System.Windows.Forms.Application.Run (Chart.Line(totalsByDate).ShowChart())

    0 // return an integer exit code