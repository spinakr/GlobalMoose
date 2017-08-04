module PortfolioConsole

open FSharp.Configuration
open StatusFileReader
open System
open Charting
open Calculation

type Settings = AppSettings<"App.config">

let getUserCommand() =
    Console.Clear()
    """
1 : Chart value per fund
2 : Chart total portfolio value
3 : Total value today

q : Exit
    """ |> printfn "%s"

    System.Console.ReadKey().Key
 
let showResult result = 
    Console.Clear()
    result |> printfn "%s"
    System.Console.ReadKey().Key |> ignore



let rec run() =
    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath 
    

    let key = getUserCommand()
    match key with
        | System.ConsoleKey.D1 -> chartFunds statusUpdates
        | System.ConsoleKey.D2 -> chartSumOfFunds statusUpdates
        | System.ConsoleKey.D3 -> showResult (sprintf "Total value: %i" (getTotalValue statusUpdates)) 
        | System.ConsoleKey.Q -> ()
        | _ -> printfn "Unknown command"

    if key <> System.ConsoleKey.Q then run()