module StatusFileReader

open FSharp.Data
open System.IO
open FSharp.Configuration
    
type Settings = AppSettings<"App.config">
type StatusUpdate = CsvProvider<"transactions.csv">


let loadAllStatusUpdates() = 
    match Directory.GetFiles(Settings.FileDirectoryPath, "*.csv") with
    | [||] -> [||]
    | arr -> Array.map (Path.GetFullPath >> StatusUpdate.Load) arr


