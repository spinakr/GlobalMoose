module PortfolioConsole

open FSharp.Configuration
open Charting
open StatusFileReader
open System

type Settings = AppSettings<"App.config">

let getUserCommand() =
    Console.Clear()
    """
1 : Chart value per fund
2 : Chart total portfolio value

q : Exit
    """ |> printfn "%s"

    System.Console.ReadKey().Key

let rec run() =
    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath 

    let key = getUserCommand()
    match key with
        | System.ConsoleKey.D1 -> chartFunds statusUpdates
        | System.ConsoleKey.D2 -> chartSumOfFunds statusUpdates
        | System.ConsoleKey.Q -> ()
        | _ -> printfn "Unknown command"

    if key <> System.ConsoleKey.Q then run()