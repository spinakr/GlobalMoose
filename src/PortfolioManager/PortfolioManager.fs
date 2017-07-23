module PortfolioManager
    
open FSharp.Configuration
open FSharp.Charting
open Portfolio
open StatusFileReader
open System

type Settings = AppSettings<"App.config">

let totalsByDate statusUpdates = 
    statusUpdates
    |> List.groupBy (fun (x:StatusUpdate.Row) -> x.Date)
    |> List.map (fun (key, group) -> key, group |> List.sumBy (fun x -> x.Amount))

let chartAmountPerDate (totalsByDate:(DateTime * int) list) = 
    System.Windows.Forms.Application.Run (Chart.Line(totalsByDate).ShowChart())


[<EntryPoint>]
let main argv =

    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath 

    (totalsByDate >> chartAmountPerDate) statusUpdates


    0 // return an integer exit code